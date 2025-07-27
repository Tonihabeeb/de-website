import { NextRequest, NextResponse } from 'next/server';
import { requireEditPages } from '@/middleware/permissions';
import { v4 as uuidv4 } from 'uuid';

// GET /api/admin/pages/[id]/versions - Get page versions
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireEditPages()(request);
    if (permissionCheck) return permissionCheck;

    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/pages/${id}/versions`);
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to fetch page versions' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Error fetching page versions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch page versions' },
      { status: 500 }
    );
  }
}

// POST /api/admin/pages/[id]/versions - Create new version
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
    const res = await fetch(`${backendUrl}/api/pages/${id}/versions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to create page version' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating page version:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create page version' },
      { status: 500 }
    );
  }
}
