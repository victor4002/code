import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@/lib/db/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  const supabase = createServerClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Parse items from metadata
        const items = JSON.parse(session.metadata?.items || '[]');
        
        // Generate order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
        
        // Calculate totals (you might want to recalculate from line items for security)
        const subtotal = session.amount_subtotal ? session.amount_subtotal / 100 : 0;
        const total = session.amount_total ? session.amount_total / 100 : 0;
        const discountAmount = subtotal - total;

        // Create order
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            order_number: orderNumber,
            user_id: session.metadata?.user_id !== 'guest' ? session.metadata?.user_id : null,
            email: session.customer_email,
            status: 'paid',
            subtotal,
            discount_amount: discountAmount,
            total,
            payment_intent_id: session.payment_intent as string,
            stripe_customer_id: session.customer as string
          })
          .select()
          .single();

        if (orderError) throw orderError;

        // Create order items
        for (const item of items) {
          const { error: itemError } = await supabase
            .from('order_items')
            .insert({
              order_id: order.id,
              product_id: item.product_id,
              product_name: item.product_name || 'Product',
              price: item.price || 0,
              quantity: item.quantity || 1
            });

          if (!itemError) {
            // Increment sales count
            try {
              await supabase.rpc('increment_sales_count', { row_id: item.product_id });
            } catch (e) {
              // Ignore errors for sales count increment
            }
          }
        }

        console.log(`Order created: ${orderNumber}`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Update order status if we have a matching payment intent
        await supabase
          .from('orders')
          .update({ status: 'failed' })
          .eq('payment_intent_id', paymentIntent.id);
        
        console.log(`Payment failed: ${paymentIntent.id}`);
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        
        // Find and update the order
        await supabase
          .from('orders')
          .update({ status: 'refunded' })
          .eq('payment_intent_id', charge.payment_intent as string);
        
        console.log(`Refund processed: ${charge.id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
