import { NextRequest, NextResponse } from 'next/server';
import { requireViewAnalytics } from '@/middleware/permissions';
import { db } from '@/database/connection';

interface RealTimeMetrics {
  active_users: number;
  current_requests_per_minute: number;
  average_response_time: number;
  error_rate: number;
  system_health: {
    cpu_usage: number;
    memory_usage: number;
    disk_usage: number;
  };
  recent_events: Array<{
    id: string;
    type: string;
    message: string;
    timestamp: Date;
  }>;
  top_pages: Array<{
    page_url: string;
    views: number;
  }>;
  top_users: Array<{
    user_id: string;
    user_name: string;
    activity_count: number;
  }>;
}

// GET /api/admin/analytics/realtime - Get real-time analytics data
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireViewAnalytics()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const includeEvents = searchParams.get('include_events') === 'true';
    const includeSystem = searchParams.get('include_system') === 'true';

    // Get real-time metrics
    const metrics: RealTimeMetrics = {
      active_users: await getActiveUsers(),
      current_requests_per_minute: await getCurrentRequestsPerMinute(),
      average_response_time: await getAverageResponseTime(),
      error_rate: await getErrorRate(),
      system_health: await getSystemHealth(),
      recent_events: includeEvents ? await getRecentEvents() : [],
      top_pages: await getTopPages(),
      top_users: await getTopUsers(),
    };

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      metrics,
    });
  } catch (error) {
    console.error('Error fetching real-time analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch real-time analytics' },
      { status: 500 }
    );
  }
}

// Helper functions for real-time metrics
async function getActiveUsers(): Promise<number> {
  try {
    const stmt = db.prepare(`
      SELECT COUNT(DISTINCT user_id) as count 
      FROM analytics_events 
      WHERE created_at >= datetime('now', '-15 minutes')
        AND user_id IS NOT NULL
    `);
    const result = stmt.get() as any;
    return result.count || 0;
  } catch (error) {
    console.error('Error getting active users:', error);
    return 0;
  }
}

async function getCurrentRequestsPerMinute(): Promise<number> {
  try {
    const stmt = db.prepare(`
      SELECT COUNT(*) as count 
      FROM analytics_events 
      WHERE created_at >= datetime('now', '-1 minute')
    `);
    const result = stmt.get() as any;
    return result.count || 0;
  } catch (error) {
    console.error('Error getting current requests per minute:', error);
    return 0;
  }
}

async function getAverageResponseTime(): Promise<number> {
  try {
    const stmt = db.prepare(`
      SELECT AVG(response_time) as avg_time 
      FROM performance_metrics 
      WHERE timestamp >= datetime('now', '-5 minutes')
    `);
    const result = stmt.get() as any;
    return Math.round((result.avg_time || 0) * 100) / 100;
  } catch (error) {
    console.error('Error getting average response time:', error);
    return 0;
  }
}

async function getErrorRate(): Promise<number> {
  try {
    const totalStmt = db.prepare(`
      SELECT COUNT(*) as count 
      FROM performance_metrics 
      WHERE timestamp >= datetime('now', '-5 minutes')
    `);
    const totalResult = totalStmt.get() as any;
    const total = totalResult.count || 0;

    if (total === 0) return 0;

    const errorStmt = db.prepare(`
      SELECT COUNT(*) as count 
      FROM performance_metrics 
      WHERE timestamp >= datetime('now', '-5 minutes')
        AND status_code >= 400
    `);
    const errorResult = errorStmt.get() as any;
    const errors = errorResult.count || 0;

    return Math.round((errors / total) * 10000) / 100; // Return as percentage
  } catch (error) {
    console.error('Error getting error rate:', error);
    return 0;
  }
}

async function getSystemHealth(): Promise<{
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
}> {
  try {
    const stmt = db.prepare(`
      SELECT 
        cpu_usage,
        memory_usage,
        disk_usage
      FROM system_usage_metrics 
      ORDER BY timestamp DESC 
      LIMIT 1
    `);
    const result = stmt.get() as any;

    return {
      cpu_usage: result?.cpu_usage || 0,
      memory_usage: result?.memory_usage || 0,
      disk_usage: result?.disk_usage || 0,
    };
  } catch (error) {
    console.error('Error getting system health:', error);
    return {
      cpu_usage: 0,
      memory_usage: 0,
      disk_usage: 0,
    };
  }
}

async function getRecentEvents(): Promise<
  Array<{ id: string; type: string; message: string; timestamp: Date }>
> {
  try {
    const stmt = db.prepare(`
      SELECT 
        id,
        event_type as type,
        page_url as message,
        created_at as timestamp
      FROM analytics_events 
      ORDER BY created_at DESC 
      LIMIT 10
    `);
    const events = stmt.all() as any[];

    return events.map(event => ({
      id: event.id,
      type: event.type,
      message: event.message || 'Page view',
      timestamp: new Date(event.timestamp),
    }));
  } catch (error) {
    console.error('Error getting recent events:', error);
    return [];
  }
}

async function getTopPages(): Promise<
  Array<{ page_url: string; views: number }>
> {
  try {
    const stmt = db.prepare(`
      SELECT 
        page_url,
        COUNT(*) as views
      FROM analytics_events 
      WHERE created_at >= datetime('now', '-1 hour')
        AND page_url IS NOT NULL
      GROUP BY page_url
      ORDER BY views DESC
      LIMIT 5
    `);
    const pages = stmt.all() as any[];

    return pages.map(page => ({
      page_url: page.page_url,
      views: page.views,
    }));
  } catch (error) {
    console.error('Error getting top pages:', error);
    return [];
  }
}

async function getTopUsers(): Promise<
  Array<{ user_id: string; user_name: string; activity_count: number }>
> {
  try {
    const stmt = db.prepare(`
      SELECT 
        ae.user_id,
        u.name as user_name,
        COUNT(*) as activity_count
      FROM analytics_events ae
      LEFT JOIN users u ON ae.user_id = u.id
      WHERE ae.created_at >= datetime('now', '-1 hour')
        AND ae.user_id IS NOT NULL
      GROUP BY ae.user_id
      ORDER BY activity_count DESC
      LIMIT 5
    `);
    const users = stmt.all() as any[];

    return users.map(user => ({
      user_id: user.user_id,
      user_name: user.user_name || 'Unknown User',
      activity_count: user.activity_count,
    }));
  } catch (error) {
    console.error('Error getting top users:', error);
    return [];
  }
}

// POST /api/admin/analytics/realtime - Update real-time metrics
export async function POST(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireViewAnalytics()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const { metric_type, value, timestamp } = body;

    // Validate required fields
    if (!metric_type || value === undefined) {
      return NextResponse.json(
        { success: false, error: 'Metric type and value are required' },
        { status: 400 }
      );
    }

    // Store real-time metric update
    const insertStmt = db.prepare(`
      INSERT INTO realtime_metrics (
        id, metric_type, value, timestamp, created_at
      ) VALUES (?, ?, ?, ?, ?)
    `);

    const metricId = crypto.randomUUID();
    insertStmt.run(
      metricId,
      metric_type,
      value,
      timestamp || new Date().toISOString(),
      new Date().toISOString()
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Real-time metric updated successfully',
        metric_id: metricId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error updating real-time metric:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update real-time metric' },
      { status: 500 }
    );
  }
}
