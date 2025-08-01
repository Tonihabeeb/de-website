import React from 'react';
import SystemHealthMonitor from '@/components/admin/SystemHealthMonitor';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function AdminSystemHealthPage() {
  return (
    <ProtectedRoute requiredRoles={['admin', 'superadmin']}>
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-primary'>System Health</h1>
          <p className='text-gray-text mt-2'>
            Monitor system performance, health metrics, and manage alerts
          </p>
        </div>

        <SystemHealthMonitor />
      </div>
    </ProtectedRoute>
  );
}
