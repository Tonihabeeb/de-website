import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

// Database connection for Next.js API route
const dbPath = path.join(process.cwd(), 'database', 'cms.db');
const db = new Database(dbPath);

// GET /api/admin/dashboard - Get comprehensive dashboard data
export async function GET(request: NextRequest) {
  try {
    // Get real data from database
    const stats = await getDashboardStats();
    const recentActivity = await getRecentActivity();
    const userStats = await getUserStats();
    
    return NextResponse.json({
      success: true,
      data: {
        stats,
        recentActivity,
        userStats,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}

async function getDashboardStats() {
  // Page statistics - using 'published' column (integer) instead of 'status'
  const totalPages = (db.prepare('SELECT COUNT(*) as count FROM pages').get() as { count: number }).count;
  const publishedPages = (db.prepare('SELECT COUNT(*) as count FROM pages WHERE published = 1').get() as { count: number }).count;
  const draftPages = (db.prepare('SELECT COUNT(*) as count FROM pages WHERE published = 0').get() as { count: number }).count;

  // Project statistics - using 'status' column (text)
  const totalProjects = (db.prepare('SELECT COUNT(*) as count FROM projects').get() as { count: number }).count;
  const activeProjects = (db.prepare("SELECT COUNT(*) as count FROM projects WHERE status = 'active'").get() as { count: number }).count;

  // User statistics
  const totalUsers = (db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number }).count;
  const activeUsers = (db.prepare('SELECT COUNT(*) as count FROM users WHERE is_active = 1').get() as { count: number }).count;

  // Media statistics
  const totalMedia = (db.prepare('SELECT COUNT(*) as count FROM media').get() as { count: number }).count;

  // Analytics statistics
  const totalPageViews = (db.prepare("SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'page_view'").get() as { count: number }).count;
  const uniqueVisitors = (db.prepare("SELECT COUNT(DISTINCT user_id) as count FROM analytics_events WHERE event_type = 'page_view' AND user_id IS NOT NULL").get() as { count: number }).count;

  return {
    totalPages,
    publishedPages,
    draftPages,
    totalProjects,
    activeProjects,
    totalUsers,
    activeUsers,
    totalMedia,
    totalPageViews,
    uniqueVisitors,
  };
}

async function getRecentActivity() {
  // Get recent user activities
  const activities = db.prepare(`
    SELECT 
      'user_activity' as type,
      u.name as user,
      u.email as user_email,
      'User logged in' as description,
      u.last_login as timestamp
    FROM users u
    WHERE u.last_login IS NOT NULL
    ORDER BY u.last_login DESC
    LIMIT 10
  `).all() as any[];

  // Get recent page updates
  const pageActivities = db.prepare(`
    SELECT 
      'page_updated' as type,
      p.title as resource_name,
      p.updated_at as timestamp,
      'Page updated' as description
    FROM pages p
    WHERE p.updated_at IS NOT NULL
    ORDER BY p.updated_at DESC
    LIMIT 5
  `).all() as any[];

  // Get recent project updates
  const projectActivities = db.prepare(`
    SELECT 
      'project_updated' as type,
      p.name as resource_name,
      p.updated_at as timestamp,
      'Project updated' as description
    FROM projects p
    WHERE p.updated_at IS NOT NULL
    ORDER BY p.updated_at DESC
    LIMIT 5
  `).all() as any[];

  // Combine and sort all activities
  const allActivities = [
    ...activities.map(a => ({ ...a, id: `user_${a.user_email}` })),
    ...pageActivities.map(a => ({ ...a, id: `page_${a.resource_name}`, user: 'System' })),
    ...projectActivities.map(a => ({ ...a, id: `project_${a.resource_name}`, user: 'System' })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
   .slice(0, 10);

  return allActivities;
}

async function getUserStats() {
  // User role distribution
  const roleDistribution = db.prepare(`
    SELECT 
      role,
      COUNT(*) as count
    FROM users
    GROUP BY role
  `).all() as any[];

  // User growth (last 7 days)
  const userGrowth = db.prepare(`
    SELECT 
      DATE(created_at) as date,
      COUNT(*) as new_users
    FROM users
    WHERE created_at >= datetime('now', '-7 days')
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `).all() as any[];

  // Active users (last 7 days)
  const activeUsers = db.prepare(`
    SELECT 
      DATE(last_login) as date,
      COUNT(DISTINCT id) as active_users
    FROM users
    WHERE last_login >= datetime('now', '-7 days')
    GROUP BY DATE(last_login)
    ORDER BY date ASC
  `).all() as any[];

  return {
    roleDistribution,
    userGrowth,
    activeUsers,
  };
} 