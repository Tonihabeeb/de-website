import React from 'react';
import BackupRestoreManager from '@/components/admin/BackupRestoreManager';

export default function BackupRestorePage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className="text-3xl font-bold text-white">Backup & Restore</h1>
        <p className="text-white">
          Manage database backups, schedules, and restoration procedures
        </p>
      </div>

      <BackupRestoreManager />
    </div>
  );
}
