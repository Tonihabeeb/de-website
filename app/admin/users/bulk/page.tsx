import { Metadata } from 'next';
import BulkUserOperations from '@/components/admin/BulkUserOperations';

export const metadata: Metadata = {
  title: 'Bulk User Operations | Admin Dashboard',
  description: 'Manage multiple users with bulk operations including role updates, status changes, and data import/export',
};

export default function BulkUserOperationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bulk User Operations
          </h1>
          <p className="text-lg text-gray-600">
            Efficiently manage multiple users with bulk operations, role assignments, and data import/export capabilities.
          </p>
        </div>

        <BulkUserOperations />
      </div>
    </div>
  );
} 