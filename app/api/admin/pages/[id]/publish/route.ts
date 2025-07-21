import { NextRequest, NextResponse } from 'next/server';
import { PageModel } from '@/database/models/Page';
import { requirePublishPages } from '@/middleware/permissions';

// POST /api/admin/pages/[id]/publish - Publish page
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requirePublishPages()(request);
    if (permissionCheck) return permissionCheck;

    // Check if page exists
    const existingPage = await PageModel.findById(id);
    if (!existingPage) {
      return NextResponse.json(
        { success: false, error: 'Page not found' },
        { status: 404 }
      );
    }

    // Publish the page
    const publishedPage = await PageModel.publish(id);

    if (!publishedPage) {
      return NextResponse.json(
        { success: false, error: 'Failed to publish page' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      page: publishedPage,
      message: 'Page published successfully',
    });
  } catch (error) {
    console.error('Error publishing page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to publish page' },
      { status: 500 }
    );
  }
}
