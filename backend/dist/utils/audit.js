"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logAudit = logAudit;
const AuditLog_1 = require("../models/AuditLog");
async function logAudit({ userId, action, targetId, targetType, details }) {
    try {
        await AuditLog_1.AuditLog.create({
            userId,
            action,
            targetId,
            targetType,
            details,
            timestamp: new Date(),
        });
    }
    catch (err) {
        // Optionally log error to external service
        // console.error('Failed to log audit event:', err);
    }
}
