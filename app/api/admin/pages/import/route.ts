import { NextRequest, NextResponse } from 'next/server';
import { PageModel } from '@/database/models/Page';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { success: false, error: 'Invalid format: expected an array of pages' },
        { status: 400 }
      );
    }
    const results = [];
    for (const page of body) {
      if (!page.slug || !page.title || !page.content) {
        results.push({
          slug: page.slug,
          success: false,
          error: 'Missing required fields',
        });
        continue;
      }
      try {
        await PageModel.create(page);
        results.push({ slug: page.slug, success: true });
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        results.push({
          slug: page.slug,
          success: false,
          error: errorMsg || 'Failed to import',
        });
      }
    }
    return NextResponse.json({ success: true, results });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to import pages' },
      { status: 500 }
    );
  }
}
