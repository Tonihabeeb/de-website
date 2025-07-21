'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Target,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Download,
  Filter,
} from 'lucide-react';

interface ProjectAnalytics {
  project_id: string;
  name: string;
  status: string;
  completion_rate: number;
  total_milestones: number;
  completed_milestones: number;
  team_size: number;
  budget_used: number;
  budget_total: number;
  timeline_progress: number;
  performance_metrics: {
    efficiency_score: number;
    quality_score: number;
    risk_score: number;
  };
  recent_activities: Array<{
    id: string;
    type: string;
    description: string;
    user: string;
    timestamp: string;
  }>;
  timeline_data: Array<{
    date: string;
    progress: number;
    milestones_completed: number;
  }>;
}

export default function ProjectAnalyticsPage() {
  const [projects, setProjects] = useState<ProjectAnalytics[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('30d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjectAnalytics();
  }, [selectedProject, timeRange]);

  const fetchProjectAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/analytics/projects?time_range=${timeRange}&project_id=${selectedProject}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch project analytics');
      }

      const data = await response.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <AlertTriangle className='h-12 w-12 text-red-500 mx-auto mb-4' />
          <h2 className='text-xl font-semibold text-gray-900 mb-2'>
            Error Loading Analytics
          </h2>
          <p className='text-gray-600 mb-4'>{error}</p>
          <Button onClick={fetchProjectAnalytics}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-6 space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>
            Project Analytics
          </h1>
          <p className='text-gray-600 mt-2'>
            Comprehensive project performance and analytics dashboard
          </p>
        </div>
        <div className='flex gap-4'>
          <select
            value={selectedProject}
            onChange={e => setSelectedProject(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='all'>All Projects</option>
            {projects.map(project => (
              <option key={project.project_id} value={project.project_id}>
                {project.name}
              </option>
            ))}
          </select>
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='7d'>Last 7 days</option>
            <option value='30d'>Last 30 days</option>
            <option value='90d'>Last 90 days</option>
            <option value='1y'>Last year</option>
          </select>
          <Button onClick={fetchProjectAnalytics}>
            <RefreshCw className='h-4 w-4 mr-2' />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>
                Total Projects
              </p>
              <p className='text-2xl font-bold text-gray-900'>
                {projects.length}
              </p>
            </div>
            <Target className='h-8 w-8 text-blue-600' />
          </div>
          <p className='text-xs text-gray-500 mt-2'>
            {projects.filter(p => p.status === 'completed').length} completed
          </p>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>
                Active Projects
              </p>
              <p className='text-2xl font-bold text-gray-900'>
                {projects.filter(p => p.status === 'in-progress').length}
              </p>
            </div>
            <Activity className='h-8 w-8 text-green-600' />
          </div>
          <p className='text-xs text-gray-500 mt-2'>Currently in progress</p>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Team Members</p>
              <p className='text-2xl font-bold text-gray-900'>
                {projects.reduce((sum, p) => sum + p.team_size, 0)}
              </p>
            </div>
            <Users className='h-8 w-8 text-purple-600' />
          </div>
          <p className='text-xs text-gray-500 mt-2'>Across all projects</p>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>
                Avg Completion
              </p>
              <p className='text-2xl font-bold text-gray-900'>
                {projects.length > 0
                  ? Math.round(
                      projects.reduce((sum, p) => sum + p.completion_rate, 0) /
                        projects.length
                    )
                  : 0}
                %
              </p>
            </div>
            <TrendingUp className='h-8 w-8 text-orange-600' />
          </div>
          <p className='text-xs text-gray-500 mt-2'>Average completion rate</p>
        </div>
      </div>

      {/* Project Details */}
      <div className='bg-white rounded-lg shadow-md'>
        <div className='p-6 border-b border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Project Performance Overview
          </h2>
        </div>

        <div className='p-6'>
          <div className='space-y-6'>
            {projects.map(project => (
              <div key={project.project_id} className='border rounded-lg p-6'>
                <div className='flex justify-between items-start mb-4'>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      {project.name}
                    </h3>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className='text-right'>
                    <div className='text-2xl font-bold text-blue-600'>
                      {project.completion_rate}%
                    </div>
                    <div className='text-sm text-gray-500'>Complete</div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div>
                    <div className='flex justify-between text-sm mb-2'>
                      <span className='text-gray-600'>Progress</span>
                      <span className='font-medium'>
                        {project.completion_rate}%
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div
                        className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                        style={{ width: `${project.completion_rate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className='grid grid-cols-3 gap-4 text-sm'>
                    <div>
                      <div className='text-gray-500'>Milestones</div>
                      <div className='font-semibold'>
                        {project.completed_milestones}/
                        {project.total_milestones}
                      </div>
                    </div>
                    <div>
                      <div className='text-gray-500'>Team Size</div>
                      <div className='font-semibold'>{project.team_size}</div>
                    </div>
                    <div>
                      <div className='text-gray-500'>Budget</div>
                      <div className='font-semibold'>
                        ${formatNumber(project.budget_used)}/$
                        {formatNumber(project.budget_total)}
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className='border-t pt-4'>
                    <h4 className='font-medium text-gray-900 mb-3'>
                      Performance Metrics
                    </h4>
                    <div className='grid grid-cols-3 gap-4'>
                      <div>
                        <div className='text-sm text-gray-500'>Efficiency</div>
                        <div
                          className={`font-semibold ${getPerformanceColor(project.performance_metrics.efficiency_score)}`}
                        >
                          {project.performance_metrics.efficiency_score}%
                        </div>
                      </div>
                      <div>
                        <div className='text-sm text-gray-500'>Quality</div>
                        <div
                          className={`font-semibold ${getPerformanceColor(project.performance_metrics.quality_score)}`}
                        >
                          {project.performance_metrics.quality_score}%
                        </div>
                      </div>
                      <div>
                        <div className='text-sm text-gray-500'>Risk</div>
                        <div
                          className={`font-semibold ${getPerformanceColor(100 - project.performance_metrics.risk_score)}`}
                        >
                          {project.performance_metrics.risk_score}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activities */}
                  {project.recent_activities.length > 0 && (
                    <div className='border-t pt-4'>
                      <h4 className='font-medium text-gray-900 mb-3'>
                        Recent Activities
                      </h4>
                      <div className='space-y-2'>
                        {project.recent_activities.slice(0, 3).map(activity => (
                          <div
                            key={activity.id}
                            className='flex items-center space-x-3 text-sm'
                          >
                            <div className='flex-shrink-0'>
                              {activity.type === 'milestone_completed' && (
                                <CheckCircle className='h-4 w-4 text-green-500' />
                              )}
                              {activity.type === 'milestone_created' && (
                                <Target className='h-4 w-4 text-blue-500' />
                              )}
                              {activity.type === 'issue_reported' && (
                                <AlertTriangle className='h-4 w-4 text-red-500' />
                              )}
                              {activity.type === 'update' && (
                                <Activity className='h-4 w-4 text-gray-500' />
                              )}
                            </div>
                            <div className='flex-1 min-w-0'>
                              <p className='text-gray-900'>
                                {activity.description}
                              </p>
                              <p className='text-gray-500'>
                                by {activity.user} •{' '}
                                {new Date(
                                  activity.timestamp
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
