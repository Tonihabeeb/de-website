import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  Users,
  Leaf,
  Clock,
  DollarSign,
} from 'lucide-react';
import AuthGuard from '@/components/auth/AuthGuard';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className='min-h-screen bg-gray-50'>
        <div className='container mx-auto px-4 py-8'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-primary mb-2'>Dashboard</h1>
            <p className='text-gray-600'>
              Welcome to your Deep Engineering dashboard
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {/* Project Progress */}
            <Link href='/dashboard/project-progress' className='group'>
              <div className='bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                    <Clock className='w-6 h-6 text-blue-600' />
                  </div>
                  <TrendingUp className='w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  Project Progress
                </h3>
                <p className='text-gray-600 text-sm'>
                  Track project milestones and timelines
                </p>
              </div>
            </Link>

            {/* Financial Dashboard */}
            <Link href='/dashboard/financial' className='group'>
              <div className='bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
                    <DollarSign className='w-6 h-6 text-green-600' />
                  </div>
                  <TrendingUp className='w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  Financial Overview
                </h3>
                <p className='text-gray-600 text-sm'>
                  Monitor financial metrics and performance
                </p>
              </div>
            </Link>

            {/* Stakeholders */}
            <Link href='/dashboard/stakeholders' className='group'>
              <div className='bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
                    <Users className='w-6 h-6 text-purple-600' />
                  </div>
                  <TrendingUp className='w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  Stakeholders
                </h3>
                <p className='text-gray-600 text-sm'>
                  Manage stakeholder relationships
                </p>
              </div>
            </Link>

            {/* Environment */}
            <Link href='/dashboard/environmental' className='group'>
              <div className='bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center'>
                    <Leaf className='w-6 h-6 text-emerald-600' />
                  </div>
                  <TrendingUp className='w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  Environment Dashboard
                </h3>
                <p className='text-gray-600 text-sm'>
                  Track environmental impact and compliance
                </p>
              </div>
            </Link>

            {/* Analytics */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center'>
                  <BarChart3 className='w-6 h-6 text-orange-600' />
                </div>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Analytics
              </h3>
              <p className='text-gray-600 text-sm'>
                Comprehensive data analysis and insights
              </p>
            </div>

            {/* Quick Actions */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
                  <BarChart3 className='w-6 h-6 text-gray-600' />
                </div>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Quick Actions
              </h3>
              <p className='text-gray-600 text-sm'>
                Common tasks and shortcuts
              </p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className='mt-8'>
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                Recent Activity
              </h2>
              <div className='space-y-4'>
                <div className='flex items-center space-x-3'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                  <span className='text-sm text-gray-600'>
                    Project milestone completed
                  </span>
                  <span className='text-xs text-gray-400'>2 hours ago</span>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <span className='text-sm text-gray-600'>
                    Financial report generated
                  </span>
                  <span className='text-xs text-gray-400'>1 day ago</span>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                  <span className='text-sm text-gray-600'>
                    New stakeholder added
                  </span>
                  <span className='text-xs text-gray-400'>3 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
