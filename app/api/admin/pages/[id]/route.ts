import { NextRequest, NextResponse } from 'next/server';
import { PageModel } from '@/database/models/Page';
import {
  requireAuthor,
  requireEditPages,
  requireDeletePages,
} from '@/middleware/permissions';

// GET /api/admin/pages/[id] - Get page by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireAuthor()(request);
    if (permissionCheck) return permissionCheck;

    const page = await PageModel.findById(id);

    if (!page) {
      return NextResponse.json(
        { success: false, error: 'Page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      page,
    });
  } catch (error) {
    console.error('Error fetching page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch page' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/pages/[id] - Update page
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireEditPages()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const {
      slug,
      title,
      content,
      meta_title,
      meta_description,
      meta_keywords,
      status,
    } = body;

    // Check if page exists
    const existingPage = await PageModel.findById(id);
    if (!existingPage) {
      return NextResponse.json(
        { success: false, error: 'Page not found' },
        { status: 404 }
      );
    }

    // Check if slug is being changed and if it already exists
    if (slug && slug !== existingPage.slug) {
      const slugExists = await PageModel.findBySlug(slug);
      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'Page with this slug already exists' },
          { status: 409 }
        );
      }
    }

    const updatedPage = await PageModel.update(id, {
      slug,
      title,
      content,
      meta_title,
      meta_description,
      meta_keywords,
      status,
    });

    if (!updatedPage) {
      return NextResponse.json(
        { success: false, error: 'Failed to update page' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      page: updatedPage,
      message: 'Page updated successfully',
    });
  } catch (error) {
    console.error('Error updating page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update page' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/pages/[id] - Delete page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireDeletePages()(request);
    if (permissionCheck) return permissionCheck;

    // Check if page exists
    const existingPage = await PageModel.findById(id);
    if (!existingPage) {
      return NextResponse.json(
        { success: false, error: 'Page not found' },
        { status: 404 }
      );
    }

    const deleted = await PageModel.delete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete page' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Page deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete page' },
      { status: 500 }
    );
  }
}
