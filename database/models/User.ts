import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { db } from '../connection';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  EDITOR = 'editor',
  AUTHOR = 'author',
  USER = 'user'
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  is_active: boolean;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  is_active?: boolean;
}

export interface UserPermissions {
  // Content Management
  canCreatePages: boolean;
  canEditPages: boolean;
  canViewPages: boolean;
  canDeletePages: boolean;
  canPublishPages: boolean;
  
  // Project Management
  canCreateProjects: boolean;
  canEditProjects: boolean;
  canViewProjects: boolean;
  canDeleteProjects: boolean;
  
  // User Management
  canCreateUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canAssignRoles: boolean;
  
  // System Management
  canManageSettings: boolean;
  canManageNavigation: boolean;
  canManageMedia: boolean;
  canViewAnalytics: boolean;
}

export class UserModel {
  static async create(data: CreateUserData): Promise<User> {
    const id = uuidv4();
    const now = new Date();
    const hashedPassword = await bcrypt.hash(data.password, 12);
    
    const user: User = {
      id,
      name: data.name,
      email: data.email.toLowerCase(),
      password: hashedPassword,
      role: data.role || UserRole.USER,
      is_active: true,
      created_at: now,
      updated_at: now,
    };

    const stmt = db.prepare(`
      INSERT INTO users (
        id, name, email, password, role, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role,
      user.is_active ? 1 : 0,
      user.created_at.toISOString(),
      user.updated_at.toISOString()
    );

    return user;
  }

  static async findById(id: string): Promise<User | null> {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const row = stmt.get(id) as any;
    
    if (!row) return null;
    
    return {
      ...row,
      is_active: Boolean(row.is_active),
      last_login: row.last_login ? new Date(row.last_login) : undefined,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  }

  static async findByEmail(email: string): Promise<User | null> {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const row = stmt.get(email.toLowerCase()) as any;
    
    if (!row) return null;
    
    return {
      ...row,
      is_active: Boolean(row.is_active),
      last_login: row.last_login ? new Date(row.last_login) : undefined,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  }

  static async findAll(filters?: {
    role?: UserRole;
    is_active?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<User[]> {
    let query = 'SELECT * FROM users';
    const params: any[] = [];
    const conditions: string[] = [];

    if (filters?.role) {
      conditions.push('role = ?');
      params.push(filters.role);
    }

    if (filters?.is_active !== undefined) {
      conditions.push('is_active = ?');
      params.push(filters.is_active ? 1 : 0);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    if (filters?.limit) {
      query += ' LIMIT ?';
      params.push(filters.limit);
    }

    if (filters?.offset) {
      query += ' OFFSET ?';
      params.push(filters.offset);
    }

    const stmt = db.prepare(query);
    const rows = stmt.all(...params) as any[];
    
    return rows.map(row => ({
      ...row,
      is_active: Boolean(row.is_active),
      last_login: row.last_login ? new Date(row.last_login) : undefined,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    }));
  }

  static async update(id: string, data: UpdateUserData): Promise<User | null> {
    const existing = await this.findById(id);
    if (!existing) return null;

    const updates: string[] = [];
    const params: any[] = [];

    if (data.name !== undefined) {
      updates.push('name = ?');
      params.push(data.name);
    }

    if (data.email !== undefined) {
      updates.push('email = ?');
      params.push(data.email.toLowerCase());
    }

    if (data.password !== undefined) {
      updates.push('password = ?');
      params.push(await bcrypt.hash(data.password, 12));
    }

    if (data.role !== undefined) {
      updates.push('role = ?');
      params.push(data.role);
    }

    if (data.is_active !== undefined) {
      updates.push('is_active = ?');
      params.push(data.is_active ? 1 : 0);
    }

    updates.push('updated_at = ?');
    params.push(new Date().toISOString());
    params.push(id);

    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    const stmt = db.prepare(query);
    stmt.run(...params);

    return this.findById(id);
  }

  static async delete(id: string): Promise<boolean> {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  static async updateLastLogin(id: string): Promise<void> {
    const stmt = db.prepare('UPDATE users SET last_login = ? WHERE id = ?');
    stmt.run(new Date().toISOString(), id);
  }

  static async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  static async changePassword(id: string, newPassword: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const stmt = db.prepare('UPDATE users SET password = ?, updated_at = ? WHERE id = ?');
    const result = stmt.run(hashedPassword, new Date().toISOString(), id);
    return result.changes > 0;
  }

  static async getPermissions(userId: string): Promise<UserPermissions> {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const permissions: UserPermissions = {
      // Content Management
      canCreatePages: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR, UserRole.AUTHOR].includes(user.role),
      canEditPages: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR, UserRole.AUTHOR].includes(user.role),
      canViewPages: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR, UserRole.AUTHOR].includes(user.role),
      canDeletePages: [UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(user.role),
      canPublishPages: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR].includes(user.role),
      
      // Project Management
      canCreateProjects: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR].includes(user.role),
      canEditProjects: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR].includes(user.role),
      canViewProjects: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR].includes(user.role),
      canDeleteProjects: [UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(user.role),
      
      // User Management
      canCreateUsers: [UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(user.role),
      canEditUsers: [UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(user.role),
      canDeleteUsers: [UserRole.SUPER_ADMIN].includes(user.role),
      canAssignRoles: [UserRole.SUPER_ADMIN].includes(user.role),
      
      // System Management
      canManageSettings: [UserRole.SUPER_ADMIN].includes(user.role),
      canManageNavigation: [UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(user.role),
      canManageMedia: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR].includes(user.role),
      canViewAnalytics: [UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(user.role),
    };

    return permissions;
  }

  static async hasPermission(userId: string, permission: keyof UserPermissions): Promise<boolean> {
    const permissions = await this.getPermissions(userId);
    return permissions[permission];
  }

  static async hasRole(userId: string, role: UserRole): Promise<boolean> {
    const user = await this.findById(userId);
    return user?.role === role;
  }

  static async createSuperAdmin(data: { name: string; email: string; password: string }): Promise<User> {
    // Check if super admin already exists
    const existingSuperAdmin = await this.findAll({ role: UserRole.SUPER_ADMIN });
    if (existingSuperAdmin.length > 0) {
      throw new Error('Super admin already exists');
    }

    return this.create({
      ...data,
      role: UserRole.SUPER_ADMIN,
    });
  }

  static async getStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    roleDistribution: Record<UserRole, number>;
  }> {
    const stmt = db.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active,
        SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) as inactive,
        SUM(CASE WHEN role = 'super_admin' THEN 1 ELSE 0 END) as super_admin,
        SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) as admin,
        SUM(CASE WHEN role = 'editor' THEN 1 ELSE 0 END) as editor,
        SUM(CASE WHEN role = 'author' THEN 1 ELSE 0 END) as author,
        SUM(CASE WHEN role = 'user' THEN 1 ELSE 0 END) as user
      FROM users
    `);
    
    const result = stmt.get() as any;
    return {
      total: result.total,
      active: result.active,
      inactive: result.inactive,
      roleDistribution: {
        [UserRole.SUPER_ADMIN]: result.super_admin,
        [UserRole.ADMIN]: result.admin,
        [UserRole.EDITOR]: result.editor,
        [UserRole.AUTHOR]: result.author,
        [UserRole.USER]: result.user,
      },
    };
  }
} 