import { NextRequest, NextResponse } from 'next/server';

// GET /api/admin/roles - Get all roles
export async function GET(request: NextRequest) {
  try {
    const roles = [
      {
        id: 'superadmin',
        name: 'Super Administrator',
        description: 'Full system access with all permissions and capabilities',
        permissions: [
          'Create, edit, view, delete, and publish pages',
          'Create, edit, view, and delete projects',
          'Create, edit, and delete users',
          'Assign roles to users',
          'Manage system settings',
          'Manage navigation',
          'Manage media',
          'View analytics',
          'Full administrative control'
        ],
        level: 5,
        created_at: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 'admin',
        name: 'Administrator',
        description: 'High-level administrative access with most management functions',
        permissions: [
          'Create, edit, view, delete, and publish pages',
          'Create, edit, view, and delete projects',
          'Create and edit users',
          'Manage navigation',
          'Manage media',
          'View analytics',
          'Cannot delete users or manage super admin settings'
        ],
        level: 4,
        created_at: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 'editor',
        name: 'Editor',
        description: 'Content management access with publishing capabilities',
        permissions: [
          'Create, edit, view, and publish pages',
          'Create, edit, and view projects',
          'Manage media',
          'Cannot delete content or manage users',
          'Limited administrative functions'
        ],
        level: 3,
        created_at: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 'author',
        name: 'Author',
        description: 'Content creation access with editing capabilities',
        permissions: [
          'Create, edit, and view pages',
          'Cannot publish content',
          'Cannot manage projects',
          'Cannot manage users or system settings'
        ],
        level: 2,
        created_at: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 'user',
        name: 'User',
        description: 'Basic access level with view-only permissions',
        permissions: [
          'View pages and content',
          'Cannot create, edit, or delete content',
          'Cannot manage projects or users',
          'Minimal system access'
        ],
        level: 1,
        created_at: '2024-01-01T00:00:00.000Z',
      },
    ];

    return NextResponse.json({
      success: true,
      roles: roles,
      total: roles.length,
    });
  } catch (error) {
    console.error('Error fetching roles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch roles' },
      { status: 500 }
    );
  }
}
