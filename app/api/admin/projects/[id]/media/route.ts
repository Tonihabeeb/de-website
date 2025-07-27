import { NextRequest, NextResponse } from 'next/server';
import { requireEditProjects } from '@/middleware/permissions';
import { writeFile, readFile, unlink } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

// GET /api/admin/projects/[id]/media - Get project media
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
    const res = await fetch(`${backendUrl}/api/projects/${id}/media${paramsStr ? '?' + paramsStr : ''}`);
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to fetch project media' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Error fetching project media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project media' },
      { status: 500 }
    );
  }
}

// POST /api/admin/projects/[id]/media - Upload project media
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireEditProjects()(request);
    if (permissionCheck) return permissionCheck;

    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const contentType = request.headers.get('content-type') || '';
    let res;
    if (contentType.includes('multipart/form-data')) {
      res = await fetch(`${backendUrl}/api/projects/${id}/media`, {
        method: 'POST',
        headers: request.headers,
        body: (request as any).body,
      });
    } else {
      const body = await request.json();
      res = await fetch(`${backendUrl}/api/projects/${id}/media`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to upload project media' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    }, { status: 201 });
  } catch (error) {
    console.error('Error uploading project media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload project media' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/projects/[id]/media - Delete project media
export async function DELETE(
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
    const res = await fetch(`${backendUrl}/api/projects/${id}/media${paramsStr ? '?' + paramsStr : ''}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to delete project media' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Error deleting project media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project media' },
      { status: 500 }
    );
  }
}
