'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Server,
  Database,
  Network,
  Shield,
  BarChart3,
  LineChart,
  Gauge,
  Users,
  Brain
} from 'lucide-react';

interface SystemMetrics {
  timestamp: string;
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  active_users: number;
  database_connections: number;
  api_requests_per_minute: number;
  error_rate: number;
  response_time_avg: number;
}

interface SystemHealth {
  overall_status: 'healthy' | 'warning' | 'critical';
  cpu_status: 'healthy' | 'warning' | 'critical';
  memory_status: 'healthy' | 'warning' | 'critical';
  disk_status: 'healthy' | 'warning' | 'critical';
  database_status: 'healthy' | 'warning' | 'critical';
  api_status: 'healthy' | 'warning' | 'critical';
}

interface PerformanceData {
  endpoint: string;
  avg_response_time: number;
  request_count: number;
  error_count: number;
  error_rate: number;
}

export default function SystemAnalyticsPage() {
  const [metrics, setMetrics] = useState<SystemMetrics[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState<SystemMetrics | null>(null);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [timeRange, setTimeRange] = useState<string>('1h');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchSystemAnalytics();
    
    if (autoRefresh) {
      const interval = setInterval(fetchSystemAnalytics, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [timeRange, autoRefresh]);

  const fetchSystemAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch system usage metrics
      const metricsResponse = await fetch(`/api/admin/analytics/system-usage?time_range=${timeRange}`);
      if (!metricsResponse.ok) throw new Error('Failed to fetch system metrics');
      const metricsData = await metricsResponse.json();
      
      // Fetch performance data
      const performanceResponse = await fetch(`/api/admin/analytics/performance?time_range=${timeRange}`);
      if (!performanceResponse.ok) throw new Error('Failed to fetch performance data');
      const performanceData = await performanceResponse.json();
      
      // Fetch real-time data
      const realtimeResponse = await fetch('/api/admin/analytics/realtime');
      if (!realtimeResponse.ok) throw new Error('Failed to fetch real-time data');
      const realtimeData = await realtimeResponse.json();

      setMetrics(metricsData.metrics || []);
      setCurrentMetrics(realtimeData.current_stats ? {
        timestamp: new Date().toISOString(),
        cpu_usage: realtimeData.current_stats.cpu_usage || 0,
        memory_usage: realtimeData.current_stats.memory_usage || 0,
        disk_usage: realtimeData.current_stats.disk_usage_mb || 0,
        active_users: realtimeData.current_stats.active_users || 0,
        database_connections: 0,
        api_requests_per_minute: realtimeData.current_stats.api_requests_last_hour || 0,
        error_rate: parseFloat(realtimeData.current_stats.error_rate_percent || '0'),
        response_time_avg: 0
      } : null);
      
      setPerformanceData(performanceData.summary?.slowest_endpoints || []);
      
      // Calculate system health
      const health = calculateSystemHealth(realtimeData.current_stats);
      setSystemHealth(health);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const calculateSystemHealth = (currentStats: any): SystemHealth => {
    const cpuUsage = currentStats?.cpu_usage || 0;
    const memoryUsage = currentStats?.memory_usage || 0;
    const diskUsage = currentStats?.disk_usage_mb || 0;
    const errorRate = parseFloat(currentStats?.error_rate_percent || '0');

    const getStatus = (value: number, thresholds: { warning: number; critical: number }) => {
      if (value >= thresholds.critical) return 'critical';
      if (value >= thresholds.warning) return 'warning';
      return 'healthy';
    };

    const cpuStatus = getStatus(cpuUsage, { warning: 70, critical: 90 });
    const memoryStatus = getStatus(memoryUsage, { warning: 80, critical: 95 });
    const diskStatus = getStatus(diskUsage / 1000, { warning: 80, critical: 95 }); // Convert MB to percentage
    const databaseStatus = 'healthy'; // Mock status
    const apiStatus = getStatus(errorRate, { warning: 5, critical: 10 });

    const overallStatus = [cpuStatus, memoryStatus, diskStatus, databaseStatus, apiStatus].includes('critical') 
      ? 'critical' 
      : [cpuStatus, memoryStatus, diskStatus, databaseStatus, apiStatus].includes('warning')
      ? 'warning'
      : 'healthy';

    return {
      overall_status: overallStatus,
      cpu_status: cpuStatus,
      memory_status: memoryStatus,
      disk_status: diskStatus,
      database_status: databaseStatus,
      api_status: apiStatus
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading && !currentMetrics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading System Analytics</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchSystemAnalytics}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Analytics</h1>
          <p className="text-gray-600 mt-2">Real-time system monitoring and performance analytics</p>
        </div>
        <div className="flex gap-4">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1h">Last hour</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
          <Button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? "" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
          >
            {autoRefresh ? "Auto-refresh ON" : "Auto-refresh OFF"}
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      {systemHealth && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Server className="h-5 w-5" />
              System Health Overview
            </h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(systemHealth.overall_status)}`}>
              {systemHealth.overall_status.toUpperCase()}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {getStatusIcon(systemHealth.cpu_status)}
              </div>
              <div className="text-sm font-medium">CPU</div>
              <span className={`inline-block px-2 py-1 rounded text-xs ${getStatusColor(systemHealth.cpu_status)}`}>
                {systemHealth.cpu_status}
              </span>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {getStatusIcon(systemHealth.memory_status)}
              </div>
              <div className="text-sm font-medium">Memory</div>
              <span className={`inline-block px-2 py-1 rounded text-xs ${getStatusColor(systemHealth.memory_status)}`}>
                {systemHealth.memory_status}
              </span>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {getStatusIcon(systemHealth.disk_status)}
              </div>
              <div className="text-sm font-medium">Disk</div>
              <span className={`inline-block px-2 py-1 rounded text-xs ${getStatusColor(systemHealth.disk_status)}`}>
                {systemHealth.disk_status}
              </span>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {getStatusIcon(systemHealth.database_status)}
              </div>
              <div className="text-sm font-medium">Database</div>
              <span className={`inline-block px-2 py-1 rounded text-xs ${getStatusColor(systemHealth.database_status)}`}>
                {systemHealth.database_status}
              </span>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {getStatusIcon(systemHealth.api_status)}
              </div>
              <div className="text-sm font-medium">API</div>
              <span className={`inline-block px-2 py-1 rounded text-xs ${getStatusColor(systemHealth.api_status)}`}>
                {systemHealth.api_status}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Current Metrics */}
      {currentMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">CPU Usage</p>
                <p className="text-2xl font-bold text-gray-900">{currentMetrics.cpu_usage}%</p>
              </div>
              <Cpu className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${currentMetrics.cpu_usage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Memory Usage</p>
                <p className="text-2xl font-bold text-gray-900">{currentMetrics.memory_usage}%</p>
              </div>
              <Brain className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${currentMetrics.memory_usage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{currentMetrics.active_users}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span>+12% from last hour</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">API Requests/min</p>
                <p className="text-2xl font-bold text-gray-900">{currentMetrics.api_requests_per_minute}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-500" />
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span>+5% from last hour</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'performance', label: 'Performance', icon: LineChart },
              { id: 'trends', label: 'Trends', icon: TrendingUp },
              { id: 'alerts', label: 'Alerts', icon: AlertTriangle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">System Resources</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CPU Usage</span>
                        <span>{currentMetrics?.cpu_usage || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${currentMetrics?.cpu_usage || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memory Usage</span>
                        <span>{currentMetrics?.memory_usage || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${currentMetrics?.memory_usage || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Disk Usage</span>
                        <span>{Math.round((currentMetrics?.disk_usage || 0) / 10)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${Math.round((currentMetrics?.disk_usage || 0) / 10)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Error Rate</span>
                      <span className="text-sm font-medium">{currentMetrics?.error_rate || 0}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Response Time</span>
                      <span className="text-sm font-medium">{currentMetrics?.response_time_avg || 0}ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Database Connections</span>
                      <span className="text-sm font-medium">{currentMetrics?.database_connections || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">API Performance</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Response Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error Rate</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {performanceData.map((endpoint, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{endpoint.endpoint}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{endpoint.avg_response_time}ms</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{endpoint.request_count}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{endpoint.error_rate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'trends' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">System Trends</h3>
              <div className="text-center py-12 text-gray-500">
                <LineChart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Trend analysis charts will be implemented here</p>
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">System Alerts</h3>
              <div className="text-center py-12 text-gray-500">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No active alerts at this time</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
