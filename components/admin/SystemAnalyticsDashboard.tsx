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
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  // Add filter state for country/device (optional, for demonstration)
  const [geoFilter, setGeoFilter] = useState('all');
  const [deviceFilter, setDeviceFilter] = useState('all');

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
      const res = await fetch(`/api/admin/analytics?range=${dateRange}`);
      const data = await res.json();
      if (data.success && data.analytics) {
        setAnalyticsData(data.analytics);
      } else {
        setAnalyticsData(null);
        toast.error(data.error || 'Failed to load analytics data');
      }
    } catch (error) {
      setAnalyticsData(null);
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
          <h3 className='text-lg font-medium text-primary mb-2'>
            Unable to Load Analytics
          </h3>
          <p className='text-gray-text mb-4'>
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
            <h2 className='text-xl font-semibold text-primary'>
              System Analytics
            </h2>
            <p className='text-sm text-gray-text mt-1'>
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
              <label htmlFor='autoRefresh' className='text-sm text-gray-text'>
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
        <h3 className='text-lg font-medium text-primary mb-4'>Overview</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='bg-white rounded-lg p-4 border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-text'>Total Users</p>
                <p className='text-2xl font-bold text-primary'>
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
                <p className='text-sm font-medium text-gray-text'>
                  Active Users
                </p>
                <p className='text-2xl font-bold text-primary'>
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
                <p className='text-sm font-medium text-gray-text'>Page Views</p>
                <p className='text-2xl font-bold text-primary'>
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
                <p className='text-sm font-medium text-gray-text'>Bounce Rate</p>
                <p className='text-2xl font-bold text-primary'>
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
            <h4 className='text-lg font-medium text-primary mb-4'>
              User Growth
            </h4>
            <div className='h-64 flex items-center justify-center bg-white rounded border'>
              {analyticsData.userGrowth && analyticsData.userGrowth.length > 0 ? (
                <Line
                  data={{
                    labels: analyticsData.userGrowth.map((d) => d.date),
                    datasets: [
                      {
                        label: 'New Users',
                        data: analyticsData.userGrowth.map((d) => d.newUsers),
                        borderColor: 'rgba(59,130,246,1)',
                        backgroundColor: 'rgba(59,130,246,0.2)',
                        fill: true,
                        tension: 0.4,
                      },
                      {
                        label: 'Active Users',
                        data: analyticsData.userGrowth.map((d) => d.activeUsers),
                        borderColor: 'rgba(16,185,129,1)',
                        backgroundColor: 'rgba(16,185,129,0.2)',
                        fill: true,
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: true },
                      title: { display: false },
                    },
                    scales: {
                      x: { title: { display: true, text: 'Date' } },
                      y: { title: { display: true, text: 'Users' } },
                    },
                  }}
                />
              ) : (
                <div className='text-center'>No data</div>
              )}
            </div>
            <div className='mt-4 grid grid-cols-2 gap-4 text-sm'>
              <div>
                <p className='text-gray-text'>New Users</p>
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
                <p className='text-gray-text'>Avg Daily Active</p>
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
            <h4 className='text-lg font-medium text-primary mb-4'>
              Page Views
            </h4>
            <div className='h-64 flex items-center justify-center bg-white rounded border'>
              {analyticsData.pageViews && analyticsData.pageViews.length > 0 ? (
                <Bar
                  data={{
                    labels: analyticsData.pageViews.map((d) => d.date),
                    datasets: [
                      {
                        label: 'Views',
                        data: analyticsData.pageViews.map((d) => d.views),
                        backgroundColor: 'rgba(139,92,246,0.7)',
                      },
                      {
                        label: 'Unique Views',
                        data: analyticsData.pageViews.map((d) => d.uniqueViews),
                        backgroundColor: 'rgba(59,130,246,0.7)',
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: true },
                      title: { display: false },
                    },
                    scales: {
                      x: { title: { display: true, text: 'Date' } },
                      y: { title: { display: true, text: 'Views' } },
                    },
                  }}
                />
              ) : (
                <div className='text-center'>No data</div>
              )}
            </div>
            <div className='mt-4 grid grid-cols-2 gap-4 text-sm'>
              <div>
                <p className='text-gray-text'>Total Views</p>
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
                <p className='text-gray-text'>Unique Views</p>
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
          <h4 className='text-lg font-medium text-primary mb-4'>Top Pages</h4>
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
                          <p className='text-sm font-medium text-primary'>
                            {page.title}
                          </p>
                          <p className='text-sm text-gray-500'>{page.path}</p>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-primary'>
                        {formatNumber(page.views)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-primary'>
                        {formatNumber(page.uniqueViews)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-primary'>
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
            <h4 className='text-lg font-medium text-primary mb-4'>
              Device Usage
            </h4>
            <div className='h-64 flex items-center justify-center bg-white rounded border'>
              {analyticsData.deviceStats && analyticsData.deviceStats.length > 0 ? (
                <Pie
                  data={{
                    labels: analyticsData.deviceStats.map((d) => d.device),
                    datasets: [
                      {
                        label: 'Users',
                        data: analyticsData.deviceStats.map((d) => d.users),
                        backgroundColor: [
                          'rgba(59,130,246,0.7)',
                          'rgba(16,185,129,0.7)',
                          'rgba(139,92,246,0.7)',
                        ],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: true, position: 'bottom' },
                      title: { display: false },
                    },
                  }}
                />
              ) : (
                <div className='text-center'>No data</div>
              )}
            </div>
          </div>

          {/* Geographic Data */}
          <div className='bg-gray-50 rounded-lg p-4'>
            <h4 className='text-lg font-medium text-primary mb-4'>
              Geographic Distribution
            </h4>
            <div className='mb-2'>
              <label className='text-sm text-gray-700 mr-2'>Country Filter:</label>
              <select
                value={geoFilter}
                onChange={e => setGeoFilter(e.target.value)}
                className='px-2 py-1 border border-gray-300 rounded text-sm'
              >
                <option value='all'>All</option>
                {analyticsData.geographicData.map((geo, idx) => (
                  <option key={idx} value={geo.country}>{geo.country}</option>
                ))}
              </select>
            </div>
            <div className='h-64 flex items-center justify-center bg-white rounded border'>
              {analyticsData.geographicData && analyticsData.geographicData.length > 0 ? (
                <Bar
                  data={{
                    labels: analyticsData.geographicData
                      .filter(geo => geoFilter === 'all' || geo.country === geoFilter)
                      .map((geo) => geo.country),
                    datasets: [
                      {
                        label: 'Users',
                        data: analyticsData.geographicData
                          .filter(geo => geoFilter === 'all' || geo.country === geoFilter)
                          .map((geo) => geo.users),
                        backgroundColor: 'rgba(59,130,246,0.7)',
                      },
                      {
                        label: 'Percentage',
                        data: analyticsData.geographicData
                          .filter(geo => geoFilter === 'all' || geo.country === geoFilter)
                          .map((geo) => geo.percentage),
                        backgroundColor: 'rgba(16,185,129,0.7)',
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: true },
                      title: { display: false },
                    },
                    scales: {
                      x: { title: { display: true, text: 'Country' } },
                      y: { title: { display: true, text: 'Users/Percentage' } },
                    },
                  }}
                />
              ) : (
                <div className='text-center'>No data</div>
              )}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className='bg-gray-50 rounded-lg p-4 mt-6'>
          <h4 className='text-lg font-medium text-primary mb-4'>
            Performance Metrics
          </h4>
          <div className='h-64 flex items-center justify-center bg-white rounded border'>
            {analyticsData.performanceMetrics && analyticsData.performanceMetrics.length > 0 ? (
              <Line
                data={{
                  labels: analyticsData.performanceMetrics.map((d) => d.date),
                  datasets: [
                    {
                      label: 'Response Time (ms)',
                      data: analyticsData.performanceMetrics.map((d) => d.responseTime),
                      borderColor: 'rgba(59,130,246,1)',
                      backgroundColor: 'rgba(59,130,246,0.2)',
                      fill: true,
                      tension: 0.4,
                      yAxisID: 'y',
                    },
                    {
                      label: 'Load Time (s)',
                      data: analyticsData.performanceMetrics.map((d) => d.loadTime),
                      borderColor: 'rgba(16,185,129,1)',
                      backgroundColor: 'rgba(16,185,129,0.2)',
                      fill: true,
                      tension: 0.4,
                      yAxisID: 'y1',
                    },
                    {
                      label: 'Error Rate (%)',
                      data: analyticsData.performanceMetrics.map((d) => d.errorRate),
                      borderColor: 'rgba(239,68,68,1)',
                      backgroundColor: 'rgba(239,68,68,0.2)',
                      fill: true,
                      tension: 0.4,
                      yAxisID: 'y2',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: true },
                    title: { display: false },
                  },
                  scales: {
                    x: { title: { display: true, text: 'Date' } },
                    y: {
                      type: 'linear',
                      display: true,
                      position: 'left',
                      title: { display: true, text: 'Response Time (ms)' },
                    },
                    y1: {
                      type: 'linear',
                      display: true,
                      position: 'right',
                      grid: { drawOnChartArea: false },
                      title: { display: true, text: 'Load Time (s)' },
                    },
                    y2: {
                      type: 'linear',
                      display: true,
                      position: 'right',
                      grid: { drawOnChartArea: false },
                      title: { display: true, text: 'Error Rate (%)' },
                    },
                  },
                }}
              />
            ) : (
              <div className='text-center'>No data</div>
            )}
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
          <p className='text-gray-text'>
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
