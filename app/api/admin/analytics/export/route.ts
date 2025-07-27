import { NextRequest, NextResponse } from 'next/server';
import { requireViewAnalytics } from '@/middleware/permissions';

// GET /api/admin/analytics/export - Get export jobs
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireViewAnalytics()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/analytics/export?limit=${limit}&offset=${offset}`);
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to fetch export jobs' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Error fetching export jobs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch export jobs' },
      { status: 500 }
    );
  }
}

// POST /api/admin/analytics/export - Create new export job
export async function POST(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireViewAnalytics()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/analytics/export`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to create export job' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Error creating export job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create export job' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/analytics/export - Delete export job
export async function DELETE(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireViewAnalytics()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json(
        { success: false, error: 'Job ID is required' },
        { status: 400 }
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/analytics/export?jobId=${jobId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to delete export job' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Error deleting export job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete export job' },
      { status: 500 }
    );
  }
}
