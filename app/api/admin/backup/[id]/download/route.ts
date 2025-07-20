import { NextRequest, NextResponse } from 'next/server';
import { requireSuperAdmin } from '@/middleware/permissions';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const stat = promisify(fs.stat);

// GET /api/admin/backup/[id]/download - Download backup file
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check permissions
    const permissionCheck = await requireSuperAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const { id } = await params;
    const backupsDir = path.join(process.cwd(), 'backups');
    
    // Find backup file by ID
    const backupFiles = fs.readdirSync(backupsDir);
    const backupFile = backupFiles.find(file => file.replace(/\.[^/.]+$/, '') === id);
    
    if (!backupFile) {
      return NextResponse.json(
        { success: false, error: 'Backup not found' },
        { status: 404 }
      );
    }

    const backupPath = path.join(backupsDir, backupFile);
    
    // Check if file exists
    if (!fs.existsSync(backupPath)) {
      return NextResponse.json(
        { success: false, error: 'Backup file not found' },
        { status: 404 }
      );
    }

    // Get file stats
    const fileStats = await stat(backupPath);
    
    // Read file
    const fileBuffer = fs.readFileSync(backupPath);
    
    // Create response with file download headers
    const response = new NextResponse(fileBuffer);
    response.headers.set('Content-Type', 'application/octet-stream');
    response.headers.set('Content-Disposition', `attachment; filename="${backupFile}"`);
    response.headers.set('Content-Length', fileStats.size.toString());
    
    return response;
  } catch (error) {
    console.error('Error downloading backup:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to download backup' },
      { status: 500 }
    );
  }
} 