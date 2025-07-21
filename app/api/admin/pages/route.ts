import { NextRequest, NextResponse } from 'next/server';
import { PageModel } from '@/database/models/Page';

// GET /api/admin/pages - Get all pages
export async function GET(request: NextRequest) {
  try {
    // Temporarily remove authentication check for development
    // TODO: Re-enable authentication once auth system is properly set up

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const created_by = searchParams.get('created_by');
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : undefined;
    const offset = searchParams.get('offset')
      ? parseInt(searchParams.get('offset')!)
      : undefined;

    const pages = await PageModel.findAll({
      status: status || undefined,
      created_by: created_by || undefined,
      limit,
      offset,
    });

    return NextResponse.json({
      success: true,
      pages,
      total: pages.length,
    });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}

// POST /api/admin/pages - Create new page
export async function POST(request: NextRequest) {
  try {
    // Temporarily remove authentication check for development
    // TODO: Re-enable authentication once auth system is properly set up

    const body = await request.json();
    const {
      slug,
      title,
      content,
      meta_title,
      meta_description,
      meta_keywords,
      og_title,
      og_description,
      og_image,
      twitter_title,
      twitter_description,
      twitter_image,
      publish_at,
      unpublish_at,
    } = body;

    // Validate required fields
    if (!slug || !title || !content) {
      return NextResponse.json(
        { success: false, error: 'Slug, title, and content are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPage = await PageModel.findBySlug(slug);
    if (existingPage) {
      return NextResponse.json(
        { success: false, error: 'Page with this slug already exists' },
        { status: 409 }
      );
    }

    const page = await PageModel.create({
      slug,
      title,
      content,
      meta_title,
      meta_description,
      meta_keywords,
      og_title,
      og_description,
      og_image,
      twitter_title,
      twitter_description,
      twitter_image,
      publish_at: publish_at ? new Date(publish_at) : null,
      unpublish_at: unpublish_at ? new Date(unpublish_at) : null,
      created_by: 'admin', // Default user for now
    });

    return NextResponse.json(
      {
        success: true,
        page,
        message: 'Page created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create page' },
      { status: 500 }
    );
  }
}
