import { db } from '../connection';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

export interface Media {
  id: string;
  filename: string;
  url: string;
  mime_type: string;
  uploaded_by: string;
  uploaded_at: Date;
  project_id?: string | null;
  page_id?: string | null;
}

export interface CreateMediaData {
  filename: string;
  url: string;
  mime_type: string;
  uploaded_by: string;
  project_id?: string | null;
  page_id?: string | null;
}

export const CreateMediaSchema = z.object({
  filename: z.string().min(1),
  url: z.string().url(),
  mime_type: z.string().min(1),
  uploaded_by: z.string().uuid(),
  project_id: z.string().uuid().nullable().optional(),
  page_id: z.string().uuid().nullable().optional(),
});

export class MediaModel {
  static findAll(filters?: {
    mime_type?: string;
    uploaded_by?: string;
    project_id?: string;
    page_id?: string;
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
    if (filters?.project_id) {
      conditions.push('project_id = ?');
      params.push(filters.project_id);
    }
    if (filters?.page_id) {
      conditions.push('page_id = ?');
      params.push(filters.page_id);
    }
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY uploaded_at DESC';
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
      uploaded_at: new Date(row.uploaded_at),
      project_id: row.project_id || null,
      page_id: row.page_id || null,
    }));
  }

  static findById(id: string): Media | null {
    const stmt = db.prepare('SELECT * FROM media WHERE id = ?');
    const row = stmt.get(id) as any;
    if (!row) return null;
    return {
      ...row,
      uploaded_at: new Date(row.uploaded_at),
      project_id: row.project_id || null,
      page_id: row.page_id || null,
    };
  }

  static create(data: CreateMediaData): Media {
    CreateMediaSchema.parse(data);
    const id = uuidv4();
    const now = new Date().toISOString();
    const stmt = db.prepare(`
      INSERT INTO media (
        id, filename, url, mime_type, uploaded_by, uploaded_at, project_id, page_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      id,
      data.filename,
      data.url,
      data.mime_type,
      data.uploaded_by,
      now,
      data.project_id || null,
      data.page_id || null
    );
    return {
      id,
      filename: data.filename,
      url: data.url,
      mime_type: data.mime_type,
      uploaded_by: data.uploaded_by,
      uploaded_at: new Date(now),
      project_id: data.project_id || null,
      page_id: data.page_id || null,
    };
  }

  static deleteById(id: string): boolean {
    const stmt = db.prepare('DELETE FROM media WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}
