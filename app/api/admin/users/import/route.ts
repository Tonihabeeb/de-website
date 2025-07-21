import { NextRequest, NextResponse } from 'next/server';
import { requireCreateUsers } from '@/middleware/permissions';
import { UserModel } from '@/database/models/User';
import { v4 as uuidv4 } from 'uuid';

interface ImportUser {
  name: string;
  email: string;
  role: string;
  is_active?: boolean;
}

interface ImportResult {
  success: number;
  failed: number;
  errors: string[];
  users: any[];
}

// POST /api/admin/users/import - Import users from CSV/JSON
export async function POST(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireCreateUsers()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const { users, format = 'json' } = body;

    if (!users || !Array.isArray(users)) {
      return NextResponse.json(
        { success: false, error: 'Users array is required' },
        { status: 400 }
      );
    }

    const result: ImportResult = {
      success: 0,
      failed: 0,
      errors: [],
      users: [],
    };

    // Process each user
    for (let i = 0; i < users.length; i++) {
      const userData = users[i];

      try {
        // Validate required fields
        if (!userData.name || !userData.email || !userData.role) {
          result.failed++;
          result.errors.push(
            `Row ${i + 1}: Missing required fields (name, email, role)`
          );
          continue;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
          result.failed++;
          result.errors.push(`Row ${i + 1}: Invalid email format`);
          continue;
        }

        // Validate role
        const validRoles = ['user', 'admin', 'super_admin', 'editor', 'viewer'];
        if (!validRoles.includes(userData.role)) {
          result.failed++;
          result.errors.push(`Row ${i + 1}: Invalid role (${userData.role})`);
          continue;
        }

        // Check if user already exists
        const existingUser = await UserModel.findByEmail(userData.email);
        if (existingUser) {
          result.failed++;
          result.errors.push(
            `Row ${i + 1}: User with email ${userData.email} already exists`
          );
          continue;
        }

        // Generate random password for imported users
        const randomPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);

        // Create user
        const user = await UserModel.create({
          email: userData.email,
          password: randomPassword,
          name: userData.name,
          role: userData.role,
        });

        if (user) {
          result.success++;
          result.users.push({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            is_active: user.is_active,
            temporary_password: randomPassword, // Include for admin reference
          });
        } else {
          result.failed++;
          result.errors.push(`Row ${i + 1}: Failed to create user`);
        }
      } catch (error) {
        result.failed++;
        result.errors.push(
          `Row ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }

    return NextResponse.json({
      success: true,
      result,
      message: `Import completed: ${result.success} successful, ${result.failed} failed`,
    });
  } catch (error) {
    console.error('Error importing users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to import users' },
      { status: 500 }
    );
  }
}
