import { NextRequest, NextResponse } from 'next/server';
import { requirePublishPages } from '@/middleware/permissions';

// POST /api/admin/pages/[id]/publish - Publish page
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requirePublishPages()(request);
    if (permissionCheck) return permissionCheck;

    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/pages/${id}/publish`, {
      method: 'POST',
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to publish page' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Error publishing page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to publish page' },
      { status: 500 }
    );
  }
}
