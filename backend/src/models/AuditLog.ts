import { db } from '../connection';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

export interface AuditLog {
  id: string;
  user_id?: string | null;
  action: string;
  target_type?: string | null;
  target_id?: string | null;
  details?: string | null;
  created_at: Date;
}

export interface CreateAuditLogData {
  user_id?: string | null;
  action: string;
  target_type?: string | null;
  target_id?: string | null;
  details?: string | null;
}

export const CreateAuditLogSchema = z.object({
  user_id: z.string().uuid().nullable().optional(),
  action: z.string().min(1),
  target_type: z.string().optional(),
  target_id: z.string().uuid().optional(),
  details: z.string().optional(),
});

export class AuditLogModel {
  static create(data: CreateAuditLogData): AuditLog {
    CreateAuditLogSchema.parse(data);
    const id = uuidv4();
    const now = new Date().toISOString();
    const stmt = db.prepare(`
      INSERT INTO audit_logs (
        id, user_id, action, target_type, target_id, details, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      id,
      data.user_id || null,
      data.action,
      data.target_type || null,
      data.target_id || null,
      data.details || null,
      now
    );
    return {
      id,
      user_id: data.user_id || null,
      action: data.action,
      target_type: data.target_type || null,
      target_id: data.target_id || null,
      details: data.details || null,
      created_at: new Date(now),
    };
  }

  static findAll(filters?: {
    user_id?: string;
    action?: string;
    target_type?: string;
    target_id?: string;
    limit?: number;
    offset?: number;
  }): AuditLog[] {
    let query = 'SELECT * FROM audit_logs';
    const params: any[] = [];
    const conditions: string[] = [];
    if (filters?.user_id) {
      conditions.push('user_id = ?');
      params.push(filters.user_id);
    }
    if (filters?.action) {
      conditions.push('action = ?');
      params.push(filters.action);
    }
    if (filters?.target_type) {
      conditions.push('target_type = ?');
      params.push(filters.target_type);
    }
    if (filters?.target_id) {
      conditions.push('target_id = ?');
      params.push(filters.target_id);
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
    }));
  }

  static findById(id: string): AuditLog | null {
    const stmt = db.prepare('SELECT * FROM audit_logs WHERE id = ?');
    const row = stmt.get(id) as any;
    if (!row) return null;
    return {
      ...row,
      created_at: new Date(row.created_at),
    };
  }
}