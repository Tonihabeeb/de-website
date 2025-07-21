import { NextRequest, NextResponse } from 'next/server';
import { ProjectModel } from '@/database/models/Project';

// GET /api/admin/projects - Get all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const location = searchParams.get('location');
    const created_by = searchParams.get('created_by');
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : undefined;
    const offset = searchParams.get('offset')
      ? parseInt(searchParams.get('offset')!)
      : undefined;

    const projects = await ProjectModel.findAll({
      status: status || undefined,
      location: location || undefined,
      created_by: created_by || undefined,
      limit,
      offset,
    });

    return NextResponse.json({
      success: true,
      projects,
      total: projects.length,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
