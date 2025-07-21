import React from 'react';
import SystemHealthMonitor from '@/components/admin/SystemHealthMonitor';

export default function SystemHealthPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>System Health</h1>
        <p className='text-gray-600 mt-2'>
          Monitor system performance, health metrics, and manage alerts
        </p>
      </div>

      <SystemHealthMonitor />
    </div>
  );
}
