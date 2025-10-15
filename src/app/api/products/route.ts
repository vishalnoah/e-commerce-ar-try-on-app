import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { eq, and, like, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Filter parameters
    const gender = searchParams.get('gender');
    const size = searchParams.get('size');

    // Validate gender if provided
    if (gender && gender !== 'Men' && gender !== 'Women') {
      return NextResponse.json(
        { 
          error: 'Invalid gender value. Must be "Men" or "Women"',
          code: 'INVALID_GENDER'
        },
        { status: 400 }
      );
    }

    // Build query with filters
    let query = db.select().from(products);

    // Apply filters
    const filters = [];
    
    if (gender) {
      filters.push(eq(products.gender, gender));
    }
    
    if (size) {
      filters.push(like(products.sizes, `%${size}%`));
    }

    if (filters.length > 0) {
      query = query.where(and(...filters));
    }

    // Apply ordering, pagination and execute query
    const results = await query
      .orderBy(desc(products.id))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}