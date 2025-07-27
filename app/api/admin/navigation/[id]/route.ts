import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/permissions';

// GET /api/admin/navigation/[id] - Get navigation menu by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/navigation/${id}`, {
      headers: {
        Authorization: request.headers.get('authorization') || '',
      },
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to fetch navigation menu' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching navigation menu:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch navigation menu' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/navigation/[id] - Update navigation menu
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/navigation/${id}`, {
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
        { success: false, error: error.error || 'Failed to update navigation menu' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating navigation menu:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update navigation menu' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/navigation/[id] - Delete navigation menu
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/navigation/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: request.headers.get('authorization') || '',
      },
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to delete navigation menu' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error deleting navigation menu:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete navigation menu' },
      { status: 500 }
    );
  }
}
