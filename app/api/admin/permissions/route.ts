import { NextRequest, NextResponse } from 'next/server';
import { requireSuperAdmin } from '@/middleware/permissions';

// GET /api/admin/permissions - Get all permissions
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireSuperAdmin()(request);
    if (permissionCheck) return permissionCheck;
    const { searchParams } = new URL(request.url);
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const params = new URLSearchParams(searchParams);
    const res = await fetch(`${backendUrl}/api/permissions?${params.toString()}`, {
      headers: {
        Authorization: request.headers.get('authorization') || '',
      },
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to fetch permissions' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch permissions' },
      { status: 500 }
    );
  }
}

// POST /api/admin/permissions - Create new permission
export async function POST(request: NextRequest) {
  try {
    const permissionCheck = await requireSuperAdmin()(request);
    if (permissionCheck) return permissionCheck;
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/permissions`, {
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
        { success: false, error: error.error || 'Failed to create permission' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating permission:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create permission' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/permissions - Delete permission
export async function DELETE(request: NextRequest) {
  try {
    const permissionCheck = await requireSuperAdmin()(request);
    if (permissionCheck) return permissionCheck;
    const { searchParams } = new URL(request.url);
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const params = new URLSearchParams(searchParams);
    const res = await fetch(`${backendUrl}/api/permissions?${params.toString()}`, {
      method: 'DELETE',
      headers: {
        Authorization: request.headers.get('authorization') || '',
      },
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to delete permission' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error deleting permission:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete permission' },
      { status: 500 }
    );
  }
}
