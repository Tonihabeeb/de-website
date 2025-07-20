import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/permissions';
import { db } from '@/database/connection';
import { v4 as uuidv4 } from 'uuid';

interface SystemLog {
  id: string;
  level: 'debug' | 'info' | 'warning' | 'error' | 'critical';
  category: string;
  message: string;
  details?: any;
  stack_trace?: string;
  created_at: Date;
}

// GET /api/admin/logs - Get system logs
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');
    const category = searchParams.get('category');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;

    // Build query conditions
    let conditions = [];
    let params: any[] = [];

    if (level) {
      conditions.push('level = ?');
      params.push(level);
    }

    if (category) {
      conditions.push('category = ?');
      params.push(category);
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
    const countQuery = `SELECT COUNT(*) as count FROM system_logs ${whereClause}`;
    const countStmt = db.prepare(countQuery);
    const totalResult = countStmt.get(...params) as any;

    // Get system logs with pagination
    const query = `
      SELECT * FROM system_logs
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const stmt = db.prepare(query);
    const logs = stmt.all(...params, limit, offset) as any[];

    // Format the response
    const formattedLogs: SystemLog[] = logs.map(log => ({
      id: log.id,
      level: log.level,
      category: log.category,
      message: log.message,
      details: log.details ? JSON.parse(log.details) : undefined,
      stack_trace: log.stack_trace,
      created_at: new Date(log.created_at)
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
    console.error('Error fetching system logs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch system logs' },
      { status: 500 }
    );
  }
}

// POST /api/admin/logs - Create system log entry
export async function POST(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const {
      level = 'info',
      category,
      message,
      details,
      stack_trace
    } = body;

    // Validate required fields
    if (!category || !message) {
      return NextResponse.json(
        { success: false, error: 'Category and message are required' },
        { status: 400 }
      );
    }

    // Validate level
    const validLevels = ['debug', 'info', 'warning', 'error', 'critical'];
    if (!validLevels.includes(level)) {
      return NextResponse.json(
        { success: false, error: 'Invalid log level' },
        { status: 400 }
      );
    }

    // Create system log entry
    const logId = uuidv4();
    const insertStmt = db.prepare(`
      INSERT INTO system_logs (
        id, level, category, message, details, stack_trace, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insertStmt.run(
      logId,
      level,
      category,
      message,
      details ? JSON.stringify(details) : null,
      stack_trace || null,
      new Date().toISOString()
    );

    // Get the created log
    const getStmt = db.prepare('SELECT * FROM system_logs WHERE id = ?');
    const log = getStmt.get(logId) as any;

    const systemLog: SystemLog = {
      id: log.id,
      level: log.level,
      category: log.category,
      message: log.message,
      details: log.details ? JSON.parse(log.details) : undefined,
      stack_trace: log.stack_trace,
      created_at: new Date(log.created_at)
    };

    return NextResponse.json({
      success: true,
      log: systemLog,
      message: 'System log created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating system log:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create system log' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/logs - Clear old system logs
export async function DELETE(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const days = searchParams.get('days') ? parseInt(searchParams.get('days')!) : 30;
    const level = searchParams.get('level');

    // Calculate cutoff date
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    // Build delete query
    let deleteQuery = 'DELETE FROM system_logs WHERE created_at < ?';
    let params = [cutoffDate.toISOString()];

    if (level) {
      deleteQuery += ' AND level = ?';
      params.push(level);
    }

    // Delete old system logs
    const deleteStmt = db.prepare(deleteQuery);
    const result = deleteStmt.run(...params);

    return NextResponse.json({
      success: true,
      message: `Deleted ${result.changes} system logs older than ${days} days${level ? ` with level ${level}` : ''}`,
      deletedCount: result.changes
    });
  } catch (error) {
    console.error('Error clearing system logs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to clear system logs' },
      { status: 500 }
    );
  }
} 