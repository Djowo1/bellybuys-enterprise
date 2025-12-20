import { NextResponse } from 'next/server';
import { createReview, getReviews } from '@/lib/firebase';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.rating || !body.text) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create review
    const result = await createReview({
      name: body.name,
      email: body.email,
      rating: Number(body.rating),
      service: body.service || '',
      text: body.text,
      initials: body.name.split(' ').map(n => n[0]).join('').toUpperCase()
    });

    if (result.success) {
      return NextResponse.json(
        { message: 'Review created successfully', id: result.id },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to create review' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Review API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const reviews = await getReviews();
    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error('Get reviews error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}