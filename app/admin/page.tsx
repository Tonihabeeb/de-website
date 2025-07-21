'use client';

import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Users,
  Settings,
  BarChart3,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
} from 'lucide-react';
import ActivityFeed from '@/components/admin/ActivityFeed';
import UserOverviewCharts from '@/components/admin/UserOverviewCharts';

interface DashboardStats {
  totalPages: number;
  publishedPages: number;
  draftPages: number;
  totalProjects: number;
  activeProjects: number;
  totalUsers: number;
  activeUsers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPages: 0,
    publishedPages: 0,
    draftPages: 0,
    totalProjects: 0,
    activeProjects: 0,
    totalUsers: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch dashboard data from API
    // For now, using mock data
    setStats({
      totalPages: 12,
      publishedPages: 8,
      draftPages: 4,
      totalProjects: 6,
      activeProjects: 3,
      totalUsers: 15,
      activeUsers: 12,
    });

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>
                Admin Dashboard
              </h1>
              <p className='text-gray-600'>
                Manage your website content and users
              </p>
            </div>
            <div className='flex items-center space-x-4'>
              <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2'>
                <Plus className='w-4 h-4' />
                <span>New Page</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-blue-100 rounded-lg'>
                <FileText className='w-6 h-6 text-blue-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Total Pages</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {stats.totalPages}
                </p>
              </div>
            </div>
            <div className='mt-4'>
              <div className='flex justify-between text-sm'>
                <span className='text-green-600'>
                  {stats.publishedPages} Published
                </span>
                <span className='text-yellow-600'>
                  {stats.draftPages} Draft
                </span>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-purple-100 rounded-lg'>
                <FolderOpen className='w-6 h-6 text-purple-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Projects</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {stats.totalProjects}
                </p>
              </div>
            </div>
            <div className='mt-4'>
              <div className='flex justify-between text-sm'>
                <span className='text-green-600'>
                  {stats.activeProjects} Active
                </span>
                <span className='text-gray-600'>
                  {stats.totalProjects - stats.activeProjects} Inactive
                </span>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-green-100 rounded-lg'>
                <Users className='w-6 h-6 text-green-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Users</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {stats.totalUsers}
                </p>
              </div>
            </div>
            <div className='mt-4'>
              <div className='flex justify-between text-sm'>
                <span className='text-green-600'>
                  {stats.activeUsers} Active
                </span>
                <span className='text-gray-600'>
                  {stats.totalUsers - stats.activeUsers} Inactive
                </span>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-orange-100 rounded-lg'>
                <BarChart3 className='w-6 h-6 text-orange-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Analytics</p>
                <p className='text-2xl font-bold text-gray-900'>Coming Soon</p>
              </div>
            </div>
            <div className='mt-4'>
              <div className='text-sm text-gray-600'>
                <span>Page views tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='bg-white rounded-lg shadow mb-8'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-lg font-medium text-gray-900'>Quick Actions</h2>
          </div>
          <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <button className='flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
                <FileText className='w-5 h-5 text-blue-600 mr-3' />
                <div className='text-left'>
                  <p className='font-medium text-gray-900'>Create New Page</p>
                  <p className='text-sm text-gray-600'>
                    Add content to your website
                  </p>
                </div>
              </button>

              <button className='flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
                <FolderOpen className='w-5 h-5 text-purple-600 mr-3' />
                <div className='text-left'>
                  <p className='font-medium text-gray-900'>New Project</p>
                  <p className='text-sm text-gray-600'>
                    Start a new KPP project
                  </p>
                </div>
              </button>

              <button className='flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
                <Users className='w-5 h-5 text-green-600 mr-3' />
                <div className='text-left'>
                  <p className='font-medium text-gray-900'>Manage Users</p>
                  <p className='text-sm text-gray-600'>
                    Add or edit team members
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Recent Activity */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg shadow'>
              <div className='px-6 py-4 border-b border-gray-200'>
                <h2 className='text-lg font-medium text-gray-900'>
                  Recent Activity
                </h2>
                <p className='text-sm text-gray-600'>
                  Latest actions across the system
                </p>
              </div>
              <div className='p-6'>
                <ActivityFeed limit={8} />
              </div>
            </div>
          </div>

          {/* User Overview */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow'>
              <div className='px-6 py-4 border-b border-gray-200'>
                <h2 className='text-lg font-medium text-gray-900'>
                  User Overview
                </h2>
                <p className='text-sm text-gray-600'>Team activity and roles</p>
              </div>
              <div className='p-6'>
                <UserOverviewCharts />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
