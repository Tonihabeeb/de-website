import { NextRequest, NextResponse } from 'next/server';
import { ProjectModel } from '@/database/models/Project';
import { requireEditProjects } from '@/middleware/permissions';

// PATCH /api/admin/projects/[id]/status - Update project status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireEditProjects()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const { status } = body;

    // Validate status
    const validStatuses = ['planning', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Invalid status. Must be one of: planning, in-progress, completed, cancelled',
        },
        { status: 400 }
      );
    }

    // Check if project exists
    const existingProject = await ProjectModel.findById(id);
    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    // Update project status
    const updatedProject = await ProjectModel.updateStatus(id, status);

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, error: 'Failed to update project status' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      project: updatedProject,
      message: 'Project status updated successfully',
    });
  } catch (error) {
    console.error('Error updating project status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update project status' },
      { status: 500 }
    );
  }
}
