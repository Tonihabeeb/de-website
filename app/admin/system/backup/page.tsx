import React from 'react';
import BackupRestoreManager from '@/components/admin/BackupRestoreManager';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function AdminSystemBackupPage() {
  return (
    <ProtectedRoute requiredRoles={['admin', 'superadmin']}>
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-primary'>Backup & Restore</h1>
          <p className='text-gray-text mt-2'>
            Manage database backups, schedules, and restoration procedures
          </p>
        </div>

        <BackupRestoreManager />
      </div>
    </ProtectedRoute>
  );
}
