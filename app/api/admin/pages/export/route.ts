import { NextRequest, NextResponse } from 'next/server';
import { PageModel } from '@/database/models/Page';

export async function GET(request: NextRequest) {
  try {
    const pages = await PageModel.findAll();
    const json = JSON.stringify(pages, null, 2);
    return new NextResponse(json, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="pages-export.json"',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to export pages' },
      { status: 500 }
    );
  }
}
