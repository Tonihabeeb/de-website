import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/permissions';
import { db } from '@/database/connection';
import { v4 as uuidv4 } from 'uuid';

interface AuditLog {
  id: string;
  user_id?: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  resource_name?: string;
  details?: any;
  ip_address?: string;
  user_agent?: string;
  status: 'success' | 'failure' | 'error';
  severity: 'info' | 'warning' | 'error' | 'critical';
  created_at: Date;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

// GET /api/admin/audit - Get audit logs
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const resourceType = searchParams.get('resource_type');
    const userId = searchParams.get('user_id');
    const severity = searchParams.get('severity');
    const status = searchParams.get('status');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;

    // Build query conditions
    let conditions = [];
    let params: any[] = [];

    if (action) {
      conditions.push('action = ?');
      params.push(action);
    }

    if (resourceType) {
      conditions.push('resource_type = ?');
      params.push(resourceType);
    }

    if (userId) {
      conditions.push('user_id = ?');
      params.push(userId);
    }

    if (severity) {
      conditions.push('severity = ?');
      params.push(severity);
    }

    if (status) {
      conditions.push('status = ?');
      params.push(status);
    }

    if (startDate) {
      conditions.push('created_at >= ?');
      params.push(startDate);
    }

    if (endDate) {
      conditions.push('created_at <= ?');
      params.push(endDate);
    }

    const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM audit_logs ${whereClause}`;
    const countStmt = db.prepare(countQuery);
    const totalResult = countStmt.get(...params) as any;

    // Get audit logs with pagination
    const query = `
      SELECT 
        al.*,
        u.name as user_name,
        u.email as user_email
      FROM audit_logs al
      LEFT JOIN users u ON al.user_id = u.id
      ${whereClause}
      ORDER BY al.created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const stmt = db.prepare(query);
    const logs = stmt.all(...params, limit, offset) as any[];

    // Format the response
    const formattedLogs: AuditLog[] = logs.map(log => ({
      id: log.id,
      user_id: log.user_id,
      action: log.action,
      resource_type: log.resource_type,
      resource_id: log.resource_id,
      resource_name: log.resource_name,
      details: log.details ? JSON.parse(log.details) : undefined,
      ip_address: log.ip_address,
      user_agent: log.user_agent,
      status: log.status,
      severity: log.severity,
      created_at: new Date(log.created_at),
      user: log.user_id ? {
        id: log.user_id,
        name: log.user_name,
        email: log.user_email
      } : undefined
    }));

    return NextResponse.json({
      success: true,
      logs: formattedLogs,
      pagination: {
        page: Math.floor(offset / limit) + 1,
        limit,
        total: totalResult.count,
        totalPages: Math.ceil(totalResult.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch audit logs' },
      { status: 500 }
    );
  }
}

// POST /api/admin/audit - Create audit log entry
export async function POST(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const {
      user_id,
      action,
      resource_type,
      resource_id,
      resource_name,
      details,
      ip_address,
      user_agent,
      status = 'success',
      severity = 'info'
    } = body;

    // Validate required fields
    if (!action || !resource_type) {
      return NextResponse.json(
        { success: false, error: 'Action and resource_type are required' },
        { status: 400 }
      );
    }

    // Get IP address from request if not provided
    const clientIP = ip_address || request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 'unknown';

    // Get user agent from request if not provided
    const clientUserAgent = user_agent || request.headers.get('user-agent') || 'unknown';

    // Create audit log entry
    const auditLogId = uuidv4();
    const insertStmt = db.prepare(`
      INSERT INTO audit_logs (
        id, user_id, action, resource_type, resource_id, resource_name,
        details, ip_address, user_agent, status, severity, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStmt.run(
      auditLogId,
      user_id || null,
      action,
      resource_type,
      resource_id || null,
      resource_name || null,
      details ? JSON.stringify(details) : null,
      clientIP,
      clientUserAgent,
      status,
      severity,
      new Date().toISOString()
    );

    // Get the created audit log
    const getStmt = db.prepare('SELECT * FROM audit_logs WHERE id = ?');
    const log = getStmt.get(auditLogId) as any;

    const auditLog: AuditLog = {
      id: log.id,
      user_id: log.user_id,
      action: log.action,
      resource_type: log.resource_type,
      resource_id: log.resource_id,
      resource_name: log.resource_name,
      details: log.details ? JSON.parse(log.details) : undefined,
      ip_address: log.ip_address,
      user_agent: log.user_agent,
      status: log.status,
      severity: log.severity,
      created_at: new Date(log.created_at)
    };

    return NextResponse.json({
      success: true,
      audit_log: auditLog,
      message: 'Audit log created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating audit log:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create audit log' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/audit - Clear old audit logs
export async function DELETE(request: NextRequest) {
  try {
    // Check permissions (only super admin can clear logs)
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const days = searchParams.get('days') ? parseInt(searchParams.get('days')!) : 90;

    // Calculate cutoff date
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    // Delete old audit logs
    const deleteStmt = db.prepare('DELETE FROM audit_logs WHERE created_at < ?');
    const result = deleteStmt.run(cutoffDate.toISOString());

    return NextResponse.json({
      success: true,
      message: `Deleted ${result.changes} audit logs older than ${days} days`,
      deletedCount: result.changes
    });
  } catch (error) {
    console.error('Error clearing audit logs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to clear audit logs' },
      { status: 500 }
    );
  }
} 