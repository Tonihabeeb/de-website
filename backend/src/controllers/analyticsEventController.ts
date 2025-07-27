import { Request, Response } from 'express';
import db from '../connection';

export async function listAnalyticsEvents(req: Request, res: Response) {
  try {
    const { user_id, event_type, limit, offset } = req.query;
    const events = db.prepare(`
      SELECT * FROM analytics_events
      WHERE user_id = ? AND event_type = ?
      LIMIT ? OFFSET ?
    `).all(user_id as string, event_type as string, limit ? Number(limit) : undefined, offset ? Number(offset) : undefined);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list analytics events' });
  }
}

export async function getAnalyticsEvent(req: Request, res: Response) {
  try {
    const event = db.prepare(`
      SELECT * FROM analytics_events WHERE id = ?
    `).get(req.params.id);
    if (!event) return res.status(404).json({ error: 'Analytics event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get analytics event' });
  }
}

export const logAnalyticsEvent = (req: Request, res: Response) => {
  const { event_type, user_id, event_data } = req.body;
  if (!event_type) {
    return res.status(400).json({ error: 'event_type is required' });
  }
  const stmt = db.prepare(`
    INSERT INTO analytics_events (id, user_id, event_type, event_data, created_at)
    VALUES (lower(hex(randomblob(16))), ?, ?, ?, datetime('now'))
  `);
  stmt.run(user_id || null, event_type, event_data ? JSON.stringify(event_data) : null);
  res.json({ success: true });
}; 