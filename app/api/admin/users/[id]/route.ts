import { NextRequest, NextResponse } from 'next/server';
import { UserModel } from '@/database/models/User';
import { requireAdmin, requireEditUsers, requireDeleteUsers } from '@/middleware/permissions';

// GET /api/admin/users/[id] - Get user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const user = await UserModel.findById(id);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/users/[id] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check permissions
    const permissionCheck = await requireEditUsers()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const {
      name,
      email,
      password,
      role,
      is_active
    } = body;

    // Check if user exists
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if email is being changed and if it already exists
    if (email && email !== existingUser.email) {
      const emailExists = await UserModel.findByEmail(email);
      if (emailExists) {
        return NextResponse.json(
          { success: false, error: 'User with this email already exists' },
          { status: 409 }
        );
      }
    }

    const updatedUser = await UserModel.update(id, {
      name,
      email,
      password,
      role,
      is_active
    });

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: 'Failed to update user' },
        { status: 500 }
      );
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'User updated successfully',
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check permissions
    const permissionCheck = await requireDeleteUsers()(request);
    if (permissionCheck) return permissionCheck;

    // Check if user exists
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Prevent deletion of super admin users
    if (existingUser.role === 'super_admin') {
      return NextResponse.json(
        { success: false, error: 'Cannot delete super admin users' },
        { status: 403 }
      );
    }

    const deleted = await UserModel.delete(id);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete user' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete user' },
      { status: 500 }
    );
  }
} 