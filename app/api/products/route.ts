import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/db/supabase';

// GET /api/products - List all published products
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        image_url
      `)
      .eq('status', 'published');

    // Filter by category
    if (category) {
      query = query.eq('category.slug', category);
    }

    // Filter featured
    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    // Search (basic text search on name and description)
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Sort
    switch (sort) {
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'price_asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price', { ascending: false });
        break;
      case 'popular':
        query = query.order('sales_count', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      data: data || [],
      total: data?.length || 0
    });
  } catch (error) {
    console.error('Products GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product (admin only)
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    const { 
      name, 
      slug, 
      description, 
      short_description,
      price, 
      compare_at_price,
      category_id,
      tags,
      product_type,
      file_url,
      file_size,
      file_format,
      preview_images,
      featured,
      status 
    } = body;

    // Validate required fields
    if (!name || !slug || price === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('products')
      .insert({
        name,
        slug,
        description,
        short_description,
        price,
        compare_at_price,
        category_id,
        tags: tags || [],
        product_type: product_type || 'ebook',
        file_url,
        file_size,
        file_format,
        preview_images: preview_images || [],
        featured: featured || false,
        status: status || 'draft',
        sales_count: 0
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Products POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
