import { v4 as uuidv4 } from 'uuid';
import { db } from '../connection';

export interface Project {
  id: string;
  name: string;
  slug: string;
  description?: string;
  content: any;
  status: 'planning' | 'in-progress' | 'completed' | 'cancelled';
  capacity_mw?: number;
  location?: string;
  start_date?: Date;
  end_date?: Date;
  budget?: number;
  budget_currency?: string;
  budget_status?: 'on_track' | 'over_budget' | 'under_budget' | 'unknown';
  risk_level?: 'low' | 'medium' | 'high' | 'critical';
  created_by?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProjectData {
  name: string;
  slug: string;
  description?: string;
  content: any;
  capacity_mw?: number;
  location?: string;
  start_date?: Date;
  end_date?: Date;
  budget?: number;
  budget_currency?: string;
  created_by?: string;
}

export interface UpdateProjectData {
  name?: string;
  slug?: string;
  description?: string;
  content?: any;
  status?: 'planning' | 'in-progress' | 'completed' | 'cancelled';
  capacity_mw?: number;
  location?: string;
  start_date?: Date;
  end_date?: Date;
  budget?: number;
  budget_currency?: string;
}

export class ProjectModel {
  static async create(data: CreateProjectData): Promise<Project> {
    const id = uuidv4();
    const now = new Date();

    const project: Project = {
      id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      content: data.content,
      status: 'planning',
      capacity_mw: data.capacity_mw,
      location: data.location,
      start_date: data.start_date,
      end_date: data.end_date,
      budget: data.budget,
      budget_currency: data.budget_currency || 'USD',
      created_by: data.created_by,
      created_at: now,
      updated_at: now,
    };

    const stmt = db.prepare(`
      INSERT INTO projects (
        id, name, slug, description, content, status, capacity_mw, location,
        start_date, end_date, budget, budget_currency, created_by, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      project.id,
      project.name,
      project.slug,
      project.description,
      JSON.stringify(project.content),
      project.status,
      project.capacity_mw,
      project.location,
      project.start_date?.toISOString().split('T')[0],
      project.end_date?.toISOString().split('T')[0],
      project.budget,
      project.budget_currency || 'USD',
      project.created_by,
      project.created_at.toISOString(),
      project.updated_at.toISOString()
    );

    return project;
  }

  static async findById(id: string): Promise<Project | null> {
    const stmt = db.prepare('SELECT * FROM projects WHERE id = ?');
    const row = stmt.get(id) as any;

    if (!row) return null;

    return {
      ...row,
      content: JSON.parse(row.content),
      start_date: row.start_date ? new Date(row.start_date) : undefined,
      end_date: row.end_date ? new Date(row.end_date) : undefined,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  }

  static async findBySlug(slug: string): Promise<Project | null> {
    const stmt = db.prepare('SELECT * FROM projects WHERE slug = ?');
    const row = stmt.get(slug) as any;

    if (!row) return null;

    return {
      ...row,
      content: JSON.parse(row.content),
      start_date: row.start_date ? new Date(row.start_date) : undefined,
      end_date: row.end_date ? new Date(row.end_date) : undefined,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  }

  static async findAll(filters?: {
    status?: string;
    location?: string;
    created_by?: string;
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

    if (filters?.location) {
      conditions.push('location = ?');
      params.push(filters.location);
    }

    if (filters?.created_by) {
      conditions.push('created_by = ?');
      params.push(filters.created_by);
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
      content: JSON.parse(row.content),
      start_date: row.start_date ? new Date(row.start_date) : undefined,
      end_date: row.end_date ? new Date(row.end_date) : undefined,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    }));
  }

  static async update(
    id: string,
    data: UpdateProjectData
  ): Promise<Project | null> {
    const existing = await this.findById(id);
    if (!existing) return null;

    const updates: string[] = [];
    const params: any[] = [];

    if (data.name !== undefined) {
      updates.push('name = ?');
      params.push(data.name);
    }

    if (data.slug !== undefined) {
      updates.push('slug = ?');
      params.push(data.slug);
    }

    if (data.description !== undefined) {
      updates.push('description = ?');
      params.push(data.description);
    }

    if (data.content !== undefined) {
      updates.push('content = ?');
      params.push(JSON.stringify(data.content));
    }

    if (data.status !== undefined) {
      updates.push('status = ?');
      params.push(data.status);
    }

    if (data.capacity_mw !== undefined) {
      updates.push('capacity_mw = ?');
      params.push(data.capacity_mw);
    }

    if (data.location !== undefined) {
      updates.push('location = ?');
      params.push(data.location);
    }

    if (data.start_date !== undefined) {
      updates.push('start_date = ?');
      params.push(data.start_date?.toISOString().split('T')[0]);
    }

    if (data.end_date !== undefined) {
      updates.push('end_date = ?');
      params.push(data.end_date?.toISOString().split('T')[0]);
    }

    if (data.budget !== undefined) {
      updates.push('budget = ?');
      params.push(data.budget);
    }

    if (data.budget_currency !== undefined) {
      updates.push('budget_currency = ?');
      params.push(data.budget_currency);
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

  static async updateStatus(
    id: string,
    status: Project['status']
  ): Promise<Project | null> {
    return this.update(id, { status });
  }

  static async getStats(): Promise<{
    total: number;
    planning: number;
    inProgress: number;
    completed: number;
    cancelled: number;
  }> {
    const stmt = db.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'planning' THEN 1 ELSE 0 END) as planning,
        SUM(CASE WHEN status = 'in-progress' THEN 1 ELSE 0 END) as inProgress,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled
      FROM projects
    `);

    const result = stmt.get() as any;
    return {
      total: result.total,
      planning: result.planning,
      inProgress: result.inProgress,
      completed: result.completed,
      cancelled: result.cancelled,
    };
  }
}
