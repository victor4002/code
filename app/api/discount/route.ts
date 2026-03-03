import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/db/supabase';

// GET /api/discount - Validate a discount code
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const orderTotal = parseFloat(searchParams.get('order_total') || '0');

    if (!code) {
      return NextResponse.json(
        { success: false, error: 'Discount code is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('discount_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('active', true)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: 'Invalid discount code' },
        { status: 404 }
      );
    }

    // Check validity dates
    const now = new Date();
    if (data.valid_from && new Date(data.valid_from) > now) {
      return NextResponse.json(
        { success: false, error: 'Discount code is not yet valid' },
        { status: 400 }
      );
    }
    if (data.valid_until && new Date(data.valid_until) < now) {
      return NextResponse.json(
        { success: false, error: 'Discount code has expired' },
        { status: 400 }
      );
    }

    // Check usage limit
    if (data.max_uses && data.used_count >= data.max_uses) {
      return NextResponse.json(
        { success: false, error: 'Discount code has reached maximum uses' },
        { status: 400 }
      );
    }

    // Check minimum order amount
    if (data.min_order_amount && orderTotal < data.min_order_amount) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Minimum order amount of $${data.min_order_amount} required` 
        },
        { status: 400 }
      );
    }

    // Calculate discount
    let discountAmount = 0;
    if (data.discount_type === 'percentage') {
      discountAmount = (orderTotal * data.discount_value) / 100;
    } else {
      discountAmount = Math.min(data.discount_value, orderTotal);
    }

    return NextResponse.json({ 
      success: true, 
      data: {
        code: data.code,
        discount_type: data.discount_type,
        discount_value: data.discount_value,
        discount_amount: discountAmount
      }
    });
  } catch (error) {
    console.error('Discount validation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to validate discount code' },
      { status: 500 }
    );
  }
}
