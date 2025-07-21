import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/middleware/permissions';
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database', 'cms.db');
const db = new Database(dbPath);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const stmt = db.prepare('SELECT * FROM custom_reports WHERE id = ?');
    const report = stmt.get(id);

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...report,
      filters: JSON.parse((report as any).config || '{}'),
      recipients: JSON.parse((report as any).schedule || '{}').recipients || [],
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const {
      name,
      description,
      type,
      schedule,
      format,
      filters,
      recipients,
      is_active,
    } = body;

    // Check if report exists
    const checkStmt = db.prepare('SELECT id FROM custom_reports WHERE id = ?');
    const existingReport = checkStmt.get(id);

    if (!existingReport) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    const config = JSON.stringify({
      ...filters,
      format: format || 'json',
    });
    const scheduleConfig = JSON.stringify({
      frequency: schedule || 'manual',
      recipients: recipients || [],
    });

    const stmt = db.prepare(`
      UPDATE custom_reports 
      SET name = ?, description = ?, report_type = ?, config = ?, 
          schedule = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      name || '',
      description || '',
      type || 'content',
      config,
      scheduleConfig,
      is_active !== undefined ? is_active : 1,
      id
    );

    return NextResponse.json({ message: 'Report updated successfully' });
  } catch (error) {
    console.error('Error updating report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Check if report exists
    const checkStmt = db.prepare('SELECT id FROM custom_reports WHERE id = ?');
    const existingReport = checkStmt.get(id);

    if (!existingReport) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    const stmt = db.prepare('DELETE FROM custom_reports WHERE id = ?');
    stmt.run(id);

    return NextResponse.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
