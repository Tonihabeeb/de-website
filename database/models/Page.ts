import { v4 as uuidv4 } from 'uuid';
import { db } from '../connection';

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: any;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: Date;
  created_by?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreatePageData {
  slug: string;
  title: string;
  content: any;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  created_by?: string;
}

export interface UpdatePageData {
  slug?: string;
  title?: string;
  content?: any;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  status?: 'draft' | 'published' | 'archived';
  published_at?: Date;
}

export class PageModel {
  static async create(data: CreatePageData): Promise<Page> {
    const id = uuidv4();
    const now = new Date();

    const page: Page = {
      id,
      slug: data.slug,
      title: data.title,
      content: data.content,
      meta_title: data.meta_title,
      meta_description: data.meta_description,
      meta_keywords: data.meta_keywords,
      status: 'draft',
      created_by: data.created_by,
      created_at: now,
      updated_at: now,
    };

    const stmt = db.prepare(`
      INSERT INTO pages (
        id, slug, title, content, meta_title, meta_description, meta_keywords,
        status, created_by, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      page.id,
      page.slug,
      page.title,
      JSON.stringify(page.content),
      page.meta_title,
      page.meta_description,
      page.meta_keywords,
      page.status,
      page.created_by,
      page.created_at.toISOString(),
      page.updated_at.toISOString()
    );

    return page;
  }

  static async findById(id: string): Promise<Page | null> {
    const stmt = db.prepare('SELECT * FROM pages WHERE id = ?');
    const row = stmt.get(id) as any;

    if (!row) return null;

    return {
      ...row,
      content: JSON.parse(row.content),
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
      published_at: row.published_at ? new Date(row.published_at) : undefined,
    };
  }

  static async findBySlug(slug: string): Promise<Page | null> {
    const stmt = db.prepare('SELECT * FROM pages WHERE slug = ?');
    const row = stmt.get(slug) as any;

    if (!row) return null;

    return {
      ...row,
      content: JSON.parse(row.content),
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
      published_at: row.published_at ? new Date(row.published_at) : undefined,
    };
  }

  static async findAll(filters?: {
    status?: string;
    created_by?: string;
    limit?: number;
    offset?: number;
  }): Promise<Page[]> {
    let query = 'SELECT * FROM pages';
    const params: any[] = [];
    const conditions: string[] = [];

    if (filters?.status) {
      conditions.push('status = ?');
      params.push(filters.status);
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
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
      published_at: row.published_at ? new Date(row.published_at) : undefined,
    }));
  }

  static async update(id: string, data: UpdatePageData): Promise<Page | null> {
    const existing = await this.findById(id);
    if (!existing) return null;

    const updates: string[] = [];
    const params: any[] = [];

    if (data.slug !== undefined) {
      updates.push('slug = ?');
      params.push(data.slug);
    }

    if (data.title !== undefined) {
      updates.push('title = ?');
      params.push(data.title);
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

    if (data.status !== undefined) {
      updates.push('status = ?');
      params.push(data.status);

      if (data.status === 'published') {
        updates.push('published_at = ?');
        params.push(new Date().toISOString());
      }
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

  static async publish(id: string): Promise<Page | null> {
    return this.update(id, {
      status: 'published',
      published_at: new Date(),
    });
  }

  static async unpublish(id: string): Promise<Page | null> {
    return this.update(id, { status: 'draft' });
  }

  static async duplicate(
    id: string,
    created_by?: string
  ): Promise<Page | null> {
    const original = await this.findById(id);
    if (!original) return null;

    const newSlug = `${original.slug}-copy-${Date.now()}`;

    return this.create({
      slug: newSlug,
      title: `${original.title} (Copy)`,
      content: original.content,
      meta_title: original.meta_title,
      meta_description: original.meta_description,
      meta_keywords: original.meta_keywords,
      created_by,
    });
  }
}
