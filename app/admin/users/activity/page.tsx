import { Metadata } from 'next';
import UserActivityMonitor from '@/components/admin/UserActivityMonitor';

export const metadata: Metadata = {
  title: 'User Activity Monitor | Admin Dashboard',
  description: 'Monitor and track user activities across the CMS system',
};

export default function UserActivityPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            User Activity Monitor
          </h1>
          <p className="text-lg text-gray-600">
            Track and monitor user activities, system access, and content modifications across the CMS.
          </p>
        </div>

        <UserActivityMonitor />
      </div>
    </div>
  );
} 