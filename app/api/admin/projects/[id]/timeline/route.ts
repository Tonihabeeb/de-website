import { NextRequest, NextResponse } from 'next/server';
import { requireEditProjects } from '@/middleware/permissions';

// GET /api/admin/projects/[id]/timeline - Get project timeline
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireEditProjects()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const paramsStr = new URLSearchParams(searchParams).toString();
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/projects/${id}/timeline${paramsStr ? '?' + paramsStr : ''}`);
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to fetch project timeline' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Error fetching project timeline:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project timeline' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/projects/[id]/timeline - Update project timeline
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireEditProjects()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/projects/${id}/timeline`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to update project timeline' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Error updating project timeline:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update project timeline' },
      { status: 500 }
    );
  }
}

// POST /api/admin/projects/[id]/timeline/milestones - Add milestone
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireEditProjects()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/projects/${id}/timeline/milestones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to add milestone' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding milestone:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add milestone' },
      { status: 500 }
    );
  }
}
