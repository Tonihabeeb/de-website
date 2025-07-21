import { NextRequest, NextResponse } from 'next/server';
import { requireViewAnalytics } from '@/middleware/permissions';
import { db } from '@/database/connection';

interface DashboardData {
  overview: {
    total_users: number;
    total_pages: number;
    total_projects: number;
    total_media: number;
    active_users_today: number;
    total_requests_today: number;
  };
  user_analytics: {
    new_users_this_week: number;
    active_users_this_week: number;
    user_activity_trend: Array<{
      date: string;
      active_users: number;
      new_users: number;
    }>;
    top_active_users: Array<{
      user_id: string;
      user_name: string;
      activity_count: number;
    }>;
  };
  content_analytics: {
    total_page_views: number;
    average_engagement_time: number;
    top_performing_pages: Array<{
      page_url: string;
      views: number;
      engagement_rate: number;
    }>;
    content_creation_trend: Array<{
      date: string;
      pages_created: number;
      projects_created: number;
    }>;
  };
  system_analytics: {
    current_system_health: {
      cpu_usage: number;
      memory_usage: number;
      disk_usage: number;
      error_rate: number;
    };
    performance_metrics: {
      average_response_time: number;
      requests_per_minute: number;
      slowest_endpoints: Array<{
        endpoint: string;
        avg_response_time: number;
      }>;
    };
    system_usage_trend: Array<{
      timestamp: string;
      cpu_usage: number;
      memory_usage: number;
    }>;
  };
  recent_activity: Array<{
    id: string;
    type: string;
    description: string;
    user_name: string;
    timestamp: Date;
  }>;
}

// GET /api/admin/analytics/dashboard - Get comprehensive dashboard data
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireViewAnalytics()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d'; // 7d, 30d, 90d

    // Get dashboard data
    const dashboardData: DashboardData = {
      overview: await getOverviewMetrics(),
      user_analytics: await getUserAnalytics(period),
      content_analytics: await getContentAnalytics(period),
      system_analytics: await getSystemAnalytics(period),
      recent_activity: await getRecentActivity(),
    };

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      period,
      data: dashboardData,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}

// Helper functions for dashboard data
async function getOverviewMetrics() {
  try {
    // Get total counts
    const usersStmt = db.prepare('SELECT COUNT(*) as count FROM users');
    const pagesStmt = db.prepare('SELECT COUNT(*) as count FROM pages');
    const projectsStmt = db.prepare('SELECT COUNT(*) as count FROM projects');
    const mediaStmt = db.prepare('SELECT COUNT(*) as count FROM media');

    const users = usersStmt.get() as any;
    const pages = pagesStmt.get() as any;
    const projects = projectsStmt.get() as any;
    const media = mediaStmt.get() as any;

    // Get active users today
    const activeUsersStmt = db.prepare(`
      SELECT COUNT(DISTINCT user_id) as count 
      FROM analytics_events 
      WHERE created_at >= date('now')
        AND user_id IS NOT NULL
    `);
    const activeUsers = activeUsersStmt.get() as any;

    // Get total requests today
    const requestsStmt = db.prepare(`
      SELECT COUNT(*) as count 
      FROM analytics_events 
      WHERE created_at >= date('now')
    `);
    const requests = requestsStmt.get() as any;

    return {
      total_users: users.count || 0,
      total_pages: pages.count || 0,
      total_projects: projects.count || 0,
      total_media: media.count || 0,
      active_users_today: activeUsers.count || 0,
      total_requests_today: requests.count || 0,
    };
  } catch (error) {
    console.error('Error getting overview metrics:', error);
    return {
      total_users: 0,
      total_pages: 0,
      total_projects: 0,
      total_media: 0,
      active_users_today: 0,
      total_requests_today: 0,
    };
  }
}

async function getUserAnalytics(period: string) {
  try {
    const days = period === '30d' ? 30 : period === '90d' ? 90 : 7;

    // Get new users this week
    const newUsersStmt = db.prepare(`
      SELECT COUNT(*) as count 
      FROM users 
      WHERE created_at >= datetime('now', '-${days} days')
    `);
    const newUsers = newUsersStmt.get() as any;

    // Get active users this week
    const activeUsersStmt = db.prepare(`
      SELECT COUNT(DISTINCT user_id) as count 
      FROM analytics_events 
      WHERE created_at >= datetime('now', '-${days} days')
        AND user_id IS NOT NULL
    `);
    const activeUsers = activeUsersStmt.get() as any;

    // Get user activity trend
    const trendStmt = db.prepare(`
      SELECT 
        date(created_at) as date,
        COUNT(DISTINCT user_id) as active_users,
        COUNT(CASE WHEN user_id IS NOT NULL THEN 1 END) as new_users
      FROM analytics_events 
      WHERE created_at >= datetime('now', '-${days} days')
      GROUP BY date(created_at)
      ORDER BY date
    `);
    const trend = trendStmt.all() as any[];

    // Get top active users
    const topUsersStmt = db.prepare(`
      SELECT 
        ae.user_id,
        u.name as user_name,
        COUNT(*) as activity_count
      FROM analytics_events ae
      LEFT JOIN users u ON ae.user_id = u.id
      WHERE ae.created_at >= datetime('now', '-${days} days')
        AND ae.user_id IS NOT NULL
      GROUP BY ae.user_id
      ORDER BY activity_count DESC
      LIMIT 10
    `);
    const topUsers = topUsersStmt.all() as any[];

    return {
      new_users_this_week: newUsers.count || 0,
      active_users_this_week: activeUsers.count || 0,
      user_activity_trend: trend.map(item => ({
        date: item.date,
        active_users: item.active_users || 0,
        new_users: item.new_users || 0,
      })),
      top_active_users: topUsers.map(user => ({
        user_id: user.user_id,
        user_name: user.user_name || 'Unknown User',
        activity_count: user.activity_count,
      })),
    };
  } catch (error) {
    console.error('Error getting user analytics:', error);
    return {
      new_users_this_week: 0,
      active_users_this_week: 0,
      user_activity_trend: [],
      top_active_users: [],
    };
  }
}

async function getContentAnalytics(period: string) {
  try {
    const days = period === '30d' ? 30 : period === '90d' ? 90 : 7;

    // Get total page views
    const pageViewsStmt = db.prepare(`
      SELECT COUNT(*) as count 
      FROM analytics_events 
      WHERE event_type = 'page_view'
        AND created_at >= datetime('now', '-${days} days')
    `);
    const pageViews = pageViewsStmt.get() as any;

    // Get top performing pages
    const topPagesStmt = db.prepare(`
      SELECT 
        page_url,
        COUNT(*) as views,
        ROUND(AVG(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) * 100, 2) as engagement_rate
      FROM analytics_events 
      WHERE created_at >= datetime('now', '-${days} days')
        AND page_url IS NOT NULL
      GROUP BY page_url
      ORDER BY views DESC
      LIMIT 10
    `);
    const topPages = topPagesStmt.all() as any[];

    // Get content creation trend
    const creationTrendStmt = db.prepare(`
      SELECT 
        date(created_at) as date,
        COUNT(CASE WHEN content_type = 'page' THEN 1 END) as pages_created,
        COUNT(CASE WHEN content_type = 'project' THEN 1 END) as projects_created
      FROM content_contributions 
      WHERE created_at >= datetime('now', '-${days} days')
      GROUP BY date(created_at)
      ORDER BY date
    `);
    const creationTrend = creationTrendStmt.all() as any[];

    return {
      total_page_views: pageViews.count || 0,
      average_engagement_time: 0, // Would need additional tracking
      top_performing_pages: topPages.map(page => ({
        page_url: page.page_url,
        views: page.views,
        engagement_rate: page.engagement_rate,
      })),
      content_creation_trend: creationTrend.map(item => ({
        date: item.date,
        pages_created: item.pages_created || 0,
        projects_created: item.projects_created || 0,
      })),
    };
  } catch (error) {
    console.error('Error getting content analytics:', error);
    return {
      total_page_views: 0,
      average_engagement_time: 0,
      top_performing_pages: [],
      content_creation_trend: [],
    };
  }
}

async function getSystemAnalytics(period: string) {
  try {
    const days = period === '30d' ? 30 : period === '90d' ? 90 : 7;

    // Get current system health
    const healthStmt = db.prepare(`
      SELECT 
        cpu_usage,
        memory_usage,
        disk_usage,
        error_rate
      FROM system_usage_metrics 
      ORDER BY timestamp DESC 
      LIMIT 1
    `);
    const health = healthStmt.get() as any;

    // Get performance metrics
    const perfStmt = db.prepare(`
      SELECT 
        AVG(response_time) as avg_response_time,
        COUNT(*) as total_requests
      FROM performance_metrics 
      WHERE timestamp >= datetime('now', '-1 hour')
    `);
    const perf = perfStmt.get() as any;

    // Get slowest endpoints
    const slowEndpointsStmt = db.prepare(`
      SELECT 
        endpoint,
        AVG(response_time) as avg_response_time
      FROM performance_metrics 
      WHERE timestamp >= datetime('now', '-${days} days')
      GROUP BY endpoint
      ORDER BY avg_response_time DESC
      LIMIT 5
    `);
    const slowEndpoints = slowEndpointsStmt.all() as any[];

    // Get system usage trend
    const usageTrendStmt = db.prepare(`
      SELECT 
        timestamp,
        cpu_usage,
        memory_usage
      FROM system_usage_metrics 
      WHERE timestamp >= datetime('now', '-${days} days')
      ORDER BY timestamp DESC
      LIMIT 24
    `);
    const usageTrend = usageTrendStmt.all() as any[];

    return {
      current_system_health: {
        cpu_usage: health?.cpu_usage || 0,
        memory_usage: health?.memory_usage || 0,
        disk_usage: health?.disk_usage || 0,
        error_rate: health?.error_rate || 0,
      },
      performance_metrics: {
        average_response_time:
          Math.round((perf?.avg_response_time || 0) * 100) / 100,
        requests_per_minute:
          Math.round(((perf?.total_requests || 0) / 60) * 100) / 100,
        slowest_endpoints: slowEndpoints.map(endpoint => ({
          endpoint: endpoint.endpoint,
          avg_response_time: Math.round(endpoint.avg_response_time * 100) / 100,
        })),
      },
      system_usage_trend: usageTrend.map(item => ({
        timestamp: item.timestamp,
        cpu_usage: item.cpu_usage,
        memory_usage: item.memory_usage,
      })),
    };
  } catch (error) {
    console.error('Error getting system analytics:', error);
    return {
      current_system_health: {
        cpu_usage: 0,
        memory_usage: 0,
        disk_usage: 0,
        error_rate: 0,
      },
      performance_metrics: {
        average_response_time: 0,
        requests_per_minute: 0,
        slowest_endpoints: [],
      },
      system_usage_trend: [],
    };
  }
}

async function getRecentActivity() {
  try {
    const stmt = db.prepare(`
      SELECT 
        cc.id,
        cc.content_type as type,
        cc.title as description,
        u.name as user_name,
        cc.created_at as timestamp
      FROM content_contributions cc
      LEFT JOIN users u ON cc.user_id = u.id
      ORDER BY cc.created_at DESC
      LIMIT 20
    `);
    const activities = stmt.all() as any[];

    return activities.map(activity => ({
      id: activity.id,
      type: activity.type,
      description: activity.description || `${activity.type} activity`,
      user_name: activity.user_name || 'Unknown User',
      timestamp: new Date(activity.timestamp),
    }));
  } catch (error) {
    console.error('Error getting recent activity:', error);
    return [];
  }
}
