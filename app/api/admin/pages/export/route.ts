import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/pages/export`, {
      headers: {
        Authorization: request.headers.get('authorization') || '',
      },
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to export pages' },
        { status: res.status }
      );
    }
    // Forward file response
    const contentType = res.headers.get('content-type') || 'application/json';
    const contentDisposition = res.headers.get('content-disposition') || '';
    const fileBuffer = Buffer.from(await res.arrayBuffer());
    const response = new NextResponse(fileBuffer);
    response.headers.set('Content-Type', contentType);
    if (contentDisposition) response.headers.set('Content-Disposition', contentDisposition);
    response.headers.set('Cache-Control', 'no-cache');
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to export pages' },
      { status: 500 }
    );
  }
}
