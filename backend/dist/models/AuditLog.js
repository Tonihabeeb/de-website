"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogModel = exports.CreateAuditLogSchema = void 0;
const connection_1 = require("../connection");
const uuid_1 = require("uuid");
const zod_1 = require("zod");
exports.CreateAuditLogSchema = zod_1.z.object({
    user_id: zod_1.z.string().uuid().nullable().optional(),
    action: zod_1.z.string().min(1),
    target_type: zod_1.z.string().optional(),
    target_id: zod_1.z.string().uuid().optional(),
    details: zod_1.z.string().optional(),
});
class AuditLogModel {
    static create(data) {
        exports.CreateAuditLogSchema.parse(data);
        const id = (0, uuid_1.v4)();
        const now = new Date().toISOString();
        const stmt = connection_1.db.prepare(`
      INSERT INTO audit_logs (
        id, user_id, action, target_type, target_id, details, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
        stmt.run(id, data.user_id || null, data.action, data.target_type || null, data.target_id || null, data.details || null, now);
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
    static findAll(filters) {
        let query = 'SELECT * FROM audit_logs';
        const params = [];
        const conditions = [];
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
        const stmt = connection_1.db.prepare(query);
        const rows = stmt.all(...params);
        return rows.map(row => ({
            ...row,
            created_at: new Date(row.created_at),
        }));
    }
    static findById(id) {
        const stmt = connection_1.db.prepare('SELECT * FROM audit_logs WHERE id = ?');
        const row = stmt.get(id);
        if (!row)
            return null;
        return {
            ...row,
            created_at: new Date(row.created_at),
        };
    }
}
exports.AuditLogModel = AuditLogModel;
