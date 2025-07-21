import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database/connection';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...');

    // Test basic database connection
    const result = db.prepare('SELECT COUNT(*) as count FROM pages').get() as {
      count: number;
    };
    console.log('Pages count:', result);

    // Test if we can query pages
    const pages = db
      .prepare('SELECT id, slug, title, status FROM pages LIMIT 5')
      .all();
    console.log('Pages found:', pages.length);

    return NextResponse.json({
      success: true,
      message: 'Database connection working',
      pagesCount: result.count,
      samplePages: pages,
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
