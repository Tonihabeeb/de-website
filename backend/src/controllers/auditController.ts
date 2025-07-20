import { Request, Response } from 'express';
import { AuditLog } from '../models/AuditLog';

export async function getAuditLogs(req: Request, res: Response) {
  try {
    const { userId, action, start, end } = req.query;
    const filter: any = {};
    if (userId) filter.userId = userId;
    if (action) filter.action = action;
    if (start || end) {
      filter.timestamp = {};
      if (start) filter.timestamp.$gte = new Date(start as string);
      if (end) filter.timestamp.$lte = new Date(end as string);
    }
    const logs = await AuditLog.find(filter).sort({ timestamp: -1 }).limit(100);
    return res.json({ logs });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch audit logs.' });
  }
} 