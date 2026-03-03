import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/db/supabase';

// GET /api/orders - Get orders (by user or all for admin)
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    
    const orderId = searchParams.get('id');
    const orderNumber = searchParams.get('order_number');
    const userId = searchParams.get('user_id');

    let query = supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*)
      `);

    if (orderId) {
      query = query.eq('id', orderId);
    } else if (orderNumber) {
      query = query.eq('order_number', orderNumber);
    } else if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      data: data || [] 
    });
  } catch (error) {
    console.error('Orders GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    const { 
      user_id,
      email,
      items,
      subtotal,
      discount_amount,
      discount_code,
      total,
      payment_intent_id,
      status
    } = body;

    // Validate required fields
    if (!items || items.length === 0 || !total) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id,
        email,
        order_number: orderNumber,
        subtotal: subtotal || 0,
        discount_amount: discount_amount || 0,
        discount_code,
        total,
        payment_intent_id,
        status: status || 'pending'
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id || item.id,
      product_name: item.name || item.product_name,
      price: item.price,
      quantity: item.quantity || 1
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Update product sales count
    for (const item of items) {
      const productId = item.product_id || item.id;
      await supabase.rpc('increment_sales_count', { row_id: productId });
    }

    return NextResponse.json({ 
      success: true, 
      data: { ...order, items: orderItems } 
    }, { status: 201 });
  } catch (error) {
    console.error('Orders POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
