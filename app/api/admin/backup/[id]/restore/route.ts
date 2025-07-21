import { NextRequest, NextResponse } from 'next/server';
import { requireSuperAdmin } from '@/middleware/permissions';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const copyFile = promisify(fs.copyFile);
const stat = promisify(fs.stat);

// POST /api/admin/backup/[id]/restore - Restore database from backup
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check permissions
    const permissionCheck = await requireSuperAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const { id } = await params;
    const body = await request.json();
    const { confirm = false } = body;

    // Require explicit confirmation for restore
    if (!confirm) {
      return NextResponse.json(
        { success: false, error: 'Restore requires explicit confirmation' },
        { status: 400 }
      );
    }

    const backupsDir = path.join(process.cwd(), 'backups');

    // Find backup file by ID
    const backupFiles = fs.readdirSync(backupsDir);
    const backupFile = backupFiles.find(
      file => file.replace(/\.[^/.]+$/, '') === id
    );

    if (!backupFile) {
      return NextResponse.json(
        { success: false, error: 'Backup not found' },
        { status: 404 }
      );
    }

    const backupPath = path.join(backupsDir, backupFile);
    const dbPath = path.join(process.cwd(), 'database', 'cms.db');

    // Check if backup file exists
    if (!fs.existsSync(backupPath)) {
      return NextResponse.json(
        { success: false, error: 'Backup file not found' },
        { status: 404 }
      );
    }

    // Create a backup of current database before restore
    const timestamp =
      new Date().toISOString().replace(/[:.]/g, '-').split('T')[0] +
      '-' +
      new Date()
        .toISOString()
        .replace(/[:.]/g, '-')
        .split('T')[1]
        .split('.')[0];
    const preRestoreBackupPath = path.join(
      backupsDir,
      `pre-restore-backup-${timestamp}.db`
    );

    if (fs.existsSync(dbPath)) {
      await copyFile(dbPath, preRestoreBackupPath);
    }

    // Restore database by copying backup file
    await copyFile(backupPath, dbPath);

    // Get backup file stats for response
    const backupStats = await stat(backupPath);

    return NextResponse.json({
      success: true,
      message: 'Database restored successfully',
      backup: {
        id: id,
        filename: backupFile,
        size: backupStats.size,
        restoredAt: new Date().toISOString(),
        preRestoreBackup: `pre-restore-backup-${timestamp}.db`,
      },
    });
  } catch (error) {
    console.error('Error restoring backup:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to restore backup' },
      { status: 500 }
    );
  }
}
