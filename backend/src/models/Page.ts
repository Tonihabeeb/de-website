import { v4 as uuidv4 } from 'uuid';
import { db } from '../connection';
import { z } from 'zod';

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  author_id: string;
  published: boolean;
  published_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreatePageData {
  title: string;
  slug: string;
  content: string;
  author_id: string;
  published?: boolean;
  published_at?: Date | null;
}

export interface UpdatePageData {
  title?: string;
  slug?: string;
  content?: string;
  published?: boolean;
  published_at?: Date | null;
}

export const CreatePageSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string(),
  author_id: z.string().uuid(),
  published: z.boolean().optional(),
  published_at: z.coerce.date().nullable().optional(),
});

export const UpdatePageSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
  published_at: z.coerce.date().nullable().optional(),
});

export class PageModel {
  static async create(data: CreatePageData): Promise<Page> {
    CreatePageSchema.parse(data);
    const id = uuidv4();
    const now = new Date();
    const published = data.published ? 1 : 0;
    const published_at = data.published_at ? data.published_at.toISOString() : null;
    const stmt = db.prepare(`
      INSERT INTO pages (
        id, title, slug, content, author_id, published, published_at, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      id,
      data.title,
      data.slug,
      data.content,
      data.author_id,
      published,
      published_at,
      now.toISOString(),
      now.toISOString()
    );
    return {
      id,
      title: data.title,
      slug: data.slug,
      content: data.content,
      author_id: data.author_id,
      published: !!published,
      published_at: data.published_at || null,
      created_at: now,
      updated_at: now,
    };
  }

  static async findById(id: string): Promise<Page | null> {
    const stmt = db.prepare('SELECT * FROM pages WHERE id = ?');
    const row = stmt.get(id) as any;
    if (!row) return null;
    return {
      ...row,
      published: Boolean(row.published),
      published_at: row.published_at ? new Date(row.published_at) : null,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  }

  static async findBySlug(slug: string): Promise<Page | null> {
    const stmt = db.prepare('SELECT * FROM pages WHERE slug = ?');
    const row = stmt.get(slug) as any;
    if (!row) return null;
    return {
      ...row,
      published: Boolean(row.published),
      published_at: row.published_at ? new Date(row.published_at) : null,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  }

  static async findAll(filters?: {
    published?: boolean;
    author_id?: string;
    limit?: number;
    offset?: number;
  }): Promise<Page[]> {
    let query = 'SELECT * FROM pages';
    const params: any[] = [];
    const conditions: string[] = [];
    if (filters?.published !== undefined) {
      conditions.push('published = ?');
      params.push(filters.published ? 1 : 0);
    }
    if (filters?.author_id) {
      conditions.push('author_id = ?');
      params.push(filters.author_id);
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
      published: Boolean(row.published),
      published_at: row.published_at ? new Date(row.published_at) : null,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    }));
  }

  static async update(id: string, data: UpdatePageData): Promise<Page | null> {
    UpdatePageSchema.parse(data);
    const existing = await this.findById(id);
    if (!existing) return null;
    const updates: string[] = [];
    const params: any[] = [];
    if (data.title !== undefined) {
      updates.push('title = ?');
      params.push(data.title);
    }
    if (data.slug !== undefined) {
      updates.push('slug = ?');
      params.push(data.slug);
    }
    if (data.content !== undefined) {
      updates.push('content = ?');
      params.push(data.content);
    }
    if (data.published !== undefined) {
      updates.push('published = ?');
      params.push(data.published ? 1 : 0);
    }
    if (data.published_at !== undefined) {
      updates.push('published_at = ?');
      params.push(data.published_at ? data.published_at.toISOString() : null);
    }
    updates.push('updated_at = ?');
    params.push(new Date().toISOString());
    params.push(id);
    const query = `UPDATE pages SET ${updates.join(', ')} WHERE id = ?`;
    const stmt = db.prepare(query);
    stmt.run(...params);
    return this.findById(id);
  }

  static async delete(id: string): Promise<boolean> {
    const stmt = db.prepare('DELETE FROM pages WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}
