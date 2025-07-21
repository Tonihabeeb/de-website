import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/middleware/permissions';
import Database from 'better-sqlite3';
import path from 'path';
import * as XLSX from 'xlsx';
import PDFDocument from 'pdfkit';

const dbPath = path.join(process.cwd(), 'database', 'cms.db');
const db = new Database(dbPath);

export async function POST(
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

    // Get report configuration
    const stmt = db.prepare('SELECT * FROM custom_reports WHERE id = ?');
    const report = stmt.get(id);

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    const filters = JSON.parse((report as any).config || '{}');
    const format = filters.format || 'json';
    const reportType = (report as any).report_type;

    // Generate report data based on type
    let reportData: any = {};

    switch (reportType) {
      case 'content_performance':
        reportData = await generateContentReport(filters);
        break;
      case 'user_activity':
        reportData = await generateUserReport(filters);
        break;
      case 'system_usage':
        reportData = await generateSystemReport(filters);
        break;
      case 'project_analytics':
        reportData = await generatePerformanceReport(filters);
        break;
      case 'custom':
        reportData = await generatePerformanceReport(filters);
        break;
      default:
        reportData = { message: 'Custom report type not implemented' };
    }

    // Update last run timestamp
    const updateStmt = db.prepare(`
      UPDATE custom_reports 
      SET last_run = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);
    updateStmt.run(id);

    // Generate export based on format
    let response: NextResponse;

    switch (format) {
      case 'json':
        response = NextResponse.json(reportData);
        response.headers.set(
          'Content-Disposition',
          `attachment; filename="report-${id}.json"`
        );
        break;

      case 'csv':
        const csvData = convertToCSV(reportData);
        response = new NextResponse(csvData);
        response.headers.set('Content-Type', 'text/csv');
        response.headers.set(
          'Content-Disposition',
          `attachment; filename="report-${id}.csv"`
        );
        break;

      case 'excel':
        const excelBuffer = await convertToExcel(reportData);
        response = new NextResponse(excelBuffer);
        response.headers.set(
          'Content-Type',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        response.headers.set(
          'Content-Disposition',
          `attachment; filename="report-${id}.xlsx"`
        );
        break;

      case 'pdf':
        const pdfBuffer = await convertToPDF(reportData, (report as any).name);
        response = new NextResponse(pdfBuffer);
        response.headers.set('Content-Type', 'application/pdf');
        response.headers.set(
          'Content-Disposition',
          `attachment; filename="report-${id}.pdf"`
        );
        break;

      default:
        return NextResponse.json(
          { error: 'Unsupported format' },
          { status: 400 }
        );
    }

    return response;
  } catch (error) {
    console.error('Error running report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function generateContentReport(filters: any) {
  const timeRange = filters.time_range || '30d';
  const includeViews = filters.include_views !== false;
  const includeEngagement = filters.include_engagement !== false;

  // Get content analytics data
  const stmt = db.prepare(`
    SELECT 
      p.title,
      p.status,
      p.created_at,
      p.updated_at,
      COUNT(DISTINCT u.id) as views,
      COUNT(DISTINCT CASE WHEN u.created_at > datetime('now', '-7 days') THEN u.id END) as recent_views
    FROM pages p
    LEFT JOIN users u ON 1=1
    WHERE p.created_at > datetime('now', '-${timeRange}')
    GROUP BY p.id, p.title, p.status, p.created_at, p.updated_at
    ORDER BY p.created_at DESC
  `);

  const contentData = stmt.all();

  return {
    report_type: 'content',
    generated_at: new Date().toISOString(),
    filters,
    summary: {
      total_pages: contentData.length,
      published_pages: contentData.filter((p: any) => p.status === 'published')
        .length,
      draft_pages: contentData.filter((p: any) => p.status === 'draft').length,
      total_views: contentData.reduce(
        (sum: number, p: any) => sum + p.views,
        0
      ),
    },
    data: contentData,
  };
}

async function generateUserReport(filters: any) {
  const timeRange = filters.time_range || '7d';
  const includeLogins = filters.include_logins !== false;
  const includeActions = filters.include_actions !== false;

  // Get user analytics data
  const stmt = db.prepare(`
    SELECT 
      u.username,
      u.email,
      u.role,
      u.created_at,
      u.last_login,
      COUNT(DISTINCT p.id) as pages_created,
      COUNT(DISTINCT pr.id) as projects_created
    FROM users u
    LEFT JOIN pages p ON p.created_by = u.id
    LEFT JOIN projects pr ON pr.created_by = u.id
    WHERE u.created_at > datetime('now', '-${timeRange}')
    GROUP BY u.id, u.username, u.email, u.role, u.created_at, u.last_login
    ORDER BY u.created_at DESC
  `);

  const userData = stmt.all();

  return {
    report_type: 'user',
    generated_at: new Date().toISOString(),
    filters,
    summary: {
      total_users: userData.length,
      active_users: userData.filter((u: any) => u.last_login).length,
      admin_users: userData.filter((u: any) => u.role === 'admin').length,
      total_pages_created: userData.reduce(
        (sum: number, u: any) => sum + u.pages_created,
        0
      ),
    },
    data: userData,
  };
}

async function generateSystemReport(filters: any) {
  const includeErrors = filters.include_errors !== false;
  const includePerformance = filters.include_performance !== false;

  // Get system metrics
  const systemData = {
    database_size: getDatabaseSize(),
    total_pages: getTableCount('pages'),
    total_projects: getTableCount('projects'),
    total_users: getTableCount('users'),
    system_uptime: process.uptime(),
    memory_usage: process.memoryUsage(),
    node_version: process.version,
    platform: process.platform,
  };

  return {
    report_type: 'system',
    generated_at: new Date().toISOString(),
    filters,
    summary: {
      database_size_mb:
        Math.round((systemData.database_size / 1024 / 1024) * 100) / 100,
      total_records:
        systemData.total_pages +
        systemData.total_projects +
        systemData.total_users,
      system_uptime_hours:
        Math.round((systemData.system_uptime / 3600) * 100) / 100,
    },
    data: systemData,
  };
}

async function generatePerformanceReport(filters: any) {
  const timeRange = filters.time_range || '7d';
  const includeErrors = filters.include_errors !== false;
  const includeLatency = filters.include_latency !== false;

  // Simulate performance data (in a real implementation, this would come from actual metrics)
  const performanceData = {
    api_calls: {
      total: 1250,
      successful: 1180,
      failed: 70,
      success_rate: 94.4,
    },
    response_times: {
      average_ms: 245,
      p95_ms: 890,
      p99_ms: 1200,
    },
    errors: includeErrors
      ? [
          { type: 'validation_error', count: 45, percentage: 64.3 },
          { type: 'database_error', count: 15, percentage: 21.4 },
          { type: 'auth_error', count: 10, percentage: 14.3 },
        ]
      : [],
    endpoints: [
      { name: '/api/admin/pages', calls: 450, avg_response_ms: 180 },
      { name: '/api/admin/projects', calls: 320, avg_response_ms: 220 },
      { name: '/api/admin/analytics', calls: 280, avg_response_ms: 350 },
      { name: '/api/admin/users', calls: 200, avg_response_ms: 150 },
    ],
  };

  return {
    report_type: 'performance',
    generated_at: new Date().toISOString(),
    filters,
    summary: {
      total_api_calls: performanceData.api_calls.total,
      success_rate: performanceData.api_calls.success_rate,
      average_response_time: performanceData.response_times.average_ms,
    },
    data: performanceData,
  };
}

function getDatabaseSize(): number {
  try {
    const fs = require('fs');
    const stats = fs.statSync(dbPath);
    return stats.size;
  } catch {
    return 0;
  }
}

function getTableCount(tableName: string): number {
  try {
    const stmt = db.prepare(`SELECT COUNT(*) as count FROM ${tableName}`);
    const result = stmt.get() as { count: number };
    return result.count;
  } catch {
    return 0;
  }
}

function convertToCSV(data: any): string {
  if (!data.data || !Array.isArray(data.data)) {
    return 'No data available';
  }

  const headers = Object.keys(data.data[0] || {});
  const csvRows = [headers.join(',')];

  for (const row of data.data) {
    const values = headers.map(header => {
      const value = row[header];
      return typeof value === 'string' && value.includes(',')
        ? `"${value}"`
        : value;
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
}

async function convertToExcel(data: any): Promise<Buffer> {
  const workbook = XLSX.utils.book_new();

  // Create summary sheet
  const summaryData = Object.entries(data.summary || {}).map(
    ([key, value]) => ({
      Metric: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      Value: value,
    })
  );
  const summarySheet = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

  // Create data sheet
  if (data.data && Array.isArray(data.data)) {
    const dataSheet = XLSX.utils.json_to_sheet(data.data);
    XLSX.utils.book_append_sheet(workbook, dataSheet, 'Data');
  }

  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}

async function convertToPDF(data: any, reportName: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks: Buffer[] = [];

      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Add title
      doc.fontSize(20).text(reportName, { align: 'center' });
      doc.moveDown();
      doc
        .fontSize(12)
        .text(`Generated: ${new Date().toLocaleString()}`, { align: 'center' });
      doc.moveDown(2);

      // Add summary
      if (data.summary) {
        doc.fontSize(16).text('Summary');
        doc.moveDown();
        Object.entries(data.summary).forEach(([key, value]) => {
          doc
            .fontSize(12)
            .text(
              `${key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: ${value}`
            );
        });
        doc.moveDown(2);
      }

      // Add data table
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        doc.fontSize(16).text('Data');
        doc.moveDown();

        const headers = Object.keys(data.data[0]);
        const tableTop = doc.y;
        let tableLeft = 50;
        const colWidth = (doc.page.width - 100) / headers.length;

        // Draw headers
        headers.forEach((header, i) => {
          doc.fontSize(10).text(
            header.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            tableLeft + i * colWidth,
            tableTop,
            { width: colWidth - 5 }
          );
        });

        // Draw data rows (limited to first 20 rows to avoid PDF overflow)
        data.data.slice(0, 20).forEach((row: any, rowIndex: number) => {
          const y = tableTop + 20 + rowIndex * 15;
          headers.forEach((header, i) => {
            doc
              .fontSize(8)
              .text(String(row[header] || ''), tableLeft + i * colWidth, y, {
                width: colWidth - 5,
              });
          });
        });
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
