import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/permissions';

// GET /api/admin/settings - Get all site settings
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/settings`, {
      headers: {
        Authorization: request.headers.get('authorization') || '',
      },
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to fetch site settings' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch site settings' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/settings - Update site settings
export async function PUT(request: NextRequest) {
  try {
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: request.headers.get('authorization') || '',
      },
      body: await request.text(),
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to update site settings' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating site settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update site settings' },
      { status: 500 }
    );
  }
}
