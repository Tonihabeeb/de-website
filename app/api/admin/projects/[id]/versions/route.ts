import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database/connection';
import { v4 as uuidv4 } from 'uuid';

// GET /api/admin/projects/[id]/versions - Get project versions
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    // Get versions from content_versions table
    const stmt = db.prepare(`
      SELECT * FROM content_versions 
      WHERE content_type = 'project' AND content_id = ? 
      ORDER BY version_number DESC
    `);
    const versions = stmt.all(id) as any[];
    // Get current project
    const projectStmt = db.prepare('SELECT * FROM projects WHERE id = ?');
    const project = projectStmt.get(id);
    return NextResponse.json({
      success: true,
      versions: versions.map(v => ({
        id: v.id,
        version_number: v.version_number,
        content: JSON.parse(v.content),
        created_by: v.created_by,
        created_at: v.created_at,
      })),
      current_version: project
        ? {
            id: (project as any).id,
            version_number: versions.length + 1,
            content: project,
            created_at: (project as any).updated_at,
          }
        : null,
    });
  } catch (error) {
    console.error('Error fetching project versions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project versions' },
      { status: 500 }
    );
  }
}

// POST /api/admin/projects/[id]/versions - Create new version
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    // Get current version number
    const versionStmt = db.prepare(`
      SELECT MAX(version_number) as max_version 
      FROM content_versions 
      WHERE content_type = 'project' AND content_id = ?
    `);
    const result = versionStmt.get(id) as any;
    const nextVersion = (result?.max_version || 0) + 1;
    // Get current project
    const projectStmt = db.prepare('SELECT * FROM projects WHERE id = ?');
    const project = projectStmt.get(id) as any;
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }
    // Insert new version
    const insertStmt = db.prepare(`
      INSERT INTO content_versions (id, content_type, content_id, version_number, content, created_by)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const versionId = uuidv4();
    insertStmt.run(
      versionId,
      'project',
      id,
      nextVersion,
      JSON.stringify(project),
      (project as any).created_by
    );
    return NextResponse.json(
      {
        success: true,
        version: {
          id: versionId,
          version_number: nextVersion,
          content: project,
          created_at: new Date().toISOString(),
        },
        message: 'Project version created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project version:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project version' },
      { status: 500 }
    );
  }
}
