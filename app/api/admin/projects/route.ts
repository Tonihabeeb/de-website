import { NextRequest, NextResponse } from 'next/server';

// GET /api/admin/projects - Get all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = new URLSearchParams(searchParams);
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/projects?${params.toString()}`);
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to fetch projects' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
