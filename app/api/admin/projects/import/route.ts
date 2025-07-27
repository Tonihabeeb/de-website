import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/projects/import`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to import projects' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to import projects' },
      { status: 500 }
    );
  }
}
