'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Users,
  Settings,
  BarChart3,
  Database,
  Activity,
  Shield,
  Navigation,
  HardDrive,
  Monitor,
  Upload,
  Download,
  Trash2,
  Plus,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Eye,
  Edit,
  MoreHorizontal,
  Tag,
  Folder,
  UserPlus,
  UserCheck,
  Key,
  Clock,
  BarChart,
  PieChart,
  LineChart,
  FileImage,
  Archive,
  Globe,
  Mail,
  Bell,
  Zap,
  Target,
  CheckCircle,
  AlertTriangle,
  DollarSign,
} from 'lucide-react';

export default function AdminNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  const navigationItems = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: <LayoutDashboard className='w-5 h-5' />,
      description: 'System overview and statistics',
    },
    {
      title: 'Content Management',
      href: '/admin/pages',
      icon: <FileText className='w-5 h-5' />,
      description: 'Manage website pages and content',
      subItems: [
        { title: 'All Pages', href: '/admin/pages' },
        { title: 'Create Page', href: '/admin/pages/new' },
        { title: 'Page Editor', href: '/admin/pages/edit' },
        { title: 'SEO Management', href: '/admin/pages/seo' },
      ],
    },
    {
      title: 'Project Management',
      href: '/admin/projects',
      icon: <FolderOpen className='w-5 h-5' />,
      description: 'Manage projects and timelines',
      subItems: [
        { title: 'All Projects', href: '/admin/projects' },
        { title: 'Create Project', href: '/admin/projects/new' },
        { title: 'Project Editor', href: '/admin/projects/edit' },
        { title: 'Timeline Management', href: '/admin/projects/timeline' },
        { title: 'Project Analytics', href: '/admin/projects/analytics' },
        { title: 'Status Management', href: '/admin/projects/status' },
      ],
    },
    {
      title: 'Project Progress',
      href: '/admin/project-progress',
      icon: <TrendingUp className='w-5 h-5' />,
      description: 'Manage project milestones and progress tracking',
      subItems: [
        { title: 'Milestones', href: '/admin/project-progress' },
        { title: 'Activity Logs', href: '/admin/project-progress' },
        { title: 'Progress Metrics', href: '/admin/project-progress' },
      ],
    },
    {
      title: 'Financial Management',
      href: '/admin/financial',
      icon: <DollarSign className='w-5 h-5' />,
      description: 'Manage financial data, revenue, costs, and metrics',
      subItems: [
        { title: 'Revenue & Costs', href: '/admin/financial' },
        { title: 'Investment Metrics', href: '/admin/financial' },
        { title: 'Transactions', href: '/admin/financial' },
        { title: 'Cash Flow', href: '/admin/financial' },
        { title: 'Cost Breakdown', href: '/admin/financial' },
      ],
    },
    {
      title: 'Media Library',
      href: '/admin/media',
      icon: <Upload className='w-5 h-5' />,
      description: 'Manage media files and uploads',
      subItems: [
        { title: 'All Media', href: '/admin/media' },
        { title: 'Upload Files', href: '/admin/media/upload' },
        { title: 'Organize Media', href: '/admin/media/organize' },
        { title: 'Search & Filter', href: '/admin/media/search' },
        { title: 'Edit Metadata', href: '/admin/media/edit' },
        { title: 'Media Analytics', href: '/admin/media/analytics' },
      ],
    },
    {
      title: 'User Management',
      href: '/admin/users',
      icon: <Users className='w-5 h-5' />,
      description: 'Manage users and permissions',
      subItems: [
        { title: 'All Users', href: '/admin/users' },
        { title: 'Create User', href: '/admin/users/new' },
        { title: 'User Editor', href: '/admin/users/edit' },
        { title: 'Role Assignment', href: '/admin/users/roles' },
        { title: 'Permission Management', href: '/admin/users/permissions' },
        { title: 'User Activity', href: '/admin/users/activity' },
        { title: 'Bulk Operations', href: '/admin/users/bulk' },
        { title: 'User Analytics', href: '/admin/users/analytics' },
      ],
    },
    {
      title: 'System Management',
      href: '/admin/settings',
      icon: <Settings className='w-5 h-5' />,
      description: 'System configuration and management',
      subItems: [
        { title: 'General Settings', href: '/admin/settings' },
        { title: 'Navigation Management', href: '/admin/navigation' },
        { title: 'Backup & Restore', href: '/admin/system/backup' },
        { title: 'System Health', href: '/admin/system/health' },
        { title: 'System Analytics', href: '/admin/analytics' },
        { title: 'Performance Monitor', href: '/admin/system/performance' },
        { title: 'Error Logs', href: '/admin/system/logs' },
        { title: 'Cache Management', href: '/admin/system/cache' },
      ],
    },
    {
      title: 'Analytics & Reports',
      href: '/admin/analytics',
      icon: <BarChart3 className='w-5 h-5' />,
      description: 'System analytics and reports',
      subItems: [
        { title: 'System Overview', href: '/admin/analytics' },
        { title: 'Content Analytics', href: '/admin/analytics/content' },
        { title: 'User Analytics', href: '/admin/analytics/users' },
        { title: 'Project Analytics', href: '/admin/analytics/projects' },
        { title: 'Media Analytics', href: '/admin/analytics/media' },
        {
          title: 'Performance Analytics',
          href: '/admin/analytics/performance',
        },
        { title: 'Custom Reports', href: '/admin/analytics/reports' },
      ],
    },
  ];

  return (
    <nav className='w-64 bg-white shadow-lg h-full overflow-y-auto'>
      <div className='p-6'>
        <h2 className="text-lg font-semibold text-white">
          Admin Panel
        </h2>

        <div className='space-y-2'>
          {navigationItems.map(item => (
            <div key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span className='ml-3 font-medium'>{item.title}</span>
              </Link>

              {/* Sub-items for expanded sections */}
              {item.subItems && isActive(item.href) && (
                <div className='ml-8 mt-2 space-y-1'>
                  {item.subItems.map(subItem => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                        pathname === subItem.href
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className='mt-8 pt-6 border-t border-gray-200'>
          <h3 className="text-sm font-medium text-white">
            Quick Actions
          </h3>
          <div className='space-y-2'>
            <Link
              href='/admin/pages/new'
              className="flex items-center px-4 py-2 text-sm text-white"
            >
              <Plus className='w-4 h-4 mr-2' />
              New Page
            </Link>
            <Link
              href='/admin/projects/new'
              className="flex items-center px-4 py-2 text-sm text-white"
            >
              <Plus className='w-4 h-4 mr-2' />
              New Project
            </Link>
            <Link
              href='/admin/users/new'
              className="flex items-center px-4 py-2 text-sm text-white"
            >
              <UserPlus className='w-4 h-4 mr-2' />
              New User
            </Link>
            <Link
              href='/admin/media/upload'
              className="flex items-center px-4 py-2 text-sm text-white"
            >
              <Upload className='w-4 h-4 mr-2' />
              Upload Media
            </Link>
            <Link
              href='/admin/system/backup'
              className="flex items-center px-4 py-2 text-sm text-white"
            >
              <Database className='w-4 h-4 mr-2' />
              Create Backup
            </Link>
          </div>
        </div>

        {/* System Status */}
        <div className='mt-8 pt-6 border-t border-gray-200'>
          <h3 className="text-sm font-medium text-white">
            System Status
          </h3>
          <div className='space-y-2'>
            <Link
              href='/admin/system/health'
              className="flex items-center px-4 py-2 text-sm text-white"
            >
              <Monitor className='w-4 h-4 mr-2' />
              Health Monitor
            </Link>
            <Link
              href='/admin/analytics'
              className="flex items-center px-4 py-2 text-sm text-white"
            >
              <TrendingUp className='w-4 h-4 mr-2' />
              System Analytics
            </Link>
            <Link
              href='/admin/users/activity'
              className="flex items-center px-4 py-2 text-sm text-white"
            >
              <Activity className='w-4 h-4 mr-2' />
              User Activity
            </Link>
            <Link
              href='/admin/system/performance'
              className="flex items-center px-4 py-2 text-sm text-white"
            >
              <Zap className='w-4 h-4 mr-2' />
              Performance
            </Link>
          </div>
        </div>

        {/* Phase Features Summary */}
        <div className='mt-8 pt-6 border-t border-gray-200'>
          <h3 className="text-sm font-medium text-white">
            Phase Features
          </h3>
          <div className="space-y-2 text-xs text-white">
            <div className='flex items-center'>
              <CheckCircle className='w-3 h-3 text-green-500 mr-2' />
              Phase 1: Backend Infrastructure
            </div>
            <div className='flex items-center'>
              <CheckCircle className='w-3 h-3 text-green-500 mr-2' />
              Phase 2: Admin Interface
            </div>
            <div className='flex items-center'>
              <CheckCircle className='w-3 h-3 text-green-500 mr-2' />
              Phase 3: Backend APIs
            </div>
            <div className='flex items-center'>
              <CheckCircle className='w-3 h-3 text-green-500 mr-2' />
              Phase 4: Project Management
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
