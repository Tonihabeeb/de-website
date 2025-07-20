import { NextRequest, NextResponse } from 'next/server';
import { UserModel, UserRole } from '@/database/models/User';
import { requireAdmin } from '@/middleware/permissions';

// PATCH /api/admin/users/[id]/role - Assign role to user
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const { role } = body;

    // Validate role
    const validRoles = Object.values(UserRole);
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { success: false, error: `Invalid role. Must be one of: ${validRoles.join(', ')}` },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Prevent changing super admin role
    if (existingUser.role === UserRole.SUPER_ADMIN) {
      return NextResponse.json(
        { success: false, error: 'Cannot change super admin role' },
        { status: 403 }
      );
    }

    // Update user role
    const updatedUser = await UserModel.update(id, { role });
    
    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: 'Failed to update user role' },
        { status: 500 }
      );
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'User role updated successfully',
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user role' },
      { status: 500 }
    );
  }
} 