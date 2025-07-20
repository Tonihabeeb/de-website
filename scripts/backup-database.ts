#!/usr/bin/env ts-node

import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { db } from '../database/connection';

interface BackupInfo {
  id: string;
  filename: string;
  size: number;
  created_at: string;
  type: 'full' | 'incremental';
  status: 'completed' | 'failed';
  tables: string[];
  record_count: number;
}

async function createBackup(type: 'full' | 'incremental' = 'full'): Promise<BackupInfo> {
  try {
    console.log(`Starting ${type} database backup...`);

    // Create backup directory if it doesn't exist
    const backupDir = path.join(process.cwd(), 'backups');
    if (!existsSync(backupDir)) {
      await mkdir(backupDir, { recursive: true });
    }

    // Generate backup filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupId = `backup-${timestamp}`;
    const filename = `cms-backup-${timestamp}.sqlite`;
    const backupPath = path.join(backupDir, filename);

    // Get database path
    const dbPath = path.join(process.cwd(), 'database', 'cms.db');
    
    if (!existsSync(dbPath)) {
      throw new Error('Database file not found');
    }

    // Copy database file
    const dbContent = await readFile(dbPath);
    await writeFile(backupPath, dbContent);

    // Get backup statistics
    const backupStats = await getBackupStatistics(backupPath);

    const backupInfo: BackupInfo = {
      id: backupId,
      filename,
      size: dbContent.length,
      created_at: new Date().toISOString(),
      type,
      status: 'completed',
      tables: backupStats.tables,
      record_count: backupStats.recordCount,
    };

    // Save backup metadata
    const metadataPath = path.join(backupDir, `${backupId}.json`);
    await writeFile(metadataPath, JSON.stringify(backupInfo, null, 2));

    console.log(`✅ Backup completed successfully: ${filename}`);
    console.log(`📊 Backup size: ${formatFileSize(backupInfo.size)}`);
    console.log(`📋 Tables backed up: ${backupInfo.tables.length}`);
    console.log(`📈 Total records: ${backupInfo.record_count}`);

    return backupInfo;
  } catch (error) {
    console.error('❌ Backup failed:', error);
    throw error;
  }
}

async function getBackupStatistics(backupPath: string): Promise<{ tables: string[], recordCount: number }> {
  try {
    // Create a temporary connection to the backup database
    const backupDb = require('better-sqlite3')(backupPath);
    
    // Get all tables
    const tablesStmt = backupDb.prepare(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
    `);
    const tables = tablesStmt.all() as { name: string }[];
    
    // Count total records
    let recordCount = 0;
    for (const table of tables) {
      const countStmt = backupDb.prepare(`SELECT COUNT(*) as count FROM ${table.name}`);
      const result = countStmt.get() as { count: number };
      recordCount += result.count;
    }
    
    backupDb.close();
    
    return {
      tables: tables.map(t => t.name),
      recordCount,
    };
  } catch (error) {
    console.error('Error getting backup statistics:', error);
    return {
      tables: [],
      recordCount: 0,
    };
  }
}

async function listBackups(): Promise<BackupInfo[]> {
  try {
    const backupDir = path.join(process.cwd(), 'backups');
    
    if (!existsSync(backupDir)) {
      return [];
    }

    const fs = require('fs');
    const files = fs.readdirSync(backupDir);
    const backupFiles = files.filter((file: string) => file.endsWith('.json'));

    const backups: BackupInfo[] = [];
    
    for (const file of backupFiles) {
      try {
        const metadataPath = path.join(backupDir, file);
        const metadataContent = await readFile(metadataPath, 'utf-8');
        const backupInfo = JSON.parse(metadataContent) as BackupInfo;
        backups.push(backupInfo);
      } catch (error) {
        console.error(`Error reading backup metadata for ${file}:`, error);
      }
    }

    return backups.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } catch (error) {
    console.error('Error listing backups:', error);
    return [];
  }
}

async function restoreBackup(backupId: string): Promise<boolean> {
  try {
    console.log(`Starting restore from backup: ${backupId}`);

    const backupDir = path.join(process.cwd(), 'backups');
    const backupPath = path.join(backupDir, `cms-backup-${backupId}.sqlite`);
    const dbPath = path.join(process.cwd(), 'database', 'cms.db');

    if (!existsSync(backupPath)) {
      throw new Error(`Backup file not found: ${backupPath}`);
    }

    // Create a backup of current database before restoring
    const currentBackupPath = path.join(backupDir, `pre-restore-${Date.now()}.sqlite`);
    if (existsSync(dbPath)) {
      const currentDbContent = await readFile(dbPath);
      await writeFile(currentBackupPath, currentDbContent);
      console.log(`✅ Current database backed up to: ${currentBackupPath}`);
    }

    // Restore the backup
    const backupContent = await readFile(backupPath);
    await writeFile(dbPath, backupContent);

    console.log(`✅ Database restored successfully from: ${backupId}`);
    return true;
  } catch (error) {
    console.error('❌ Restore failed:', error);
    return false;
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// CLI interface
async function main() {
  const command = process.argv[2];
  const arg = process.argv[3];

  try {
    switch (command) {
      case 'create':
        const type = arg as 'full' | 'incremental' || 'full';
        await createBackup(type);
        break;
        
      case 'list':
        const backups = await listBackups();
        console.log('\n📋 Available Backups:');
        console.log('─'.repeat(80));
        backups.forEach(backup => {
          console.log(`ID: ${backup.id}`);
          console.log(`File: ${backup.filename}`);
          console.log(`Size: ${formatFileSize(backup.size)}`);
          console.log(`Type: ${backup.type}`);
          console.log(`Created: ${new Date(backup.created_at).toLocaleString()}`);
          console.log(`Tables: ${backup.tables.length}`);
          console.log(`Records: ${backup.record_count}`);
          console.log('─'.repeat(80));
        });
        break;
        
      case 'restore':
        if (!arg) {
          console.error('❌ Backup ID is required for restore');
          process.exit(1);
        }
        const success = await restoreBackup(arg);
        if (success) {
          console.log('✅ Restore completed successfully');
        } else {
          console.error('❌ Restore failed');
          process.exit(1);
        }
        break;
        
      default:
        console.log(`
🗄️  Database Backup Tool

Usage:
  npm run backup create [full|incremental]  - Create a new backup
  npm run backup list                       - List all backups
  npm run backup restore <backup-id>        - Restore from backup

Examples:
  npm run backup create full
  npm run backup create incremental
  npm run backup list
  npm run backup restore backup-2024-12-19-001
        `);
    }
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { createBackup, listBackups, restoreBackup }; 