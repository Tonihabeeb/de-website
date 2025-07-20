import { NextRequest, NextResponse } from 'next/server';
import { requireSuperAdmin } from '@/middleware/permissions';
import { db } from '@/database/connection';
import { v4 as uuidv4 } from 'uuid';

// GET /api/admin/permissions - Get all permissions
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireSuperAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const role_id = searchParams.get('role_id');

    let query = 'SELECT * FROM permissions';
    const params: any[] = [];

    if (role_id) {
      query += ' WHERE role_id = ?';
      params.push(role_id);
    }

    query += ' ORDER BY resource, action';

    const stmt = db.prepare(query);
    const permissions = stmt.all(...params) as any[];

    return NextResponse.json({
      success: true,
      permissions: permissions.map(permission => ({
        id: permission.id,
        role_id: permission.role_id,
        resource: permission.resource,
        action: permission.action,
        created_at: permission.created_at
      }))
    });
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch permissions' },
      { status: 500 }
    );
  }
}

// POST /api/admin/permissions - Create new permission
export async function POST(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireSuperAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const { role_id, resource, action } = body;

    // Validate required fields
    if (!role_id || !resource || !action) {
      return NextResponse.json(
        { success: false, error: 'Role ID, resource, and action are required' },
        { status: 400 }
      );
    }

    // Validate resource and action
    const validResources = ['pages', 'projects', 'users', 'media', 'settings', 'navigation'];
    const validActions = ['create', 'read', 'update', 'delete', 'publish', 'manage'];

    if (!validResources.includes(resource)) {
      return NextResponse.json(
        { success: false, error: 'Invalid resource' },
        { status: 400 }
      );
    }

    if (!validActions.includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      );
    }

    // Check if role exists
    const roleStmt = db.prepare('SELECT id FROM roles WHERE id = ?');
    const role = roleStmt.get(role_id);
    
    if (!role) {
      return NextResponse.json(
        { success: false, error: 'Role not found' },
        { status: 404 }
      );
    }

    // Check if permission already exists
    const existingStmt = db.prepare('SELECT id FROM permissions WHERE role_id = ? AND resource = ? AND action = ?');
    const existing = existingStmt.get(role_id, resource, action);
    
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Permission already exists for this role, resource, and action' },
        { status: 409 }
      );
    }

    // Create permission
    const permissionId = uuidv4();
    const insertStmt = db.prepare(`
      INSERT INTO permissions (id, role_id, resource, action)
      VALUES (?, ?, ?, ?)
    `);

    insertStmt.run(permissionId, role_id, resource, action);

    const newPermission = {
      id: permissionId,
      role_id,
      resource,
      action,
      created_at: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      permission: newPermission,
      message: 'Permission created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating permission:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create permission' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/permissions - Delete permission
export async function DELETE(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireSuperAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Permission ID is required' },
        { status: 400 }
      );
    }

    // Check if permission exists
    const existingStmt = db.prepare('SELECT * FROM permissions WHERE id = ?');
    const existing = existingStmt.get(id) as any;
    
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Permission not found' },
        { status: 404 }
      );
    }

    // Delete permission
    const deleteStmt = db.prepare('DELETE FROM permissions WHERE id = ?');
    const result = deleteStmt.run(id);

    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete permission' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Permission deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting permission:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete permission' },
      { status: 500 }
    );
  }
} 