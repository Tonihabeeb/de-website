import { NextRequest, NextResponse } from 'next/server';
import { PageModel } from '@/database/models/Page';
import { requireViewPages } from '@/middleware/permissions';
import { db } from '@/database/connection';

// GET /api/admin/pages/search - Search and filter pages
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireViewPages()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const status = searchParams.get('status');
    const created_by = searchParams.get('created_by');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const sort_by = searchParams.get('sort_by') || 'created_at';
    const sort_order = searchParams.get('sort_order') || 'desc';

    // Validate sort parameters
    const validSortFields = ['title', 'slug', 'status', 'created_at', 'updated_at', 'published_at'];
    const validSortOrders = ['asc', 'desc'];
    
    if (!validSortFields.includes(sort_by)) {
      return NextResponse.json(
        { success: false, error: 'Invalid sort_by parameter' },
        { status: 400 }
      );
    }

    if (!validSortOrders.includes(sort_order)) {
      return NextResponse.json(
        { success: false, error: 'Invalid sort_order parameter' },
        { status: 400 }
      );
    }

    // Build search query
    let sqlQuery = 'SELECT * FROM pages';
    const conditions: string[] = [];
    const params: any[] = [];

    // Text search
    if (query.trim()) {
      conditions.push('(title LIKE ? OR slug LIKE ? OR meta_title LIKE ? OR meta_description LIKE ?)');
      const searchTerm = `%${query.trim()}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    // Status filter
    if (status) {
      conditions.push('status = ?');
      params.push(status);
    }

    // Created by filter
    if (created_by) {
      conditions.push('created_by = ?');
      params.push(created_by);
    }

    // Add WHERE clause if conditions exist
    if (conditions.length > 0) {
      sqlQuery += ' WHERE ' + conditions.join(' AND ');
    }

    // Add ORDER BY
    sqlQuery += ` ORDER BY ${sort_by} ${sort_order.toUpperCase()}`;

    // Add pagination
    sqlQuery += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    // Execute search query
    const stmt = db.prepare(sqlQuery);
    const pages = stmt.all(...params) as any[];

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM pages';
    if (conditions.length > 0) {
      countQuery += ' WHERE ' + conditions.join(' AND ');
    }
    const countStmt = db.prepare(countQuery);
    const countResult = countStmt.get(...params.slice(0, -2)) as any;
    const total = countResult.total;

    // Format results
    const formattedPages = pages.map(page => ({
      id: page.id,
      title: page.title,
      slug: page.slug,
      content: JSON.parse(page.content),
      meta_title: page.meta_title,
      meta_description: page.meta_description,
      meta_keywords: page.meta_keywords,
      status: page.status,
      published_at: page.published_at,
      created_by: page.created_by,
      created_at: page.created_at,
      updated_at: page.updated_at
    }));

    return NextResponse.json({
      success: true,
      pages: formattedPages,
      pagination: {
        total,
        limit,
        offset,
        has_more: offset + limit < total,
        total_pages: Math.ceil(total / limit)
      },
      search: {
        query,
        status,
        created_by,
        sort_by,
        sort_order
      }
    });
  } catch (error) {
    console.error('Error searching pages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search pages' },
      { status: 500 }
    );
  }
} 