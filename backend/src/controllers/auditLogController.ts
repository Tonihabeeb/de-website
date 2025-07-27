import { Request, Response } from 'express';
import { AuditLogModel } from '../models/AuditLog';

export async function listAuditLogs(req: Request, res: Response) {
  try {
    const { user_id, action, target_type, target_id, limit, offset } = req.query;
    const logs = AuditLogModel.findAll({
      user_id: user_id as string,
      action: action as string,
      target_type: target_type as string,
      target_id: target_id as string,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list audit logs' });
  }
}

export async function getAuditLog(req: Request, res: Response) {
  try {
    const log = AuditLogModel.findById(req.params.id);
    if (!log) return res.status(404).json({ error: 'Audit log not found' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get audit log' });
  }
} 