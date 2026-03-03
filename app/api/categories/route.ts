import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/db/supabase';
import { mockCategories } from '@/lib/mock-products';

// GET /api/categories - List all categories
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    // If database returns empty or error, use mock data
    if (error || !data || data.length === 0) {
      console.log('Using mock categories data');
      return NextResponse.json({ 
        success: true, 
        data: mockCategories,
        source: 'mock'
      });
    }

    return NextResponse.json({ 
      success: true, 
      data: data || [],
      source: 'database'
    });
  } catch (error) {
    console.error('Categories GET error:', error);
    
    // Return mock data on error
    return NextResponse.json({ 
      success: true, 
      data: mockCategories,
      source: 'mock-fallback'
    });
  }
}

// POST /api/categories - Create a new category (admin only)
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    const { name, slug, description, icon, sort_order } = body;

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, slug' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('categories')
      .insert({
        name,
        slug,
        description,
        icon,
        sort_order: sort_order || 0
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Categories POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
