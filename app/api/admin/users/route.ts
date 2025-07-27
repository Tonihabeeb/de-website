import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// Database connection for Next.js API route
const dbPath = path.join(process.cwd(), 'database', 'cms.db');
const db = new Database(dbPath);

// User role enum
enum UserRole {
  SUPER_ADMIN = 'superadmin',
  ADMIN = 'admin',
  EDITOR = 'editor',
  AUTHOR = 'author',
  USER = 'user',
}

// GET /api/admin/users - List all users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '1000');
    const offset = parseInt(searchParams.get('offset') || '0');
    const role = searchParams.get('role') as UserRole | null;
    const isActive = searchParams.get('is_active');

    let query = 'SELECT id, name, email, role, is_active, last_login, created_at, updated_at FROM users WHERE 1=1';
    const params: any[] = [];

    if (role) {
      query += ' AND role = ?';
      params.push(role);
    }

    if (isActive !== null) {
      query += ' AND is_active = ?';
      params.push(isActive === 'true' ? 1 : 0);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const users = db.prepare(query).all(...params);

    return NextResponse.json({
      success: true,
      data: users,
      pagination: {
        limit,
        offset,
        total: users.length,
      },
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
    let { name, email, password, role, is_active } = body;

    // Normalize role: accept 'superadmin', 'super_admin', 'admin', etc.
    if (role) {
      const roleMap: Record<string, UserRole> = {
        superadmin: UserRole.SUPER_ADMIN,
        super_admin: UserRole.SUPER_ADMIN,
        admin: UserRole.ADMIN,
        editor: UserRole.EDITOR,
        author: UserRole.AUTHOR,
        user: UserRole.USER,
      };
      role = roleMap[role.replace(/_/g, '').toLowerCase()] || role;
    } else {
      role = UserRole.USER; // Default role
    }

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create user
    const id = uuidv4();
    const now = new Date().toISOString();
    const hashedPassword = await bcrypt.hash(password, 12);

    const stmt = db.prepare(`
      INSERT INTO users (
        id, name, email, password_hash, role, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      name,
      email,
      hashedPassword,
      role,
      is_active !== false ? 1 : 0,
      now,
      now
    );

    // Return user without password hash
    const newUser = db.prepare('SELECT id, name, email, role, is_active, created_at, updated_at FROM users WHERE id = ?').get(id);

    return NextResponse.json(
      { success: true, data: newUser },
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
