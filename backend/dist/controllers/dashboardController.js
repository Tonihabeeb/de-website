"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = getDashboard;
exports.updateDashboard = updateDashboard;
const Dashboard_1 = require("../models/Dashboard");
async function getDashboard(req, res) {
    try {
        const { type } = req.params;
        const dashboard = await Dashboard_1.Dashboard.findOne({ type });
        if (!dashboard)
            return res.status(404).json({ error: 'Dashboard not found.' });
        return res.json({ dashboard });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to fetch dashboard.' });
    }
}
async function updateDashboard(req, res) {
    try {
        const { type } = req.params;
        // @ts-ignore
        const userId = req.user?.userId;
        // @ts-ignore
        const userRole = req.user?.role;
        if (!['admin', 'editor'].includes(userRole)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const { data } = req.body;
        if (!data)
            return res.status(400).json({ error: 'Data is required.' });
        const dashboard = await Dashboard_1.Dashboard.findOneAndUpdate({ type }, { data, updatedBy: userId, updatedAt: new Date() }, { new: true, upsert: true });
        return res.json({ dashboard });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to update dashboard.' });
    }
}
