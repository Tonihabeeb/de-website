'use client';

import React from 'react';
import MediaManager from '@/components/admin/MediaManager';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function AdminMediaPage() {
  return (
    <ProtectedRoute requiredRoles={['admin', 'superadmin']}>
      <div className='min-h-screen bg-gray-50 p-6'>
        <div className='max-w-7xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-primary'>Media Library</h1>
            <p className='text-gray-text mt-2'>
              Manage and organize your media files
            </p>
          </div>

          {/* Media Manager Component */}
          <MediaManager />
        </div>
      </div>
    </ProtectedRoute>
  );
}
