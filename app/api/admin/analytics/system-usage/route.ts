import { NextRequest, NextResponse } from 'next/server';
import { requireViewAnalytics } from '@/middleware/permissions';
import { db } from '@/database/connection';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const stat = promisify(fs.stat);

interface SystemUsageMetrics {
  timestamp: Date;
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  active_users: number;
  database_connections: number;
  api_requests_per_minute: number;
  error_rate: number;
  response_time_avg: number;
}

// GET /api/admin/analytics/system-usage - Get system usage analytics
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireViewAnalytics()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : 100;
    const offset = searchParams.get('offset')
      ? parseInt(searchParams.get('offset')!)
      : 0;

    // Build date filter
    let dateFilter = '';
    let params: any[] = [];

    if (startDate && endDate) {
      dateFilter = 'WHERE timestamp BETWEEN ? AND ?';
      params = [startDate, endDate];
    } else if (startDate) {
      dateFilter = 'WHERE timestamp >= ?';
      params = [startDate];
    } else if (endDate) {
      dateFilter = 'WHERE timestamp <= ?';
      params = [endDate];
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM system_usage_metrics ${dateFilter}`;
    const countStmt = db.prepare(countQuery);
    const totalResult = countStmt.get(...params) as any;

    // Get system usage metrics
    const query = `
      SELECT * FROM system_usage_metrics
      ${dateFilter}
      ORDER BY timestamp DESC
      LIMIT ? OFFSET ?
    `;

    const stmt = db.prepare(query);
    const metrics = stmt.all(...params, limit, offset) as any[];

    // Format the response
    const formattedMetrics: SystemUsageMetrics[] = metrics.map(metric => ({
      timestamp: new Date(metric.timestamp),
      cpu_usage: metric.cpu_usage,
      memory_usage: metric.memory_usage,
      disk_usage: metric.disk_usage,
      active_users: metric.active_users,
      database_connections: metric.database_connections,
      api_requests_per_minute: metric.api_requests_per_minute,
      error_rate: metric.error_rate,
      response_time_avg: metric.response_time_avg,
    }));

    // Get current system stats
    const currentStats = await getCurrentSystemStats();

    return NextResponse.json({
      success: true,
      metrics: formattedMetrics,
      current_stats: currentStats,
      pagination: {
        page: Math.floor(offset / limit) + 1,
        limit,
        total: totalResult.count,
        totalPages: Math.ceil(totalResult.count / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching system usage analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch system usage analytics' },
      { status: 500 }
    );
  }
}

// POST /api/admin/analytics/system-usage - Record system usage metrics
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      cpu_usage,
      memory_usage,
      disk_usage,
      active_users,
      database_connections,
      api_requests_per_minute,
      error_rate,
      response_time_avg,
    } = body;

    // Validate required fields
    if (cpu_usage === undefined || memory_usage === undefined) {
      return NextResponse.json(
        { success: false, error: 'CPU and memory usage are required' },
        { status: 400 }
      );
    }

    // Insert system usage metric
    const insertStmt = db.prepare(`
      INSERT INTO system_usage_metrics (
        id, timestamp, cpu_usage, memory_usage, disk_usage, active_users,
        database_connections, api_requests_per_minute, error_rate, response_time_avg
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const metricId = crypto.randomUUID();
    insertStmt.run(
      metricId,
      new Date().toISOString(),
      cpu_usage,
      memory_usage || 0,
      disk_usage || 0,
      active_users || 0,
      database_connections || 0,
      api_requests_per_minute || 0,
      error_rate || 0,
      response_time_avg || 0
    );

    return NextResponse.json(
      {
        success: true,
        message: 'System usage metric recorded successfully',
        metric_id: metricId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error recording system usage metric:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record system usage metric' },
      { status: 500 }
    );
  }
}

// Helper function to get current system stats
async function getCurrentSystemStats() {
  try {
    // Get disk usage
    const dbPath = path.join(process.cwd(), 'database', 'cms.db');
    const dbStats = await stat(dbPath);
    const diskUsage = (dbStats.size / (1024 * 1024)).toFixed(2); // MB

    // Get active users (users who logged in within last 24 hours)
    const activeUsersStmt = db.prepare(`
      SELECT COUNT(*) as count FROM users 
      WHERE last_login >= datetime('now', '-1 day')
    `);
    const activeUsers = activeUsersStmt.get() as any;

    // Get total users
    const totalUsersStmt = db.prepare('SELECT COUNT(*) as count FROM users');
    const totalUsers = totalUsersStmt.get() as any;

    // Get recent API requests (from analytics events)
    const recentRequestsStmt = db.prepare(`
      SELECT COUNT(*) as count FROM analytics_events 
      WHERE created_at >= datetime('now', '-1 hour')
    `);
    const recentRequests = recentRequestsStmt.get() as any;

    // Get error rate (from system logs)
    const errorRateStmt = db.prepare(`
      SELECT COUNT(*) as count FROM system_logs 
      WHERE severity = 'error' AND created_at >= datetime('now', '-1 hour')
    `);
    const errorCount = errorRateStmt.get() as any;

    return {
      disk_usage_mb: parseFloat(diskUsage),
      active_users: activeUsers.count,
      total_users: totalUsers.count,
      api_requests_last_hour: recentRequests.count,
      errors_last_hour: errorCount.count,
      error_rate_percent:
        recentRequests.count > 0
          ? ((errorCount.count / recentRequests.count) * 100).toFixed(2)
          : '0.00',
    };
  } catch (error) {
    console.error('Error getting current system stats:', error);
    return {
      disk_usage_mb: 0,
      active_users: 0,
      total_users: 0,
      api_requests_last_hour: 0,
      errors_last_hour: 0,
      error_rate_percent: '0.00',
    };
  }
}
