import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/permissions';

// GET /api/admin/users/activity - Get user activity logs
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;
    const { searchParams } = new URL(request.url);
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const params = new URLSearchParams(searchParams);
    const res = await fetch(`${backendUrl}/api/users/activity?${params.toString()}`, {
      headers: {
        Authorization: request.headers.get('authorization') || '',
      },
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to fetch user activity logs' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching user activity logs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user activity logs' },
      { status: 500 }
    );
  }
}

// POST /api/admin/users/activity - Log user activity
export async function POST(request: NextRequest) {
  try {
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/users/activity`, {
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
        { success: false, error: error.error || 'Failed to log user activity' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error logging user activity:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to log user activity' },
      { status: 500 }
    );
  }
}
