import { NextRequest, NextResponse } from 'next/server';
import { requireViewAnalytics } from '@/middleware/permissions';
import { db } from '@/database/connection';

interface PerformanceMetric {
  id: string;
  endpoint: string;
  method: string;
  response_time: number;
  status_code: number;
  user_id?: string;
  ip_address: string;
  user_agent: string;
  timestamp: Date;
  error_message?: string;
}

interface PerformanceSummary {
  total_requests: number;
  average_response_time: number;
  error_rate: number;
  slowest_endpoints: Array<{
    endpoint: string;
    avg_response_time: number;
    request_count: number;
  }>;
  error_endpoints: Array<{
    endpoint: string;
    error_count: number;
    error_rate: number;
  }>;
  hourly_traffic: Array<{
    hour: string;
    request_count: number;
    avg_response_time: number;
  }>;
}

// GET /api/admin/analytics/performance - Get performance metrics
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireViewAnalytics()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');
    const method = searchParams.get('method');
    const statusCode = searchParams.get('status_code');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : 100;
    const offset = searchParams.get('offset')
      ? parseInt(searchParams.get('offset')!)
      : 0;

    // Build query conditions
    let conditions = [];
    let params: any[] = [];

    if (endpoint) {
      conditions.push('endpoint LIKE ?');
      params.push(`%${endpoint}%`);
    }

    if (method) {
      conditions.push('method = ?');
      params.push(method);
    }

    if (statusCode) {
      conditions.push('status_code = ?');
      params.push(statusCode);
    }

    if (startDate) {
      conditions.push('timestamp >= ?');
      params.push(startDate);
    }

    if (endDate) {
      conditions.push('timestamp <= ?');
      params.push(endDate);
    }

    const whereClause =
      conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM performance_metrics ${whereClause}`;
    const countStmt = db.prepare(countQuery);
    const totalResult = countStmt.get(...params) as any;

    // Get performance metrics
    const query = `
      SELECT * FROM performance_metrics
      ${whereClause}
      ORDER BY timestamp DESC
      LIMIT ? OFFSET ?
    `;

    const stmt = db.prepare(query);
    const metrics = stmt.all(...params, limit, offset) as any[];

    // Format the response
    const formattedMetrics: PerformanceMetric[] = metrics.map(metric => ({
      id: metric.id,
      endpoint: metric.endpoint,
      method: metric.method,
      response_time: metric.response_time,
      status_code: metric.status_code,
      user_id: metric.user_id,
      ip_address: metric.ip_address,
      user_agent: metric.user_agent,
      timestamp: new Date(metric.timestamp),
      error_message: metric.error_message,
    }));

    // Get performance summary
    const summary = await getPerformanceSummary(startDate, endDate);

    return NextResponse.json({
      success: true,
      metrics: formattedMetrics,
      summary,
      pagination: {
        page: Math.floor(offset / limit) + 1,
        limit,
        total: totalResult.count,
        totalPages: Math.ceil(totalResult.count / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching performance metrics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch performance metrics' },
      { status: 500 }
    );
  }
}

// POST /api/admin/analytics/performance - Record performance metric
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      endpoint,
      method,
      response_time,
      status_code,
      user_id,
      ip_address,
      user_agent,
      error_message,
    } = body;

    // Validate required fields
    if (!endpoint || !method || response_time === undefined || !status_code) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert performance metric
    const insertStmt = db.prepare(`
      INSERT INTO performance_metrics (
        id, endpoint, method, response_time, status_code, user_id,
        ip_address, user_agent, timestamp, error_message
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const metricId = crypto.randomUUID();
    insertStmt.run(
      metricId,
      endpoint,
      method,
      response_time,
      status_code,
      user_id || null,
      ip_address || 'unknown',
      user_agent || 'unknown',
      new Date().toISOString(),
      error_message || null
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Performance metric recorded successfully',
        metric_id: metricId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error recording performance metric:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record performance metric' },
      { status: 500 }
    );
  }
}

// Helper function to get performance summary
async function getPerformanceSummary(
  startDate?: string | null,
  endDate?: string | null
): Promise<PerformanceSummary> {
  try {
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

    // Get total requests and average response time
    const totalQuery = `
      SELECT 
        COUNT(*) as total_requests,
        AVG(response_time) as avg_response_time,
        COUNT(CASE WHEN status_code >= 400 THEN 1 END) as error_count
      FROM performance_metrics ${dateFilter}
    `;
    const totalStmt = db.prepare(totalQuery);
    const totalResult = totalStmt.get(...params) as any;

    // Get slowest endpoints
    const slowestQuery = `
      SELECT 
        endpoint,
        AVG(response_time) as avg_response_time,
        COUNT(*) as request_count
      FROM performance_metrics ${dateFilter}
      GROUP BY endpoint
      ORDER BY avg_response_time DESC
      LIMIT 10
    `;
    const slowestStmt = db.prepare(slowestQuery);
    const slowestEndpoints = slowestStmt.all(...params) as any[];

    // Get error endpoints
    const errorQuery = `
      SELECT 
        endpoint,
        COUNT(*) as error_count,
        ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM performance_metrics ${dateFilter}), 2) as error_rate
      FROM performance_metrics 
      WHERE status_code >= 400 ${dateFilter.replace('WHERE', 'AND')}
      GROUP BY endpoint
      ORDER BY error_count DESC
      LIMIT 10
    `;
    const errorStmt = db.prepare(errorQuery);
    const errorEndpoints = errorStmt.all(...params) as any[];

    // Get hourly traffic
    const hourlyQuery = `
      SELECT 
        strftime('%H:00', timestamp) as hour,
        COUNT(*) as request_count,
        AVG(response_time) as avg_response_time
      FROM performance_metrics ${dateFilter}
      GROUP BY strftime('%H', timestamp)
      ORDER BY hour
    `;
    const hourlyStmt = db.prepare(hourlyQuery);
    const hourlyTraffic = hourlyStmt.all(...params) as any[];

    return {
      total_requests: totalResult.total_requests,
      average_response_time:
        Math.round(totalResult.avg_response_time * 100) / 100,
      error_rate:
        totalResult.total_requests > 0
          ? Math.round(
              (totalResult.error_count / totalResult.total_requests) * 10000
            ) / 100
          : 0,
      slowest_endpoints: slowestEndpoints.map(endpoint => ({
        endpoint: endpoint.endpoint,
        avg_response_time: Math.round(endpoint.avg_response_time * 100) / 100,
        request_count: endpoint.request_count,
      })),
      error_endpoints: errorEndpoints.map(endpoint => ({
        endpoint: endpoint.endpoint,
        error_count: endpoint.error_count,
        error_rate: endpoint.error_rate,
      })),
      hourly_traffic: hourlyTraffic.map(hour => ({
        hour: hour.hour,
        request_count: hour.request_count,
        avg_response_time: Math.round(hour.avg_response_time * 100) / 100,
      })),
    };
  } catch (error) {
    console.error('Error getting performance summary:', error);
    return {
      total_requests: 0,
      average_response_time: 0,
      error_rate: 0,
      slowest_endpoints: [],
      error_endpoints: [],
      hourly_traffic: [],
    };
  }
}
