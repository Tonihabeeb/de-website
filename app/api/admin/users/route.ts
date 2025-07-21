import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Sample users data for development
const sampleUsers = [
  {
    id: 'admin-001',
    name: 'Admin User',
    email: 'admin@deepengineering.co',
    role: 'super_admin',
    is_active: true,
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-07-20T00:00:00.000Z',
  },
  {
    id: 'user-001',
    name: 'John Smith',
    email: 'john.smith@deepengineering.co',
    role: 'admin',
    is_active: true,
    created_at: '2024-02-01T00:00:00.000Z',
    updated_at: '2024-07-20T00:00:00.000Z',
  },
  {
    id: 'user-002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@deepengineering.co',
    role: 'editor',
    is_active: true,
    created_at: '2024-03-01T00:00:00.000Z',
    updated_at: '2024-07-20T00:00:00.000Z',
  },
  {
    id: 'user-003',
    name: 'Michael Brown',
    email: 'michael.brown@deepengineering.co',
    role: 'user',
    is_active: true,
    created_at: '2024-04-01T00:00:00.000Z',
    updated_at: '2024-07-20T00:00:00.000Z',
  },
  {
    id: 'user-004',
    name: 'Emily Davis',
    email: 'emily.davis@deepengineering.co',
    role: 'viewer',
    is_active: false,
    created_at: '2024-05-01T00:00:00.000Z',
    updated_at: '2024-07-20T00:00:00.000Z',
  },
];

// GET /api/admin/users - Get all users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const is_active = searchParams.get('is_active');
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : undefined;
    const offset = searchParams.get('offset')
      ? parseInt(searchParams.get('offset')!)
      : undefined;

    let filteredUsers = [...sampleUsers];

    // Apply filters
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    if (is_active !== null) {
      const active = is_active === 'true';
      filteredUsers = filteredUsers.filter(user => user.is_active === active);
    }

    // Apply pagination
    if (offset) {
      filteredUsers = filteredUsers.slice(offset);
    }

    if (limit) {
      filteredUsers = filteredUsers.slice(0, limit);
    }

    return NextResponse.json({
      success: true,
      users: filteredUsers,
      total: sampleUsers.length,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/admin/users - Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, role, is_active } = body;

    // Validate required fields
    if (!name || !email || !role) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and role are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = sampleUsers.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const newUser = {
      id: uuidv4(),
      name,
      email,
      role,
      is_active: is_active !== undefined ? is_active : true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // In a real implementation, this would be saved to the database
    sampleUsers.push(newUser);

    return NextResponse.json(
      {
        success: true,
        user: newUser,
        message: 'User created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
