import { NextRequest, NextResponse } from 'next/server';
import { requireViewAnalytics } from '@/middleware/permissions';
import { db } from '@/database/connection';

interface ProjectAnalytics {
  project_id: string;
  name: string;
  status: string;
  completion_rate: number;
  total_milestones: number;
  completed_milestones: number;
  team_size: number;
  budget_used: number;
  budget_total: number;
  timeline_progress: number;
  performance_metrics: {
    efficiency_score: number;
    quality_score: number;
    risk_score: number;
  };
  recent_activities: Array<{
    id: string;
    type: string;
    description: string;
    user: string;
    timestamp: string;
  }>;
  timeline_data: Array<{
    date: string;
    progress: number;
    milestones_completed: number;
  }>;
}

// GET /api/admin/analytics/projects - Get project analytics
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireViewAnalytics()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('project_id');
    const timeRange = searchParams.get('time_range') || '30d';

    // Get projects with analytics data
    const projects = await getProjectAnalytics(projectId, timeRange);

    return NextResponse.json({
      success: true,
      projects,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching project analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project analytics' },
      { status: 500 }
    );
  }
}

// Helper function to get project analytics
async function getProjectAnalytics(
  projectId?: string | null,
  timeRange: string = '30d'
): Promise<ProjectAnalytics[]> {
  try {
    // Build date filter
    const days =
      timeRange === '7d'
        ? 7
        : timeRange === '90d'
          ? 90
          : timeRange === '1y'
            ? 365
            : 30;

    // Build project filter
    let projectFilter = '';
    let params: any[] = [];

    if (projectId && projectId !== 'all') {
      projectFilter = 'WHERE p.id = ?';
      params.push(projectId);
    }

    // Get projects with basic info
    const projectsQuery = `
      SELECT 
        p.id as project_id,
        p.name,
        p.status,
        p.budget,
        p.start_date,
        p.end_date,
        COALESCE(p.team_size, 0) as team_size
      FROM projects p
      ${projectFilter}
      ORDER BY p.created_at DESC
    `;

    const projectsStmt = db.prepare(projectsQuery);
    const projects = projectsStmt.all(...params) as any[];

    // Get analytics for each project
    const projectAnalytics: ProjectAnalytics[] = [];

    for (const project of projects) {
      // Calculate completion rate based on milestones
      const milestonesStmt = db.prepare(`
        SELECT 
          COUNT(*) as total_milestones,
          COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_milestones
        FROM project_milestones 
        WHERE project_id = ?
      `);
      const milestones = milestonesStmt.get(project.project_id) as any;

      // Get recent activities
      const activitiesStmt = db.prepare(`
        SELECT 
          cc.id,
          cc.action as type,
          cc.title as description,
          u.name as user,
          cc.created_at as timestamp
        FROM content_contributions cc
        LEFT JOIN users u ON cc.user_id = u.id
        WHERE cc.content_type = 'project' 
          AND cc.content_id = ?
          AND cc.created_at >= datetime('now', '-${days} days')
        ORDER BY cc.created_at DESC
        LIMIT 10
      `);
      const activities = activitiesStmt.all(project.project_id) as any[];

      // Get timeline data
      const timelineStmt = db.prepare(`
        SELECT 
          date(created_at) as date,
          COUNT(*) as milestones_completed
        FROM content_contributions
        WHERE content_type = 'project' 
          AND content_id = ?
          AND action = 'milestone_completed'
          AND created_at >= datetime('now', '-${days} days')
        GROUP BY date(created_at)
        ORDER BY date
      `);
      const timeline = timelineStmt.all(project.project_id) as any[];

      // Calculate performance metrics
      const performanceMetrics = calculatePerformanceMetrics(
        project,
        milestones
      );

      // Calculate budget usage
      const budgetUsed = project.budget ? Math.round(project.budget * 0.75) : 0; // Mock data
      const budgetTotal = project.budget || 100000;

      // Calculate timeline progress
      const timelineProgress = calculateTimelineProgress(
        project.start_date,
        project.end_date
      );

      projectAnalytics.push({
        project_id: project.project_id,
        name: project.name,
        status: project.status,
        completion_rate:
          milestones.total_milestones > 0
            ? Math.round(
                (milestones.completed_milestones /
                  milestones.total_milestones) *
                  100
              )
            : 0,
        total_milestones: milestones.total_milestones || 0,
        completed_milestones: milestones.completed_milestones || 0,
        team_size: project.team_size || 0,
        budget_used: budgetUsed,
        budget_total: budgetTotal,
        timeline_progress: timelineProgress,
        performance_metrics: performanceMetrics,
        recent_activities: activities.map(activity => ({
          id: activity.id,
          type: activity.type,
          description: activity.description || `${activity.type} activity`,
          user: activity.user || 'Unknown User',
          timestamp: activity.timestamp,
        })),
        timeline_data: timeline.map(item => ({
          date: item.date,
          progress: Math.round(
            (item.milestones_completed /
              Math.max(milestones.total_milestones, 1)) *
              100
          ),
          milestones_completed: item.milestones_completed,
        })),
      });
    }

    return projectAnalytics;
  } catch (error) {
    console.error('Error getting project analytics:', error);
    return [];
  }
}

// Helper function to calculate performance metrics
function calculatePerformanceMetrics(project: any, milestones: any) {
  const completionRate =
    milestones.total_milestones > 0
      ? (milestones.completed_milestones / milestones.total_milestones) * 100
      : 0;

  // Mock performance calculations based on project data
  const efficiencyScore = Math.min(
    100,
    Math.max(0, completionRate + (Math.random() * 20 - 10))
  );

  const qualityScore = Math.min(
    100,
    Math.max(0, 85 + (Math.random() * 15 - 7.5))
  );

  const riskScore = Math.min(100, Math.max(0, 20 + (Math.random() * 30 - 15)));

  return {
    efficiency_score: Math.round(efficiencyScore),
    quality_score: Math.round(qualityScore),
    risk_score: Math.round(riskScore),
  };
}

// Helper function to calculate timeline progress
function calculateTimelineProgress(
  startDate: string | null,
  endDate: string | null
): number {
  if (!startDate || !endDate) return 0;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  if (now < start) return 0;
  if (now > end) return 100;

  const totalDuration = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();

  return Math.round((elapsed / totalDuration) * 100);
}
