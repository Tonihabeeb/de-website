import { NextRequest, NextResponse } from 'next/server';

// Sample milestones data (in real implementation, this would be in a database)
let sampleMilestones = [
  {
    id: 'milestone-001',
    project_id: 'project-001',
    name: 'Site Assessment',
    description: 'Complete site assessment and feasibility study',
    start_date: '2024-01-01',
    end_date: '2024-01-15',
    status: 'completed',
    progress: 100,
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-15T00:00:00.000Z'
  },
  {
    id: 'milestone-002',
    project_id: 'project-001',
    name: 'Engineering Design',
    description: 'Complete detailed engineering design and specifications',
    start_date: '2024-02-11',
    end_date: '2024-03-05',
    status: 'in-progress',
    progress: 75,
    created_at: '2024-02-11T00:00:00.000Z',
    updated_at: '2024-07-20T00:00:00.000Z'
  }
];

// GET /api/admin/project-progress/milestones/[id] - Get specific milestone
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const milestone = sampleMilestones.find(m => m.id === id);
    
    if (!milestone) {
      return NextResponse.json(
        { success: false, error: 'Milestone not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      milestone
    });
  } catch (error) {
    console.error('Error fetching milestone:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch milestone' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/project-progress/milestones/[id] - Update milestone
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { project_id, name, description, start_date, end_date, status, progress } = body;

    const milestoneIndex = sampleMilestones.findIndex(m => m.id === id);
    
    if (milestoneIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Milestone not found' },
        { status: 404 }
      );
    }

    // Update the milestone
    sampleMilestones[milestoneIndex] = {
      ...sampleMilestones[milestoneIndex],
      project_id: project_id || sampleMilestones[milestoneIndex].project_id,
      name: name || sampleMilestones[milestoneIndex].name,
      description: description || sampleMilestones[milestoneIndex].description,
      start_date: start_date || sampleMilestones[milestoneIndex].start_date,
      end_date: end_date || sampleMilestones[milestoneIndex].end_date,
      status: status || sampleMilestones[milestoneIndex].status,
      progress: progress !== undefined ? progress : sampleMilestones[milestoneIndex].progress,
      updated_at: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      milestone: sampleMilestones[milestoneIndex],
      message: 'Milestone updated successfully'
    });
  } catch (error) {
    console.error('Error updating milestone:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update milestone' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/project-progress/milestones/[id] - Delete milestone
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const milestoneIndex = sampleMilestones.findIndex(m => m.id === id);
    
    if (milestoneIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Milestone not found' },
        { status: 404 }
      );
    }

    const deletedMilestone = sampleMilestones[milestoneIndex];
    sampleMilestones = sampleMilestones.filter(m => m.id !== id);

    return NextResponse.json({
      success: true,
      message: 'Milestone deleted successfully',
      deletedMilestone
    });
  } catch (error) {
    console.error('Error deleting milestone:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete milestone' },
      { status: 500 }
    );
  }
} 