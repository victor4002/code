import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/db/supabase';
import { mockProducts } from '@/lib/mock-products';

// GET /api/products/[slug] - Get a single product by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = createServerClient();
    const { slug } = await params;

    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    // If database returns error or no data, try mock data
    if (error || !data) {
      console.log(`Product ${slug} not found in database, checking mock data...`);
      
      const mockProduct = mockProducts.find(p => p.slug === slug);
      
      if (mockProduct) {
        return NextResponse.json({ 
          success: true, 
          data: mockProduct,
          source: 'mock'
        });
      }
      
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data,
      source: 'database'
    });
  } catch (error) {
    console.error('Product GET error:', error);
    
    // Try to return mock product on error
    const { slug } = await params;
    const mockProduct = mockProducts.find(p => p.slug === slug);
    
    if (mockProduct) {
      return NextResponse.json({ 
        success: true, 
        data: mockProduct,
        source: 'mock-fallback'
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
