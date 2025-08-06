import React from 'react';
import SystemHealthMonitor from '@/components/admin/SystemHealthMonitor';

export default function SystemHealthPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className="text-3xl font-bold text-white">System Health</h1>
        <p className="text-white">
          Monitor system performance, health metrics, and manage alerts
        </p>
      </div>

      <SystemHealthMonitor />
    </div>
  );
}
