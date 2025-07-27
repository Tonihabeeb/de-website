import { v4 as uuidv4 } from 'uuid';
import { db } from '../connection';
import { z } from 'zod';

export type ProjectStatus = 'active' | 'archived' | 'completed' | 'on_hold' | 'cancelled';

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProjectData {
  name: string;
  description?: string;
  owner_id: string;
  status?: ProjectStatus;
}

export interface UpdateProjectData {
  name?: string;
  description?: string;
  status?: ProjectStatus;
}

export const CreateProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  owner_id: z.string().uuid(),
  status: z.enum(['active', 'archived', 'completed', 'on_hold', 'cancelled']).optional(),
});

export const UpdateProjectSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['active', 'archived', 'completed', 'on_hold', 'cancelled']).optional(),
});

export class ProjectModel {
  static async create(data: CreateProjectData): Promise<Project> {
    CreateProjectSchema.parse(data);
    const id = uuidv4();
    const now = new Date();
    const status = data.status || 'active';
    const stmt = db.prepare(`
      INSERT INTO projects (
        id, name, description, status, owner_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      id,
      data.name,
      data.description,
      status,
      data.owner_id,
      now.toISOString(),
      now.toISOString()
    );
    return {
      id,
      name: data.name,
      description: data.description,
      status,
      owner_id: data.owner_id,
      created_at: now,
      updated_at: now,
    };
  }

  static async findById(id: string): Promise<Project | null> {
    const stmt = db.prepare('SELECT * FROM projects WHERE id = ?');
    const row = stmt.get(id) as any;
    if (!row) return null;
    return {
      ...row,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  }

  static async findAll(filters?: {
    status?: ProjectStatus;
    owner_id?: string;
    limit?: number;
    offset?: number;
  }): Promise<Project[]> {
    let query = 'SELECT * FROM projects';
    const params: any[] = [];
    const conditions: string[] = [];
    if (filters?.status) {
      conditions.push('status = ?');
      params.push(filters.status);
    }
    if (filters?.owner_id) {
      conditions.push('owner_id = ?');
      params.push(filters.owner_id);
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
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    }));
  }

  static async update(id: string, data: UpdateProjectData): Promise<Project | null> {
    UpdateProjectSchema.parse(data);
    const existing = await this.findById(id);
    if (!existing) return null;
    const updates: string[] = [];
    const params: any[] = [];
    if (data.name !== undefined) {
      updates.push('name = ?');
      params.push(data.name);
    }
    if (data.description !== undefined) {
      updates.push('description = ?');
      params.push(data.description);
    }
    if (data.status !== undefined) {
      updates.push('status = ?');
      params.push(data.status);
    }
    updates.push('updated_at = ?');
    params.push(new Date().toISOString());
    params.push(id);
    const query = `UPDATE projects SET ${updates.join(', ')} WHERE id = ?`;
    const stmt = db.prepare(query);
    stmt.run(...params);
    return this.findById(id);
  }

  static async delete(id: string): Promise<boolean> {
    const stmt = db.prepare('DELETE FROM projects WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}
