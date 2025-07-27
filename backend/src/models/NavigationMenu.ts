import { db } from '../connection';
import { v4 as uuidv4 } from 'uuid';

export interface NavigationMenu {
  id: string;
  name: string;
  items_json: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateNavigationMenuData {
  name: string;
  items_json: string;
}

export interface UpdateNavigationMenuData {
  name?: string;
  items_json?: string;
}

export class NavigationMenuModel {
  static create(data: CreateNavigationMenuData): NavigationMenu {
    const id = uuidv4();
    const now = new Date().toISOString();
    const stmt = db.prepare(`
      INSERT INTO navigation_menus (
        id, name, items_json, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(id, data.name, data.items_json, now, now);
    return {
      id,
      name: data.name,
      items_json: data.items_json,
      created_at: new Date(now),
      updated_at: new Date(now),
    };
  }

  static findAll(): NavigationMenu[] {
    const stmt = db.prepare('SELECT * FROM navigation_menus ORDER BY created_at DESC');
    const rows = stmt.all() as any[];
    return rows.map(row => ({
      ...row,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    }));
  }

  static findById(id: string): NavigationMenu | null {
    const stmt = db.prepare('SELECT * FROM navigation_menus WHERE id = ?');
    const row = stmt.get(id) as any;
    if (!row) return null;
    return {
      ...row,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  }

  static update(id: string, data: UpdateNavigationMenuData): NavigationMenu | null {
    const existing = this.findById(id);
    if (!existing) return null;
    const updates: string[] = [];
    const params: any[] = [];
    if (data.name !== undefined) {
      updates.push('name = ?');
      params.push(data.name);
    }
    if (data.items_json !== undefined) {
      updates.push('items_json = ?');
      params.push(data.items_json);
    }
    updates.push('updated_at = ?');
    params.push(new Date().toISOString());
    params.push(id);
    const query = `UPDATE navigation_menus SET ${updates.join(', ')} WHERE id = ?`;
    const stmt = db.prepare(query);
    stmt.run(...params);
    return this.findById(id);
  }

  static deleteById(id: string): boolean {
    const stmt = db.prepare('DELETE FROM navigation_menus WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
} 