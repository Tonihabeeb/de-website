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
  userStats?: any;
}

const UserOverviewCharts: React.FC<UserOverviewChartsProps> = ({
  className = '',
  userStats: propUserStats,
}) => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChart, setSelectedChart] = useState<
    'overview' | 'growth' | 'roles' | 'activity'
  >('overview');

  useEffect(() => {
    if (propUserStats) {
      // Use provided user stats
      setUserStats(propUserStats);
      setLoading(false);
    } else {
      // Fallback to mock data if no user stats provided
      fetchUserStats();
    }
  }, [propUserStats]);

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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user stats:', error);
      setError('Failed to load user statistics');
      setLoading(false);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className='text-center'>
          <div className='text-red-600 mb-2'>Failed to load user statistics</div>
          <button
            onClick={fetchUserStats}
            className='text-blue-600 hover:text-blue-800 text-sm'
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!userStats) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className='text-gray-500'>No user data available</div>
      </div>
    );
  }

  // Transform role distribution data for pie chart
  const roleData = Object.entries(userStats.role_distribution || {}).map(
    ([role, count]) => ({
      name: role.replace('_', ' ').toUpperCase(),
      value: count,
    })
  );

  return (
    <div className={className}>
      {/* Chart Type Selector */}
      <div className='flex space-x-2 mb-4'>
        {[
          { key: 'overview', label: 'Overview', icon: Users },
          { key: 'growth', label: 'Growth', icon: TrendingUp },
          { key: 'roles', label: 'Roles', icon: UserCheck },
          { key: 'activity', label: 'Activity', icon: UserPlus },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setSelectedChart(key as any)}
            className={`flex items-center space-x-1 px-3 py-1 text-sm rounded-full transition-colors ${
              selectedChart === key
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-text hover:bg-gray-200'
            }`}
          >
            <Icon className='w-4 h-4' />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className='h-48'>
        {selectedChart === 'overview' && (
          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-gray-50 rounded-lg p-4'>
              <div className='text-2xl font-bold text-primary'>
                {userStats.total_users}
              </div>
              <div className='text-sm text-gray-text'>Total Users</div>
            </div>
            <div className='bg-gray-50 rounded-lg p-4'>
              <div className='text-2xl font-bold text-green-600'>
                {userStats.active_users}
              </div>
              <div className='text-sm text-gray-text'>Active Users</div>
            </div>
            <div className='bg-gray-50 rounded-lg p-4'>
              <div className='text-2xl font-bold text-blue-600'>
                {userStats.new_users_this_month}
              </div>
              <div className='text-sm text-gray-text'>New This Month</div>
            </div>
            <div className='bg-gray-50 rounded-lg p-4'>
              <div className='text-2xl font-bold text-purple-600'>
                {userStats.user_growth_rate}%
              </div>
              <div className='text-sm text-gray-text'>Growth Rate</div>
            </div>
          </div>
        )}

        {selectedChart === 'growth' && userStats.user_activity_timeline && (
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={userStats.user_activity_timeline}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip />
              <Area
                type='monotone'
                dataKey='active_users'
                stackId='1'
                stroke='#8884d8'
                fill='#8884d8'
                name='Active Users'
              />
              <Area
                type='monotone'
                dataKey='new_users'
                stackId='1'
                stroke='#82ca9d'
                fill='#82ca9d'
                name='New Users'
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {selectedChart === 'roles' && (
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={roleData}
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
                {roleData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}

        {selectedChart === 'activity' && userStats.user_activity_timeline && (
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={userStats.user_activity_timeline}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip />
              <Line
                type='monotone'
                dataKey='active_users'
                stroke='#8884d8'
                strokeWidth={2}
                name='Active Users'
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Top Users */}
      {userStats.top_users && userStats.top_users.length > 0 && (
        <div className='mt-4'>
          <h4 className='text-sm font-medium text-primary mb-2'>Top Active Users</h4>
          <div className='space-y-2'>
            {userStats.top_users.slice(0, 3).map((user: any) => (
              <div
                key={user.user_id}
                className='flex items-center justify-between text-sm'
              >
                <span className='text-gray-text'>{user.username}</span>
                <span className='text-primary font-medium'>
                  {user.activity_count} activities
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOverviewCharts;
