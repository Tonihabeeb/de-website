import { NextRequest, NextResponse } from 'next/server';
import { requireSuperAdmin } from '@/middleware/permissions';
import { db } from '@/database/connection';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);

interface BackupInfo {
  id: string;
  name: string;
  type: 'manual' | 'scheduled' | 'auto';
  size: number;
  status: 'completed' | 'in-progress' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  tables: string[];
  compression: boolean;
  encryption: boolean;
  retentionDays: number;
  downloadUrl?: string;
}

// GET /api/admin/backup - List all backups
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireSuperAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : 50;
    const offset = searchParams.get('offset')
      ? parseInt(searchParams.get('offset')!)
      : 0;

    // Get backups directory
    const backupsDir = path.join(process.cwd(), 'backups');

    // Ensure backups directory exists
    if (!fs.existsSync(backupsDir)) {
      await mkdir(backupsDir, { recursive: true });
    }

    // Read backup files
    const backupFiles = await readdir(backupsDir);
    const backups: BackupInfo[] = [];

    for (const file of backupFiles) {
      if (file.endsWith('.db') || file.endsWith('.sql')) {
        const filePath = path.join(backupsDir, file);
        const fileStats = await stat(filePath);

        // Parse backup info from filename
        const match = file.match(
          /backup-(\d{4}-\d{2}-\d{2})-(\d{2}-\d{2}-\d{2})-([a-z]+)-(.+)\.(db|sql)/
        );

        if (match) {
          const [, date, time, type, name, extension] = match;
          const backupId = file.replace(/\.[^/.]+$/, '');

          const backup: BackupInfo = {
            id: backupId,
            name: `${name} - ${date}`,
            type: type as 'manual' | 'scheduled' | 'auto',
            size: fileStats.size,
            status: 'completed',
            createdAt: new Date(`${date}T${time.replace(/-/g, ':')}`),
            completedAt: new Date(`${date}T${time.replace(/-/g, ':')}`),
            tables: [
              'users',
              'pages',
              'projects',
              'media',
              'site_settings',
              'navigation_menus',
              'content_versions',
            ],
            compression: extension === 'db',
            encryption: false,
            retentionDays: 30,
            downloadUrl: `/api/admin/backup/${backupId}/download`,
          };

          // Apply filters
          if (type && backup.type !== type) continue;
          if (status && backup.status !== status) continue;

          backups.push(backup);
        }
      }
    }

    // Sort by creation date (newest first)
    backups.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // Apply pagination
    const paginatedBackups = backups.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      backups: paginatedBackups,
      pagination: {
        page: Math.floor(offset / limit) + 1,
        limit,
        total: backups.length,
        totalPages: Math.ceil(backups.length / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching backups:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch backups' },
      { status: 500 }
    );
  }
}

// POST /api/admin/backup - Create new backup
export async function POST(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireSuperAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const {
      name = 'Manual Backup',
      type = 'manual',
      compression = true,
      encryption = false,
      retentionDays = 30,
      includeTables = [
        'users',
        'pages',
        'projects',
        'media',
        'site_settings',
        'navigation_menus',
        'content_versions',
      ],
    } = body;

    // Generate backup ID and filename
    const backupId = uuidv4();
    const timestamp =
      new Date().toISOString().replace(/[:.]/g, '-').split('T')[0] +
      '-' +
      new Date()
        .toISOString()
        .replace(/[:.]/g, '-')
        .split('T')[1]
        .split('.')[0];
    const filename = `backup-${timestamp}-${type}-${name.replace(/[^a-zA-Z0-9]/g, '-')}.db`;

    // Get backups directory
    const backupsDir = path.join(process.cwd(), 'backups');
    const backupPath = path.join(backupsDir, filename);

    // Ensure backups directory exists
    if (!fs.existsSync(backupsDir)) {
      await mkdir(backupsDir, { recursive: true });
    }

    // Create backup by copying database file
    const dbPath = path.join(process.cwd(), 'database', 'cms.db');
    await copyFile(dbPath, backupPath);

    // Get backup file stats
    const backupStats = await stat(backupPath);

    // Create backup info
    const backup: BackupInfo = {
      id: backupId,
      name: `${name} - ${new Date().toISOString().split('T')[0]}`,
      type,
      size: backupStats.size,
      status: 'completed',
      createdAt: new Date(),
      completedAt: new Date(),
      tables: includeTables,
      compression,
      encryption,
      retentionDays,
      downloadUrl: `/api/admin/backup/${backupId}/download`,
    };

    // Clean up old backups based on retention policy
    await cleanupOldBackups(backupsDir, retentionDays);

    return NextResponse.json(
      {
        success: true,
        backup,
        message: 'Backup created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating backup:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create backup' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/backup - Delete old backups
export async function DELETE(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireSuperAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const days = searchParams.get('days')
      ? parseInt(searchParams.get('days')!)
      : 30;

    // Get backups directory
    const backupsDir = path.join(process.cwd(), 'backups');

    if (!fs.existsSync(backupsDir)) {
      return NextResponse.json({
        success: true,
        message: 'No backups directory found',
        deletedCount: 0,
      });
    }

    const deletedCount = await cleanupOldBackups(backupsDir, days);

    return NextResponse.json({
      success: true,
      message: `Deleted ${deletedCount} old backups`,
      deletedCount,
    });
  } catch (error) {
    console.error('Error deleting old backups:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete old backups' },
      { status: 500 }
    );
  }
}

// Helper function to cleanup old backups
async function cleanupOldBackups(
  backupsDir: string,
  retentionDays: number
): Promise<number> {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

  const backupFiles = await readdir(backupsDir);
  let deletedCount = 0;

  for (const file of backupFiles) {
    if (file.endsWith('.db') || file.endsWith('.sql')) {
      const filePath = path.join(backupsDir, file);
      const fileStats = await stat(filePath);

      // Check if file is older than retention period
      if (fileStats.mtime < cutoffDate) {
        try {
          await unlink(filePath);
          deletedCount++;
        } catch (error) {
          console.error(`Failed to delete old backup: ${file}`, error);
        }
      }
    }
  }

  return deletedCount;
}
