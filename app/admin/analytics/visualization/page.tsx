'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  Users,
  Eye,
  Calendar,
  Filter,
  Download,
  Settings,
  RefreshCw,
  Play,
  Pause,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { toast } from '@/components/ui/Toast';

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

interface VisualizationConfig {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area';
  dataSource: 'users' | 'content' | 'projects' | 'system' | 'custom';
  timeRange: '7d' | '30d' | '90d' | '1y' | 'custom';
  startDate?: string;
  endDate?: string;
  metrics: string[];
  groupBy: 'day' | 'week' | 'month' | 'category';
  showLegend: boolean;
  showGrid: boolean;
  animate: boolean;
}

export default function AnalyticsVisualizationPage() {
  const [visualizations, setVisualizations] = useState<VisualizationConfig[]>(
    []
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [selectedVisualization, setSelectedVisualization] = useState<
    number | null
  >(null);
  const [chartConfig, setChartConfig] = useState<VisualizationConfig>({
    type: 'line',
    dataSource: 'users',
    timeRange: '30d',
    metrics: ['activeUsers'],
    groupBy: 'day',
    showLegend: true,
    showGrid: true,
    animate: true,
  });

  // Mock chart data
  const mockChartData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Active Users',
        data: [120, 190, 300, 500, 200, 300],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
      {
        label: 'Page Views',
        data: [1000, 1500, 2000, 2500, 1800, 2200],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
      },
    ],
  };

  // Mock visualizations
  const mockVisualizations: VisualizationConfig[] = [
    {
      type: 'line',
      dataSource: 'users',
      timeRange: '30d',
      metrics: ['activeUsers', 'newUsers'],
      groupBy: 'day',
      showLegend: true,
      showGrid: true,
      animate: true,
    },
    {
      type: 'bar',
      dataSource: 'content',
      timeRange: '7d',
      metrics: ['pageViews'],
      groupBy: 'category',
      showLegend: true,
      showGrid: true,
      animate: true,
    },
    {
      type: 'pie',
      dataSource: 'system',
      timeRange: '30d',
      metrics: ['deviceDistribution'],
      groupBy: 'category',
      showLegend: true,
      showGrid: false,
      animate: true,
    },
  ];

  useEffect(() => {
    setVisualizations(mockVisualizations);
  }, []);

  const handleCreateVisualization = () => {
    const newVisualization = { ...chartConfig, id: Date.now() };
    setVisualizations(prev => [...prev, newVisualization]);
    setShowCreateModal(false);
    toast.success('Visualization created successfully');
  };

  const handleDeleteVisualization = (index: number) => {
    setVisualizations(prev => prev.filter((_, i) => i !== index));
    toast.success('Visualization deleted');
  };

  const handleExportChart = (index: number) => {
    // Mock export functionality
    toast.success('Chart exported successfully');
  };

  const handleFullscreen = (index: number) => {
    setSelectedVisualization(selectedVisualization === index ? null : index);
  };

  const renderChart = (config: VisualizationConfig, index: number) => {
    const chartColors = [
      'rgb(59, 130, 246)',
      'rgb(34, 197, 94)',
      'rgb(239, 68, 68)',
      'rgb(245, 158, 11)',
      'rgb(139, 92, 246)',
      'rgb(236, 72, 153)',
    ];

    return (
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h3 className='text-lg font-semibold text-gray-900 capitalize'>
              {config.dataSource} {config.type} Chart
            </h3>
            <p className='text-sm text-gray-600'>
              {config.timeRange} • {config.metrics.join(', ')}
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              size='sm'
              variant='secondary'
              onClick={() => handleFullscreen(index)}
            >
              {selectedVisualization === index ? (
                <Minimize2 className='w-4 h-4' />
              ) : (
                <Maximize2 className='w-4 h-4' />
              )}
            </Button>
            <Button
              size='sm'
              variant='secondary'
              onClick={() => handleExportChart(index)}
            >
              <Download className='w-4 h-4' />
            </Button>
            <Button
              size='sm'
              variant='secondary'
              onClick={() => handleDeleteVisualization(index)}
              className='text-red-600 hover:text-red-700'
            >
              Delete
            </Button>
          </div>
        </div>

        <div
          className={`bg-gray-50 rounded-lg p-8 ${selectedVisualization === index ? 'min-h-96' : 'h-64'}`}
        >
          <div className='flex items-center justify-center h-full'>
            <div className='text-center'>
              {config.type === 'line' && (
                <LineChart className='w-16 h-16 text-blue-500 mx-auto mb-4' />
              )}
              {config.type === 'bar' && (
                <BarChart3 className='w-16 h-16 text-green-500 mx-auto mb-4' />
              )}
              {config.type === 'pie' && (
                <PieChart className='w-16 h-16 text-purple-500 mx-auto mb-4' />
              )}
              <h4 className='text-lg font-medium text-gray-900 mb-2'>
                {config.dataSource.charAt(0).toUpperCase() +
                  config.dataSource.slice(1)}{' '}
                Analytics
              </h4>
              <p className='text-gray-600'>
                Interactive {config.type} chart showing{' '}
                {config.metrics.join(', ')} over {config.timeRange}
              </p>
              <div className='mt-4 flex items-center justify-center gap-4'>
                {mockChartData.datasets.map((dataset, i) => (
                  <div key={i} className='flex items-center gap-2'>
                    <div
                      className='w-3 h-3 rounded'
                      style={{ backgroundColor: chartColors[i] }}
                    />
                    <span className='text-sm text-gray-600'>
                      {dataset.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='mt-4 flex items-center justify-between text-sm text-gray-500'>
          <div className='flex items-center gap-4'>
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
            <span>Data points: {mockChartData.labels.length}</span>
          </div>
          <div className='flex items-center gap-2'>
            {config.showLegend && <span>Legend</span>}
            {config.showGrid && <span>Grid</span>}
            {config.animate && <span>Animated</span>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Analytics Visualization
            </h1>
            <p className='text-gray-600 mt-2'>
              Create interactive charts and graphs for data analysis
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <Button
              variant='secondary'
              onClick={() => setIsLive(!isLive)}
              className='flex items-center gap-2'
            >
              {isLive ? (
                <Pause className='w-4 h-4' />
              ) : (
                <Play className='w-4 h-4' />
              )}
              {isLive ? 'Pause' : 'Live'}
            </Button>
            <Button
              onClick={() => setShowSettingsModal(true)}
              variant='secondary'
              className='flex items-center gap-2'
            >
              <Settings className='w-4 h-4' />
              Settings
            </Button>
            <Button
              onClick={() => setShowCreateModal(true)}
              className='flex items-center gap-2'
            >
              <BarChart3 className='w-4 h-4' />
              Create Chart
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center gap-3 mb-2'>
            <BarChart3 className='w-6 h-6 text-blue-500' />
            <h3 className='font-medium text-gray-900'>Total Charts</h3>
          </div>
          <div className='text-2xl font-bold text-gray-900'>
            {visualizations.length}
          </div>
          <div className='text-sm text-gray-500'>Active visualizations</div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center gap-3 mb-2'>
            <Users className='w-6 h-6 text-green-500' />
            <h3 className='font-medium text-gray-900'>User Analytics</h3>
          </div>
          <div className='text-2xl font-bold text-gray-900'>
            {visualizations.filter(v => v.dataSource === 'users').length}
          </div>
          <div className='text-sm text-gray-500'>User-focused charts</div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center gap-3 mb-2'>
            <Eye className='w-6 h-6 text-purple-500' />
            <h3 className='font-medium text-gray-900'>Content Analytics</h3>
          </div>
          <div className='text-2xl font-bold text-gray-900'>
            {visualizations.filter(v => v.dataSource === 'content').length}
          </div>
          <div className='text-sm text-gray-500'>Content-focused charts</div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center gap-3 mb-2'>
            <TrendingUp className='w-6 h-6 text-orange-500' />
            <h3 className='font-medium text-gray-900'>System Analytics</h3>
          </div>
          <div className='text-2xl font-bold text-gray-900'>
            {visualizations.filter(v => v.dataSource === 'system').length}
          </div>
          <div className='text-sm text-gray-500'>System-focused charts</div>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {visualizations.map((visualization, index) => (
          <div key={index}>{renderChart(visualization, index)}</div>
        ))}
      </div>

      {visualizations.length === 0 && (
        <div className='text-center py-12'>
          <BarChart3 className='w-16 h-16 text-gray-400 mx-auto mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            No visualizations yet
          </h3>
          <p className='text-gray-600 mb-4'>
            Create your first chart to start analyzing data
          </p>
          <Button onClick={() => setShowCreateModal(true)}>
            Create First Chart
          </Button>
        </div>
      )}

      {/* Create Visualization Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title='Create New Visualization'
        size='lg'
      >
        <div className='space-y-6'>
          {/* Chart Type */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-3'>
              Chart Type
            </label>
            <div className='grid grid-cols-3 gap-3'>
              {[
                {
                  value: 'line',
                  label: 'Line Chart',
                  icon: LineChart,
                  color: 'text-blue-500',
                },
                {
                  value: 'bar',
                  label: 'Bar Chart',
                  icon: BarChart3,
                  color: 'text-green-500',
                },
                {
                  value: 'pie',
                  label: 'Pie Chart',
                  icon: PieChart,
                  color: 'text-purple-500',
                },
                {
                  value: 'doughnut',
                  label: 'Doughnut',
                  icon: PieChart,
                  color: 'text-orange-500',
                },
                {
                  value: 'area',
                  label: 'Area Chart',
                  icon: TrendingUp,
                  color: 'text-red-500',
                },
              ].map(option => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() =>
                      setChartConfig({
                        ...chartConfig,
                        type: option.value as any,
                      })
                    }
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      chartConfig.type === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${option.color}`} />
                    <div className='font-medium text-gray-900'>
                      {option.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Data Source */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-3'>
              Data Source
            </label>
            <div className='grid grid-cols-2 gap-3'>
              {[
                { value: 'users', label: 'User Analytics', icon: Users },
                { value: 'content', label: 'Content Analytics', icon: Eye },
                {
                  value: 'projects',
                  label: 'Project Analytics',
                  icon: TrendingUp,
                },
                { value: 'system', label: 'System Analytics', icon: BarChart3 },
              ].map(option => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() =>
                      setChartConfig({
                        ...chartConfig,
                        dataSource: option.value as any,
                      })
                    }
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      chartConfig.dataSource === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className='w-5 h-5 mx-auto mb-2 text-gray-600' />
                    <div className='font-medium text-gray-900'>
                      {option.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Range */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-3'>
              Time Range
            </label>
            <div className='grid grid-cols-5 gap-3'>
              {[
                { value: '7d', label: '7 Days' },
                { value: '30d', label: '30 Days' },
                { value: '90d', label: '90 Days' },
                { value: '1y', label: '1 Year' },
                { value: 'custom', label: 'Custom' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() =>
                    setChartConfig({
                      ...chartConfig,
                      timeRange: option.value as any,
                    })
                  }
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    chartConfig.timeRange === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-3'>
              Metrics to Display
            </label>
            <div className='grid grid-cols-2 gap-3'>
              {[
                'activeUsers',
                'newUsers',
                'pageViews',
                'sessionDuration',
                'bounceRate',
                'conversionRate',
              ].map(metric => (
                <label key={metric} className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={chartConfig.metrics.includes(metric)}
                    onChange={e => {
                      if (e.target.checked) {
                        setChartConfig({
                          ...chartConfig,
                          metrics: [...chartConfig.metrics, metric],
                        });
                      } else {
                        setChartConfig({
                          ...chartConfig,
                          metrics: chartConfig.metrics.filter(
                            m => m !== metric
                          ),
                        });
                      }
                    }}
                    className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                  />
                  <span className='ml-2 text-sm text-gray-700 capitalize'>
                    {metric.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className='space-y-3'>
            <label className='flex items-center'>
              <input
                type='checkbox'
                checked={chartConfig.showLegend}
                onChange={e =>
                  setChartConfig({
                    ...chartConfig,
                    showLegend: e.target.checked,
                  })
                }
                className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
              />
              <span className='ml-2 text-sm text-gray-700'>Show legend</span>
            </label>
            <label className='flex items-center'>
              <input
                type='checkbox'
                checked={chartConfig.showGrid}
                onChange={e =>
                  setChartConfig({ ...chartConfig, showGrid: e.target.checked })
                }
                className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
              />
              <span className='ml-2 text-sm text-gray-700'>Show grid</span>
            </label>
            <label className='flex items-center'>
              <input
                type='checkbox'
                checked={chartConfig.animate}
                onChange={e =>
                  setChartConfig({ ...chartConfig, animate: e.target.checked })
                }
                className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
              />
              <span className='ml-2 text-sm text-gray-700'>
                Enable animations
              </span>
            </label>
          </div>
        </div>

        <div className='flex justify-end gap-3 mt-6'>
          <Button variant='secondary' onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateVisualization}
            disabled={chartConfig.metrics.length === 0}
          >
            Create Visualization
          </Button>
        </div>
      </Modal>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        title='Visualization Settings'
        size='md'
      >
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>
              Global Settings
            </h3>
            <div className='space-y-4'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={isLive}
                  onChange={e => setIsLive(e.target.checked)}
                  className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                />
                <span className='ml-2 text-sm text-gray-700'>
                  Enable live updates
                </span>
              </label>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Auto-refresh interval
                </label>
                <select className='w-full border border-gray-300 rounded-md px-3 py-2'>
                  <option value='5000'>5 seconds</option>
                  <option value='10000'>10 seconds</option>
                  <option value='30000'>30 seconds</option>
                  <option value='60000'>1 minute</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end gap-3 mt-6'>
          <Button
            variant='secondary'
            onClick={() => setShowSettingsModal(false)}
          >
            Cancel
          </Button>
          <Button onClick={() => setShowSettingsModal(false)}>
            Save Settings
          </Button>
        </div>
      </Modal>
    </div>
  );
}
