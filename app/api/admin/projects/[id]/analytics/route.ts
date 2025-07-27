import { NextRequest, NextResponse } from 'next/server';
import { requireViewProjects } from '@/middleware/permissions';

// GET /api/admin/projects/[id]/analytics - Get project analytics
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireViewProjects()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const paramsStr = new URLSearchParams(searchParams).toString();
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const res = await fetch(`${backendUrl}/api/projects/${id}/analytics${paramsStr ? '?' + paramsStr : ''}`);
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to fetch project analytics' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Error fetching project analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project analytics' },
      { status: 500 }
    );
  }
}
