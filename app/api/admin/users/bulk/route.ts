import { NextRequest, NextResponse } from 'next/server';
import { requireSuperAdmin } from '@/middleware/permissions';
import { UserModel } from '@/database/models/User';
import { db } from '@/database/connection';

// POST /api/admin/users/bulk - Bulk user operations
export async function POST(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireSuperAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const { operation, user_ids, data } = body;

    // Validate required fields
    if (!operation || !user_ids || !Array.isArray(user_ids)) {
      return NextResponse.json(
        { success: false, error: 'Operation and user_ids array are required' },
        { status: 400 }
      );
    }

    if (user_ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one user ID is required' },
        { status: 400 }
      );
    }

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    switch (operation) {
      case 'activate':
        // Bulk activate users
        for (const userId of user_ids) {
          try {
            const updated = await UserModel.update(userId, { is_active: true });
            if (updated) {
              results.success++;
            } else {
              results.failed++;
              results.errors.push(`Failed to activate user ${userId}`);
            }
          } catch (error) {
            results.failed++;
            results.errors.push(`Error activating user ${userId}: ${error}`);
          }
        }
        break;

      case 'deactivate':
        // Bulk deactivate users
        for (const userId of user_ids) {
          try {
            const updated = await UserModel.update(userId, {
              is_active: false,
            });
            if (updated) {
              results.success++;
            } else {
              results.failed++;
              results.errors.push(`Failed to deactivate user ${userId}`);
            }
          } catch (error) {
            results.failed++;
            results.errors.push(`Error deactivating user ${userId}: ${error}`);
          }
        }
        break;

      case 'assign_role':
        // Bulk assign role
        if (!data?.role_id) {
          return NextResponse.json(
            {
              success: false,
              error: 'Role ID is required for assign_role operation',
            },
            { status: 400 }
          );
        }

        for (const userId of user_ids) {
          try {
            const updated = await UserModel.update(userId, {
              role: data.role_id,
            });
            if (updated) {
              results.success++;
            } else {
              results.failed++;
              results.errors.push(`Failed to assign role to user ${userId}`);
            }
          } catch (error) {
            results.failed++;
            results.errors.push(
              `Error assigning role to user ${userId}: ${error}`
            );
          }
        }
        break;

      case 'delete':
        // Bulk delete users (with confirmation)
        if (!data?.confirm) {
          return NextResponse.json(
            {
              success: false,
              error: 'Confirmation required for bulk delete operation',
            },
            { status: 400 }
          );
        }

        for (const userId of user_ids) {
          try {
            const deleted = await UserModel.delete(userId);
            if (deleted) {
              results.success++;
            } else {
              results.failed++;
              results.errors.push(`Failed to delete user ${userId}`);
            }
          } catch (error) {
            results.failed++;
            results.errors.push(`Error deleting user ${userId}: ${error}`);
          }
        }
        break;

      default:
        return NextResponse.json(
          {
            success: false,
            error:
              'Invalid operation. Supported operations: activate, deactivate, assign_role, delete',
          },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      operation,
      results,
      message: `Bulk operation completed. ${results.success} successful, ${results.failed} failed.`,
    });
  } catch (error) {
    console.error('Error performing bulk user operations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to perform bulk user operations' },
      { status: 500 }
    );
  }
}
