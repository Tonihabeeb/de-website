import { NextRequest, NextResponse } from 'next/server';
import { PageModel } from '@/database/models/Page';
import { requireEditPages } from '@/middleware/permissions';
import { db } from '@/database/connection';
import { v4 as uuidv4 } from 'uuid';

// GET /api/admin/pages/[id]/versions - Get page versions
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
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

    // Get versions from content_versions table
    const stmt = db.prepare(`
      SELECT * FROM content_versions 
      WHERE content_type = 'page' AND content_id = ? 
      ORDER BY version_number DESC
    `);
    const versions = stmt.all(id) as any[];

    return NextResponse.json({
      success: true,
      versions: versions.map(v => ({
        id: v.id,
        version_number: v.version_number,
        content: JSON.parse(v.content),
        created_by: v.created_by,
        created_at: v.created_at
      })),
      current_version: {
        id: page.id,
        version_number: versions.length + 1,
        content: {
          title: page.title,
          slug: page.slug,
          content: page.content,
          meta_title: page.meta_title,
          meta_description: page.meta_description,
          meta_keywords: page.meta_keywords,
          status: page.status
        },
        created_at: page.updated_at
      }
    });
  } catch (error) {
    console.error('Error fetching page versions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch page versions' },
      { status: 500 }
    );
  }
}

// POST /api/admin/pages/[id]/versions - Create new version
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
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

    // Get current version number
    const versionStmt = db.prepare(`
      SELECT MAX(version_number) as max_version 
      FROM content_versions 
      WHERE content_type = 'page' AND content_id = ?
    `);
    const result = versionStmt.get(id) as any;
    const nextVersion = (result?.max_version || 0) + 1;

    // Create version content
    const versionContent = {
      title: page.title,
      slug: page.slug,
      content: page.content,
      meta_title: page.meta_title,
      meta_description: page.meta_description,
      meta_keywords: page.meta_keywords,
      status: page.status
    };

    // Insert new version
    const insertStmt = db.prepare(`
      INSERT INTO content_versions (id, content_type, content_id, version_number, content, created_by)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const versionId = uuidv4();
    insertStmt.run(
      versionId,
      'page',
      id,
      nextVersion,
      JSON.stringify(versionContent),
      page.created_by
    );

    return NextResponse.json({
      success: true,
      version: {
        id: versionId,
        version_number: nextVersion,
        content: versionContent,
        created_at: new Date().toISOString()
      },
      message: 'Page version created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating page version:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create page version' },
      { status: 500 }
    );
  }
} 