'use client';

import React, { useState, useEffect } from 'react';
import { 
  Download, 
  FileText, 
  BarChart3, 
  Users, 
  Calendar,
  Filter,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Database,
  TrendingUp,
  PieChart,
  Activity
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { toast } from '@/components/ui/Toast';

interface ExportConfig {
  dataType: 'overview' | 'users' | 'content' | 'projects' | 'system' | 'custom';
  dateRange: '7d' | '30d' | '90d' | 'custom';
  startDate?: string;
  endDate?: string;
  format: 'json' | 'csv' | 'excel' | 'pdf';
  includeCharts: boolean;
  filters: {
    userType?: string;
    contentType?: string;
    projectStatus?: string;
  };
}

interface ExportJob {
  id: string;
  config: ExportConfig;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  completedAt?: string;
  downloadUrl?: string;
  error?: string;
}

export default function AnalyticsExportPage() {
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [exportConfig, setExportConfig] = useState<ExportConfig>({
    dataType: 'overview',
    dateRange: '30d',
    format: 'csv',
    includeCharts: false,
    filters: {}
  });

  // Mock export jobs for demonstration
  const mockExportJobs: ExportJob[] = [
    {
      id: '1',
      config: {
        dataType: 'overview',
        dateRange: '30d',
        format: 'csv',
        includeCharts: false,
        filters: {}
      },
      status: 'completed',
      progress: 100,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      completedAt: new Date(Date.now() - 3500000).toISOString(),
      downloadUrl: '/api/admin/analytics/export/download/1'
    },
    {
      id: '2',
      config: {
        dataType: 'users',
        dateRange: '7d',
        format: 'excel',
        includeCharts: true,
        filters: { userType: 'active' }
      },
      status: 'processing',
      progress: 65,
      createdAt: new Date(Date.now() - 1800000).toISOString()
    },
    {
      id: '3',
      config: {
        dataType: 'content',
        dateRange: '90d',
        format: 'pdf',
        includeCharts: true,
        filters: { contentType: 'pages' }
      },
      status: 'pending',
      progress: 0,
      createdAt: new Date().toISOString()
    }
  ];

  useEffect(() => {
    setExportJobs(mockExportJobs);
  }, []);

  const handleCreateExport = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newJob: ExportJob = {
        id: Date.now().toString(),
        config: exportConfig,
        status: 'pending',
        progress: 0,
        createdAt: new Date().toISOString()
      };
      
      setExportJobs(prev => [newJob, ...prev]);
      setShowExportModal(false);
      toast.success('Export job created successfully');
      
      // Simulate job processing
      setTimeout(() => {
        setExportJobs(prev => prev.map(job => 
          job.id === newJob.id 
            ? { ...job, status: 'processing', progress: 50 }
            : job
        ));
      }, 3000);
      
      setTimeout(() => {
        setExportJobs(prev => prev.map(job => 
          job.id === newJob.id 
            ? { 
                ...job, 
                status: 'completed', 
                progress: 100, 
                completedAt: new Date().toISOString(),
                downloadUrl: `/api/admin/analytics/export/download/${newJob.id}`
              }
            : job
        ));
        toast.success('Export completed successfully');
      }, 8000);
      
    } catch (error) {
      toast.error('Failed to create export job');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (job: ExportJob) => {
    if (job.downloadUrl) {
      window.open(job.downloadUrl, '_blank');
      toast.success('Download started');
    }
  };

  const handleDeleteJob = (jobId: string) => {
    setExportJobs(prev => prev.filter(job => job.id !== jobId));
    toast.success('Export job deleted');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'processing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Export</h1>
        <p className="text-gray-600 mt-2">
          Export analytics data in various formats for reporting and analysis
        </p>
      </div>

      {/* Export Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Create New Export</h2>
            <p className="text-gray-600 mt-1">Configure and schedule data exports</p>
          </div>
          <Button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Create Export
          </Button>
        </div>

        {/* Quick Export Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium text-gray-900">System Overview</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Complete system analytics and metrics</p>
            <Button
              variant="secondary"
              onClick={() => {
                setExportConfig({
                  ...exportConfig,
                  dataType: 'overview',
                  format: 'csv'
                });
                setShowExportModal(true);
              }}
            >
              Export CSV
            </Button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-green-500" />
              <h3 className="font-medium text-gray-900">User Analytics</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">User activity and engagement data</p>
            <Button
              variant="secondary"
              onClick={() => {
                setExportConfig({
                  ...exportConfig,
                  dataType: 'users',
                  format: 'excel'
                });
                setShowExportModal(true);
              }}
            >
              Export Excel
            </Button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-purple-500" />
              <h3 className="font-medium text-gray-900">Content Analytics</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Page and project performance data</p>
            <Button
              variant="secondary"
              onClick={() => {
                setExportConfig({
                  ...exportConfig,
                  dataType: 'content',
                  format: 'pdf'
                });
                setShowExportModal(true);
              }}
            >
              Export PDF
            </Button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-orange-500" />
              <h3 className="font-medium text-gray-900">System Performance</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">System health and performance metrics</p>
            <Button
              variant="secondary"
              onClick={() => {
                setExportConfig({
                  ...exportConfig,
                  dataType: 'system',
                  format: 'json'
                });
                setShowExportModal(true);
              }}
            >
              Export JSON
            </Button>
          </div>
        </div>
      </div>

      {/* Export Jobs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Export Jobs</h2>
          <p className="text-gray-600 mt-1">Track and manage your export requests</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {exportJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {job.config.dataType === 'overview' && <BarChart3 className="w-4 h-4 text-blue-500" />}
                        {job.config.dataType === 'users' && <Users className="w-4 h-4 text-green-500" />}
                        {job.config.dataType === 'content' && <FileText className="w-4 h-4 text-purple-500" />}
                        {job.config.dataType === 'system' && <Activity className="w-4 h-4 text-orange-500" />}
                        <span className="font-medium text-gray-900 capitalize">
                          {job.config.dataType} Export
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {job.config.format.toUpperCase()} • {job.config.dateRange} • 
                        {job.config.includeCharts ? ' With Charts' : ' Data Only'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(job.status)}
                      <span className={`text-sm font-medium px-2 py-1 rounded-full border ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{job.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(job.createdAt).toLocaleDateString()}
                    <br />
                    {new Date(job.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {job.status === 'completed' && job.downloadUrl && (
                        <Button
                          size="sm"
                          onClick={() => handleDownload(job)}
                          className="flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </Button>
                      )}
                      {job.status === 'failed' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setExportConfig(job.config);
                            setShowExportModal(true);
                          }}
                        >
                          Retry
                        </Button>
                      )}
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleDeleteJob(job.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {exportJobs.length === 0 && (
          <div className="p-8 text-center">
            <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No export jobs</h3>
            <p className="text-gray-600 mb-4">Create your first export to get started</p>
            <Button onClick={() => setShowExportModal(true)}>
              Create Export
            </Button>
          </div>
        )}
      </div>

      {/* Export Configuration Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Configure Export"
        size="lg"
      >
        <div className="space-y-6">
          {/* Data Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Data Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'overview', label: 'System Overview', icon: BarChart3, color: 'text-blue-500' },
                { value: 'users', label: 'User Analytics', icon: Users, color: 'text-green-500' },
                { value: 'content', label: 'Content Analytics', icon: FileText, color: 'text-purple-500' },
                { value: 'projects', label: 'Project Analytics', icon: TrendingUp, color: 'text-orange-500' },
                { value: 'system', label: 'System Performance', icon: Activity, color: 'text-red-500' },
                { value: 'custom', label: 'Custom Report', icon: PieChart, color: 'text-indigo-500' }
              ].map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setExportConfig({ ...exportConfig, dataType: option.value as any })}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      exportConfig.dataType === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${option.color}`} />
                      <span className="font-medium text-gray-900">{option.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Date Range
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[
                { value: '7d', label: 'Last 7 Days' },
                { value: '30d', label: 'Last 30 Days' },
                { value: '90d', label: 'Last 90 Days' },
                { value: 'custom', label: 'Custom Range' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setExportConfig({ ...exportConfig, dateRange: option.value as any })}
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    exportConfig.dateRange === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Date Range */}
          {exportConfig.dateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={exportConfig.startDate || ''}
                  onChange={(e) => setExportConfig({ ...exportConfig, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={exportConfig.endDate || ''}
                  onChange={(e) => setExportConfig({ ...exportConfig, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Export Format
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[
                { value: 'csv', label: 'CSV', description: 'Spreadsheet format' },
                { value: 'excel', label: 'Excel', description: 'Excel workbook' },
                { value: 'pdf', label: 'PDF', description: 'Printable report' },
                { value: 'json', label: 'JSON', description: 'Raw data format' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setExportConfig({ ...exportConfig, format: option.value as any })}
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    exportConfig.format === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={exportConfig.includeCharts}
                onChange={(e) => setExportConfig({ ...exportConfig, includeCharts: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Include charts and visualizations</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="secondary"
            onClick={() => setShowExportModal(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateExport}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Create Export
              </>
            )}
          </Button>
        </div>
      </Modal>
    </div>
  );
} 
