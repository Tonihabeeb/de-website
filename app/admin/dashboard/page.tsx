'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  FolderOpen,
  Users,
  Settings,
  BarChart3,
  Activity,
  Plus,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Upload,
} from 'lucide-react';
import ActivityFeed from '@/components/admin/ActivityFeed';
import UserOverviewCharts from '@/components/admin/UserOverviewCharts';

interface DashboardStats {
  pages: {
    total: number;
    published: number;
    draft: number;
    archived: number;
  };
  projects: {
    total: number;
    active: number;
    completed: number;
    on_hold: number;
  };
  users: {
    total: number;
    active: number;
    inactive: number;
  };
  recent_activity: Array<{
    id: string;
    user_id: string;
    action: string;
    resource: string;
    created_at: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      // Fetch pages
      const pagesResponse = await fetch('/api/admin/pages?limit=1000');
      const pagesData = await pagesResponse.json();

      // Fetch projects
      const projectsResponse = await fetch('/api/admin/projects?limit=1000');
      const projectsData = await projectsResponse.json();

      // Fetch users
      const usersResponse = await fetch('/api/admin/users?limit=1000');
      const usersData = await usersResponse.json();

      // Fetch recent activity
      const activityResponse = await fetch(
        '/api/admin/users/activity?limit=10'
      );
      const activityData = await activityResponse.json();

      if (
        pagesData.success &&
        projectsData.success &&
        usersData.success &&
        activityData.success
      ) {
        const pages = pagesData.pages || [];
        const projects = projectsData.projects || [];
        const users = usersData.users || [];
        const activity = activityData.logs || [];

        setStats({
          pages: {
            total: pages.length,
            published: pages.filter(
              (p: { status: string }) => p.status === 'published'
            ).length,
            draft: pages.filter((p: { status: string }) => p.status === 'draft')
              .length,
            archived: pages.filter(
              (p: { status: string }) => p.status === 'archived'
            ).length,
          },
          projects: {
            total: projects.length,
            active: projects.filter(
              (p: { status: string }) => p.status === 'active'
            ).length,
            completed: projects.filter(
              (p: { status: string }) => p.status === 'completed'
            ).length,
            on_hold: projects.filter(
              (p: { status: string }) => p.status === 'on_hold'
            ).length,
          },
          users: {
            total: users.length,
            active: users.filter(
              (u: { status: string }) => u.status === 'active'
            ).length,
            inactive: users.filter(
              (u: { status: string }) => u.status === 'inactive'
            ).length,
          },
          recent_activity: activity,
        });
      }
    } catch (err) {
      setError('Error loading dashboard');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'published':
      case 'active':
        return <CheckCircle className='w-4 h-4 text-green-500' />;
      case 'on_hold':
      case 'draft':
        return <Clock className='w-4 h-4 text-yellow-500' />;
      case 'archived':
      case 'inactive':
        return <XCircle className='w-4 h-4 text-red-500' />;
      default:
        return <AlertCircle className="w-4 h-4 text-white" />;
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 p-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='animate-pulse'>
            <div className='h-8 bg-gray-200 rounded w-1/4 mb-8'></div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
              {[...Array(4)].map((_, i) => (
                <div key={i} className='bg-white p-6 rounded-lg shadow'>
                  <div className='h-4 bg-gray-200 rounded w-1/2 mb-2'></div>
                  <div className='h-8 bg-gray-200 rounded w-1/3'></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 p-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
            <div className='flex'>
              <AlertCircle className='w-5 h-5 text-red-400 mr-2' />
              <p className='text-red-800'>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-white">
            Manage your website content, projects, and users
          </p>
        </div>

        {/* Quick Actions */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          <Link
            href='/admin/pages/new'
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg flex items-center justify-center transition-colors text-white"
          >
            <Plus className='w-5 h-5 mr-2' />
            New Page
          </Link>
          <Link
            href='/admin/projects/new'
            className='bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg flex items-center justify-center transition-colors'
          >
            <Plus className='w-5 h-5 mr-2' />
            New Project
          </Link>
          <Link
            href='/admin/users/new'
            className='bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg flex items-center justify-center transition-colors'
          >
            <Plus className='w-5 h-5 mr-2' />
            New User
          </Link>
          <Link
            href='/admin/media/upload'
            className='bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg flex items-center justify-center transition-colors'
          >
            <Upload className='w-5 h-5 mr-2' />
            Upload Media
          </Link>
        </div>

        {/* Feature Access Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          {/* Content Management */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className="text-lg font-semibold text-white">
              <FileText className='w-5 h-5 mr-2' />
              Content Management
            </h3>
            <div className='space-y-2'>
              <Link
                href='/admin/pages'
                className='block text-sm text-blue-600 hover:text-blue-800'
              >
                All Pages
              </Link>
              <Link
                href='/admin/pages/new'
                className='block text-sm text-blue-600 hover:text-blue-800'
              >
                Create Page
              </Link>
              <Link
                href='/admin/pages/seo'
                className='block text-sm text-blue-600 hover:text-blue-800'
              >
                SEO Management
              </Link>
            </div>
          </div>

          {/* Project Management */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className="text-lg font-semibold text-white">
              <FolderOpen className='w-5 h-5 mr-2' />
              Project Management
            </h3>
            <div className='space-y-2'>
              <Link
                href='/admin/projects'
                className='block text-sm text-green-600 hover:text-green-800'
              >
                All Projects
              </Link>
              <Link
                href='/admin/projects/new'
                className='block text-sm text-green-600 hover:text-green-800'
              >
                Create Project
              </Link>
              <Link
                href='/admin/projects/analytics'
                className='block text-sm text-green-600 hover:text-green-800'
              >
                Project Analytics
              </Link>
              <Link
                href='/admin/projects/timeline'
                className='block text-sm text-green-600 hover:text-green-800'
              >
                Timeline Management
              </Link>
            </div>
          </div>

          {/* Media Library */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className="text-lg font-semibold text-white">
              <Upload className='w-5 h-5 mr-2' />
              Media Library
            </h3>
            <div className='space-y-2'>
              <Link
                href='/admin/media'
                className='block text-sm text-orange-600 hover:text-orange-800'
              >
                All Media
              </Link>
              <Link
                href='/admin/media/upload'
                className='block text-sm text-orange-600 hover:text-orange-800'
              >
                Upload Files
              </Link>
              <Link
                href='/admin/media/organize'
                className='block text-sm text-orange-600 hover:text-orange-800'
              >
                Organize Media
              </Link>
              <Link
                href='/admin/media/search'
                className='block text-sm text-orange-600 hover:text-orange-800'
              >
                Search & Filter
              </Link>
            </div>
          </div>

          {/* User Management */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className="text-lg font-semibold text-white">
              <Users className='w-5 h-5 mr-2' />
              User Management
            </h3>
            <div className='space-y-2'>
              <Link
                href='/admin/users'
                className='block text-sm text-purple-600 hover:text-purple-800'
              >
                All Users
              </Link>
              <Link
                href='/admin/users/new'
                className='block text-sm text-purple-600 hover:text-purple-800'
              >
                Create User
              </Link>
              <Link
                href='/admin/users/roles'
                className='block text-sm text-purple-600 hover:text-purple-800'
              >
                Role Assignment
              </Link>
              <Link
                href='/admin/users/activity'
                className='block text-sm text-purple-600 hover:text-purple-800'
              >
                User Activity
              </Link>
            </div>
          </div>

          {/* System Management */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className="text-lg font-semibold text-white">
              <Settings className='w-5 h-5 mr-2' />
              System Management
            </h3>
            <div className='space-y-2'>
              <Link
                href='/admin/settings'
                className="block text-sm text-gray-600 hover:text-white"
              >
                General Settings
              </Link>
              <Link
                href='/admin/navigation'
                className="block text-sm text-gray-600 hover:text-white"
              >
                Navigation
              </Link>
              <Link
                href='/admin/system/backup'
                className="block text-sm text-gray-600 hover:text-white"
              >
                Backup & Restore
              </Link>
              <Link
                href='/admin/system/health'
                className="block text-sm text-gray-600 hover:text-white"
              >
                System Health
              </Link>
            </div>
          </div>

          {/* Analytics & Reports */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className="text-lg font-semibold text-white">
              <BarChart3 className='w-5 h-5 mr-2' />
              Analytics & Reports
            </h3>
            <div className='space-y-2'>
              <Link
                href='/admin/analytics'
                className='block text-sm text-indigo-600 hover:text-indigo-800'
              >
                System Analytics
              </Link>
              <Link
                href='/admin/analytics/content'
                className='block text-sm text-indigo-600 hover:text-indigo-800'
              >
                Content Analytics
              </Link>
              <Link
                href='/admin/analytics/users'
                className='block text-sm text-indigo-600 hover:text-indigo-800'
              >
                User Analytics
              </Link>
              <Link
                href='/admin/analytics/projects'
                className='block text-sm text-indigo-600 hover:text-indigo-800'
              >
                Project Analytics
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Dashboard Components */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
          {/* Activity Feed */}
          <ActivityFeed limit={5} showFilters={false} />

          {/* User Overview Charts */}
          <UserOverviewCharts />
        </div>

        {/* Recent Activity */}
        {stats && stats.recent_activity.length > 0 && (
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className="text-lg font-semibold text-white">
              <Activity className="w-5 h-5 mr-2 text-white" />
              Recent Activity
            </h3>
            <div className='space-y-3'>
              {stats.recent_activity.map(activity => (
                <div
                  key={activity.id}
                  className='flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0'
                >
                  <div className='flex items-center'>
                    {getStatusIcon(activity.action)}
                    <div className='ml-3'>
                      <p className="text-sm font-medium text-white">
                        {activity.action} {activity.resource}
                      </p>
                      <p className="text-xs text-white">
                        User ID: {activity.user_id}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-white">
                    {new Date(activity.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
