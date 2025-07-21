import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database/connection';

// POST /api/admin/projects/[id]/versions/[versionId]/restore - Restore project version
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; versionId: string } }
) {
  try {
    const { id, versionId } = params;
    // Get the specific version
    const versionStmt = db.prepare(`
      SELECT * FROM content_versions 
      WHERE id = ? AND content_type = 'project' AND content_id = ?
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
    // Restore project to this version
    const updateStmt = db.prepare(`
      UPDATE projects SET
        name = ?,
        slug = ?,
        description = ?,
        content = ?,
        status = ?,
        capacity_mw = ?,
        location = ?,
        start_date = ?,
        end_date = ?,
        budget = ?,
        budget_currency = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    updateStmt.run(
      versionContent.name,
      versionContent.slug,
      versionContent.description,
      JSON.stringify(versionContent.content),
      versionContent.status,
      versionContent.capacity_mw,
      versionContent.location,
      versionContent.start_date,
      versionContent.end_date,
      versionContent.budget,
      versionContent.budget_currency,
      id
    );
    // Get updated project
    const projectStmt = db.prepare('SELECT * FROM projects WHERE id = ?');
    const updatedProject = projectStmt.get(id);
    return NextResponse.json({
      success: true,
      project: updatedProject,
      restored_version: {
        id: version.id,
        version_number: version.version_number,
        content: versionContent,
        created_at: version.created_at,
      },
      message: `Project restored to version ${version.version_number} successfully`,
    });
  } catch (error) {
    console.error('Error restoring project version:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to restore project version' },
      { status: 500 }
    );
  }
}
