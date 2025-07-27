import { Request, Response } from 'express';
import { UserModel, CreateUserSchema, UpdateUserSchema, UserRole } from '../models/User';

export async function listUsers(req: Request, res: Response) {
  try {
    const { role, is_active, limit, offset } = req.query;
    const users = await UserModel.findAll({
      role: role as UserRole,
      is_active: is_active !== undefined ? is_active === 'true' : undefined,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });
    res.json(users.map(({ password_hash, ...u }) => u));
  } catch (err) {
    res.status(500).json({ error: 'Failed to list users' });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const { password_hash, ...userSafe } = user;
    res.json(userSafe);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get user' });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const data = CreateUserSchema.parse(req.body);
    const existing = await UserModel.findByEmail(data.email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const user = await UserModel.create(data);
    const { password_hash, ...userSafe } = user;
    res.status(201).json(userSafe);
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const data = UpdateUserSchema.parse(req.body);
    const user = await UserModel.update(req.params.id, data);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const { password_hash, ...userSafe } = user;
    res.json(userSafe);
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Failed to update user' });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const ok = await UserModel.delete(req.params.id);
    if (!ok) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

export async function changeUserRole(req: Request, res: Response) {
  try {
    const { role } = req.body;
    if (!role || !Object.values(UserRole).includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    const user = await UserModel.update(req.params.id, { role });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const { password_hash, ...userSafe } = user;
    res.json(userSafe);
  } catch (err) {
    res.status(500).json({ error: 'Failed to change user role' });
  }
}

export async function setUserActive(req: Request, res: Response) {
  try {
    const { is_active } = req.body;
    if (typeof is_active !== 'boolean') {
      return res.status(400).json({ error: 'is_active must be boolean' });
    }
    const user = await UserModel.update(req.params.id, { is_active });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const { password_hash, ...userSafe } = user;
    res.json(userSafe);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user active status' });
  }
} 