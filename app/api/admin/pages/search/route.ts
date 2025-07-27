import { NextRequest, NextResponse } from 'next/server';
import { requireViewPages } from '@/middleware/permissions';

// GET /api/admin/pages/search - Search and filter pages
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireViewPages()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const params = new URLSearchParams(searchParams);
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/pages/search?${params.toString()}`);
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to search pages' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Error searching pages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search pages' },
      { status: 500 }
    );
  }
}
