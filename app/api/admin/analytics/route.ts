import { NextRequest, NextResponse } from 'next/server';
import { requireViewAnalytics } from '@/middleware/permissions';
import { db } from '@/database/connection';
import { PageModel } from '@/database/models/Page';
import { ProjectModel } from '@/database/models/Project';
import { UserModel } from '@/database/models/User';

// GET /api/admin/analytics - Get system analytics
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireViewAnalytics()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '30d'; // 7d, 30d, 90d

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (range) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Get overview statistics
    const pagesStmt = db.prepare('SELECT COUNT(*) as count FROM pages');
    const totalPages = pagesStmt.get() as any;

    const publishedPagesStmt = db.prepare('SELECT COUNT(*) as count FROM pages WHERE status = ?');
    const publishedPages = publishedPagesStmt.get('published') as any;

    const draftPagesStmt = db.prepare('SELECT COUNT(*) as count FROM pages WHERE status = ?');
    const draftPages = draftPagesStmt.get('draft') as any;

    const projectsStmt = db.prepare('SELECT COUNT(*) as count FROM projects');
    const totalProjects = projectsStmt.get() as any;

    const activeProjectsStmt = db.prepare('SELECT COUNT(*) as count FROM projects WHERE status = ?');
    const activeProjects = activeProjectsStmt.get('in-progress') as any;

    const usersStmt = db.prepare('SELECT COUNT(*) as count FROM users');
    const totalUsers = usersStmt.get() as any;

    const activeUsersStmt = db.prepare('SELECT COUNT(*) as count FROM users WHERE is_active = ?');
    const activeUsers = activeUsersStmt.get(1) as any;

    // Get user analytics
    const newUsersStmt = db.prepare(`
      SELECT COUNT(*) as count FROM users 
      WHERE created_at >= ?
    `);
    const newUsersThisMonth = newUsersStmt.get(startDate.toISOString()) as any;

    // Get content analytics
    const recentPagesStmt = db.prepare(`
      SELECT id, title, created_at FROM pages 
      ORDER BY created_at DESC LIMIT 10
    `);
    const recentPages = recentPagesStmt.all() as any[];

    const recentProjectsStmt = db.prepare(`
      SELECT id, name, created_at FROM projects 
      ORDER BY created_at DESC LIMIT 10
    `);
    const recentProjects = recentProjectsStmt.all() as any[];

    // Get system health (mock data for now)
    const systemHealth = {
      database_status: 'healthy' as const,
      storage_status: 'healthy' as const,
      performance_status: 'healthy' as const,
    };

    const performanceMetrics = {
      average_response_time: 150,
      memory_usage: 45,
      cpu_usage: 25,
      error_rate: 0.1,
    };

    // Get recent activity (mock data for now)
    const recentActivity = [
      {
        id: '1',
        type: 'page_created',
        description: 'New page "About Us" created',
        timestamp: new Date().toISOString(),
        user: 'admin@example.com'
      },
      {
        id: '2',
        type: 'project_updated',
        description: 'Project "KPP Technology" updated',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        user: 'editor@example.com'
      }
    ];

    const analytics = {
      overview: {
        total_users: totalUsers.count,
        total_pages: totalPages.count,
        total_projects: totalProjects.count,
        total_media: 0, // TODO: Implement media table
        total_views: 0, // TODO: Implement view tracking
        total_downloads: 0, // TODO: Implement download tracking
      },
      
      user_analytics: {
        new_users_this_month: newUsersThisMonth.count,
        active_users_this_week: Math.floor(activeUsers.count * 0.7), // Estimate
        user_growth_rate: 12.5, // Mock data
        top_users: [
          {
            user_id: '1',
            username: 'admin@example.com',
            activity_count: 45,
            last_activity: new Date().toISOString(),
          }
        ],
        user_activity_timeline: [
          {
            date: new Date().toISOString().split('T')[0],
            active_users: activeUsers.count,
            new_users: newUsersThisMonth.count,
          }
        ],
      },
      
      content_analytics: {
        most_viewed_pages: recentPages.map(page => ({
          page_id: page.id,
          title: page.title,
          views: Math.floor(Math.random() * 1000), // Mock data
          unique_views: Math.floor(Math.random() * 800), // Mock data
        })),
        most_viewed_projects: recentProjects.map(project => ({
          project_id: project.id,
          name: project.name,
          views: Math.floor(Math.random() * 500), // Mock data
          unique_views: Math.floor(Math.random() * 400), // Mock data
        })),
        content_creation_timeline: [
          {
            date: new Date().toISOString().split('T')[0],
            pages_created: 2,
            projects_created: 1,
            media_uploaded: 0,
          }
        ],
      },
      
      media_analytics: {
        total_uploads: 0, // TODO: Implement media tracking
        storage_used: 0, // TODO: Implement storage tracking
        most_downloaded: [], // TODO: Implement download tracking
        media_usage_by_type: [], // TODO: Implement media type tracking
      },
      
      system_analytics: {
        system_health: systemHealth,
        performance_metrics: performanceMetrics,
        recent_activity: recentActivity,
      },
    };

    return NextResponse.json({
      success: true,
      analytics
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
} 