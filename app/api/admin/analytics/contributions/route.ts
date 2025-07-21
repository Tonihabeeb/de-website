import { NextRequest, NextResponse } from 'next/server';
import { requireViewAnalytics } from '@/middleware/permissions';
import { db } from '@/database/connection';

interface ContentContribution {
  id: string;
  user_id: string;
  content_type: 'page' | 'project' | 'media' | 'comment';
  content_id: string;
  action: 'created' | 'updated' | 'deleted' | 'published';
  title?: string;
  created_at: Date;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

// GET /api/admin/analytics/contributions - Get content contributions
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireViewAnalytics()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const contentType = searchParams.get('content_type');
    const action = searchParams.get('action');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : 100;
    const offset = searchParams.get('offset')
      ? parseInt(searchParams.get('offset')!)
      : 0;

    // Build query conditions
    let conditions = [];
    let params: any[] = [];

    if (userId) {
      conditions.push('cc.user_id = ?');
      params.push(userId);
    }

    if (contentType) {
      conditions.push('cc.content_type = ?');
      params.push(contentType);
    }

    if (action) {
      conditions.push('cc.action = ?');
      params.push(action);
    }

    if (startDate) {
      conditions.push('cc.created_at >= ?');
      params.push(startDate);
    }

    if (endDate) {
      conditions.push('cc.created_at <= ?');
      params.push(endDate);
    }

    const whereClause =
      conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM content_contributions cc ${whereClause}`;
    const countStmt = db.prepare(countQuery);
    const totalResult = countStmt.get(...params) as any;

    // Get contributions with user info
    const query = `
      SELECT 
        cc.*,
        u.name as user_name,
        u.email as user_email
      FROM content_contributions cc
      LEFT JOIN users u ON cc.user_id = u.id
      ${whereClause}
      ORDER BY cc.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const stmt = db.prepare(query);
    const contributions = stmt.all(...params, limit, offset) as any[];

    // Format the response
    const formattedContributions: ContentContribution[] = contributions.map(
      contribution => ({
        id: contribution.id,
        user_id: contribution.user_id,
        content_type: contribution.content_type,
        content_id: contribution.content_id,
        action: contribution.action,
        title: contribution.title,
        created_at: new Date(contribution.created_at),
        user: contribution.user_id
          ? {
              id: contribution.user_id,
              name: contribution.user_name,
              email: contribution.user_email,
            }
          : undefined,
      })
    );

    return NextResponse.json({
      success: true,
      contributions: formattedContributions,
      pagination: {
        page: Math.floor(offset / limit) + 1,
        limit,
        total: totalResult.count,
        totalPages: Math.ceil(totalResult.count / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching content contributions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content contributions' },
      { status: 500 }
    );
  }
}

// POST /api/admin/analytics/contributions - Track content contribution
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, content_type, content_id, action, title } = body;

    // Validate required fields
    if (!user_id || !content_type || !content_id || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate content type
    const validContentTypes = ['page', 'project', 'media', 'comment'];
    if (!validContentTypes.includes(content_type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid content type' },
        { status: 400 }
      );
    }

    // Validate action
    const validActions = ['created', 'updated', 'deleted', 'published'];
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      );
    }

    // Insert contribution record
    const insertStmt = db.prepare(`
      INSERT INTO content_contributions (
        id, user_id, content_type, content_id, action, title, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const contributionId = crypto.randomUUID();
    insertStmt.run(
      contributionId,
      user_id,
      content_type,
      content_id,
      action,
      title || null,
      new Date().toISOString()
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Content contribution tracked successfully',
        contribution_id: contributionId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error tracking content contribution:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track content contribution' },
      { status: 500 }
    );
  }
}
