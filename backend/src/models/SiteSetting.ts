import { db } from '../connection';
import { v4 as uuidv4 } from 'uuid';

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updated_at: Date;
}

export interface CreateSiteSettingData {
  key: string;
  value: string;
}

export interface UpdateSiteSettingData {
  value: string;
}

export class SiteSettingModel {
  static create(data: CreateSiteSettingData): SiteSetting {
    const id = uuidv4();
    const now = new Date().toISOString();
    const stmt = db.prepare(`
      INSERT INTO site_settings (
        id, key, value, updated_at
      ) VALUES (?, ?, ?, ?)
    `);
    stmt.run(id, data.key, data.value, now);
    return {
      id,
      key: data.key,
      value: data.value,
      updated_at: new Date(now),
    };
  }

  static findAll(): SiteSetting[] {
    const stmt = db.prepare('SELECT * FROM site_settings ORDER BY key ASC');
    const rows = stmt.all() as any[];
    return rows.map(row => ({
      ...row,
      updated_at: new Date(row.updated_at),
    }));
  }

  static findByKey(key: string): SiteSetting | null {
    const stmt = db.prepare('SELECT * FROM site_settings WHERE key = ?');
    const row = stmt.get(key) as any;
    if (!row) return null;
    return {
      ...row,
      updated_at: new Date(row.updated_at),
    };
  }

  static update(key: string, data: UpdateSiteSettingData): SiteSetting | null {
    const now = new Date().toISOString();
    const stmt = db.prepare('UPDATE site_settings SET value = ?, updated_at = ? WHERE key = ?');
    stmt.run(data.value, now, key);
    return this.findByKey(key);
  }

  static deleteByKey(key: string): boolean {
    const stmt = db.prepare('DELETE FROM site_settings WHERE key = ?');
    const result = stmt.run(key);
    return result.changes > 0;
  }
} 