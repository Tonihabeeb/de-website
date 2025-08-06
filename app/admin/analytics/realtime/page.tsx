'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Users,
  Eye,
  Clock,
  TrendingUp,
  TrendingDown,
  Globe,
  Smartphone,
  Monitor,
  RefreshCw,
  Play,
  Pause,
  Settings,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { toast } from '@/components/ui/Toast';

interface RealTimeData {
  activeUsers: number;
  currentSessions: number;
  pageViews: number;
  uniqueVisitors: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: {
    path: string;
    title: string;
    views: number;
    uniqueViews: number;
  }[];
  userActivity: {
    timestamp: string;
    user: string;
    action: string;
    page: string;
    duration: number;
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
    responseTime: number;
    loadTime: number;
    errorRate: number;
    uptime: number;
  };
  systemAlerts: {
    id: string;
    type: 'info' | 'warning' | 'error';
    message: string;
    timestamp: string;
    resolved: boolean;
  }[];
}

export default function RealTimeAnalyticsPage() {
  const [realTimeData, setRealTimeData] = useState<RealTimeData | null>(null);
  const [isLive, setIsLive] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000); // 5 seconds
  const [isLoading, setIsLoading] = useState(true);

  // Mock real-time data
  const mockRealTimeData: RealTimeData = {
    activeUsers: 342,
    currentSessions: 156,
    pageViews: 15420,
    uniqueVisitors: 2891,
    averageSessionDuration: 245,
    bounceRate: 23.4,
    topPages: [
      { path: '/', title: 'Homepage', views: 3450, uniqueViews: 2890 },
      {
        path: '/technology',
        title: 'Technology',
        views: 2340,
        uniqueViews: 1890,
      },
      { path: '/projects', title: 'Projects', views: 1890, uniqueViews: 1450 },
      { path: '/about', title: 'About Us', views: 1230, uniqueViews: 980 },
      { path: '/contact', title: 'Contact', views: 890, uniqueViews: 720 },
    ],
    userActivity: [
      {
        timestamp: new Date().toISOString(),
        user: 'user@example.com',
        action: 'page_view',
        page: '/technology',
        duration: 45,
      },
      {
        timestamp: new Date(Date.now() - 30000).toISOString(),
        user: 'visitor@example.com',
        action: 'form_submit',
        page: '/contact',
        duration: 120,
      },
      {
        timestamp: new Date(Date.now() - 60000).toISOString(),
        user: 'client@example.com',
        action: 'download',
        page: '/resources',
        duration: 180,
      },
    ],
    deviceStats: [
      { device: 'Desktop', users: 189, percentage: 65.2 },
      { device: 'Mobile', users: 86, percentage: 29.5 },
      { device: 'Tablet', users: 15, percentage: 5.3 },
    ],
    geographicData: [
      { country: 'Iraq', users: 147, percentage: 43.0 },
      { country: 'Germany', users: 56, percentage: 15.7 },
      { country: 'United States', users: 34, percentage: 8.1 },
      { country: 'United Kingdom', users: 29, percentage: 6.5 },
      { country: 'France', users: 26, percentage: 5.4 },
    ],
    performanceMetrics: {
      responseTime: 245,
      loadTime: 1.2,
      errorRate: 0.8,
      uptime: 99.9,
    },
    systemAlerts: [
      {
        id: '1',
        type: 'info',
        message: 'High traffic detected on homepage',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        resolved: false,
      },
      {
        id: '2',
        type: 'warning',
        message: 'Response time increased by 15%',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        resolved: true,
      },
    ],
  };

  useEffect(() => {
    setRealTimeData(mockRealTimeData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLive || !autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate real-time data updates
      setRealTimeData(prev => {
        if (!prev) return prev;

        return {
          ...prev,
          activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
          currentSessions:
            prev.currentSessions + Math.floor(Math.random() * 5) - 2,
          pageViews: prev.pageViews + Math.floor(Math.random() * 50),
          userActivity: [
            {
              timestamp: new Date().toISOString(),
              user: `user${Math.floor(Math.random() * 1000)}@example.com`,
              action: ['page_view', 'form_submit', 'download'][
                Math.floor(Math.random() * 3)
              ],
              page: ['/', '/technology', '/projects', '/about', '/contact'][
                Math.floor(Math.random() * 5)
              ],
              duration: Math.floor(Math.random() * 300) + 30,
            },
            ...prev.userActivity.slice(0, 9), // Keep last 10 activities
          ],
        };
      });
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [isLive, autoRefresh, refreshInterval]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setRealTimeData(mockRealTimeData);
      setIsLoading(false);
      toast.success('Real-time data refreshed');
    }, 1000);
  };

  const handleToggleLive = () => {
    setIsLive(!isLive);
    toast.info(isLive ? 'Live updates paused' : 'Live updates resumed');
  };

  const handleResolveAlert = (alertId: string) => {
    setRealTimeData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        systemAlerts: prev.systemAlerts.map(alert =>
          alert.id === alertId ? { ...alert, resolved: true } : alert
        ),
      };
    });
    toast.success('Alert resolved');
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <CheckCircle className='w-4 h-4 text-blue-500' />;
      case 'warning':
        return <AlertCircle className='w-4 h-4 text-yellow-500' />;
      case 'error':
        return <XCircle className='w-4 h-4 text-red-500' />;
      default:
        return <CheckCircle className="w-4 h-4 text-white" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'info':
        return 'border-blue-200 bg-blue-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='flex items-center justify-center h-64'>
          <RefreshCw className='w-8 h-8 text-blue-500 animate-spin' />
          <span className="ml-2 text-white">Loading real-time data...</span>
        </div>
      </div>
    );
  }

  if (!realTimeData) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <Activity className="w-12 h-12 text-white" />
          <h3 className="text-lg font-medium text-white">
            No real-time data available
          </h3>
          <p className="text-white">
            Real-time analytics are not currently available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className="text-3xl font-bold text-white">
              Real-Time Analytics
            </h1>
            <p className="text-white">
              Live system activity, user sessions, and performance metrics
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <Button
              variant='secondary'
              onClick={handleToggleLive}
              className='flex items-center gap-2'
            >
              {isLive ? (
                <Pause className='w-4 h-4' />
              ) : (
                <Play className='w-4 h-4' />
              )}
              {isLive ? 'Pause' : 'Resume'}
            </Button>
            <Button onClick={handleRefresh} className='flex items-center gap-2'>
              <RefreshCw className='w-4 h-4' />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Live Status Indicator */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div
              className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}
            />
            <span className="font-medium text-white">
              {isLive ? 'Live Updates Active' : 'Live Updates Paused'}
            </span>
            <span className="text-sm text-white">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
          <div className='flex items-center gap-4'>
            <label className='flex items-center gap-2 text-sm'>
              <input
                type='checkbox'
                checked={autoRefresh}
                onChange={e => setAutoRefresh(e.target.checked)}
                className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
              />
              Auto-refresh
            </label>
            <select
              value={refreshInterval}
              onChange={e => setRefreshInterval(parseInt(e.target.value))}
              className='text-sm border border-gray-300 rounded px-2 py-1'
            >
              <option value={2000}>2s</option>
              <option value={5000}>5s</option>
              <option value={10000}>10s</option>
              <option value={30000}>30s</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <Users className='w-6 h-6 text-blue-500' />
              <h3 className="font-medium text-white">Active Users</h3>
            </div>
            <TrendingUp className='w-4 h-4 text-green-500' />
          </div>
          <div className="text-3xl font-bold text-white">
            {realTimeData.activeUsers}
          </div>
          <div className="text-sm text-white">Currently online</div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <Eye className='w-6 h-6 text-green-500' />
              <h3 className="font-medium text-white">Page Views</h3>
            </div>
            <TrendingUp className='w-4 h-4 text-green-500' />
          </div>
          <div className="text-3xl font-bold text-white">
            {realTimeData.pageViews.toLocaleString()}
          </div>
          <div className="text-sm text-white">Today's total</div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <Clock className='w-6 h-6 text-purple-500' />
              <h3 className="font-medium text-white">Avg Session</h3>
            </div>
            <TrendingUp className='w-4 h-4 text-green-500' />
          </div>
          <div className="text-3xl font-bold text-white">
            {Math.floor(realTimeData.averageSessionDuration / 60)}m
          </div>
          <div className="text-sm text-white">
            {realTimeData.averageSessionDuration % 60}s
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <Activity className='w-6 h-6 text-orange-500' />
              <h3 className="font-medium text-white">Bounce Rate</h3>
            </div>
            <TrendingDown className='w-4 h-4 text-red-500' />
          </div>
          <div className="text-3xl font-bold text-white">
            {realTimeData.bounceRate}%
          </div>
          <div className="text-sm text-white">Single page visits</div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Live User Activity */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
          <div className='p-6 border-b border-gray-200'>
            <h2 className="text-xl font-semibold text-white">
              Live User Activity
            </h2>
            <p className="text-white">
              Real-time user actions and page visits
            </p>
          </div>
          <div className='p-6'>
            <div className='space-y-4 max-h-96 overflow-y-auto'>
              {realTimeData.userActivity.map((activity, index) => (
                <div
                  key={index}
                  className='flex items-center gap-4 p-3 bg-gray-50 rounded-lg'
                >
                  <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
                  <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                      <span className="font-medium text-white">
                        {activity.user}
                      </span>
                      <span className="text-sm text-white">
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-sm text-white">
                      {activity.action.replace('_', ' ')} on {activity.page}
                    </div>
                  </div>
                  <div className="text-sm text-white">
                    {activity.duration}s
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
          <div className='p-6 border-b border-gray-200'>
            <h2 className="text-xl font-semibold text-white">
              System Alerts
            </h2>
            <p className="text-white">
              Live system notifications and warnings
            </p>
          </div>
          <div className='p-6'>
            <div className='space-y-4'>
              {realTimeData.systemAlerts.map(alert => (
                <div
                  key={alert.id}
                  className={`p-4 border rounded-lg ${getAlertColor(alert.type)} ${
                    alert.resolved ? 'opacity-60' : ''
                  }`}
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex items-start gap-3'>
                      {getAlertIcon(alert.type)}
                      <div className='flex-1'>
                        <p className="text-sm font-medium text-white">
                          {alert.message}
                        </p>
                        <p className="text-xs text-white">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {!alert.resolved && (
                      <Button
                        size='sm'
                        variant='secondary'
                        onClick={() => handleResolveAlert(alert.id)}
                      >
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Device and Geographic Distribution */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8'>
        {/* Device Distribution */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
          <div className='p-6 border-b border-gray-200'>
            <h2 className="text-xl font-semibold text-white">
              Device Distribution
            </h2>
            <p className="text-white">Current users by device type</p>
          </div>
          <div className='p-6'>
            <div className='space-y-4'>
              {realTimeData.deviceStats.map((device, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    {device.device === 'Desktop' && (
                      <Monitor className='w-4 h-4 text-blue-500' />
                    )}
                    {device.device === 'Mobile' && (
                      <Smartphone className='w-4 h-4 text-green-500' />
                    )}
                    {device.device === 'Tablet' && (
                      <Globe className='w-4 h-4 text-purple-500' />
                    )}
                    <span className="font-medium text-white">
                      {device.device}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-24 bg-gray-200 rounded-full h-2'>
                      <div
                        className="bg-blue-500 h-2 rounded-full text-white"
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-white">
                      {device.users} ({device.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
          <div className='p-6 border-b border-gray-200'>
            <h2 className="text-xl font-semibold text-white">
              Geographic Distribution
            </h2>
            <p className="text-white">Current users by location</p>
          </div>
          <div className='p-6'>
            <div className='space-y-4'>
              {realTimeData.geographicData.map((geo, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <Globe className='w-4 h-4 text-blue-500' />
                    <span className="font-medium text-white">
                      {geo.country}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-24 bg-gray-200 rounded-full h-2'>
                      <div
                        className='bg-green-500 h-2 rounded-full'
                        style={{ width: `${geo.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-white">
                      {geo.users} ({geo.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 mt-8'>
        <div className='p-6 border-b border-gray-200'>
          <h2 className="text-xl font-semibold text-white">
            Performance Metrics
          </h2>
          <p className="text-white">
            Real-time system performance indicators
          </p>
        </div>
        <div className='p-6'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
            <div className='text-center'>
              <div className="text-2xl font-bold text-white">
                {realTimeData.performanceMetrics.responseTime}ms
              </div>
              <div className="text-sm text-white">Response Time</div>
            </div>
            <div className='text-center'>
              <div className="text-2xl font-bold text-white">
                {realTimeData.performanceMetrics.loadTime}s
              </div>
              <div className="text-sm text-white">Load Time</div>
            </div>
            <div className='text-center'>
              <div className="text-2xl font-bold text-white">
                {realTimeData.performanceMetrics.errorRate}%
              </div>
              <div className="text-sm text-white">Error Rate</div>
            </div>
            <div className='text-center'>
              <div className="text-2xl font-bold text-white">
                {realTimeData.performanceMetrics.uptime}%
              </div>
              <div className="text-sm text-white">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
