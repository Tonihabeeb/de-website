import db from '../connection';

export interface AnalyticsOverview {
  totalUsers: number;
  totalPages: number;
  totalProjects: number;
  totalMedia: number;
  activeUsers: number;
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
}

export interface AnalyticsUserGrowth {
  date: string;
  newUsers: number;
  activeUsers: number;
}

export interface AnalyticsPageViews {
  date: string;
  views: number;
  uniqueViews: number;
}

export interface AnalyticsTopPage {
  path: string;
  title: string;
  views: number;
  uniqueViews: number;
  avgTimeOnPage: number;
}

export interface AnalyticsUserActivity {
  hour: number;
  users: number;
  sessions: number;
}

export interface AnalyticsDeviceStat {
  device: string;
  users: number;
  percentage: number;
}

export interface AnalyticsGeographicData {
  country: string;
  users: number;
  percentage: number;
}

export interface AnalyticsPerformanceMetric {
  date: string;
  responseTime: number;
  loadTime: number;
  errorRate: number;
}

export interface AnalyticsContentPerformance {
  type: string;
  count: number;
  views: number;
  engagement: number;
}

export interface AnalyticsData {
  overview: AnalyticsOverview;
  userGrowth: AnalyticsUserGrowth[];
  pageViews: AnalyticsPageViews[];
  topPages: AnalyticsTopPage[];
  userActivity: AnalyticsUserActivity[];
  deviceStats: AnalyticsDeviceStat[];
  geographicData: AnalyticsGeographicData[];
  performanceMetrics: AnalyticsPerformanceMetric[];
  contentPerformance: AnalyticsContentPerformance[];
}

export function insertMockAnalyticsData(data: AnalyticsData) {
  // Store as a single row for now (can be expanded for real event logging later)
  db.prepare(`
    INSERT OR REPLACE INTO analytics_data (id, data)
    VALUES (1, json(?))
  `).run(JSON.stringify(data));
}

export function getAnalyticsData(): AnalyticsData | null {
  const row = db.prepare('SELECT data FROM analytics_data WHERE id = 1').get() as any;
  if (!row || !row.data) return null;
  return JSON.parse(row.data);
} 