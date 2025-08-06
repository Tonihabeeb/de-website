'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Activity,
  User,
  Calendar,
  Clock,
  Eye,
  Edit,
  Trash2,
  Plus,
  ArrowLeft,
  Loader2,
  AlertCircle,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Filter,
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
}

interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  resource_name: string;
  details: string;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

interface ActivityStats {
  total_actions: number;
  actions_today: number;
  actions_this_week: number;
  actions_this_month: number;
  most_active_day: string;
  most_common_action: string;
  actions_by_type: Record<string, number>;
  recent_activity: ActivityLog[];
}

export default function UserActivity() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [activityStats, setActivityStats] = useState<ActivityStats | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState('30d');
  const [actionFilter, setActionFilter] = useState('');
  const [resourceFilter, setResourceFilter] = useState('');

  useEffect(() => {
    if (userId) {
      fetchUser();
      fetchActivityLogs();
      fetchActivityStats();
    }
  }, [userId, period]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`);
      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        setError('User not found');
      }
    } catch (err) {
      setError('Failed to load user');
    } finally {
      setLoading(false);
    }
  };

  const fetchActivityLogs = async () => {
    try {
      const response = await fetch(
        `/api/admin/users/${userId}/activity?period=${period}`
      );
      const data = await response.json();

      if (data.success) {
        setActivityLogs(data.activity_logs || []);
      } else {
        setError('Failed to load activity logs');
      }
    } catch (err) {
      setError('Failed to load activity logs');
    }
  };

  const fetchActivityStats = async () => {
    try {
      const response = await fetch(
        `/api/admin/users/${userId}/activity/stats?period=${period}`
      );
      const data = await response.json();

      if (data.success) {
        setActivityStats(data.stats);
      }
    } catch (err) {
      setError('Error fetching activity stats');
    }
  };

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create':
        return <Plus className='w-4 h-4 text-green-500' />;
      case 'update':
      case 'edit':
        return <Edit className='w-4 h-4 text-blue-500' />;
      case 'delete':
        return <Trash2 className='w-4 h-4 text-red-500' />;
      case 'view':
      case 'read':
        return <Eye className="w-4 h-4 text-white" />;
      case 'login':
        return <User className='w-4 h-4 text-purple-500' />;
      default:
        return <Activity className="w-4 h-4 text-white" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create':
        return 'bg-green-100 text-green-800';
      case 'update':
      case 'edit':
        return 'bg-blue-100 text-blue-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      case 'view':
      case 'read':
        return 'bg-gray-100 text-gray-800';
      case 'login':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getResourceIcon = (resourceType: string) => {
    switch (resourceType.toLowerCase()) {
      case 'page':
        return <Edit className='w-4 h-4' />;
      case 'project':
        return <BarChart3 className='w-4 h-4' />;
      case 'user':
        return <User className='w-4 h-4' />;
      case 'media':
        return <Eye className='w-4 h-4' />;
      default:
        return <Activity className='w-4 h-4' />;
    }
  };

  const filteredActivityLogs = activityLogs.filter(log => {
    const matchesAction =
      !actionFilter ||
      log.action.toLowerCase().includes(actionFilter.toLowerCase());
    const matchesResource =
      !resourceFilter ||
      log.resource_type.toLowerCase().includes(resourceFilter.toLowerCase());
    return matchesAction && matchesResource;
  });

  if (loading) {
    return (
      <div className='p-6'>
        <div className='flex items-center justify-center h-64'>
          <Loader2 className='w-8 h-8 animate-spin text-blue-600' />
          <span className="ml-2 text-white">Loading user activity...</span>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className='p-6'>
        <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
          <div className='flex items-center'>
            <AlertCircle className='w-5 h-5 text-red-400 mr-2' />
            <span className='text-red-800'>{error}</span>
          </div>
          <button
            onClick={() => router.push('/admin/users')}
            className='mt-4 text-blue-600 hover:text-blue-800'
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='mb-6'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className="text-2xl font-bold text-white">User Activity</h1>
            <p className="text-white">
              Activity monitoring for {user?.name}
            </p>
          </div>
          <button
            onClick={() => router.push('/admin/users')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-white"
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Users
          </button>
        </div>
      </div>

      {user && activityStats && (
        <>
          {/* Activity Statistics */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-6'>
            <div className='bg-white p-6 rounded-lg shadow'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className="text-sm font-medium text-white">
                    Total Actions
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {activityStats.total_actions}
                  </p>
                </div>
                <Activity className='w-8 h-8 text-blue-500' />
              </div>
              <div className='mt-4'>
                <div className='flex justify-between text-sm'>
                  <span className="text-white">Today</span>
                  <span className='font-medium text-green-600'>
                    {activityStats.actions_today}
                  </span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className="text-white">This Week</span>
                  <span className='font-medium text-blue-600'>
                    {activityStats.actions_this_week}
                  </span>
                </div>
              </div>
            </div>

            <div className='bg-white p-6 rounded-lg shadow'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className="text-sm font-medium text-white">
                    This Month
                  </p>
                  <p className='text-2xl font-bold text-purple-600'>
                    {activityStats.actions_this_month}
                  </p>
                </div>
                <Calendar className='w-8 h-8 text-purple-500' />
              </div>
            </div>

            <div className='bg-white p-6 rounded-lg shadow'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className="text-sm font-medium text-white">
                    Most Active Day
                  </p>
                  <p className='text-lg font-bold text-green-600'>
                    {activityStats.most_active_day}
                  </p>
                </div>
                <TrendingUp className='w-8 h-8 text-green-500' />
              </div>
            </div>

            <div className='bg-white p-6 rounded-lg shadow'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className="text-sm font-medium text-white">
                    Most Common Action
                  </p>
                  <p className='text-lg font-bold text-orange-600 capitalize'>
                    {activityStats.most_common_action.replace('_', ' ')}
                  </p>
                </div>
                <BarChart3 className='w-8 h-8 text-orange-500' />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className='bg-white p-4 rounded-lg shadow mb-6'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='flex-1'>
                <div className='relative'>
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                  <input
                    type='text'
                    placeholder='Filter by action...'
                    value={actionFilter}
                    onChange={e => setActionFilter(e.target.value)}
                    className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>
              </div>
              <div className='flex gap-2'>
                <select
                  value={resourceFilter}
                  onChange={e => setResourceFilter(e.target.value)}
                  className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value=''>All Resources</option>
                  <option value='page'>Pages</option>
                  <option value='project'>Projects</option>
                  <option value='user'>Users</option>
                  <option value='media'>Media</option>
                </select>
                <select
                  value={period}
                  onChange={e => setPeriod(e.target.value)}
                  className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value='7d'>Last 7 days</option>
                  <option value='30d'>Last 30 days</option>
                  <option value='90d'>Last 90 days</option>
                  <option value='1y'>Last year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Activity by Type Chart */}
          <div className='bg-white rounded-lg shadow p-6 mb-6'>
            <h2 className="text-lg font-semibold text-white">
              Activity by Type
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {Object.entries(activityStats.actions_by_type).map(
                ([action, count]) => (
                  <div key={action} className='bg-gray-50 p-4 rounded-lg'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        {getActionIcon(action)}
                        <span className="text-sm font-medium text-white">
                          {action.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-white">
                        {count}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Activity Logs */}
          <div className='bg-white rounded-lg shadow overflow-hidden'>
            <div className='px-6 py-4 border-b border-gray-200'>
              <h2 className="text-lg font-semibold text-white">
                Recent Activity
              </h2>
            </div>

            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white">
                      Resource
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white">
                      IP Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {filteredActivityLogs.map(log => (
                    <tr key={log.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          {getActionIcon(log.action)}
                          <span
                            className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(log.action)}`}
                          >
                            {log.action.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          {getResourceIcon(log.resource_type)}
                          <div className='ml-2'>
                            <div className="text-sm font-medium text-white">
                              {log.resource_type.replace('_', ' ')}
                            </div>
                            <div className="text-sm text-white">
                              {log.resource_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className="text-sm text-white">
                          {log.details}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {log.ip_address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        <div className='flex items-center'>
                          <Clock className='w-4 h-4 mr-1' />
                          {new Date(log.created_at).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredActivityLogs.length === 0 && (
              <div className='text-center py-12'>
                <Activity className="w-12 h-12 text-white" />
                <h3 className="text-lg font-medium text-white">
                  No activity found
                </h3>
                <p className="text-white">
                  {actionFilter || resourceFilter
                    ? 'Try adjusting your filters.'
                    : 'No activity recorded for this period.'}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
