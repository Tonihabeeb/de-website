"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuditLogs = getAuditLogs;
const AuditLog_1 = require("../models/AuditLog");
async function getAuditLogs(req, res) {
    try {
        const { userId, action, start, end } = req.query;
        const filter = {};
        if (userId)
            filter.userId = userId;
        if (action)
            filter.action = action;
        if (start || end) {
            filter.timestamp = {};
            if (start)
                filter.timestamp.$gte = new Date(start);
            if (end)
                filter.timestamp.$lte = new Date(end);
        }
        const logs = await AuditLog_1.AuditLog.find(filter).sort({ timestamp: -1 }).limit(100);
        return res.json({ logs });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to fetch audit logs.' });
    }
}
