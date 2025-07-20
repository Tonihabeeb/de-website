import { NextRequest, NextResponse } from 'next/server';
import { ProjectModel } from '@/database/models/Project';
import { requireEditProjects } from '@/middleware/permissions';

// GET /api/admin/projects/[id]/timeline - Get project timeline
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check permissions
    const permissionCheck = await requireEditProjects()(request);
    if (permissionCheck) return permissionCheck;

    const project = await ProjectModel.findById(id);
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    // Extract timeline data from project content
    const timeline = project.content?.timeline || [];
    const milestones = project.content?.milestones || [];

    return NextResponse.json({
      success: true,
      timeline,
      milestones,
      project: {
        id: project.id,
        name: project.name,
        start_date: project.start_date,
        end_date: project.end_date,
        status: project.status
      }
    });
  } catch (error) {
    console.error('Error fetching project timeline:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project timeline' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/projects/[id]/timeline - Update project timeline
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
    const { timeline, milestones, start_date, end_date } = body;

    // Check if project exists
    const existingProject = await ProjectModel.findById(id);
    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    // Update project with timeline data
    const updatedContent = {
      ...existingProject.content,
      timeline: timeline || [],
      milestones: milestones || []
    };

    const updatedProject = await ProjectModel.update(id, {
      content: updatedContent,
      start_date: start_date ? new Date(start_date) : existingProject.start_date,
      end_date: end_date ? new Date(end_date) : existingProject.end_date
    });

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, error: 'Failed to update project timeline' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      project: updatedProject,
      timeline: updatedContent.timeline,
      milestones: updatedContent.milestones,
      message: 'Project timeline updated successfully',
    });
  } catch (error) {
    console.error('Error updating project timeline:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update project timeline' },
      { status: 500 }
    );
  }
}

// POST /api/admin/projects/[id]/timeline/milestones - Add milestone
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check permissions
    const permissionCheck = await requireEditProjects()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const { title, description, due_date, status = 'pending', assignee } = body;

    // Validate required fields
    if (!title || !due_date) {
      return NextResponse.json(
        { success: false, error: 'Milestone title and due date are required' },
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

    // Create new milestone
    const newMilestone = {
      id: Date.now().toString(), // Simple ID generation
      title,
      description,
      due_date: new Date(due_date),
      status,
      assignee,
      created_at: new Date(),
      updated_at: new Date()
    };

    // Update project with new milestone
    const existingMilestones = existingProject.content?.milestones || [];
    const updatedContent = {
      ...existingProject.content,
      milestones: [...existingMilestones, newMilestone]
    };

    const updatedProject = await ProjectModel.update(id, {
      content: updatedContent
    });

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, error: 'Failed to add milestone' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      milestone: newMilestone,
      project: updatedProject,
      message: 'Milestone added successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding milestone:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add milestone' },
      { status: 500 }
    );
  }
} 