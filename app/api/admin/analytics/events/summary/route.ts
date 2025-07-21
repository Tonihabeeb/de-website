import { NextRequest, NextResponse } from 'next/server';
import { requireViewAnalytics } from '@/middleware/permissions';
import { db } from '@/database/connection';

// GET /api/admin/analytics/events/summary - Get analytics summary
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireViewAnalytics()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    // Build date filter
    let dateFilter = '';
    let params: any[] = [];

    if (startDate && endDate) {
      dateFilter = 'WHERE created_at BETWEEN ? AND ?';
      params = [startDate, endDate];
    } else if (startDate) {
      dateFilter = 'WHERE created_at >= ?';
      params = [startDate];
    } else if (endDate) {
      dateFilter = 'WHERE created_at <= ?';
      params = [endDate];
    }

    // Get event type summary
    const eventTypeQuery = `
      SELECT event_type, COUNT(*) as count
      FROM analytics_events
      ${dateFilter}
      GROUP BY event_type
      ORDER BY count DESC
    `;
    const eventTypeStmt = db.prepare(eventTypeQuery);
    const eventTypeSummary = eventTypeStmt.all(...params) as any[];

    // Get page views summary
    const pageViewsQuery = `
      SELECT page_url, COUNT(*) as views
      FROM analytics_events
      WHERE event_type = 'page_view'
      ${dateFilter.replace('WHERE', 'AND')}
      GROUP BY page_url
      ORDER BY views DESC
      LIMIT 10
    `;
    const pageViewsStmt = db.prepare(pageViewsQuery);
    const pageViewsSummary = pageViewsStmt.all(...params) as any[];

    // Get user activity summary
    const userActivityQuery = `
      SELECT user_id, COUNT(*) as events
      FROM analytics_events
      WHERE user_id IS NOT NULL
      ${dateFilter.replace('WHERE', 'AND')}
      GROUP BY user_id
      ORDER BY events DESC
      LIMIT 10
    `;
    const userActivityStmt = db.prepare(userActivityQuery);
    const userActivitySummary = userActivityStmt.all(...params) as any[];

    // Get total events
    const totalEventsQuery = `SELECT COUNT(*) as count FROM analytics_events ${dateFilter}`;
    const totalEventsStmt = db.prepare(totalEventsQuery);
    const totalEvents = totalEventsStmt.get(...params) as any;

    // Get unique users
    const uniqueUsersQuery = `
      SELECT COUNT(DISTINCT user_id) as count 
      FROM analytics_events 
      WHERE user_id IS NOT NULL ${dateFilter.replace('WHERE', 'AND')}
    `;
    const uniqueUsersStmt = db.prepare(uniqueUsersQuery);
    const uniqueUsers = uniqueUsersStmt.get(...params) as any;

    return NextResponse.json({
      success: true,
      summary: {
        total_events: totalEvents.count,
        unique_users: uniqueUsers.count,
        event_types: eventTypeSummary,
        top_pages: pageViewsSummary,
        top_users: userActivitySummary,
      },
    });
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics summary' },
      { status: 500 }
    );
  }
}
