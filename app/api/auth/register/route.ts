import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/database/connection';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role = 'user' } = await request.json();

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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userId = uuidv4();
    const now = new Date().toISOString();

    const insertStmt = db.prepare(`
      INSERT INTO users (id, name, email, password_hash, role, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStmt.run(
      userId,
      name,
      email,
      hashedPassword,
      role,
      1,
      now,
      now
    );

    // Return user data (without password)
    const userData = {
      _id: userId,
      name,
      email,
      role,
    };

    return NextResponse.json({
      success: true,
      user: userData,
      message: 'User registered successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 