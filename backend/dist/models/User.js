"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UpdateUserSchema = exports.CreateUserSchema = exports.UserRole = void 0;
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const connection_1 = require("../connection");
const zod_1 = require("zod");
var UserRole;
(function (UserRole) {
    UserRole["SUPER_ADMIN"] = "superadmin";
    UserRole["ADMIN"] = "admin";
    UserRole["EDITOR"] = "editor";
    UserRole["AUTHOR"] = "author";
    UserRole["USER"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
exports.CreateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    role: zod_1.z.enum([
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.EDITOR,
        UserRole.AUTHOR,
        UserRole.USER,
    ]).optional(),
});
exports.UpdateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(6).optional(),
    role: zod_1.z.enum([
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.EDITOR,
        UserRole.AUTHOR,
        UserRole.USER,
    ]).optional(),
    is_active: zod_1.z.boolean().optional(),
});
class UserModel {
    static async create(data) {
        exports.CreateUserSchema.parse(data);
        const id = (0, uuid_1.v4)();
        const now = new Date();
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 12);
        const user = {
            id,
            name: data.name,
            email: data.email.toLowerCase(),
            password_hash: hashedPassword,
            role: data.role || UserRole.USER,
            is_active: true,
            created_at: now,
            updated_at: now,
        };
        const stmt = connection_1.db.prepare(`
      INSERT INTO users (
        id, name, email, password_hash, role, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
        stmt.run(user.id, user.name, user.email, user.password_hash, user.role, user.is_active ? 1 : 0, user.created_at.toISOString(), user.updated_at.toISOString());
        return user;
    }
    static async findById(id) {
        const stmt = connection_1.db.prepare('SELECT * FROM users WHERE id = ?');
        const row = stmt.get(id);
        if (!row)
            return null;
        return {
            ...row,
            is_active: Boolean(row.is_active),
            last_login: row.last_login ? new Date(row.last_login) : undefined,
            created_at: new Date(row.created_at),
            updated_at: new Date(row.updated_at),
        };
    }
    static async findByEmail(email) {
        const stmt = connection_1.db.prepare('SELECT * FROM users WHERE email = ?');
        const row = stmt.get(email.toLowerCase());
        if (!row)
            return null;
        return {
            ...row,
            is_active: Boolean(row.is_active),
            last_login: row.last_login ? new Date(row.last_login) : undefined,
            created_at: new Date(row.created_at),
            updated_at: new Date(row.updated_at),
        };
    }
    static async findAll(filters) {
        let query = 'SELECT * FROM users';
        const params = [];
        const conditions = [];
        if (filters?.role) {
            conditions.push('role = ?');
            params.push(filters.role);
        }
        if (filters?.is_active !== undefined) {
            conditions.push('is_active = ?');
            params.push(filters.is_active ? 1 : 0);
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
            is_active: Boolean(row.is_active),
            last_login: row.last_login ? new Date(row.last_login) : undefined,
            created_at: new Date(row.created_at),
            updated_at: new Date(row.updated_at),
        }));
    }
    static async update(id, data) {
        exports.UpdateUserSchema.parse(data);
        const existing = await this.findById(id);
        if (!existing)
            return null;
        const updates = [];
        const params = [];
        if (data.name !== undefined) {
            updates.push('name = ?');
            params.push(data.name);
        }
        if (data.email !== undefined) {
            updates.push('email = ?');
            params.push(data.email.toLowerCase());
        }
        if (data.password !== undefined) {
            updates.push('password_hash = ?');
            params.push(await bcryptjs_1.default.hash(data.password, 12));
        }
        if (data.role !== undefined) {
            updates.push('role = ?');
            params.push(data.role);
        }
        if (data.is_active !== undefined) {
            updates.push('is_active = ?');
            params.push(data.is_active ? 1 : 0);
        }
        updates.push('updated_at = ?');
        params.push(new Date().toISOString());
        params.push(id);
        const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
        const stmt = connection_1.db.prepare(query);
        stmt.run(...params);
        return this.findById(id);
    }
    static async delete(id) {
        const stmt = connection_1.db.prepare('DELETE FROM users WHERE id = ?');
        const result = stmt.run(id);
        return result.changes > 0;
    }
    static async updateLastLogin(id) {
        const stmt = connection_1.db.prepare('UPDATE users SET last_login = ? WHERE id = ?');
        stmt.run(new Date().toISOString(), id);
    }
    static async verifyPassword(user, password) {
        return bcryptjs_1.default.compare(password, user.password_hash);
    }
    static async changePassword(id, newPassword) {
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 12);
        const stmt = connection_1.db.prepare('UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?');
        const result = stmt.run(hashedPassword, new Date().toISOString(), id);
        return result.changes > 0;
    }
    static async getPermissions(userId) {
        const user = await this.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const permissions = {
            // Content Management
            canCreatePages: [
                UserRole.SUPER_ADMIN,
                UserRole.ADMIN,
                UserRole.EDITOR,
                UserRole.AUTHOR,
            ].includes(user.role),
            canEditPages: [
                UserRole.SUPER_ADMIN,
                UserRole.ADMIN,
                UserRole.EDITOR,
                UserRole.AUTHOR,
            ].includes(user.role),
            canViewPages: [
                UserRole.SUPER_ADMIN,
                UserRole.ADMIN,
                UserRole.EDITOR,
                UserRole.AUTHOR,
            ].includes(user.role),
            canDeletePages: [UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(user.role),
            canPublishPages: [
                UserRole.SUPER_ADMIN,
                UserRole.ADMIN,
                UserRole.EDITOR,
            ].includes(user.role),
            // Project Management
            canCreateProjects: [
                UserRole.SUPER_ADMIN,
                UserRole.ADMIN,
                UserRole.EDITOR,
            ].includes(user.role),
            canEditProjects: [
                UserRole.SUPER_ADMIN,
                UserRole.ADMIN,
                UserRole.EDITOR,
            ].includes(user.role),
            canViewProjects: [
                UserRole.SUPER_ADMIN,
                UserRole.ADMIN,
                UserRole.EDITOR,
            ].includes(user.role),
            canDeleteProjects: [UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(user.role),
            // User Management
            canCreateUsers: [UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(user.role),
            canEditUsers: [UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(user.role),
            canDeleteUsers: [UserRole.SUPER_ADMIN].includes(user.role),
            canAssignRoles: [UserRole.SUPER_ADMIN].includes(user.role),
            // System Management
            canManageSettings: [UserRole.SUPER_ADMIN].includes(user.role),
            canManageNavigation: [UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(user.role),
            canManageMedia: [
                UserRole.SUPER_ADMIN,
                UserRole.ADMIN,
                UserRole.EDITOR,
            ].includes(user.role),
            canViewAnalytics: [UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(user.role),
        };
        return permissions;
    }
    static async hasPermission(userId, permission) {
        const permissions = await this.getPermissions(userId);
        return permissions[permission];
    }
    static async hasRole(userId, role) {
        const user = await this.findById(userId);
        return user?.role === role;
    }
    static async createSuperAdmin(data) {
        // Check if super admin already exists
        const existingSuperAdmin = await this.findAll({
            role: UserRole.SUPER_ADMIN,
        });
        if (existingSuperAdmin.length > 0) {
            throw new Error('Super admin already exists');
        }
        return this.create({
            ...data,
            role: UserRole.SUPER_ADMIN,
        });
    }
    static async getStats() {
        const stmt = connection_1.db.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active,
        SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) as inactive,
        SUM(CASE WHEN role = 'superadmin' THEN 1 ELSE 0 END) as super_admin,
        SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) as admin,
        SUM(CASE WHEN role = 'editor' THEN 1 ELSE 0 END) as editor,
        SUM(CASE WHEN role = 'author' THEN 1 ELSE 0 END) as author,
        SUM(CASE WHEN role = 'user' THEN 1 ELSE 0 END) as user
      FROM users
    `);
        const result = stmt.get();
        return {
            total: result.total,
            active: result.active,
            inactive: result.inactive,
            roleDistribution: {
                [UserRole.SUPER_ADMIN]: result.super_admin,
                [UserRole.ADMIN]: result.admin,
                [UserRole.EDITOR]: result.editor,
                [UserRole.AUTHOR]: result.author,
                [UserRole.USER]: result.user,
            },
        };
    }
}
exports.UserModel = UserModel;
