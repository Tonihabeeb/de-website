import { NextRequest, NextResponse } from 'next/server';
import { requireViewAnalytics } from '@/middleware/permissions';
import { db } from '@/database/connection';

// GET /api/admin/analytics/export/download/[id] - Download exported file
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check permissions
    const permissionCheck = await requireViewAnalytics()(request);
    if (permissionCheck) return permissionCheck;

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'csv';

    // Mock export job data
    const exportJob = {
      id,
      config: {
        dataType: 'overview',
        dateRange: '30d',
        format: 'csv',
        includeCharts: false,
        filters: {}
      },
      status: 'completed',
      progress: 100,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      completedAt: new Date(Date.now() - 3500000).toISOString()
    };

    if (exportJob.status !== 'completed') {
      return NextResponse.json(
        { success: false, error: 'Export job not completed' },
        { status: 400 }
      );
    }

    // Generate export data based on configuration
    const exportData = await generateExportData(exportJob.config);

    // Generate file based on format
    let fileContent: string | Buffer;
    let contentType: string;
    let filename: string;

    switch (format) {
      case 'csv':
        fileContent = generateCSV(exportData);
        contentType = 'text/csv';
        filename = `analytics-${exportJob.config.dataType}-${new Date().toISOString().split('T')[0]}.csv`;
        break;
      
      case 'json':
        fileContent = JSON.stringify(exportData, null, 2);
        contentType = 'application/json';
        filename = `analytics-${exportJob.config.dataType}-${new Date().toISOString().split('T')[0]}.json`;
        break;
      
      case 'excel':
        fileContent = generateExcel(exportData);
        contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        filename = `analytics-${exportJob.config.dataType}-${new Date().toISOString().split('T')[0]}.xlsx`;
        break;
      
      case 'pdf':
        fileContent = generatePDF(exportData);
        contentType = 'application/pdf';
        filename = `analytics-${exportJob.config.dataType}-${new Date().toISOString().split('T')[0]}.pdf`;
        break;
      
      default:
        return NextResponse.json(
          { success: false, error: 'Unsupported format' },
          { status: 400 }
        );
    }

    // Create response with file
    const response = new NextResponse(fileContent);
    response.headers.set('Content-Type', contentType);
    response.headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    response.headers.set('Cache-Control', 'no-cache');

    return response;
  } catch (error) {
    console.error('Error downloading export:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to download export' },
      { status: 500 }
    );
  }
}

// Generate export data based on configuration
async function generateExportData(config: any) {
  const { dataType, dateRange, startDate, endDate, filters } = config;

  // Calculate date range
  const now = new Date();
  let startDateObj = new Date();
  let endDateObj = new Date();
  
  switch (dateRange) {
    case '7d':
      startDateObj.setDate(now.getDate() - 7);
      break;
    case '30d':
      startDateObj.setDate(now.getDate() - 30);
      break;
    case '90d':
      startDateObj.setDate(now.getDate() - 90);
      break;
    case 'custom':
      if (startDate && endDate) {
        startDateObj = new Date(startDate);
        endDateObj = new Date(endDate);
      }
      break;
    default:
      startDateObj.setDate(now.getDate() - 30);
  }

  switch (dataType) {
    case 'overview':
      return generateOverviewData(startDateObj, endDateObj);
    
    case 'users':
      return generateUserData(startDateObj, endDateObj, filters);
    
    case 'content':
      return generateContentData(startDateObj, endDateObj, filters);
    
    case 'projects':
      return generateProjectData(startDateObj, endDateObj, filters);
    
    case 'system':
      return generateSystemData(startDateObj, endDateObj);
    
    default:
      return generateOverviewData(startDateObj, endDateObj);
  }
}

// Generate overview data
async function generateOverviewData(startDate: Date, endDate: Date) {
  // Get overview statistics
  const pagesStmt = db.prepare('SELECT COUNT(*) as count FROM pages');
  const totalPages = pagesStmt.get() as any;

  const projectsStmt = db.prepare('SELECT COUNT(*) as count FROM projects');
  const totalProjects = projectsStmt.get() as any;

  const usersStmt = db.prepare('SELECT COUNT(*) as count FROM users');
  const totalUsers = usersStmt.get() as any;

  const newUsersStmt = db.prepare(`
    SELECT COUNT(*) as count FROM users 
    WHERE created_at >= ?
  `);
  const newUsers = newUsersStmt.get(startDate.toISOString()) as any;

  return {
    exportType: 'overview',
    dateRange: {
      start: startDate.toISOString(),
      end: endDate.toISOString()
    },
    generatedAt: new Date().toISOString(),
    summary: {
      totalPages: totalPages.count,
      totalProjects: totalProjects.count,
      totalUsers: totalUsers.count,
      newUsers: newUsers.count
    },
    dailyStats: [
      {
        date: startDate.toISOString().split('T')[0],
        newUsers: Math.floor(Math.random() * 10),
        activeUsers: Math.floor(Math.random() * 50) + 20,
        pageViews: Math.floor(Math.random() * 1000) + 500
      },
      {
        date: new Date(startDate.getTime() + 86400000).toISOString().split('T')[0],
        newUsers: Math.floor(Math.random() * 10),
        activeUsers: Math.floor(Math.random() * 50) + 20,
        pageViews: Math.floor(Math.random() * 1000) + 500
      }
    ]
  };
}

// Generate user data
async function generateUserData(startDate: Date, endDate: Date, filters: any) {
  const usersStmt = db.prepare(`
    SELECT id, username, email, role, created_at, last_login 
    FROM users 
    WHERE created_at >= ? 
    ORDER BY created_at DESC
  `);
  const users = usersStmt.all(startDate.toISOString()) as any[];

  return {
    exportType: 'users',
    dateRange: {
      start: startDate.toISOString(),
      end: endDate.toISOString()
    },
    generatedAt: new Date().toISOString(),
    filters,
    users: users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.created_at,
      lastLogin: user.last_login,
      isActive: user.last_login ? new Date(user.last_login) > startDate : false
    })),
    summary: {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.last_login && new Date(u.last_login) > startDate).length,
      newUsers: users.length,
      roleDistribution: users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    }
  };
}

// Generate content data
async function generateContentData(startDate: Date, endDate: Date, filters: any) {
  const pagesStmt = db.prepare(`
    SELECT id, title, slug, status, created_at, updated_at 
    FROM pages 
    WHERE created_at >= ? 
    ORDER BY created_at DESC
  `);
  const pages = pagesStmt.all(startDate.toISOString()) as any[];

  const projectsStmt = db.prepare(`
    SELECT id, name, slug, status, created_at, updated_at 
    FROM projects 
    WHERE created_at >= ? 
    ORDER BY created_at DESC
  `);
  const projects = projectsStmt.all(startDate.toISOString()) as any[];

  return {
    exportType: 'content',
    dateRange: {
      start: startDate.toISOString(),
      end: endDate.toISOString()
    },
    generatedAt: new Date().toISOString(),
    filters,
    pages: pages.map(page => ({
      id: page.id,
      title: page.title,
      slug: page.slug,
      status: page.status,
      createdAt: page.created_at,
      updatedAt: page.updated_at
    })),
    projects: projects.map(project => ({
      id: project.id,
      name: project.name,
      slug: project.slug,
      status: project.status,
      createdAt: project.created_at,
      updatedAt: project.updated_at
    })),
    summary: {
      totalPages: pages.length,
      totalProjects: projects.length,
      publishedPages: pages.filter(p => p.status === 'published').length,
      activeProjects: projects.filter(p => p.status === 'in-progress').length
    }
  };
}

// Generate project data
async function generateProjectData(startDate: Date, endDate: Date, filters: any) {
  const projectsStmt = db.prepare(`
    SELECT id, name, slug, description, status, capacity_mw, location, 
           start_date, end_date, budget, created_at, updated_at 
    FROM projects 
    WHERE created_at >= ? 
    ORDER BY created_at DESC
  `);
  const projects = projectsStmt.all(startDate.toISOString()) as any[];

  return {
    exportType: 'projects',
    dateRange: {
      start: startDate.toISOString(),
      end: endDate.toISOString()
    },
    generatedAt: new Date().toISOString(),
    filters,
    projects: projects.map(project => ({
      id: project.id,
      name: project.name,
      slug: project.slug,
      description: project.description,
      status: project.status,
      capacityMW: project.capacity_mw,
      location: project.location,
      startDate: project.start_date,
      endDate: project.end_date,
      budget: project.budget,
      createdAt: project.created_at,
      updatedAt: project.updated_at
    })),
    summary: {
      totalProjects: projects.length,
      totalCapacity: projects.reduce((sum, p) => sum + (p.capacity_mw || 0), 0),
      totalBudget: projects.reduce((sum, p) => sum + (p.budget || 0), 0),
      statusDistribution: projects.reduce((acc, project) => {
        acc[project.status] = (acc[project.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    }
  };
}

// Generate system data
async function generateSystemData(startDate: Date, endDate: Date) {
  return {
    exportType: 'system',
    dateRange: {
      start: startDate.toISOString(),
      end: endDate.toISOString()
    },
    generatedAt: new Date().toISOString(),
    systemHealth: {
      databaseStatus: 'healthy',
      storageStatus: 'healthy',
      performanceStatus: 'healthy'
    },
    performanceMetrics: {
      averageResponseTime: 150,
      memoryUsage: 45,
      cpuUsage: 25,
      errorRate: 0.1
    },
    dailyMetrics: [
      {
        date: startDate.toISOString().split('T')[0],
        responseTime: 145,
        memoryUsage: 42,
        cpuUsage: 23,
        errorRate: 0.08
      },
      {
        date: new Date(startDate.getTime() + 86400000).toISOString().split('T')[0],
        responseTime: 155,
        memoryUsage: 48,
        cpuUsage: 27,
        errorRate: 0.12
      }
    ]
  };
}

// Generate CSV content
function generateCSV(data: any): string {
  const flattenObject = (obj: any, prefix = ''): Record<string, any> => {
    const flattened: Record<string, any> = {};
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          Object.assign(flattened, flattenObject(obj[key], newKey));
        } else {
          flattened[newKey] = obj[key];
        }
      }
    }
    
    return flattened;
  };

  // Convert data to CSV format
  if (Array.isArray(data)) {
    if (data.length === 0) return '';
    
    const headers = Object.keys(flattenObject(data[0]));
    const csvRows = [headers.join(',')];
    
    for (const row of data) {
      const flattened = flattenObject(row);
      const values = headers.map(header => {
        const value = flattened[header];
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  } else {
    // Single object - convert to key-value pairs
    const flattened = flattenObject(data);
    const rows = Object.entries(flattened).map(([key, value]) => 
      `"${key}","${typeof value === 'string' ? value.replace(/"/g, '""') : value}"`
    );
    return 'Key,Value\n' + rows.join('\n');
  }
}

// Generate Excel content (simplified - returns CSV for now)
function generateExcel(data: any): Buffer {
  const csvContent = generateCSV(data);
  return Buffer.from(csvContent, 'utf-8');
}

// Generate PDF content (simplified - returns text for now)
function generatePDF(data: any): Buffer {
  const textContent = JSON.stringify(data, null, 2);
  return Buffer.from(textContent, 'utf-8');
} 