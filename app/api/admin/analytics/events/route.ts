import { NextRequest, NextResponse } from 'next/server';
import { requireViewAnalytics } from '@/middleware/permissions';
import { db } from '@/database/connection';
import { v4 as uuidv4 } from 'uuid';

interface AnalyticsEvent {
  id: string;
  event_type: string;
  user_id?: string;
  session_id?: string;
  page_url?: string;
  referrer_url?: string;
  user_agent?: string;
  ip_address?: string;
  event_data?: any;
  created_at: Date;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

// GET /api/admin/analytics/events - Get analytics events
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireViewAnalytics()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const eventType = searchParams.get('event_type');
    const userId = searchParams.get('user_id');
    const sessionId = searchParams.get('session_id');
    const pageUrl = searchParams.get('page_url');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;

    // Build query conditions
    let conditions = [];
    let params: any[] = [];

    if (eventType) {
      conditions.push('event_type = ?');
      params.push(eventType);
    }

    if (userId) {
      conditions.push('user_id = ?');
      params.push(userId);
    }

    if (sessionId) {
      conditions.push('session_id = ?');
      params.push(sessionId);
    }

    if (pageUrl) {
      conditions.push('page_url LIKE ?');
      params.push(`%${pageUrl}%`);
    }

    if (startDate) {
      conditions.push('created_at >= ?');
      params.push(startDate);
    }

    if (endDate) {
      conditions.push('created_at <= ?');
      params.push(endDate);
    }

    const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM analytics_events ${whereClause}`;
    const countStmt = db.prepare(countQuery);
    const totalResult = countStmt.get(...params) as any;

    // Get analytics events with pagination
    const query = `
      SELECT 
        ae.*,
        u.name as user_name,
        u.email as user_email
      FROM analytics_events ae
      LEFT JOIN users u ON ae.user_id = u.id
      ${whereClause}
      ORDER BY ae.created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const stmt = db.prepare(query);
    const events = stmt.all(...params, limit, offset) as any[];

    // Format the response
    const formattedEvents: AnalyticsEvent[] = events.map(event => ({
      id: event.id,
      event_type: event.event_type,
      user_id: event.user_id,
      session_id: event.session_id,
      page_url: event.page_url,
      referrer_url: event.referrer_url,
      user_agent: event.user_agent,
      ip_address: event.ip_address,
      event_data: event.event_data ? JSON.parse(event.event_data) : undefined,
      created_at: new Date(event.created_at),
      user: event.user_id ? {
        id: event.user_id,
        name: event.user_name,
        email: event.user_email
      } : undefined
    }));

    return NextResponse.json({
      success: true,
      events: formattedEvents,
      pagination: {
        page: Math.floor(offset / limit) + 1,
        limit,
        total: totalResult.count,
        totalPages: Math.ceil(totalResult.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching analytics events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics events' },
      { status: 500 }
    );
  }
}

// POST /api/admin/analytics/events - Track analytics event
export async function POST(request: NextRequest) {
  try {
    // This endpoint doesn't require authentication for tracking events
    // but we can add basic validation

    const body = await request.json();
    const {
      event_type,
      user_id,
      session_id,
      page_url,
      referrer_url,
      user_agent,
      ip_address,
      event_data
    } = body;

    // Validate required fields
    if (!event_type) {
      return NextResponse.json(
        { success: false, error: 'Event type is required' },
        { status: 400 }
      );
    }

    // Get IP address from request if not provided
    const clientIP = ip_address || request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 'unknown';

    // Get user agent from request if not provided
    const clientUserAgent = user_agent || request.headers.get('user-agent') || 'unknown';

    // Get referrer from request if not provided
    const clientReferrer = referrer_url || request.headers.get('referer') || null;

    // Create analytics event
    const eventId = uuidv4();
    const insertStmt = db.prepare(`
      INSERT INTO analytics_events (
        id, event_type, user_id, session_id, page_url, referrer_url,
        user_agent, ip_address, event_data, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStmt.run(
      eventId,
      event_type,
      user_id || null,
      session_id || null,
      page_url || null,
      clientReferrer,
      clientUserAgent,
      clientIP,
      event_data ? JSON.stringify(event_data) : null,
      new Date().toISOString()
    );

    // Get the created event
    const getStmt = db.prepare('SELECT * FROM analytics_events WHERE id = ?');
    const event = getStmt.get(eventId) as any;

    const analyticsEvent: AnalyticsEvent = {
      id: event.id,
      event_type: event.event_type,
      user_id: event.user_id,
      session_id: event.session_id,
      page_url: event.page_url,
      referrer_url: event.referrer_url,
      user_agent: event.user_agent,
      ip_address: event.ip_address,
      event_data: event.event_data ? JSON.parse(event.event_data) : undefined,
      created_at: new Date(event.created_at)
    };

    return NextResponse.json({
      success: true,
      event: analyticsEvent,
      message: 'Analytics event tracked successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error tracking analytics event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track analytics event' },
      { status: 500 }
    );
  }
} 