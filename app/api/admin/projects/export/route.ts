import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/projects/export`);
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to export projects' },
        { status: res.status }
      );
    }
    const json = await res.text();
    return new NextResponse(json, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="projects-export.json"',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to export projects' },
      { status: 500 }
    );
  }
}
