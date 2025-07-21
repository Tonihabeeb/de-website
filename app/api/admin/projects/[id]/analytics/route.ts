import { NextRequest, NextResponse } from 'next/server';
import { ProjectModel } from '@/database/models/Project';
import { requireViewProjects } from '@/middleware/permissions';
import { db } from '@/database/connection';

// GET /api/admin/projects/[id]/analytics - Get project analytics
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireViewProjects()(request);
    if (permissionCheck) return permissionCheck;

    const project = await ProjectModel.findById(id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30d'; // 7d, 30d, 90d, 1y

    // Calculate date range
    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Get project timeline data
    const timelineStmt = db.prepare(`
      SELECT * FROM project_timeline 
      WHERE project_id = ? AND created_at >= ?
      ORDER BY created_at ASC
    `);
    const timelineEvents = timelineStmt.all(
      id,
      startDate.toISOString()
    ) as any[];

    // Get project media count
    const mediaStmt = db.prepare(
      'SELECT COUNT(*) as count FROM media WHERE project_id = ?'
    );
    const mediaCount = mediaStmt.get(id) as any;

    // Get project updates count
    const updatesStmt = db.prepare(`
      SELECT COUNT(*) as count FROM project_updates 
      WHERE project_id = ? AND created_at >= ?
    `);
    const updatesCount = updatesStmt.get(id, startDate.toISOString()) as any;

    // Calculate progress metrics
    const totalMilestones = timelineEvents.filter(
      e => e.type === 'milestone'
    ).length;
    const completedMilestones = timelineEvents.filter(
      e => e.type === 'milestone' && e.status === 'completed'
    ).length;
    const progressPercentage =
      totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

    // Get status distribution
    const statusStmt = db.prepare(
      'SELECT status, COUNT(*) as count FROM projects GROUP BY status'
    );
    const statusDistribution = statusStmt.all() as any[];

    // Calculate project duration
    const projectStart = new Date(project.created_at);
    const projectDuration = Math.ceil(
      (now.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24)
    );

    const analytics = {
      project_id: id,
      period,
      overview: {
        total_milestones: totalMilestones,
        completed_milestones: completedMilestones,
        progress_percentage: Math.round(progressPercentage * 100) / 100,
        media_count: mediaCount.count,
        updates_count: updatesCount.count,
        project_duration_days: projectDuration,
        current_status: project.status,
      },
      timeline: {
        total_events: timelineEvents.length,
        events_by_type: timelineEvents.reduce(
          (acc, event) => {
            acc[event.type] = (acc[event.type] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        ),
        recent_events: timelineEvents.slice(-10).map(event => ({
          id: event.id,
          type: event.type,
          title: event.title,
          description: event.description,
          status: event.status,
          created_at: event.created_at,
        })),
      },
      status_distribution: statusDistribution.reduce(
        (acc, item) => {
          acc[item.status] = item.count;
          return acc;
        },
        {} as Record<string, number>
      ),
      performance: {
        on_schedule:
          project.status === 'in-progress' || project.status === 'completed',
        budget_status: project.budget_status || 'unknown',
        risk_level: project.risk_level || 'low',
      },
    };

    return NextResponse.json({
      success: true,
      analytics,
    });
  } catch (error) {
    console.error('Error fetching project analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project analytics' },
      { status: 500 }
    );
  }
}
