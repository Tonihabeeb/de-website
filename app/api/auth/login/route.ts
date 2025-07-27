import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const body = await request.text();
    console.log('[API/login] Request body:', body);
    
    const res = await fetch(`${backendUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
    
    console.log('[API/login] Backend response status:', res.status);
    
    if (!res.ok) {
      const error = await res.json();
      console.log('[API/login] Backend error:', error);
      return NextResponse.json(
        { success: false, error: error.error || 'Internal server error' },
        { status: res.status }
      );
    }
    
    const data = await res.json();
    console.log('[API/login] Backend success data:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API/login] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
