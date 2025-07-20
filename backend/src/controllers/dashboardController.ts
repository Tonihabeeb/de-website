import { Request, Response } from 'express';
import { Dashboard } from '../models/Dashboard';

export async function getDashboard(req: Request, res: Response) {
  try {
    const { type } = req.params;
    const dashboard = await Dashboard.findOne({ type });
    if (!dashboard) return res.status(404).json({ error: 'Dashboard not found.' });
    return res.json({ dashboard });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch dashboard.' });
  }
}

export async function updateDashboard(req: Request, res: Response) {
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
    if (!data) return res.status(400).json({ error: 'Data is required.' });
    const dashboard = await Dashboard.findOneAndUpdate(
      { type },
      { data, updatedBy: userId, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    return res.json({ dashboard });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update dashboard.' });
  }
} 