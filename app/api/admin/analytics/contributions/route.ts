import { NextRequest, NextResponse } from 'next/server';
import { requireViewAnalytics } from '@/middleware/permissions';

interface ContentContribution {
  id: string;
  user_id: string;
  content_type: 'page' | 'project' | 'media' | 'comment';
  content_id: string;
  action: 'created' | 'updated' | 'deleted' | 'published';
  title?: string;
  created_at: Date;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

// GET /api/admin/analytics/contributions - Get content contributions
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireViewAnalytics()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const params = new URLSearchParams();
    for (const [key, value] of searchParams.entries()) {
      params.append(key, value);
    }
    const res = await fetch(`${backendUrl}/api/analytics/contributions?${params.toString()}`, {
      headers: {
        Authorization: request.headers.get('authorization') || '',
      },
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to fetch content contributions' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching content contributions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content contributions' },
      { status: 500 }
    );
  }
}

// POST /api/admin/analytics/contributions - Track content contribution
export async function POST(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/analytics/contributions`, {
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
        { success: false, error: error.error || 'Failed to track content contribution' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error tracking content contribution:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track content contribution' },
      { status: 500 }
    );
  }
}
