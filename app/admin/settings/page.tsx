import React from 'react';
import SystemSettings from '@/components/admin/SystemSettings';
import AdminNavigation from '@/components/admin/AdminNavigation';

export default function AdminSettingsPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <AdminNavigation />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8'>
          <h1 className="text-3xl font-bold text-white">System Settings</h1>
          <p className="mt-2 text-white">
            Configure system-wide settings, security options, and email
            configuration.
          </p>
        </div>

        <SystemSettings />
      </div>
    </div>
  );
}
