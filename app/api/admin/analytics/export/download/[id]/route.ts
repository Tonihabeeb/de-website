import { NextRequest, NextResponse } from 'next/server';
import { requireViewAnalytics } from '@/middleware/permissions';

// GET /api/admin/analytics/export/download/[id] - Download exported file
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check permissions
    const permissionCheck = await requireViewAnalytics()(request);
    if (permissionCheck) return permissionCheck;

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const format = searchParams.get('format') || 'csv';
    const res = await fetch(`${backendUrl}/api/analytics/export/download/${id}?format=${format}`, {
      headers: {
        Authorization: request.headers.get('authorization') || '',
      },
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to download export' },
        { status: res.status }
      );
    }
    // Forward file response
    const contentType = res.headers.get('content-type') || 'application/octet-stream';
    const contentDisposition = res.headers.get('content-disposition') || '';
    const fileBuffer = Buffer.from(await res.arrayBuffer());
    const response = new NextResponse(fileBuffer);
    response.headers.set('Content-Type', contentType);
    if (contentDisposition) response.headers.set('Content-Disposition', contentDisposition);
    response.headers.set('Cache-Control', 'no-cache');
    return response;
  } catch (error) {
    console.error('Error downloading export:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to download export' },
      { status: 500 }
    );
  }
}
