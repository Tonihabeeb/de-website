import { NextRequest, NextResponse } from 'next/server';
// import { UserRole } from '../../../backend/src/models/User';
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

    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/users/${id}/role`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to update user role' },
        { status: res.status }
      );
    }
    const user = await res.json();
    if (user && user.password) delete user.password;
    return NextResponse.json({
      success: true,
      user,
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
