import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/permissions';

// GET /api/admin/navigation - Get all navigation menus
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;
    const { searchParams } = new URL(request.url);
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const params = new URLSearchParams(searchParams);
    const res = await fetch(`${backendUrl}/api/navigation?${params.toString()}`, {
      headers: {
        Authorization: request.headers.get('authorization') || '',
      },
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to fetch navigation menus' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching navigation menus:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch navigation menus' },
      { status: 500 }
    );
  }
}

// POST /api/admin/navigation - Create new navigation menu
export async function POST(request: NextRequest) {
  try {
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/navigation`, {
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
        { success: false, error: error.error || 'Failed to create navigation menu' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating navigation menu:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create navigation menu' },
      { status: 500 }
    );
  }
}
