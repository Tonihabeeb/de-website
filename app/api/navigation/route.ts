import { NextRequest, NextResponse } from 'next/server';

export const runtime = "nodejs";

console.log('[API/navigation] NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
console.log('[API/navigation] BACKEND_URL:', process.env.BACKEND_URL);
console.log('[API/navigation] process.env keys:', Object.keys(process.env));

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const params = new URLSearchParams(searchParams);
    const res = await fetch(`${backendUrl}/api/navigation?${params.toString()}`);
    console.log('[API/navigation] fetch response status:', res.status);
    if (!res.ok) {
      const errorText = await res.text();
      console.log('[API/navigation] fetch error body:', errorText);
      return new Response(JSON.stringify({ success: false, error: errorText || 'Failed to fetch navigation' }), { status: res.status });
    }
    const navigation = await res.json();
    return new Response(JSON.stringify({ success: true, navigation }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Failed to fetch navigation' }), { status: 500 });
  }
} 