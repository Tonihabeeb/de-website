import React from 'react';
import BackupRestoreManager from '@/components/admin/BackupRestoreManager';

export default function BackupRestorePage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>Backup & Restore</h1>
        <p className='text-gray-600 mt-2'>
          Manage database backups, schedules, and restoration procedures
        </p>
      </div>

      <BackupRestoreManager />
    </div>
  );
}
