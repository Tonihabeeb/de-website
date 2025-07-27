import { NextRequest, NextResponse } from 'next/server';
import { requireSuperAdmin } from '@/middleware/permissions';
// import { db } from '@/database/connection';

// POST /api/admin/users/bulk - Bulk user operations
export async function POST(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireSuperAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/users/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: request.headers.get('authorization') || '',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to perform bulk user operations' },
        { status: res.status }
      );
    }
    const result = await res.json();
    return NextResponse.json({
      success: true,
      operation: body.operation,
      results: result.results,
      message: result.message || 'Bulk operation completed.',
    });
  } catch (error) {
    console.error('Error performing bulk user operations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to perform bulk user operations' },
      { status: 500 }
    );
  }
}
