import { NextRequest, NextResponse } from 'next/server';
import { ProjectModel } from '@/database/models/Project';
import {
  requireAuthor,
  requireEditProjects,
  requireDeleteProjects,
} from '@/middleware/permissions';

// GET /api/admin/projects/[id] - Get project by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireAuthor()(request);
    if (permissionCheck) return permissionCheck;

    const project = await ProjectModel.findById(id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/projects/[id] - Update project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireEditProjects()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const {
      name,
      slug,
      description,
      content,
      status,
      capacity_mw,
      location,
      start_date,
      end_date,
      budget,
    } = body;

    // Check if project exists
    const existingProject = await ProjectModel.findById(id);
    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    // Check if slug is being changed and if it already exists
    if (slug && slug !== existingProject.slug) {
      const slugExists = await ProjectModel.findBySlug(slug);
      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'Project with this slug already exists' },
          { status: 409 }
        );
      }
    }

    const updatedProject = await ProjectModel.update(id, {
      name,
      slug,
      description,
      content,
      status,
      capacity_mw: capacity_mw ? parseFloat(capacity_mw) : undefined,
      location,
      start_date: start_date ? new Date(start_date) : undefined,
      end_date: end_date ? new Date(end_date) : undefined,
      budget: budget ? parseFloat(budget) : undefined,
    });

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, error: 'Failed to update project' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      project: updatedProject,
      message: 'Project updated successfully',
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/projects/[id] - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireDeleteProjects()(request);
    if (permissionCheck) return permissionCheck;

    // Check if project exists
    const existingProject = await ProjectModel.findById(id);
    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    const deleted = await ProjectModel.delete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete project' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
