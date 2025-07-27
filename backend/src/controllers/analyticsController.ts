import { Request, Response } from 'express';
import db from '../connection';
import { getAnalyticsData } from '../models/AnalyticsEvent';

export const getAnalytics = async (req: Request, res: Response) => {
  // Aggregate real analytics data from analytics_events
  // Overview
  const totalUsers = (db.prepare('SELECT COUNT(DISTINCT user_id) as count FROM analytics_events WHERE user_id IS NOT NULL').get() as { count: number }).count;
  const totalPages = (db.prepare('SELECT COUNT(*) as count FROM pages').get() as { count: number }).count;
  const totalProjects = (db.prepare('SELECT COUNT(*) as count FROM projects').get() as { count: number }).count;
  const totalMedia = (db.prepare('SELECT COUNT(*) as count FROM media').get() as { count: number }).count;
  const activeUsers = (db.prepare('SELECT COUNT(DISTINCT user_id) as count FROM analytics_events WHERE created_at >= datetime("now", "-7 days") AND user_id IS NOT NULL').get() as { count: number }).count;
  const pageViews = (db.prepare('SELECT COUNT(*) as count FROM analytics_events WHERE event_type = "page_view"').get() as { count: number }).count;
  const uniqueVisitors = (db.prepare('SELECT COUNT(DISTINCT user_id) as count FROM analytics_events WHERE event_type = "page_view" AND user_id IS NOT NULL').get() as { count: number }).count;
  const bounceRate = 0; // Placeholder, requires session logic

  // User Growth (last 7 days)
  const userGrowth = (db.prepare(`
    SELECT DATE(created_at) as date, COUNT(DISTINCT user_id) as newUsers, COUNT(*) as activeUsers
    FROM analytics_events
    WHERE created_at >= datetime('now', '-7 days')
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `).all() as { date: string; newUsers: number; activeUsers: number }[]);

  // Page Views (last 7 days)
  const pageViewsData = (db.prepare(`
    SELECT DATE(created_at) as date, COUNT(*) as views, COUNT(DISTINCT user_id) as uniqueViews
    FROM analytics_events
    WHERE event_type = 'page_view' AND created_at >= datetime('now', '-7 days')
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `).all() as { date: string; views: number; uniqueViews: number }[]);

  // Top Pages
  const topPages = (db.prepare(`
    SELECT event_data, COUNT(*) as views
    FROM analytics_events
    WHERE event_type = 'page_view'
    GROUP BY event_data
    ORDER BY views DESC
    LIMIT 5
  `).all() as any[]).map((row: any) => {
    let data = { path: '', title: '', avgTimeOnPage: 0 };
    try { data = JSON.parse(row.event_data); } catch {}
    return { ...data, views: row.views, uniqueViews: 0, avgTimeOnPage: data.avgTimeOnPage || 0 };
  });

  // Device Stats
  const deviceStats = (db.prepare(`
    SELECT json_extract(event_data, '$.device') as device, COUNT(*) as users
    FROM analytics_events
    WHERE event_type = 'page_view'
    GROUP BY device
  `).all() as any[]).map((row: any) => ({ device: row.device || 'Unknown', users: row.users, percentage: 0 }));

  // Geographic Data
  const geographicData = (db.prepare(`
    SELECT json_extract(event_data, '$.country') as country, COUNT(*) as users
    FROM analytics_events
    WHERE event_type = 'page_view'
    GROUP BY country
  `).all() as any[]).map((row: any) => ({ country: row.country || 'Unknown', users: row.users, percentage: 0 }));

  // Performance Metrics (placeholder)
  const performanceMetrics: any[] = [];

  // Content Performance (placeholder)
  const contentPerformance: any[] = [];

  // Fallback to mock data if no real data
  if (!totalUsers && !pageViews) {
    const fallback = getAnalyticsData();
    if (!fallback) return res.status(404).json({ error: 'No analytics data found' });
    return res.json(fallback);
  }

  res.json({
    overview: {
      totalUsers,
      totalPages,
      totalProjects,
      totalMedia,
      activeUsers,
      pageViews,
      uniqueVisitors,
      bounceRate,
    },
    userGrowth,
    pageViews: pageViewsData,
    topPages,
    userActivity: [],
    deviceStats,
    geographicData,
    performanceMetrics,
    contentPerformance,
  });
};
