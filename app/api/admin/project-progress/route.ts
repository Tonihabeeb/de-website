import { NextRequest, NextResponse } from 'next/server';

// GET /api/admin/project-progress - Get all project progress data
export async function GET(request: NextRequest) {
  try {
    const sampleData = {
      milestones: [
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
          updated_at: '2024-01-15T00:00:00.000Z',
        },
        {
          id: 'milestone-002',
          project_id: 'project-001',
          name: 'Engineering Design',
          description:
            'Complete detailed engineering design and specifications',
          start_date: '2024-02-11',
          end_date: '2024-03-05',
          status: 'in-progress',
          progress: 75,
          created_at: '2024-02-11T00:00:00.000Z',
          updated_at: '2024-07-20T00:00:00.000Z',
        },
      ],
      activity: [
        {
          id: 'activity-001',
          project_id: 'project-001',
          type: 'milestone_completed',
          title: 'Site Assessment Completed',
          description:
            'Site assessment and feasibility study completed successfully',
          timestamp: '2024-01-15T10:30:00.000Z',
          user: 'John Smith',
        },
      ],
      metrics: {
        revenue: [
          { month: 'Jan', revenue: 120000, cost: 80000 },
          { month: 'Feb', revenue: 135000, cost: 90000 },
        ],
        cashFlow: [
          { month: 'Jan', cashFlow: 40000 },
          { month: 'Feb', cashFlow: 45000 },
        ],
      },
    };

    return NextResponse.json({
      success: true,
      milestones: sampleData.milestones,
      activity: sampleData.activity,
      metrics: sampleData.metrics,
      total: {
        milestones: sampleData.milestones.length,
        activity: sampleData.activity.length,
      },
    });
  } catch (error) {
    console.error('Error fetching project progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project progress' },
      { status: 500 }
    );
  }
}
