import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// GET /api/admin/projects/[id]/versions - Get project versions
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { searchParams } = new URL(request.url);
    const paramsStr = new URLSearchParams(searchParams).toString();
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/projects/${id}/versions${paramsStr ? '?' + paramsStr : ''}`);
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to fetch project versions' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Error fetching project versions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project versions' },
      { status: 500 }
    );
  }
}

// POST /api/admin/projects/[id]/versions - Create new version
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/projects/${id}/versions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to create project version' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating project version:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project version' },
      { status: 500 }
    );
  }
}
