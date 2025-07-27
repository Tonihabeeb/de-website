import { NextRequest, NextResponse } from 'next/server';
import { requireEditPages } from '@/middleware/permissions';

// POST /api/admin/pages/[id]/duplicate - Duplicate a page
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireEditPages()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/pages/${id}/duplicate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to duplicate page' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    }, { status: 201 });
  } catch (error) {
    console.error('Error duplicating page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to duplicate page' },
      { status: 500 }
    );
  }
}
