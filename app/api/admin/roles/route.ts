import { NextRequest, NextResponse } from 'next/server';

// GET /api/admin/roles - Get all roles
export async function GET(request: NextRequest) {
  try {
    const sampleRoles = [
      {
        id: 'super_admin',
        name: 'Super Administrator',
        description: 'Full system access with all permissions',
        permissions: ['canCreatePages', 'canEditPages', 'canViewPages'],
        created_at: '2024-01-01T00:00:00.000Z'
      },
      {
        id: 'admin',
        name: 'Administrator',
        description: 'Administrative access with most permissions',
        permissions: ['canCreatePages', 'canEditPages', 'canViewPages'],
        created_at: '2024-01-01T00:00:00.000Z'
      }
    ];

    return NextResponse.json({
      success: true,
      roles: sampleRoles,
      total: sampleRoles.length,
    });
  } catch (error) {
    console.error('Error fetching roles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch roles' },
      { status: 500 }
    );
  }
} 