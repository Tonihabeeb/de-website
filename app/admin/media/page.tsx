'use client';

import React from 'react';
import MediaManager from '@/components/admin/MediaManager';

export default function MediaPage() {
  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Media Library</h1>
          <p className='text-gray-600 mt-2'>
            Manage and organize your media files
          </p>
        </div>

        {/* Media Manager Component */}
        <MediaManager />
      </div>
    </div>
  );
}
