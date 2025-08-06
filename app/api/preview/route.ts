import { NextRequest, NextResponse } from 'next/server';

// This is a simple in-memory store for draft content (for demo/dev only)
// In production, use a more robust solution (e.g., Redis, DB, JWT, etc.)
const previewDraftStore: Record<string, any> = {};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id, draft } = body;
    if (!type || !id) {
      return NextResponse.json(
        { success: false, error: 'Missing type or id' },
        { status: 400 }
      );
    }
    // TODO: Add authentication check here (e.g., session/cookie/JWT)
    // For now, allow all requests

    // Store the draft content in memory (keyed by type:id)
    if (draft) {
      previewDraftStore[`${type}:${id}`] = draft;
    }

    // Set preview mode cookie (Next.js expects __prerender_bypass or custom)
    const response = NextResponse.json({
      success: true,
      redirect: `/preview/${type}/${id}`,
    });
    response.cookies.set('preview', '1', { path: '/', httpOnly: false });
    response.cookies.set('preview_id', `${type}:${id}`, {
      path: '/',
      httpOnly: false,
    });
    // Optionally, store a short-lived token for the draft
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to enable preview' },
      { status: 500 }
    );
  }
}
