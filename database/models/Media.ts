import { db } from '../connection';
import { v4 as uuidv4 } from 'uuid';

export interface Media {
  id: string;
  filename: string;
  original_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  alt_text?: string;
  caption?: string;
  tags?: string[];
  uploaded_by?: string;
  created_at: string;
}

export class MediaModel {
  static findAll(filters?: {
    mime_type?: string;
    uploaded_by?: string;
    tags?: string[];
    alt_text?: string;
    caption?: string;
    limit?: number;
    offset?: number;
  }): Media[] {
    let query = 'SELECT * FROM media';
    const params: any[] = [];
    const conditions: string[] = [];

    if (filters?.mime_type) {
      conditions.push('mime_type = ?');
      params.push(filters.mime_type);
    }
    if (filters?.uploaded_by) {
      conditions.push('uploaded_by = ?');
      params.push(filters.uploaded_by);
    }
    if (filters?.alt_text) {
      conditions.push('alt_text LIKE ?');
      params.push(`%${filters.alt_text}%`);
    }
    if (filters?.caption) {
      conditions.push('caption LIKE ?');
      params.push(`%${filters.caption}%`);
    }
    // Tags filter (simple JSON LIKE, not efficient for large data)
    if (filters?.tags && filters.tags.length > 0) {
      filters.tags.forEach(tag => {
        conditions.push('tags LIKE ?');
        params.push(`%${tag}%`);
      });
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
      tags: row.tags ? JSON.parse(row.tags) : [],
      file_size: Number(row.file_size),
      created_at: row.created_at,
    }));
  }

  static findById(id: string): Media | null {
    const stmt = db.prepare('SELECT * FROM media WHERE id = ?');
    const row = stmt.get(id) as any;
    if (!row) return null;
    return {
      ...row,
      tags: row.tags ? JSON.parse(row.tags) : [],
      file_size: Number(row.file_size),
      created_at: row.created_at,
    };
  }

  static create(data: Omit<Media, 'id' | 'created_at'>): Media {
    const id = uuidv4();
    const now = new Date().toISOString();
    const stmt = db.prepare(`
      INSERT INTO media (
        id, filename, original_name, file_path, file_size, mime_type, alt_text, caption, tags, uploaded_by, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      id,
      data.filename,
      data.original_name,
      data.file_path,
      data.file_size,
      data.mime_type,
      data.alt_text || '',
      data.caption || '',
      data.tags ? JSON.stringify(data.tags) : '[]',
      data.uploaded_by || null,
      now
    );
    return {
      id,
      ...data,
      tags: data.tags || [],
      created_at: now,
    };
  }

  static updateMetadata(
    id: string,
    data: { alt_text?: string; caption?: string; tags?: string[] }
  ): Media | null {
    const updates: string[] = [];
    const params: any[] = [];
    if (data.alt_text !== undefined) {
      updates.push('alt_text = ?');
      params.push(data.alt_text);
    }
    if (data.caption !== undefined) {
      updates.push('caption = ?');
      params.push(data.caption);
    }
    if (data.tags !== undefined) {
      updates.push('tags = ?');
      params.push(JSON.stringify(data.tags));
    }
    if (updates.length === 0) return this.findById(id);
    params.push(id);
    const query = `UPDATE media SET ${updates.join(', ')} WHERE id = ?`;
    const stmt = db.prepare(query);
    stmt.run(...params);
    return this.findById(id);
  }

  static deleteById(id: string): boolean {
    const stmt = db.prepare('DELETE FROM media WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}
