import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/permissions';
import { db } from '@/database/connection';

// GET /api/admin/users/export - Export users
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    const role = searchParams.get('role');
    const status = searchParams.get('status');
    const includePassword = searchParams.get('include_password') === 'true';

    // Build query conditions
    let conditions = [];
    let params: any[] = [];

    if (role && role !== 'all') {
      conditions.push('role = ?');
      params.push(role);
    }

    if (status) {
      conditions.push('is_active = ?');
      params.push(status === 'active' ? 1 : 0);
    }

    const whereClause =
      conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

    // Get all users
    const query = `SELECT * FROM users ${whereClause} ORDER BY created_at DESC`;
    const stmt = db.prepare(query);
    const users = stmt.all(...params) as any[];

    // Format users for export
    const exportUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      is_active: Boolean(user.is_active),
      created_at: user.created_at,
      updated_at: user.updated_at,
      ...(includePassword && { password_hash: user.password_hash }),
    }));

    // Return based on format
    switch (format.toLowerCase()) {
      case 'json':
        return NextResponse.json({
          success: true,
          users: exportUsers,
          total: exportUsers.length,
          exported_at: new Date().toISOString(),
        });

      case 'csv':
        // Convert to CSV format
        const csvHeaders = [
          'ID',
          'Name',
          'Email',
          'Role',
          'Active',
          'Created At',
          'Updated At',
        ];
        const csvRows = exportUsers.map(user => [
          user.id,
          user.name,
          user.email,
          user.role,
          user.is_active ? 'Yes' : 'No',
          user.created_at,
          user.updated_at,
        ]);

        const csvContent = [
          csvHeaders.join(','),
          ...csvRows.map(row => row.map(field => `"${field}"`).join(',')),
        ].join('\n');

        const response = new NextResponse(csvContent);
        response.headers.set('Content-Type', 'text/csv');
        response.headers.set(
          'Content-Disposition',
          `attachment; filename="users-export-${new Date().toISOString().split('T')[0]}.csv"`
        );
        return response;

      case 'xml':
        // Convert to XML format
        const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<users>
  ${exportUsers
    .map(
      user => `
  <user>
    <id>${user.id}</id>
    <name>${user.name}</name>
    <email>${user.email}</email>
    <role>${user.role}</role>
    <active>${user.is_active}</active>
    <created_at>${user.created_at}</created_at>
    <updated_at>${user.updated_at}</updated_at>
  </user>`
    )
    .join('')}
</users>`;

        const xmlResponse = new NextResponse(xmlContent);
        xmlResponse.headers.set('Content-Type', 'application/xml');
        xmlResponse.headers.set(
          'Content-Disposition',
          `attachment; filename="users-export-${new Date().toISOString().split('T')[0]}.xml"`
        );
        return xmlResponse;

      default:
        return NextResponse.json(
          { success: false, error: 'Unsupported export format' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error exporting users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to export users' },
      { status: 500 }
    );
  }
}
