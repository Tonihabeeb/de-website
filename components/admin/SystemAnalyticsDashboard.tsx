'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Database,
  Activity,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  EyeOff,
  Settings,
  PieChart,
  LineChart,
  Target,
  Clock,
  Globe,
  Smartphone,
  Monitor,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { toast } from '@/components/ui/Toast';

interface AnalyticsData {
  overview: {
    totalUsers: number;
    totalPages: number;
    totalProjects: number;
    totalMedia: number;
    activeUsers: number;
    pageViews: number;
    uniqueVisitors: number;
    bounceRate: number;
  };
  userGrowth: {
    date: string;
    newUsers: number;
    activeUsers: number;
  }[];
  pageViews: {
    date: string;
    views: number;
    uniqueViews: number;
  }[];
  topPages: {
    path: string;
    title: string;
    views: number;
    uniqueViews: number;
    avgTimeOnPage: number;
  }[];
  userActivity: {
    hour: number;
    users: number;
    sessions: number;
  }[];
  deviceStats: {
    device: string;
    users: number;
    percentage: number;
  }[];
  geographicData: {
    country: string;
    users: number;
    percentage: number;
  }[];
  performanceMetrics: {
    date: string;
    responseTime: number;
    loadTime: number;
    errorRate: number;
  }[];
  contentPerformance: {
    type: string;
    count: number;
    views: number;
    engagement: number;
  }[];
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    fill?: boolean;
  }[];
}

export default function SystemAnalyticsDashboard({
  className = '',
}: {
  className?: string;
}) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7d');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string>('overview');

  // Mock data for demonstration
  const mockAnalyticsData: AnalyticsData = {
    overview: {
      totalUsers: 1247,
      totalPages: 89,
      totalProjects: 23,
      totalMedia: 456,
      activeUsers: 342,
      pageViews: 15420,
      uniqueVisitors: 2891,
      bounceRate: 23.4,
    },
    userGrowth: [
      { date: '2024-12-13', newUsers: 12, activeUsers: 89 },
      { date: '2024-12-14', newUsers: 18, activeUsers: 156 },
      { date: '2024-12-15', newUsers: 15, activeUsers: 234 },
      { date: '2024-12-16', newUsers: 22, activeUsers: 298 },
      { date: '2024-12-17', newUsers: 19, activeUsers: 267 },
      { date: '2024-12-18', newUsers: 25, activeUsers: 312 },
      { date: '2024-12-19', newUsers: 28, activeUsers: 342 },
    ],
    pageViews: [
      { date: '2024-12-13', views: 1200, uniqueViews: 890 },
      { date: '2024-12-14', views: 1850, uniqueViews: 1240 },
      { date: '2024-12-15', views: 2100, uniqueViews: 1560 },
      { date: '2024-12-16', views: 1950, uniqueViews: 1420 },
      { date: '2024-12-17', views: 2300, uniqueViews: 1780 },
      { date: '2024-12-18', views: 2450, uniqueViews: 1890 },
      { date: '2024-12-19', views: 2670, uniqueViews: 2100 },
    ],
    topPages: [
      {
        path: '/',
        title: 'Homepage',
        views: 3450,
        uniqueViews: 2890,
        avgTimeOnPage: 145,
      },
      {
        path: '/technology',
        title: 'Technology',
        views: 2340,
        uniqueViews: 1890,
        avgTimeOnPage: 234,
      },
      {
        path: '/projects',
        title: 'Projects',
        views: 1890,
        uniqueViews: 1450,
        avgTimeOnPage: 189,
      },
      {
        path: '/about',
        title: 'About Us',
        views: 1230,
        uniqueViews: 980,
        avgTimeOnPage: 98,
      },
      {
        path: '/contact',
        title: 'Contact',
        views: 890,
        uniqueViews: 720,
        avgTimeOnPage: 67,
      },
    ],
    userActivity: [
      { hour: 0, users: 12, sessions: 18 },
      { hour: 1, users: 8, sessions: 12 },
      { hour: 2, users: 5, sessions: 8 },
      { hour: 3, users: 3, sessions: 5 },
      { hour: 4, users: 2, sessions: 3 },
      { hour: 5, users: 4, sessions: 6 },
      { hour: 6, users: 8, sessions: 12 },
      { hour: 7, users: 15, sessions: 23 },
      { hour: 8, users: 28, sessions: 42 },
      { hour: 9, users: 45, sessions: 67 },
      { hour: 10, users: 52, sessions: 78 },
      { hour: 11, users: 48, sessions: 72 },
      { hour: 12, users: 42, sessions: 63 },
      { hour: 13, users: 38, sessions: 57 },
      { hour: 14, users: 45, sessions: 68 },
      { hour: 15, users: 52, sessions: 79 },
      { hour: 16, users: 58, sessions: 87 },
      { hour: 17, users: 62, sessions: 93 },
      { hour: 18, users: 55, sessions: 82 },
      { hour: 19, users: 48, sessions: 72 },
      { hour: 20, users: 42, sessions: 63 },
      { hour: 21, users: 35, sessions: 52 },
      { hour: 22, users: 28, sessions: 42 },
      { hour: 23, users: 18, sessions: 27 },
    ],
    deviceStats: [
      { device: 'Desktop', users: 1890, percentage: 65.2 },
      { device: 'Mobile', users: 856, percentage: 29.5 },
      { device: 'Tablet', users: 156, percentage: 5.3 },
    ],
    geographicData: [
      { country: 'Iraq', users: 1247, percentage: 43.0 },
      { country: 'Germany', users: 456, percentage: 15.7 },
      { country: 'United States', users: 234, percentage: 8.1 },
      { country: 'United Kingdom', users: 189, percentage: 6.5 },
      { country: 'France', users: 156, percentage: 5.4 },
      { country: 'Other', users: 609, percentage: 21.3 },
    ],
    performanceMetrics: [
      { date: '2024-12-13', responseTime: 245, loadTime: 1.2, errorRate: 0.8 },
      { date: '2024-12-14', responseTime: 234, loadTime: 1.1, errorRate: 0.6 },
      { date: '2024-12-15', responseTime: 256, loadTime: 1.3, errorRate: 0.9 },
      { date: '2024-12-16', responseTime: 223, loadTime: 1.0, errorRate: 0.5 },
      { date: '2024-12-17', responseTime: 267, loadTime: 1.4, errorRate: 1.1 },
      { date: '2024-12-18', responseTime: 245, loadTime: 1.2, errorRate: 0.7 },
      { date: '2024-12-19', responseTime: 234, loadTime: 1.1, errorRate: 0.6 },
    ],
    contentPerformance: [
      { type: 'Pages', count: 89, views: 15420, engagement: 78.5 },
      { type: 'Projects', count: 23, views: 5670, engagement: 85.2 },
      { type: 'Media', count: 456, views: 8900, engagement: 62.3 },
      { type: 'Documents', count: 67, views: 2340, engagement: 71.8 },
    ],
  };

  useEffect(() => {
    loadAnalyticsData();

    if (autoRefresh) {
      const interval = setInterval(loadAnalyticsData, 300000); // 5 minutes
      return () => clearInterval(interval);
    }
  }, [dateRange, autoRefresh]);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAnalyticsData(mockAnalyticsData);
    } catch (error) {
      toast.error('Failed to load analytics data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadAnalyticsData();
    toast.success('Analytics data refreshed');
  };

  const exportData = async (format: 'csv' | 'json' | 'pdf') => {
    try {
      // Simulate export
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(`${format.toUpperCase()} export completed`);
      setShowExportModal(false);
    } catch (error) {
      toast.error('Failed to export data');
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getGrowthRate = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  if (isLoading && !analyticsData) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
        <div className='p-6'>
          <div className='animate-pulse'>
            <div className='h-6 bg-gray-200 rounded w-1/4 mb-4'></div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
              {[...Array(4)].map((_, i) => (
                <div key={i} className='h-24 bg-gray-200 rounded'></div>
              ))}
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {[...Array(2)].map((_, i) => (
                <div key={i} className='h-64 bg-gray-200 rounded'></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
        <div className='p-6 text-center'>
          <Activity className='w-12 h-12 text-gray-400 mx-auto mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            Unable to Load Analytics
          </h3>
          <p className='text-gray-600 mb-4'>
            Failed to connect to analytics service.
          </p>
          <Button onClick={loadAnalyticsData} variant='primary'>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      {/* Header */}
      <div className='px-6 py-4 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900'>
              System Analytics
            </h2>
            <p className='text-sm text-gray-600 mt-1'>
              Comprehensive system performance and user analytics
            </p>
          </div>
          <div className='flex items-center space-x-3'>
            <select
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className='px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            >
              <option value='1d'>Last 24 hours</option>
              <option value='7d'>Last 7 days</option>
              <option value='30d'>Last 30 days</option>
              <option value='90d'>Last 90 days</option>
            </select>
            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id='autoRefresh'
                checked={autoRefresh}
                onChange={e => setAutoRefresh(e.target.checked)}
                className='rounded border-gray-300'
              />
              <label htmlFor='autoRefresh' className='text-sm text-gray-600'>
                Auto refresh
              </label>
            </div>
            <Button
              onClick={() => setShowSettingsModal(true)}
              variant='secondary'
              size='sm'
            >
              <Settings className='w-4 h-4 mr-2' />
              Settings
            </Button>
            <Button
              onClick={() => setShowExportModal(true)}
              variant='secondary'
              size='sm'
            >
              <Download className='w-4 h-4 mr-2' />
              Export
            </Button>
            <Button
              onClick={handleRefresh}
              variant='primary'
              size='sm'
              disabled={isLoading}
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''} mr-2`}
              />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className='px-6 py-4 bg-gray-50 border-b border-gray-200'>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>Overview</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='bg-white rounded-lg p-4 border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Total Users</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {formatNumber(analyticsData.overview.totalUsers)}
                </p>
                <p className='text-sm text-green-600 mt-1'>
                  +
                  {getGrowthRate(
                    analyticsData.overview.totalUsers,
                    1200
                  ).toFixed(1)}
                  % from last period
                </p>
              </div>
              <div className='p-3 bg-blue-100 rounded-full'>
                <Users className='w-6 h-6 text-blue-600' />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg p-4 border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Active Users
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {formatNumber(analyticsData.overview.activeUsers)}
                </p>
                <p className='text-sm text-green-600 mt-1'>
                  +
                  {getGrowthRate(
                    analyticsData.overview.activeUsers,
                    310
                  ).toFixed(1)}
                  % from last period
                </p>
              </div>
              <div className='p-3 bg-green-100 rounded-full'>
                <Activity className='w-6 h-6 text-green-600' />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg p-4 border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Page Views</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {formatNumber(analyticsData.overview.pageViews)}
                </p>
                <p className='text-sm text-green-600 mt-1'>
                  +
                  {getGrowthRate(
                    analyticsData.overview.pageViews,
                    14200
                  ).toFixed(1)}
                  % from last period
                </p>
              </div>
              <div className='p-3 bg-purple-100 rounded-full'>
                <Eye className='w-6 h-6 text-purple-600' />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg p-4 border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Bounce Rate</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {formatPercentage(analyticsData.overview.bounceRate)}
                </p>
                <p className='text-sm text-red-600 mt-1'>
                  +
                  {getGrowthRate(
                    analyticsData.overview.bounceRate,
                    22.1
                  ).toFixed(1)}
                  % from last period
                </p>
              </div>
              <div className='p-3 bg-red-100 rounded-full'>
                <Target className='w-6 h-6 text-red-600' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className='p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
          {/* User Growth Chart */}
          <div className='bg-gray-50 rounded-lg p-4'>
            <h4 className='text-lg font-medium text-gray-900 mb-4'>
              User Growth
            </h4>
            <div className='h-64 flex items-center justify-center bg-white rounded border'>
              <div className='text-center'>
                <TrendingUp className='w-12 h-12 text-blue-500 mx-auto mb-2' />
                <p className='text-sm text-gray-600'>
                  Chart visualization would be here
                </p>
                <p className='text-xs text-gray-500 mt-1'>
                  Using Chart.js or similar library
                </p>
              </div>
            </div>
            <div className='mt-4 grid grid-cols-2 gap-4 text-sm'>
              <div>
                <p className='text-gray-600'>New Users</p>
                <p className='font-medium'>
                  {formatNumber(
                    analyticsData.userGrowth.reduce(
                      (sum, day) => sum + day.newUsers,
                      0
                    )
                  )}
                </p>
              </div>
              <div>
                <p className='text-gray-600'>Avg Daily Active</p>
                <p className='font-medium'>
                  {formatNumber(
                    Math.round(
                      analyticsData.userGrowth.reduce(
                        (sum, day) => sum + day.activeUsers,
                        0
                      ) / analyticsData.userGrowth.length
                    )
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Page Views Chart */}
          <div className='bg-gray-50 rounded-lg p-4'>
            <h4 className='text-lg font-medium text-gray-900 mb-4'>
              Page Views
            </h4>
            <div className='h-64 flex items-center justify-center bg-white rounded border'>
              <div className='text-center'>
                <BarChart3 className='w-12 h-12 text-green-500 mx-auto mb-2' />
                <p className='text-sm text-gray-600'>
                  Chart visualization would be here
                </p>
                <p className='text-xs text-gray-500 mt-1'>
                  Using Chart.js or similar library
                </p>
              </div>
            </div>
            <div className='mt-4 grid grid-cols-2 gap-4 text-sm'>
              <div>
                <p className='text-gray-600'>Total Views</p>
                <p className='font-medium'>
                  {formatNumber(
                    analyticsData.pageViews.reduce(
                      (sum, day) => sum + day.views,
                      0
                    )
                  )}
                </p>
              </div>
              <div>
                <p className='text-gray-600'>Unique Views</p>
                <p className='font-medium'>
                  {formatNumber(
                    analyticsData.pageViews.reduce(
                      (sum, day) => sum + day.uniqueViews,
                      0
                    )
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className='mb-6'>
          <h4 className='text-lg font-medium text-gray-900 mb-4'>Top Pages</h4>
          <div className='bg-gray-50 rounded-lg overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-100'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Page
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Views
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Unique Views
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Avg Time
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {analyticsData.topPages.map((page, index) => (
                    <tr key={index} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div>
                          <p className='text-sm font-medium text-gray-900'>
                            {page.title}
                          </p>
                          <p className='text-sm text-gray-500'>{page.path}</p>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {formatNumber(page.views)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {formatNumber(page.uniqueViews)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {formatTime(page.avgTimeOnPage)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Device and Geographic Stats */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Device Statistics */}
          <div className='bg-gray-50 rounded-lg p-4'>
            <h4 className='text-lg font-medium text-gray-900 mb-4'>
              Device Usage
            </h4>
            <div className='space-y-3'>
              {analyticsData.deviceStats.map((device, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    <div className='p-2 bg-white rounded-full'>
                      {device.device === 'Desktop' ? (
                        <Monitor className='w-4 h-4 text-blue-600' />
                      ) : device.device === 'Mobile' ? (
                        <Smartphone className='w-4 h-4 text-green-600' />
                      ) : (
                        <Globe className='w-4 h-4 text-purple-600' />
                      )}
                    </div>
                    <span className='text-sm font-medium text-gray-900'>
                      {device.device}
                    </span>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm font-medium text-gray-900'>
                      {formatNumber(device.users)}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {formatPercentage(device.percentage)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Data */}
          <div className='bg-gray-50 rounded-lg p-4'>
            <h4 className='text-lg font-medium text-gray-900 mb-4'>
              Geographic Distribution
            </h4>
            <div className='space-y-3'>
              {analyticsData.geographicData.slice(0, 5).map((geo, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <span className='text-sm font-medium text-gray-900'>
                    {geo.country}
                  </span>
                  <div className='text-right'>
                    <p className='text-sm font-medium text-gray-900'>
                      {formatNumber(geo.users)}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {formatPercentage(geo.percentage)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title='Export Analytics Data'
      >
        <div className='space-y-4'>
          <p className='text-gray-600'>
            Choose the format and date range for your analytics export.
          </p>

          <div className='space-y-3'>
            <div className='flex items-center space-x-3'>
              <Button
                onClick={() => exportData('csv')}
                variant='secondary'
                size='sm'
              >
                <Download className='w-4 h-4 mr-2' />
                Export as CSV
              </Button>
              <Button
                onClick={() => exportData('json')}
                variant='secondary'
                size='sm'
              >
                <Download className='w-4 h-4 mr-2' />
                Export as JSON
              </Button>
              <Button
                onClick={() => exportData('pdf')}
                variant='secondary'
                size='sm'
              >
                <Download className='w-4 h-4 mr-2' />
                Export as PDF
              </Button>
            </div>
          </div>

          <div className='flex justify-end space-x-3'>
            <Button
              variant='secondary'
              onClick={() => setShowExportModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        title='Analytics Settings'
      >
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Auto-refresh Interval
            </label>
            <select className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
              <option value='300'>5 minutes</option>
              <option value='600'>10 minutes</option>
              <option value='1800'>30 minutes</option>
              <option value='3600'>1 hour</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Default Date Range
            </label>
            <select className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
              <option value='1d'>Last 24 hours</option>
              <option value='7d'>Last 7 days</option>
              <option value='30d'>Last 30 days</option>
              <option value='90d'>Last 90 days</option>
            </select>
          </div>

          <div className='flex items-center space-x-3'>
            <input
              type='checkbox'
              id='showRealTime'
              className='rounded border-gray-300'
            />
            <label htmlFor='showRealTime' className='text-sm text-gray-700'>
              Show real-time data
            </label>
          </div>

          <div className='flex justify-end space-x-3'>
            <Button
              variant='secondary'
              onClick={() => setShowSettingsModal(false)}
            >
              Cancel
            </Button>
            <Button variant='primary'>Save Settings</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
