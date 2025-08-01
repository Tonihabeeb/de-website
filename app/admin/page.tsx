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
  Eye,
  Image,
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
  totalMedia: number;
  totalPageViews: number;
  uniqueVisitors: number;
}

interface DashboardData {
  stats: DashboardStats;
  recentActivity: any[];
  userStats: any;
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/admin/dashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const result = await response.json();
      if (result.success) {
        setDashboardData(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-red-600 text-xl font-semibold mb-4'>Error Loading Dashboard</div>
          <div className='text-gray-text mb-4'>{error}</div>
          <button 
            onClick={fetchDashboardData}
            className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {
    totalPages: 0,
    publishedPages: 0,
    draftPages: 0,
    totalProjects: 0,
    activeProjects: 0,
    totalUsers: 0,
    activeUsers: 0,
    totalMedia: 0,
    totalPageViews: 0,
    uniqueVisitors: 0,
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <div>
              <h1 className='text-3xl font-bold text-primary'>
                Admin Dashboard
              </h1>
              <p className='text-gray-text'>
                Real-time website analytics and management
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
                <p className='text-sm font-medium text-gray-text'>Total Pages</p>
                <p className='text-2xl font-bold text-primary'>
                  {stats.totalPages}
                </p>
                <p className='text-sm text-gray-500'>
                  {stats.publishedPages} published, {stats.draftPages} drafts
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-green-100 rounded-lg'>
                <FolderOpen className='w-6 h-6 text-green-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-text'>Projects</p>
                <p className='text-2xl font-bold text-primary'>
                  {stats.totalProjects}
                </p>
                <p className='text-sm text-gray-500'>
                  {stats.activeProjects} active
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-purple-100 rounded-lg'>
                <Users className='w-6 h-6 text-purple-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-text'>Users</p>
                <p className='text-2xl font-bold text-primary'>
                  {stats.totalUsers}
                </p>
                <p className='text-sm text-gray-500'>
                  {stats.activeUsers} active
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-orange-100 rounded-lg'>
                <Image className='w-6 h-6 text-orange-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-text'>Media Files</p>
                <p className='text-2xl font-bold text-primary'>
                  {stats.totalMedia}
                </p>
                <p className='text-sm text-gray-500'>
                  Total uploaded files
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Stats */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-indigo-100 rounded-lg'>
                <Eye className='w-6 h-6 text-indigo-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-text'>Page Views</p>
                <p className='text-2xl font-bold text-primary'>
                  {stats.totalPageViews.toLocaleString()}
                </p>
                <p className='text-sm text-gray-500'>
                  {stats.uniqueVisitors} unique visitors
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-teal-100 rounded-lg'>
                <BarChart3 className='w-6 h-6 text-teal-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-text'>Analytics</p>
                <p className='text-2xl font-bold text-primary'>
                  Live
                </p>
                <p className='text-sm text-gray-500'>
                  Real-time data
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Activity */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='bg-white rounded-lg shadow'>
            <div className='p-6 border-b'>
              <h2 className='text-lg font-semibold text-primary'>User Analytics</h2>
            </div>
            <div className='p-6'>
              <UserOverviewCharts 
                userStats={dashboardData?.userStats}
                className='h-64'
              />
            </div>
          </div>

          <div className='bg-white rounded-lg shadow'>
            <div className='p-6 border-b'>
              <h2 className='text-lg font-semibold text-primary'>Recent Activity</h2>
            </div>
            <div className='p-6'>
              <ActivityFeed 
                activities={dashboardData?.recentActivity}
                limit={8}
                showFilters={false}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
