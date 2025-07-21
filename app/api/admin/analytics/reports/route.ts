import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/middleware/permissions';
import Database from 'better-sqlite3';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const dbPath = path.join(process.cwd(), 'database', 'cms.db');
const db = new Database(dbPath);

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const templates = searchParams.get('templates');

    if (templates === 'true') {
      // Return report templates
      const stmt = db.prepare(`
        SELECT id, name, description, report_type, config as default_filters
        FROM custom_reports 
        WHERE id LIKE 'cr-%'
        ORDER BY name
      `);
      const templateReports = stmt.all();

      return NextResponse.json({
        templates: templateReports.map(report => ({
          ...(report as any),
          default_filters: JSON.parse((report as any).default_filters || '{}'),
        })),
      });
    }

    // Return user-created reports
    const stmt = db.prepare(`
      SELECT * FROM custom_reports 
      WHERE id NOT LIKE 'cr-%'
      ORDER BY created_at DESC
    `);
    const reports = stmt.all();

    return NextResponse.json({
      reports: reports.map(report => ({
        ...(report as any),
        filters: JSON.parse((report as any).config || '{}'),
        recipients:
          JSON.parse((report as any).schedule || '{}').recipients || [],
      })),
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, type, schedule, format, filters, recipients } =
      body;

    if (!name || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const reportId = uuidv4();
    const config = JSON.stringify({
      ...filters,
      format: format || 'json',
    });
    const scheduleConfig = JSON.stringify({
      frequency: schedule || 'manual',
      recipients: recipients || [],
    });

    const stmt = db.prepare(`
      INSERT INTO custom_reports (
        id, name, description, report_type, config, schedule, created_by, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 1)
    `);

    stmt.run(
      reportId,
      name,
      description || '',
      type,
      config,
      scheduleConfig,
      user.id
    );

    return NextResponse.json({
      message: 'Report created successfully',
      reportId,
    });
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
