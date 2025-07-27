import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/permissions';

// GET /api/admin/users/export - Export users
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;
    const { searchParams } = new URL(request.url);
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const params = new URLSearchParams(searchParams);
    const res = await fetch(`${backendUrl}/api/users/export?${params.toString()}`, {
      headers: {
        Authorization: request.headers.get('authorization') || '',
      },
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to export users' },
        { status: res.status }
      );
    }
    // Forward file response if not JSON
    const contentType = res.headers.get('content-type') || 'application/json';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      return NextResponse.json(data);
    } else {
      const contentDisposition = res.headers.get('content-disposition') || '';
      const fileBuffer = Buffer.from(await res.arrayBuffer());
      const response = new NextResponse(fileBuffer);
      response.headers.set('Content-Type', contentType);
      if (contentDisposition) response.headers.set('Content-Disposition', contentDisposition);
      response.headers.set('Cache-Control', 'no-cache');
      return response;
    }
  } catch (error) {
    console.error('Error exporting users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to export users' },
      { status: 500 }
    );
  }
}
