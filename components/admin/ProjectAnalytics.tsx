'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';
import {
  TrendingUp,
  Users,
  Calendar,
  Target,
  Activity,
  Eye,
  Download,
  Share2,
} from 'lucide-react';

interface ProjectAnalytics {
  project_id: string;
  project_name: string;
  overview: {
    total_views: number;
    unique_visitors: number;
    avg_time_on_page: number;
    bounce_rate: number;
    conversion_rate: number;
  };
  performance_metrics: {
    completion_rate: number;
    on_time_delivery: boolean;
    budget_utilization: number;
    resource_efficiency: number;
  };
  timeline_data: {
    date: string;
    views: number;
    interactions: number;
    downloads: number;
  }[];
  user_engagement: {
    page_views: number;
    time_spent: number;
    interactions: number;
    downloads: number;
  };
  milestone_progress: {
    completed: number;
    in_progress: number;
    pending: number;
    overdue: number;
  };
  team_performance: {
    member: string;
    tasks_completed: number;
    hours_logged: number;
    efficiency: number;
  }[];
}

interface ProjectAnalyticsProps {
  projectId: string;
  className?: string;
}

const ProjectAnalytics: React.FC<ProjectAnalyticsProps> = ({
  projectId,
  className = '',
}) => {
  const [analytics, setAnalytics] = useState<ProjectAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>(
    '30d'
  );

  useEffect(() => {
    fetchProjectAnalytics();
  }, [projectId, selectedPeriod]);

  const fetchProjectAnalytics = async () => {
    try {
      setLoading(true);
      // For now, use mock data since we don't have the project analytics API yet
      // TODO: Replace with actual API call to /api/admin/projects/[id]/analytics
      const mockAnalytics: ProjectAnalytics = {
        project_id: projectId,
        project_name: 'KPP Technology Implementation',
        overview: {
          total_views: 1247,
          unique_visitors: 892,
          avg_time_on_page: 245, // seconds
          bounce_rate: 23.5,
          conversion_rate: 8.7,
        },
        performance_metrics: {
          completion_rate: 78.5,
          on_time_delivery: true,
          budget_utilization: 85.2,
          resource_efficiency: 92.1,
        },
        timeline_data: [
          { date: '2024-12-13', views: 45, interactions: 12, downloads: 3 },
          { date: '2024-12-14', views: 52, interactions: 18, downloads: 5 },
          { date: '2024-12-15', views: 48, interactions: 15, downloads: 4 },
          { date: '2024-12-16', views: 61, interactions: 22, downloads: 7 },
          { date: '2024-12-17', views: 67, interactions: 25, downloads: 8 },
          { date: '2024-12-18', views: 73, interactions: 28, downloads: 9 },
          { date: '2024-12-19', views: 89, interactions: 32, downloads: 11 },
        ],
        user_engagement: {
          page_views: 1247,
          time_spent: 245,
          interactions: 152,
          downloads: 47,
        },
        milestone_progress: {
          completed: 8,
          in_progress: 5,
          pending: 3,
          overdue: 1,
        },
        team_performance: [
          {
            member: 'John Doe',
            tasks_completed: 15,
            hours_logged: 120,
            efficiency: 95,
          },
          {
            member: 'Jane Smith',
            tasks_completed: 12,
            hours_logged: 98,
            efficiency: 88,
          },
          {
            member: 'Mike Johnson',
            tasks_completed: 18,
            hours_logged: 145,
            efficiency: 92,
          },
        ],
      };

      setAnalytics(mockAnalytics);
    } catch (err) {
      setError('Failed to fetch project analytics');
      console.error('Error fetching project analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getPerformanceColor = (value: number) => {
    if (value >= 90) return 'text-green-600';
    if (value >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
        <div className='p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Project Analytics
            </h3>
            <Activity className='w-5 h-5 text-gray-400' />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4 animate-pulse'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className='h-24 bg-gray-200 rounded-lg'></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
        <div className='p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Project Analytics
            </h3>
            <Activity className='w-5 h-5 text-gray-400' />
          </div>
          <div className='text-center py-8'>
            <p className='text-red-600'>{error || 'No data available'}</p>
            <button
              onClick={fetchProjectAnalytics}
              className='mt-2 text-sm text-blue-600 hover:text-blue-800'
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const milestoneData = [
    { name: 'Completed', value: analytics.milestone_progress.completed },
    { name: 'In Progress', value: analytics.milestone_progress.in_progress },
    { name: 'Pending', value: analytics.milestone_progress.pending },
    { name: 'Overdue', value: analytics.milestone_progress.overdue },
  ];

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      <div className='p-6'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h3 className='text-lg font-semibold text-gray-900'>
              Project Analytics
            </h3>
            <p className='text-sm text-gray-600'>{analytics.project_name}</p>
          </div>
          <div className='flex items-center space-x-4'>
            <select
              value={selectedPeriod}
              onChange={e =>
                setSelectedPeriod(e.target.value as '7d' | '30d' | '90d')
              }
              className='text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='7d'>Last 7 days</option>
              <option value='30d'>Last 30 days</option>
              <option value='90d'>Last 90 days</option>
            </select>
            <button className='p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors'>
              <Share2 className='w-4 h-4' />
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
          <div className='bg-blue-50 p-4 rounded-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-blue-600 font-medium'>Total Views</p>
                <p className='text-2xl font-bold text-blue-900'>
                  {analytics.overview.total_views.toLocaleString()}
                </p>
              </div>
              <Eye className='w-8 h-8 text-blue-400' />
            </div>
            <div className='mt-2 text-xs text-blue-600'>
              {analytics.overview.unique_visitors} unique visitors
            </div>
          </div>

          <div className='bg-green-50 p-4 rounded-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-green-600 font-medium'>Avg. Time</p>
                <p className='text-2xl font-bold text-green-900'>
                  {formatTime(analytics.overview.avg_time_on_page)}
                </p>
              </div>
              <Calendar className='w-8 h-8 text-green-400' />
            </div>
            <div className='mt-2 text-xs text-green-600'>
              {analytics.overview.bounce_rate}% bounce rate
            </div>
          </div>

          <div className='bg-purple-50 p-4 rounded-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-purple-600 font-medium'>
                  Completion Rate
                </p>
                <p
                  className={`text-2xl font-bold ${getPerformanceColor(analytics.performance_metrics.completion_rate)}`}
                >
                  {analytics.performance_metrics.completion_rate}%
                </p>
              </div>
              <Target className='w-8 h-8 text-purple-400' />
            </div>
            <div className='mt-2 text-xs text-purple-600'>
              {analytics.performance_metrics.on_time_delivery
                ? 'On track'
                : 'Behind schedule'}
            </div>
          </div>

          <div className='bg-orange-50 p-4 rounded-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-orange-600 font-medium'>
                  Budget Used
                </p>
                <p className='text-2xl font-bold text-orange-900'>
                  {analytics.performance_metrics.budget_utilization}%
                </p>
              </div>
              <TrendingUp className='w-8 h-8 text-orange-400' />
            </div>
            <div className='mt-2 text-xs text-orange-600'>
              {analytics.performance_metrics.resource_efficiency}% efficiency
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
          {/* Timeline Chart */}
          <div className='bg-gray-50 p-4 rounded-lg'>
            <h4 className='text-sm font-medium text-gray-900 mb-4'>
              Engagement Timeline
            </h4>
            <ResponsiveContainer width='100%' height={200}>
              <AreaChart data={analytics.timeline_data}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='date'
                  tickFormatter={value => new Date(value).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={value => new Date(value).toLocaleDateString()}
                />
                <Area
                  type='monotone'
                  dataKey='views'
                  stackId='1'
                  stroke='#3B82F6'
                  fill='#3B82F6'
                  fillOpacity={0.6}
                />
                <Area
                  type='monotone'
                  dataKey='interactions'
                  stackId='2'
                  stroke='#10B981'
                  fill='#10B981'
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Milestone Progress */}
          <div className='bg-gray-50 p-4 rounded-lg'>
            <h4 className='text-sm font-medium text-gray-900 mb-4'>
              Milestone Progress
            </h4>
            <ResponsiveContainer width='100%' height={200}>
              <PieChart>
                <Pie
                  data={milestoneData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${((percent || 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={60}
                  fill='#8884d8'
                  dataKey='value'
                >
                  {milestoneData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={value => [value, 'Milestones']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team Performance */}
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h4 className='text-sm font-medium text-gray-900 mb-4'>
            Team Performance
          </h4>
          <div className='space-y-3'>
            {analytics.team_performance.map((member, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-3 bg-white rounded-lg'
              >
                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                    <span className='text-sm font-medium text-blue-600'>
                      {member.member.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-900'>
                      {member.member}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {member.tasks_completed} tasks completed
                    </p>
                  </div>
                </div>
                <div className='flex items-center space-x-4 text-sm'>
                  <span className='text-gray-600'>
                    {member.hours_logged}h logged
                  </span>
                  <span
                    className={`font-medium ${getPerformanceColor(member.efficiency)}`}
                  >
                    {member.efficiency}% efficiency
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalytics;
