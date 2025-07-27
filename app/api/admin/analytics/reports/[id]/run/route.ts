import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/analytics/reports/${id}/run`, {
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
        { error: error.error || 'Internal server error' },
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
    console.error('Error running report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
