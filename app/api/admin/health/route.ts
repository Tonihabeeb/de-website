import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/permissions';
import { db } from '@/database/connection';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const stat = promisify(fs.stat);

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
  threshold: {
    warning: number;
    critical: number;
  };
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  resolved: boolean;
}

interface SystemHealth {
  overall: 'healthy' | 'warning' | 'critical';
  uptime: number;
  lastCheck: Date;
  metrics: SystemMetric[];
  alerts: SystemAlert[];
  services: {
    name: string;
    status: 'running' | 'stopped' | 'error';
    responseTime: number;
  }[];
}

// GET /api/admin/health - Get system health status
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    // Get database metrics
    const dbMetrics = await getDatabaseMetrics();
    
    // Get storage metrics
    const storageMetrics = await getStorageMetrics();
    
    // Get performance metrics
    const performanceMetrics = await getPerformanceMetrics();
    
    // Get service status
    const serviceStatus = await getServiceStatus();
    
    // Get system alerts
    const alerts = await getSystemAlerts();
    
    // Calculate overall health status
    const overallStatus = calculateOverallHealth(dbMetrics, storageMetrics, performanceMetrics, serviceStatus);
    
    // Calculate uptime (mock for now - in production, track actual uptime)
    const uptime = 99.8; // Mock uptime percentage
    
    const systemHealth: SystemHealth = {
      overall: overallStatus,
      uptime,
      lastCheck: new Date(),
      metrics: [
        ...dbMetrics,
        ...storageMetrics,
        ...performanceMetrics
      ],
      alerts,
      services: serviceStatus
    };

    return NextResponse.json({
      success: true,
      health: systemHealth
    });
  } catch (error) {
    console.error('Error fetching system health:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch system health' },
      { status: 500 }
    );
  }
}

// Helper function to get database metrics
async function getDatabaseMetrics(): Promise<SystemMetric[]> {
  try {
    // Get database file size
    const dbPath = path.join(process.cwd(), 'database', 'cms.db');
    const dbStats = await stat(dbPath);
    const dbSizeMB = dbStats.size / (1024 * 1024);
    
    // Get table counts
    const tablesStmt = db.prepare("SELECT name FROM sqlite_master WHERE type='table'");
    const tables = tablesStmt.all() as any[];
    
    // Get total records
    const totalRecords = tables.reduce((total, table) => {
      const countStmt = db.prepare(`SELECT COUNT(*) as count FROM ${table.name}`);
      const result = countStmt.get() as any;
      return total + result.count;
    }, 0);
    
    // Get active connections (mock for SQLite)
    const activeConnections = 1; // SQLite typically has one connection
    
    return [
      {
        id: 'database-size',
        name: 'Database Size',
        value: Math.round(dbSizeMB * 100) / 100,
        unit: 'MB',
        status: dbSizeMB > 100 ? 'warning' : 'healthy',
        trend: 'stable',
        lastUpdated: new Date(),
        threshold: { warning: 100, critical: 500 }
      },
      {
        id: 'database-tables',
        name: 'Database Tables',
        value: tables.length,
        unit: 'tables',
        status: 'healthy',
        trend: 'stable',
        lastUpdated: new Date(),
        threshold: { warning: 50, critical: 100 }
      },
      {
        id: 'database-records',
        name: 'Total Records',
        value: totalRecords,
        unit: 'records',
        status: 'healthy',
        trend: 'up',
        lastUpdated: new Date(),
        threshold: { warning: 10000, critical: 50000 }
      },
      {
        id: 'database-connections',
        name: 'Database Connections',
        value: activeConnections,
        unit: 'active',
        status: 'healthy',
        trend: 'stable',
        lastUpdated: new Date(),
        threshold: { warning: 20, critical: 30 }
      }
    ];
  } catch (error) {
    console.error('Error getting database metrics:', error);
    return [];
  }
}

// Helper function to get storage metrics
async function getStorageMetrics(): Promise<SystemMetric[]> {
  try {
    // Get uploads directory size
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    let uploadsSize = 0;
    
    if (fs.existsSync(uploadsDir)) {
      uploadsSize = await getDirectorySize(uploadsDir);
    }
    
    // Get backups directory size
    const backupsDir = path.join(process.cwd(), 'backups');
    let backupsSize = 0;
    
    if (fs.existsSync(backupsDir)) {
      backupsSize = await getDirectorySize(backupsDir);
    }
    
    const totalStorageMB = (uploadsSize + backupsSize) / (1024 * 1024);
    
    return [
      {
        id: 'storage-usage',
        name: 'Storage Usage',
        value: Math.round(totalStorageMB * 100) / 100,
        unit: 'MB',
        status: totalStorageMB > 1000 ? 'warning' : 'healthy',
        trend: 'up',
        lastUpdated: new Date(),
        threshold: { warning: 1000, critical: 5000 }
      },
      {
        id: 'uploads-size',
        name: 'Uploads Size',
        value: Math.round(uploadsSize / (1024 * 1024) * 100) / 100,
        unit: 'MB',
        status: 'healthy',
        trend: 'up',
        lastUpdated: new Date(),
        threshold: { warning: 500, critical: 2000 }
      },
      {
        id: 'backups-size',
        name: 'Backups Size',
        value: Math.round(backupsSize / (1024 * 1024) * 100) / 100,
        unit: 'MB',
        status: 'healthy',
        trend: 'up',
        lastUpdated: new Date(),
        threshold: { warning: 500, critical: 2000 }
      }
    ];
  } catch (error) {
    console.error('Error getting storage metrics:', error);
    return [];
  }
}

// Helper function to get performance metrics
async function getPerformanceMetrics(): Promise<SystemMetric[]> {
  try {
    // Mock performance metrics (in production, these would be real measurements)
    const responseTime = Math.floor(Math.random() * 200) + 100; // 100-300ms
    const memoryUsage = Math.floor(Math.random() * 30) + 40; // 40-70%
    const cpuUsage = Math.floor(Math.random() * 20) + 20; // 20-40%
    
    return [
      {
        id: 'response-time',
        name: 'Response Time',
        value: responseTime,
        unit: 'ms',
        status: responseTime > 500 ? 'warning' : 'healthy',
        trend: responseTime > 400 ? 'up' : 'down',
        lastUpdated: new Date(),
        threshold: { warning: 500, critical: 1000 }
      },
      {
        id: 'memory-usage',
        name: 'Memory Usage',
        value: memoryUsage,
        unit: '%',
        status: memoryUsage > 70 ? 'warning' : 'healthy',
        trend: memoryUsage > 60 ? 'up' : 'down',
        lastUpdated: new Date(),
        threshold: { warning: 70, critical: 90 }
      },
      {
        id: 'cpu-usage',
        name: 'CPU Usage',
        value: cpuUsage,
        unit: '%',
        status: cpuUsage > 80 ? 'warning' : 'healthy',
        trend: cpuUsage > 60 ? 'up' : 'down',
        lastUpdated: new Date(),
        threshold: { warning: 80, critical: 95 }
      }
    ];
  } catch (error) {
    console.error('Error getting performance metrics:', error);
    return [];
  }
}

// Helper function to get service status
async function getServiceStatus(): Promise<SystemHealth['services']> {
  try {
    // Mock service status (in production, these would check actual services)
    return [
      {
        name: 'Web Server',
        status: 'running',
        responseTime: Math.floor(Math.random() * 50) + 20
      },
      {
        name: 'Database',
        status: 'running',
        responseTime: Math.floor(Math.random() * 100) + 50
      },
      {
        name: 'File Storage',
        status: 'running',
        responseTime: Math.floor(Math.random() * 80) + 30
      },
      {
        name: 'Email Service',
        status: 'running',
        responseTime: Math.floor(Math.random() * 200) + 100
      },
      {
        name: 'Backup Service',
        status: 'running',
        responseTime: Math.floor(Math.random() * 150) + 50
      }
    ];
  } catch (error) {
    console.error('Error getting service status:', error);
    return [];
  }
}

// Helper function to get system alerts
async function getSystemAlerts(): Promise<SystemAlert[]> {
  try {
    // Mock system alerts (in production, these would be real alerts)
    const alerts: SystemAlert[] = [];
    
    // Check for potential issues
    const dbPath = path.join(process.cwd(), 'database', 'cms.db');
    const dbStats = await stat(dbPath);
    const dbSizeMB = dbStats.size / (1024 * 1024);
    
    if (dbSizeMB > 50) {
      alerts.push({
        id: 'db-size-warning',
        type: 'warning',
        title: 'Database Size Warning',
        message: `Database size is ${Math.round(dbSizeMB)}MB. Consider optimization.`,
        timestamp: new Date(),
        resolved: false
      });
    }
    
    // Add some mock alerts for demonstration
    if (Math.random() > 0.7) {
      alerts.push({
        id: 'memory-warning',
        type: 'warning',
        title: 'High Memory Usage',
        message: 'Memory usage has exceeded 60% threshold.',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        resolved: false
      });
    }
    
    return alerts;
  } catch (error) {
    console.error('Error getting system alerts:', error);
    return [];
  }
}

// Helper function to calculate overall health status
function calculateOverallHealth(
  dbMetrics: SystemMetric[],
  storageMetrics: SystemMetric[],
  performanceMetrics: SystemMetric[],
  services: SystemHealth['services']
): 'healthy' | 'warning' | 'critical' {
  const allMetrics = [...dbMetrics, ...storageMetrics, ...performanceMetrics];
  const criticalCount = allMetrics.filter(m => m.status === 'critical').length;
  const warningCount = allMetrics.filter(m => m.status === 'warning').length;
  const stoppedServices = services.filter(s => s.status === 'stopped').length;
  const errorServices = services.filter(s => s.status === 'error').length;
  
  if (criticalCount > 0 || errorServices > 0) {
    return 'critical';
  } else if (warningCount > 0 || stoppedServices > 0) {
    return 'warning';
  } else {
    return 'healthy';
  }
}

// Helper function to get directory size
async function getDirectorySize(dirPath: string): Promise<number> {
  try {
    const files = fs.readdirSync(dirPath);
    let totalSize = 0;
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isFile()) {
        totalSize += stats.size;
      } else if (stats.isDirectory()) {
        totalSize += await getDirectorySize(filePath);
      }
    }
    
    return totalSize;
  } catch (error) {
    console.error('Error calculating directory size:', error);
    return 0;
  }
} 