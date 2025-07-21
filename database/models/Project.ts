import { v4 as uuidv4 } from 'uuid';
import { db } from '../connection';

export interface Project {
  id: string;
  name: string;
  slug: string;
  description?: string;
  content: any;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  status: 'planning' | 'in-progress' | 'completed' | 'cancelled';
  capacity_mw?: number;
  location?: string;
  start_date?: Date;
  end_date?: Date;
  budget?: number;
  budget_currency?: string;
  budget_status?: 'on_track' | 'over_budget' | 'under_budget' | 'unknown';
  risk_level?: 'low' | 'medium' | 'high' | 'critical';
  publish_at?: Date | null;
  unpublish_at?: Date | null;
  created_by?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProjectData {
  name: string;
  slug: string;
  description?: string;
  content: any;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  capacity_mw?: number;
  location?: string;
  start_date?: Date;
  end_date?: Date;
  budget?: number;
  budget_currency?: string;
  publish_at?: Date | null;
  unpublish_at?: Date | null;
  created_by?: string;
}

export interface UpdateProjectData {
  name?: string;
  slug?: string;
  description?: string;
  content?: any;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  status?: 'planning' | 'in-progress' | 'completed' | 'cancelled';
  capacity_mw?: number;
  location?: string;
  start_date?: Date;
  end_date?: Date;
  budget?: number;
  budget_currency?: string;
  publish_at?: Date | null;
  unpublish_at?: Date | null;
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
      meta_title: data.meta_title,
      meta_description: data.meta_description,
      meta_keywords: data.meta_keywords,
      og_title: data.og_title,
      og_description: data.og_description,
      og_image: data.og_image,
      twitter_title: data.twitter_title,
      twitter_description: data.twitter_description,
      twitter_image: data.twitter_image,
      status: 'planning',
      capacity_mw: data.capacity_mw,
      location: data.location,
      start_date: data.start_date,
      end_date: data.end_date,
      budget: data.budget,
      budget_currency: data.budget_currency || 'USD',
      publish_at: data.publish_at || null,
      unpublish_at: data.unpublish_at || null,
      created_by: data.created_by,
      created_at: now,
      updated_at: now,
    };

    const stmt = db.prepare(`
      INSERT INTO projects (
        id, name, slug, description, content, meta_title, meta_description, meta_keywords,
        og_title, og_description, og_image, twitter_title, twitter_description, twitter_image,
        status, capacity_mw, location, start_date, end_date, budget, budget_currency, publish_at, unpublish_at, created_by, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      project.id,
      project.name,
      project.slug,
      project.description,
      JSON.stringify(project.content),
      project.meta_title,
      project.meta_description,
      project.meta_keywords,
      project.og_title,
      project.og_description,
      project.og_image,
      project.twitter_title,
      project.twitter_description,
      project.twitter_image,
      project.status,
      project.capacity_mw,
      project.location,
      project.start_date?.toISOString().split('T')[0],
      project.end_date?.toISOString().split('T')[0],
      project.budget,
      project.budget_currency || 'USD',
      project.publish_at ? project.publish_at.toISOString() : null,
      project.unpublish_at ? project.unpublish_at.toISOString() : null,
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
      publish_at: row.publish_at ? new Date(row.publish_at) : null,
      unpublish_at: row.unpublish_at ? new Date(row.unpublish_at) : null,
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
      publish_at: row.publish_at ? new Date(row.publish_at) : null,
      unpublish_at: row.unpublish_at ? new Date(row.unpublish_at) : null,
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
      publish_at: row.publish_at ? new Date(row.publish_at) : null,
      unpublish_at: row.unpublish_at ? new Date(row.unpublish_at) : null,
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

    if (data.meta_title !== undefined) {
      updates.push('meta_title = ?');
      params.push(data.meta_title);
    }
    if (data.meta_description !== undefined) {
      updates.push('meta_description = ?');
      params.push(data.meta_description);
    }
    if (data.meta_keywords !== undefined) {
      updates.push('meta_keywords = ?');
      params.push(data.meta_keywords);
    }
    if (data.og_title !== undefined) {
      updates.push('og_title = ?');
      params.push(data.og_title);
    }
    if (data.og_description !== undefined) {
      updates.push('og_description = ?');
      params.push(data.og_description);
    }
    if (data.og_image !== undefined) {
      updates.push('og_image = ?');
      params.push(data.og_image);
    }
    if (data.twitter_title !== undefined) {
      updates.push('twitter_title = ?');
      params.push(data.twitter_title);
    }
    if (data.twitter_description !== undefined) {
      updates.push('twitter_description = ?');
      params.push(data.twitter_description);
    }
    if (data.twitter_image !== undefined) {
      updates.push('twitter_image = ?');
      params.push(data.twitter_image);
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
    if (data.publish_at !== undefined) {
      updates.push('publish_at = ?');
      params.push(data.publish_at ? data.publish_at.toISOString() : null);
    }
    if (data.unpublish_at !== undefined) {
      updates.push('unpublish_at = ?');
      params.push(data.unpublish_at ? data.unpublish_at.toISOString() : null);
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
