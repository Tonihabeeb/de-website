import React from 'react';
import SystemAnalyticsDashboard from '@/components/admin/SystemAnalyticsDashboard';

export default function AnalyticsPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className="text-3xl font-bold text-white">
          Analytics Dashboard
        </h1>
        <p className="text-white">
          Comprehensive system analytics, user behavior insights, and
          performance metrics
        </p>
      </div>

      <SystemAnalyticsDashboard />
    </div>
  );
}
