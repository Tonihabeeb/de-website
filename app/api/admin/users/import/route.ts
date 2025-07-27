import { NextRequest, NextResponse } from 'next/server';
import { requireCreateUsers } from '@/middleware/permissions';
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
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/users/import`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to import users' },
        { status: res.status }
      );
    }
    const result = await res.json();
    return NextResponse.json({
      success: true,
      result,
      message: result.message || 'Import completed',
    });
  } catch (error) {
    console.error('Error importing users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to import users' },
      { status: 500 }
    );
  }
}
