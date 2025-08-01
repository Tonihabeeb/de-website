'use client';

import React from 'react';
import SystemAnalyticsDashboard from '@/components/admin/SystemAnalyticsDashboard';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function AdminAnalyticsPage() {
  return (
    <ProtectedRoute requiredRoles={['admin', 'superadmin']}>
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-primary'>
            Analytics Dashboard
          </h1>
          <p className='text-gray-text mt-2'>
            Comprehensive system analytics, user behavior insights, and
            performance metrics
          </p>
        </div>

        <SystemAnalyticsDashboard />
      </div>
    </ProtectedRoute>
  );
}
