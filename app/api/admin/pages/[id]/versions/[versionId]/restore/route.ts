import { NextRequest, NextResponse } from 'next/server';
import { PageModel } from '@/database/models/Page';
import { requireEditPages } from '@/middleware/permissions';
import { db } from '@/database/connection';

// POST /api/admin/pages/[id]/versions/[versionId]/restore - Restore page version
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; versionId: string }> }
) {
  try {
    const { id, versionId } = await params;

    // Check permissions
    const permissionCheck = await requireEditPages()(request);
    if (permissionCheck) return permissionCheck;

    // Check if page exists
    const page = await PageModel.findById(id);
    if (!page) {
      return NextResponse.json(
        { success: false, error: 'Page not found' },
        { status: 404 }
      );
    }

    // Get the specific version
    const versionStmt = db.prepare(`
      SELECT * FROM content_versions 
      WHERE id = ? AND content_type = 'page' AND content_id = ?
    `);
    const version = versionStmt.get(versionId, id) as any;

    if (!version) {
      return NextResponse.json(
        { success: false, error: 'Version not found' },
        { status: 404 }
      );
    }

    // Parse version content
    const versionContent = JSON.parse(version.content);

    // Restore page to this version
    const updatedPage = await PageModel.update(id, {
      title: versionContent.title,
      slug: versionContent.slug,
      content: versionContent.content,
      meta_title: versionContent.meta_title,
      meta_description: versionContent.meta_description,
      meta_keywords: versionContent.meta_keywords,
      status: versionContent.status,
    });

    if (!updatedPage) {
      return NextResponse.json(
        { success: false, error: 'Failed to restore page version' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      page: updatedPage,
      restored_version: {
        id: version.id,
        version_number: version.version_number,
        content: versionContent,
        created_at: version.created_at,
      },
      message: `Page restored to version ${version.version_number} successfully`,
    });
  } catch (error) {
    console.error('Error restoring page version:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to restore page version' },
      { status: 500 }
    );
  }
}
