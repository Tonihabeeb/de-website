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
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: Date;
  publish_at?: Date | null;
  unpublish_at?: Date | null;
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
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  publish_at?: Date | null;
  unpublish_at?: Date | null;
  created_by?: string;
}

export interface UpdatePageData {
  slug?: string;
  title?: string;
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
  status?: 'draft' | 'published' | 'archived';
  published_at?: Date;
  publish_at?: Date | null;
  unpublish_at?: Date | null;
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
      og_title: data.og_title,
      og_description: data.og_description,
      og_image: data.og_image,
      twitter_title: data.twitter_title,
      twitter_description: data.twitter_description,
      twitter_image: data.twitter_image,
      status: 'draft',
      publish_at: data.publish_at || null,
      unpublish_at: data.unpublish_at || null,
      created_by: data.created_by,
      created_at: now,
      updated_at: now,
    };

    const stmt = db.prepare(`
      INSERT INTO pages (
        id, slug, title, content, meta_title, meta_description, meta_keywords,
        og_title, og_description, og_image, twitter_title, twitter_description, twitter_image,
        status, publish_at, unpublish_at, created_by, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      page.id,
      page.slug,
      page.title,
      JSON.stringify(page.content),
      page.meta_title,
      page.meta_description,
      page.meta_keywords,
      page.og_title,
      page.og_description,
      page.og_image,
      page.twitter_title,
      page.twitter_description,
      page.twitter_image,
      page.status,
      page.publish_at ? page.publish_at.toISOString() : null,
      page.unpublish_at ? page.unpublish_at.toISOString() : null,
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
      publish_at: row.publish_at ? new Date(row.publish_at) : null,
      unpublish_at: row.unpublish_at ? new Date(row.unpublish_at) : null,
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
      publish_at: row.publish_at ? new Date(row.publish_at) : null,
      unpublish_at: row.unpublish_at ? new Date(row.unpublish_at) : null,
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
      publish_at: row.publish_at ? new Date(row.publish_at) : null,
      unpublish_at: row.unpublish_at ? new Date(row.unpublish_at) : null,
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

      if (data.status === 'published') {
        updates.push('published_at = ?');
        params.push(new Date().toISOString());
      }
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
      og_title: original.og_title,
      og_description: original.og_description,
      og_image: original.og_image,
      twitter_title: original.twitter_title,
      twitter_description: original.twitter_description,
      twitter_image: original.twitter_image,
      created_by,
    });
  }
}
