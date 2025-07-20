import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/permissions';
import { db } from '@/database/connection';
import { v4 as uuidv4 } from 'uuid';

// GET /api/admin/users/activity - Get user activity logs
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    const action = searchParams.get('action');
    const resource = searchParams.get('resource');
    const start_date = searchParams.get('start_date');
    const end_date = searchParams.get('end_date');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query
    let query = 'SELECT * FROM user_activity_logs';
    const conditions: string[] = [];
    const params: any[] = [];

    if (user_id) {
      conditions.push('user_id = ?');
      params.push(user_id);
    }

    if (action) {
      conditions.push('action = ?');
      params.push(action);
    }

    if (resource) {
      conditions.push('resource = ?');
      params.push(resource);
    }

    if (start_date) {
      conditions.push('created_at >= ?');
      params.push(start_date);
    }

    if (end_date) {
      conditions.push('created_at <= ?');
      params.push(end_date);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const stmt = db.prepare(query);
    const logs = stmt.all(...params) as any[];

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM user_activity_logs';
    if (conditions.length > 0) {
      countQuery += ' WHERE ' + conditions.join(' AND ');
    }
    const countStmt = db.prepare(countQuery);
    const countResult = countStmt.get(...params.slice(0, -2)) as any;
    const total = countResult.total;

    return NextResponse.json({
      success: true,
      logs: logs.map(log => ({
        id: log.id,
        user_id: log.user_id,
        action: log.action,
        resource: log.resource,
        resource_id: log.resource_id,
        details: JSON.parse(log.details || '{}'),
        ip_address: log.ip_address,
        user_agent: log.user_agent,
        created_at: log.created_at
      })),
      pagination: {
        total,
        limit,
        offset,
        has_more: offset + limit < total
      }
    });
  } catch (error) {
    console.error('Error fetching user activity logs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user activity logs' },
      { status: 500 }
    );
  }
}

// POST /api/admin/users/activity - Log user activity
export async function POST(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const { user_id, action, resource, resource_id, details } = body;

    // Validate required fields
    if (!user_id || !action || !resource) {
      return NextResponse.json(
        { success: false, error: 'User ID, action, and resource are required' },
        { status: 400 }
      );
    }

    // Get IP address and user agent
    const ip_address = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const user_agent = request.headers.get('user-agent') || 'unknown';

    // Create activity log
    const logId = uuidv4();
    const insertStmt = db.prepare(`
      INSERT INTO user_activity_logs (
        id, user_id, action, resource, resource_id, details, ip_address, user_agent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStmt.run(
      logId,
      user_id,
      action,
      resource,
      resource_id || null,
      JSON.stringify(details || {}),
      ip_address,
      user_agent
    );

    return NextResponse.json({
      success: true,
      log: {
        id: logId,
        user_id,
        action,
        resource,
        resource_id,
        details,
        ip_address,
        user_agent,
        created_at: new Date().toISOString()
      },
      message: 'Activity logged successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error logging user activity:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to log user activity' },
      { status: 500 }
    );
  }
} 