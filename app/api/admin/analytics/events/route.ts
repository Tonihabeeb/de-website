import { NextRequest, NextResponse } from 'next/server';
import { requireViewAnalytics } from '@/middleware/permissions';

// GET /api/admin/analytics/events - Get analytics events
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireViewAnalytics()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const params = new URLSearchParams(searchParams);
    const res = await fetch(`${backendUrl}/api/analytics/events?${params.toString()}`, {
      headers: {
        Authorization: request.headers.get('authorization') || '',
      },
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to fetch analytics events' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching analytics events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics events' },
      { status: 500 }
    );
  }
}

// POST /api/admin/analytics/events - Track analytics event
export async function POST(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/analytics/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: request.headers.get('authorization') || '',
      },
      body: await request.text(),
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to track analytics event' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error tracking analytics event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track analytics event' },
      { status: 500 }
    );
  }
}
