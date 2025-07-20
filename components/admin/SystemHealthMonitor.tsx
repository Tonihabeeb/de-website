'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Server, 
  Database, 
  HardDrive, 
  Cpu, 
  Network, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  RefreshCw,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Info
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { toast } from '@/components/ui/Toast';

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
  threshold: {
    warning: number;
    critical: number;
  };
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  resolved: boolean;
}

interface SystemHealth {
  overall: 'healthy' | 'warning' | 'critical';
  uptime: number;
  lastCheck: Date;
  metrics: SystemMetric[];
  alerts: SystemAlert[];
  services: {
    name: string;
    status: 'running' | 'stopped' | 'error';
    responseTime: number;
  }[];
}

export default function SystemHealthMonitor({ className = '' }: { className?: string }) {
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<SystemAlert | null>(null);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds

  // Mock data for demonstration
  const mockSystemHealth: SystemHealth = {
    overall: 'healthy',
    uptime: 99.8,
    lastCheck: new Date(),
    metrics: [
      {
        id: 'cpu',
        name: 'CPU Usage',
        value: 45,
        unit: '%',
        status: 'healthy',
        trend: 'up',
        lastUpdated: new Date(),
        threshold: { warning: 70, critical: 90 }
      },
      {
        id: 'memory',
        name: 'Memory Usage',
        value: 62,
        unit: '%',
        status: 'warning',
        trend: 'up',
        lastUpdated: new Date(),
        threshold: { warning: 60, critical: 85 }
      },
      {
        id: 'disk',
        name: 'Disk Usage',
        value: 78,
        unit: '%',
        status: 'warning',
        trend: 'stable',
        lastUpdated: new Date(),
        threshold: { warning: 75, critical: 90 }
      },
      {
        id: 'network',
        name: 'Network Load',
        value: 25,
        unit: 'Mbps',
        status: 'healthy',
        trend: 'down',
        lastUpdated: new Date(),
        threshold: { warning: 50, critical: 80 }
      },
      {
        id: 'database',
        name: 'Database Connections',
        value: 12,
        unit: 'active',
        status: 'healthy',
        trend: 'stable',
        lastUpdated: new Date(),
        threshold: { warning: 20, critical: 30 }
      },
      {
        id: 'response',
        name: 'Response Time',
        value: 245,
        unit: 'ms',
        status: 'healthy',
        trend: 'down',
        lastUpdated: new Date(),
        threshold: { warning: 500, critical: 1000 }
      }
    ],
    alerts: [
      {
        id: '1',
        type: 'warning',
        title: 'High Memory Usage',
        message: 'Memory usage has exceeded 60% threshold. Consider optimizing application memory usage.',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        resolved: false
      },
      {
        id: '2',
        type: 'info',
        title: 'Database Backup Completed',
        message: 'Scheduled database backup completed successfully at 02:00 AM.',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        resolved: true
      },
      {
        id: '3',
        type: 'critical',
        title: 'Disk Space Warning',
        message: 'Disk usage is approaching critical threshold. Immediate action required.',
        timestamp: new Date(Date.now() - 600000), // 10 minutes ago
        resolved: false
      }
    ],
    services: [
      { name: 'Web Server', status: 'running', responseTime: 45 },
      { name: 'Database', status: 'running', responseTime: 120 },
      { name: 'File Storage', status: 'running', responseTime: 89 },
      { name: 'Email Service', status: 'running', responseTime: 234 },
      { name: 'Backup Service', status: 'running', responseTime: 156 }
    ]
  };

  useEffect(() => {
    loadSystemHealth();
    
    if (autoRefresh) {
      const interval = setInterval(loadSystemHealth, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const loadSystemHealth = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSystemHealth(mockSystemHealth);
    } catch (error) {
      toast.error('Failed to load system health data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadSystemHealth();
    toast.success('System health data refreshed');
  };

  const handleAlertClick = (alert: SystemAlert) => {
    setSelectedAlert(alert);
    setShowAlertModal(true);
  };

  const resolveAlert = async (alertId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSystemHealth(prev => prev ? {
        ...prev,
        alerts: prev.alerts.map(alert => 
          alert.id === alertId ? { ...alert, resolved: true } : alert
        )
      } : null);
      
      toast.success('Alert resolved successfully');
    } catch (error) {
      toast.error('Failed to resolve alert');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-500" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  if (isLoading && !systemHealth) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!systemHealth) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
        <div className="p-6 text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to Load System Health</h3>
          <p className="text-gray-600 mb-4">Failed to connect to system monitoring service.</p>
          <Button onClick={loadSystemHealth} variant="primary">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const activeAlerts = systemHealth.alerts.filter(alert => !alert.resolved);
  const criticalAlerts = activeAlerts.filter(alert => alert.type === 'critical');

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">System Health Monitor</h2>
            <p className="text-sm text-gray-600 mt-1">
              Real-time system monitoring and alerts
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoRefresh"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="autoRefresh" className="text-sm text-gray-600">
                Auto refresh
              </label>
            </div>
            <Button
              onClick={handleRefresh}
              variant="secondary"
              size="sm"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="ml-2">Refresh</span>
            </Button>
          </div>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${getStatusColor(systemHealth.overall)}`}>
              {getStatusIcon(systemHealth.overall)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Overall Status</p>
              <p className="text-sm text-gray-600 capitalize">{systemHealth.overall}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-blue-50">
              <Server className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Uptime</p>
              <p className="text-sm text-gray-600">{systemHealth.uptime}%</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-red-50">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Active Alerts</p>
              <p className="text-sm text-gray-600">{activeAlerts.length}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-green-50">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Services</p>
              <p className="text-sm text-gray-600">
                {systemHealth.services.filter(s => s.status === 'running').length}/{systemHealth.services.length} Running
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <div className="px-6 py-4 bg-red-50 border-b border-red-200">
          <div className="flex items-center space-x-2 mb-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-medium text-red-900">Critical Alerts</h3>
          </div>
          <div className="space-y-2">
            {criticalAlerts.map(alert => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-red-100 rounded-lg">
                <div>
                  <p className="font-medium text-red-900">{alert.title}</p>
                  <p className="text-sm text-red-700">{alert.message}</p>
                  <p className="text-xs text-red-600 mt-1">
                    {alert.timestamp.toLocaleString()}
                  </p>
                </div>
                <Button
                  onClick={() => resolveAlert(alert.id)}
                  variant="primary"
                  size="sm"
                >
                  Resolve
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {systemHealth.metrics.map(metric => (
            <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{metric.name}</h4>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(metric.trend)}
                  <div className={`p-1 rounded-full ${getStatusColor(metric.status)}`}>
                    {getStatusIcon(metric.status)}
                  </div>
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </span>
                <span className="text-sm text-gray-600">{metric.unit}</span>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Warning: {metric.threshold.warning}{metric.unit}</span>
                  <span>Critical: {metric.threshold.critical}{metric.unit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      metric.value >= metric.threshold.critical ? 'bg-red-500' :
                      metric.value >= metric.threshold.warning ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((metric.value / metric.threshold.critical) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Status */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Service Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemHealth.services.map(service => (
              <div key={service.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    service.status === 'running' ? 'bg-green-50' :
                    service.status === 'error' ? 'bg-red-50' : 'bg-yellow-50'
                  }`}>
                    {service.status === 'running' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : service.status === 'error' ? (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-600 capitalize">{service.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{service.responseTime}ms</p>
                  <p className="text-xs text-gray-600">Response</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Alerts</h3>
            <Button variant="secondary" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {systemHealth.alerts.slice(0, 5).map(alert => (
              <div
                key={alert.id}
                onClick={() => handleAlertClick(alert)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  alert.resolved ? 'bg-gray-50 border-gray-200' :
                  alert.type === 'critical' ? 'bg-red-50 border-red-200' :
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-1 rounded-full ${
                      alert.resolved ? 'bg-gray-200' :
                      alert.type === 'critical' ? 'bg-red-200' :
                      alert.type === 'warning' ? 'bg-yellow-200' :
                      'bg-blue-200'
                    }`}>
                      {alert.type === 'critical' ? (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      ) : alert.type === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      ) : (
                        <Info className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{alert.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {alert.timestamp.toLocaleString()}
                        {alert.resolved && ' • Resolved'}
                      </p>
                    </div>
                  </div>
                                     {!alert.resolved && (
                     <Button
                       onClick={() => resolveAlert(alert.id)}
                       variant="primary"
                       size="sm"
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

      {/* Alert Detail Modal */}
      <Modal
        isOpen={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        title="Alert Details"
      >
        {selectedAlert && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${
              selectedAlert.type === 'critical' ? 'bg-red-50' :
              selectedAlert.type === 'warning' ? 'bg-yellow-50' :
              'bg-blue-50'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {selectedAlert.type === 'critical' ? (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                ) : selectedAlert.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                ) : (
                  <Info className="w-5 h-5 text-blue-600" />
                )}
                <h3 className="text-lg font-medium text-gray-900">{selectedAlert.title}</h3>
              </div>
              <p className="text-gray-700">{selectedAlert.message}</p>
              <p className="text-sm text-gray-600 mt-2">
                {selectedAlert.timestamp.toLocaleString()}
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => setShowAlertModal(false)}
              >
                Close
              </Button>
              {!selectedAlert.resolved && (
                <Button
                  variant="primary"
                  onClick={() => {
                    resolveAlert(selectedAlert.id);
                    setShowAlertModal(false);
                  }}
                >
                  Resolve Alert
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
} 