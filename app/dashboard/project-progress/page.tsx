'use client';

import { useState, useEffect } from 'react';
import {
  BarChart3,
  CalendarCheck,
  ListChecks,
  Activity,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import ProgressTracker from '@/components/dashboards/ProgressTracker';
import {
  RevenueBarChart,
  CashFlowLineChart,
} from '@/components/dashboards/FinancialCharts';
import AuthGuard from '@/components/auth/AuthGuard';

interface Milestone {
  id: string;
  project_id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  progress: number;
  created_at: string;
  updated_at: string;
}

interface Activity {
  id: string;
  project_id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

interface Metrics {
  revenue: Array<{ month: string; revenue: number; cost: number }>;
  cashFlow: Array<{ month: string; cashFlow: number }>;
  costBreakdown: Array<{ name: string; value: number }>;
}

export default function ProjectProgressDashboard() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjectProgress();
  }, []);

  const fetchProjectProgress = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/project-progress');

      if (!response.ok) {
        setError('Failed to load project progress data');
        return;
      }

      const data = await response.json();

      if (data.success) {
        setMilestones(data.milestones || []);
        setActivity(data.activity || []);
        setMetrics(data.metrics || null);
      } else {
        setError(data.error || 'Failed to load project progress data');
      }
    } catch (err) {
      setError('Failed to load project progress data');
      console.error('Error fetching project progress:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className='w-4 h-4 text-green-500' />;
      case 'in-progress':
        return <Clock className='w-4 h-4 text-yellow-500' />;
      case 'upcoming':
        return <AlertCircle className="w-4 h-4 text-white" />;
      default:
        return <AlertCircle className="w-4 h-4 text-white" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AuthGuard>
        <main className='max-w-6xl mx-auto px-4 py-8'>
          <div className='animate-pulse'>
            <div className='h-8 bg-gray-200 rounded w-1/4 mb-6'></div>
            <div className='space-y-4'>
              {[...Array(5)].map((_, i) => (
                <div key={i} className='bg-white p-4 rounded-lg shadow'>
                  <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
                  <div className='h-3 bg-gray-200 rounded w-1/2'></div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <main className='max-w-6xl mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6 flex items-center gap-2'>
          <BarChart3 className='w-8 h-8 text-blue-600' />
          Project Progress Dashboard
        </h1>
        <p className="mb-8 text-white">
          Real-time overview of project milestones, progress, and key
          performance indicators for KPP projects.
        </p>

        {/* Error Message */}
        {error && (
          <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-md'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <AlertCircle className='h-5 w-5 text-red-400' />
              </div>
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-red-800'>Error</h3>
                <div className='mt-2 text-sm text-red-700'>
                  <p>{error}</p>
                </div>
                <div className='mt-4'>
                  <button
                    onClick={fetchProjectProgress}
                    className='text-sm font-medium text-red-800 hover:text-red-900 underline'
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Milestones Section */}
        <section className='mb-10'>
          <h2 className='text-2xl font-semibold flex items-center gap-2 mb-2'>
            <CalendarCheck className='w-6 h-6 text-green-600' />
            Project Milestones
          </h2>
          {milestones.length > 0 ? (
            <div className='bg-white rounded-lg shadow overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white">
                        Milestone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white">
                        Timeline
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {milestones.map(milestone => (
                      <tr key={milestone.id}>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div>
                            <div className="text-sm font-medium text-white">
                              {milestone.name}
                            </div>
                            <div className="text-sm text-white">
                              {milestone.description}
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}
                          >
                            {getStatusIcon(milestone.status)}
                            <span className='ml-1 capitalize'>
                              {milestone.status}
                            </span>
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div className='w-16 bg-gray-200 rounded-full h-2 mr-2'>
                              <div
                                className="bg-blue-600 h-2 rounded-full text-white"
                                style={{ width: `${milestone.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-white">
                              {milestone.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {milestone.start_date} → {milestone.end_date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border rounded p-4 text-white">
              <em>
                No milestones found. Add milestones through the admin panel.
              </em>
            </div>
          )}
        </section>

        {/* Gantt Chart / Progress Tracker Section */}
        <section className='mb-10'>
          <h2 className='text-2xl font-semibold flex items-center gap-2 mb-2'>
            <ListChecks className='w-6 h-6 text-orange-600' />
            Progress Tracker
          </h2>
          <div className='bg-gray-50 border rounded p-4'>
            {milestones.length > 0 ? (
              <ProgressTracker
                milestones={milestones.map(m => ({
                  name: m.name,
                  start: m.start_date,
                  end: m.end_date,
                  status: m.status,
                }))}
              />
            ) : (
              <div className="text-white">
                <em>No milestones available for progress tracking.</em>
              </div>
            )}
          </div>
        </section>

        {/* Key Metrics Section */}
        <section className='mb-10'>
          <h2 className='text-2xl font-semibold flex items-center gap-2 mb-2'>
            <BarChart3 className='w-6 h-6 text-blue-600' />
            Key Metrics
          </h2>
          <div className='bg-gray-50 border rounded p-4'>
            {metrics ? (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>Revenue & Cost</h3>
                  <RevenueBarChart />
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>Cash Flow</h3>
                  <CashFlowLineChart />
                </div>
              </div>
            ) : (
              <div className="text-white">
                <em>
                  Financial metrics will be displayed here when available.
                </em>
              </div>
            )}
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className='mb-10'>
          <h2 className='text-2xl font-semibold flex items-center gap-2 mb-2'>
            <Activity className='w-6 h-6 text-pink-600' />
            Recent Activity
          </h2>
          <div className='bg-white rounded-lg shadow overflow-hidden'>
            {activity.length > 0 ? (
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white">
                        Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white">
                        Timestamp
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {activity.slice(0, 10).map(item => (
                      <tr key={item.id}>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div>
                            <div className="text-sm font-medium text-white">
                              {item.title}
                            </div>
                            <div className="text-sm text-white">
                              {item.description}
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 text-white">
                            {item.type.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {item.user}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 text-white">
                <em>
                  No recent activity found. Activity logs will appear here when
                  updates are made.
                </em>
              </div>
            )}
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
