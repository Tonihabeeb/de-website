import React from 'react';
import NavigationManager from '@/components/admin/NavigationManager';
import AdminNavigation from '@/components/admin/AdminNavigation';

export default function AdminNavigationPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <AdminNavigation />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Navigation Management
          </h1>
          <p className='mt-2 text-gray-600'>
            Manage site navigation menus, menu items, and their hierarchy.
          </p>
        </div>

        <NavigationManager />
      </div>
    </div>
  );
}
