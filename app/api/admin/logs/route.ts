import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/permissions';

// GET /api/admin/logs - Get system logs
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;
    const { searchParams } = new URL(request.url);
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const params = new URLSearchParams(searchParams);
    const res = await fetch(`${backendUrl}/api/logs?${params.toString()}`, {
      headers: {
        Authorization: request.headers.get('authorization') || '',
      },
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to fetch system logs' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching system logs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch system logs' },
      { status: 500 }
    );
  }
}

// POST /api/admin/logs - Create system log entry
export async function POST(request: NextRequest) {
  try {
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const res = await fetch(`${backendUrl}/api/logs`, {
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
        { success: false, error: error.error || 'Failed to create system log' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating system log:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create system log' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/logs - Clear old system logs
export async function DELETE(request: NextRequest) {
  try {
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;
    const { searchParams } = new URL(request.url);
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const params = new URLSearchParams(searchParams);
    const res = await fetch(`${backendUrl}/api/logs?${params.toString()}`, {
      method: 'DELETE',
      headers: {
        Authorization: request.headers.get('authorization') || '',
      },
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to clear system logs' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error clearing system logs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to clear system logs' },
      { status: 500 }
    );
  }
} 