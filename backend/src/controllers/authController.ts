import { Request, Response } from 'express';
import { UserModel, CreateUserSchema } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export async function register(req: Request, res: Response) {
  try {
    const data = CreateUserSchema.parse(req.body);
    // Check if user already exists
    const existing = await UserModel.findByEmail(data.email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const user = await UserModel.create(data);
    // Do not return password_hash
    const { password_hash, ...userSafe } = user;
    res.status(201).json(userSafe);
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    // Normalize email to lowercase for case-insensitive comparison
    const normalizedEmail = email.toLowerCase();
    const user = await UserModel.findByEmail(normalizedEmail);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Generate JWT with user details
    const token = jwt.sign({ 
      userId: user.id, 
      role: user.role,
      name: user.name,
      email: user.email
    }, JWT_SECRET, { expiresIn: '7d' });
    
    // Return token and user details
    const { password_hash, ...userWithoutPassword } = user;
    res.json({ 
      success: true,
      token,
      user: userWithoutPassword
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
}

export async function getCurrentUser(req: Request, res: Response) {
  try {
    // req.user is set by auth middleware
    // @ts-ignore
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    // Remove password from response
    const { password_hash, ...userWithoutPassword } = user;
    return res.json({ user: userWithoutPassword });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch user.' });
  }
} 