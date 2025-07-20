import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/permissions';
import { db } from '@/database/connection';

// GET /api/admin/users/search - Advanced user search
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('q');
    const role = searchParams.get('role');
    const status = searchParams.get('status');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const sortBy = searchParams.get('sort_by') || 'created_at';
    const sortOrder = searchParams.get('sort_order') || 'desc';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;

    // Build query conditions
    let conditions = [];
    let params: any[] = [];

    if (searchQuery) {
      conditions.push('(name LIKE ? OR email LIKE ?)');
      const searchTerm = `%${searchQuery}%`;
      params.push(searchTerm, searchTerm);
    }

    if (role && role !== 'all') {
      conditions.push('role = ?');
      params.push(role);
    }

    if (status) {
      conditions.push('is_active = ?');
      params.push(status === 'active' ? 1 : 0);
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

    // Validate sort parameters
    const validSortFields = ['name', 'email', 'role', 'is_active', 'created_at', 'updated_at'];
    const validSortOrders = ['asc', 'desc'];
    
    if (!validSortFields.includes(sortBy)) {
      return NextResponse.json(
        { success: false, error: 'Invalid sort field' },
        { status: 400 }
      );
    }

    if (!validSortOrders.includes(sortOrder)) {
      return NextResponse.json(
        { success: false, error: 'Invalid sort order' },
        { status: 400 }
      );
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM users ${whereClause}`;
    const countStmt = db.prepare(countQuery);
    const totalResult = countStmt.get(...params) as any;

    // Get users with pagination
    const userQuery = `
      SELECT * FROM users
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder.toUpperCase()}
      LIMIT ? OFFSET ?
    `;
    
    const stmt = db.prepare(userQuery);
    const users = stmt.all(...params, limit, offset) as any[];

    // Format the response
    const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      is_active: Boolean(user.is_active),
      created_at: new Date(user.created_at),
      updated_at: new Date(user.updated_at)
    }));

    return NextResponse.json({
      success: true,
      users: formattedUsers,
      pagination: {
        page: Math.floor(offset / limit) + 1,
        limit,
        total: totalResult.count,
        totalPages: Math.ceil(totalResult.count / limit)
      }
    });
  } catch (error) {
    console.error('Error searching users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search users' },
      { status: 500 }
    );
  }
} 