import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@/lib/db/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// POST /api/checkout - Create a Stripe checkout session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, success_url, cancel_url, user_id, email, discountCode, discountAmount, discountType } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Build line items
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name || item.product?.name,
          description: item.short_description || item.product?.short_description || item.description || item.product?.description?.substring(0, 500),
          images: item.preview_images?.[0] || item.product?.preview_images?.[0] 
            ? [item.preview_images?.[0] || item.product?.preview_images?.[0]]
            : undefined
        },
        unit_amount: Math.round((item.price || item.product?.price) * 100)
      },
      quantity: item.quantity || 1
    }));

    // Apply discount if provided
    let discount = undefined;
    if (discountCode && discountAmount && discountType) {
      // Note: In production, you'd create a Stripe promotion code
      // For now, we'll handle discounts on the client side
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: success_url || `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url || `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
      customer_email: email,
      metadata: {
        user_id: user_id || 'guest',
        items: JSON.stringify(items.map((item: any) => ({
          product_id: item.id || item.product?.id,
          quantity: item.quantity || 1
        })))
      },
      discounts: discount ? [{ promotion_code: discount }] : undefined
    });

    return NextResponse.json({ 
      success: true, 
      data: { 
        sessionId: session.id,
        url: session.url 
      } 
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

// GET /api/checkout - Retrieve a checkout session
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Missing session_id' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({ 
      success: true, 
      data: session 
    });
  } catch (error) {
    console.error('Checkout retrieve error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve checkout session' },
      { status: 500 }
    );
  }
}
