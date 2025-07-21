import { NextRequest, NextResponse } from 'next/server';
import { PageModel } from '@/database/models/Page';
import { requireEditPages } from '@/middleware/permissions';

// POST /api/admin/pages/[id]/duplicate - Duplicate a page
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireEditPages()(request);
    if (permissionCheck) return permissionCheck;

    // Get the original page
    const originalPage = await PageModel.findById(id);
    if (!originalPage) {
      return NextResponse.json(
        { success: false, error: 'Page not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { title, slug, status = 'draft' } = body;

    // Validate required fields
    if (!title || !slug) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title and slug are required for duplication',
        },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPage = await PageModel.findBySlug(slug);
    if (existingPage) {
      return NextResponse.json(
        { success: false, error: 'A page with this slug already exists' },
        { status: 409 }
      );
    }

    // Create duplicated page
    const duplicatedPage = await PageModel.create({
      title,
      slug,
      content: originalPage.content,
      meta_title: originalPage.meta_title,
      meta_description: originalPage.meta_description,
      meta_keywords: originalPage.meta_keywords,
      created_by: originalPage.created_by,
    });

    if (!duplicatedPage) {
      return NextResponse.json(
        { success: false, error: 'Failed to duplicate page' },
        { status: 500 }
      );
    }

    // Update status if different from default
    if (status !== 'draft') {
      await PageModel.update(duplicatedPage.id, { status });
    }

    return NextResponse.json(
      {
        success: true,
        page: duplicatedPage,
        original_page: {
          id: originalPage.id,
          title: originalPage.title,
          slug: originalPage.slug,
        },
        message: 'Page duplicated successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error duplicating page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to duplicate page' },
      { status: 500 }
    );
  }
}
