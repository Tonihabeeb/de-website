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
import { Users, TrendingUp, UserPlus, UserCheck } from 'lucide-react';

interface UserStats {
  total_users: number;
  active_users: number;
  new_users_this_month: number;
  user_growth_rate: number;
  role_distribution: {
    super_admin: number;
    admin: number;
    editor: number;
    author: number;
    user: number;
  };
  user_activity_timeline: {
    date: string;
    active_users: number;
    new_users: number;
  }[];
  top_users: {
    user_id: string;
    username: string;
    activity_count: number;
    last_activity: string;
  }[];
}

interface UserOverviewChartsProps {
  className?: string;
}

const UserOverviewCharts: React.FC<UserOverviewChartsProps> = ({
  className = '',
}) => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChart, setSelectedChart] = useState<
    'overview' | 'growth' | 'roles' | 'activity'
  >('overview');

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      setLoading(true);
      // For now, use mock data since we don't have the analytics API yet
      // TODO: Replace with actual API call to /api/admin/analytics
      const mockStats: UserStats = {
        total_users: 156,
        active_users: 89,
        new_users_this_month: 23,
        user_growth_rate: 12.5,
        role_distribution: {
          super_admin: 2,
          admin: 5,
          editor: 12,
          author: 25,
          user: 112,
        },
        user_activity_timeline: [
          { date: '2024-12-13', active_users: 45, new_users: 3 },
          { date: '2024-12-14', active_users: 52, new_users: 5 },
          { date: '2024-12-15', active_users: 48, new_users: 2 },
          { date: '2024-12-16', active_users: 61, new_users: 7 },
          { date: '2024-12-17', active_users: 67, new_users: 4 },
          { date: '2024-12-18', active_users: 73, new_users: 6 },
          { date: '2024-12-19', active_users: 89, new_users: 8 },
        ],
        top_users: [
          {
            user_id: '1',
            username: 'admin@example.com',
            activity_count: 45,
            last_activity: new Date().toISOString(),
          },
          {
            user_id: '2',
            username: 'editor@example.com',
            activity_count: 32,
            last_activity: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            user_id: '3',
            username: 'author@example.com',
            activity_count: 28,
            last_activity: new Date(Date.now() - 7200000).toISOString(),
          },
        ],
      };

      setUserStats(mockStats);
    } catch (err) {
      setError('Failed to fetch user statistics');
      console.error('Error fetching user stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const roleDistributionData = userStats
    ? Object.entries(userStats.role_distribution).map(([role, count]) => ({
        name: role.replace('_', ' ').toUpperCase(),
        value: count,
      }))
    : [];

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
        <div className='p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h3 className="text-lg font-semibold text-white">
              User Overview
            </h3>
            <Users className="w-5 h-5 text-white" />
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

  if (error || !userStats) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
        <div className='p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h3 className="text-lg font-semibold text-white">
              User Overview
            </h3>
            <Users className="w-5 h-5 text-white" />
          </div>
          <div className='text-center py-8'>
            <p className='text-red-600'>{error || 'No data available'}</p>
            <button
              onClick={fetchUserStats}
              className='mt-2 text-sm text-blue-600 hover:text-blue-800'
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      <div className='p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className="text-lg font-semibold text-white">User Overview</h3>
          <Users className="w-5 h-5 text-white" />
        </div>

        {/* Chart Navigation */}
        <div className='flex space-x-2 mb-6'>
          <button
            onClick={() => setSelectedChart('overview')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              selectedChart === 'overview'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedChart('growth')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              selectedChart === 'growth'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Growth
          </button>
          <button
            onClick={() => setSelectedChart('roles')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              selectedChart === 'roles'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Roles
          </button>
          <button
            onClick={() => setSelectedChart('activity')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              selectedChart === 'activity'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Activity
          </button>
        </div>

        {/* Overview Cards */}
        {selectedChart === 'overview' && (
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
            <div className="bg-blue-50 p-4 rounded-lg text-white">
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-blue-600 font-medium'>
                    Total Users
                  </p>
                  <p className='text-2xl font-bold text-blue-900'>
                    {userStats.total_users}
                  </p>
                </div>
                <Users className='w-8 h-8 text-blue-400' />
              </div>
            </div>

            <div className='bg-green-50 p-4 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-green-600 font-medium'>
                    Active Users
                  </p>
                  <p className='text-2xl font-bold text-green-900'>
                    {userStats.active_users}
                  </p>
                </div>
                <UserCheck className='w-8 h-8 text-green-400' />
              </div>
            </div>

            <div className='bg-orange-50 p-4 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-orange-600 font-medium'>
                    New This Month
                  </p>
                  <p className='text-2xl font-bold text-orange-900'>
                    {userStats.new_users_this_month}
                  </p>
                </div>
                <UserPlus className='w-8 h-8 text-orange-400' />
              </div>
            </div>

            <div className='bg-purple-50 p-4 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-purple-600 font-medium'>
                    Growth Rate
                  </p>
                  <p className='text-2xl font-bold text-purple-900'>
                    {userStats.user_growth_rate}%
                  </p>
                </div>
                <TrendingUp className='w-8 h-8 text-purple-400' />
              </div>
            </div>
          </div>
        )}

        {/* Charts */}
        <div className='h-80'>
          {selectedChart === 'growth' && (
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart data={userStats.user_activity_timeline}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='date'
                  tickFormatter={value => new Date(value).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={value => new Date(value).toLocaleDateString()}
                  formatter={(value, name) => [
                    value,
                    name === 'active_users' ? 'Active Users' : 'New Users',
                  ]}
                />
                <Area
                  type='monotone'
                  dataKey='active_users'
                  stackId='1'
                  stroke='#3B82F6'
                  fill='#3B82F6'
                  fillOpacity={0.6}
                />
                <Area
                  type='monotone'
                  dataKey='new_users'
                  stackId='2'
                  stroke='#10B981'
                  fill='#10B981'
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {selectedChart === 'roles' && (
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={roleDistributionData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${((percent || 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                >
                  {roleDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={value => [value, 'Users']} />
              </PieChart>
            </ResponsiveContainer>
          )}

          {selectedChart === 'activity' && (
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={userStats.user_activity_timeline}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='date'
                  tickFormatter={value => new Date(value).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={value => new Date(value).toLocaleDateString()}
                  formatter={(value, name) => [
                    value,
                    name === 'active_users' ? 'Active Users' : 'New Users',
                  ]}
                />
                <Bar dataKey='active_users' fill='#3B82F6' />
                <Bar dataKey='new_users' fill='#10B981' />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Top Users */}
        {selectedChart === 'overview' && (
          <div className='mt-6'>
            <h4 className="text-sm font-medium text-white">
              Top Active Users
            </h4>
            <div className='space-y-2'>
              {userStats.top_users.map(user => (
                <div
                  key={user.user_id}
                  className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                >
                  <div className='flex items-center space-x-3'>
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-white">
                      <span className='text-sm font-medium text-blue-600'>
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {user.username}
                      </p>
                      <p className="text-xs text-white">
                        {user.activity_count} activities
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-white">
                    {new Date(user.last_activity).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOverviewCharts;
