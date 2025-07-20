'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Clock, User, FileText, Settings, Trash2, Plus, Edit, Eye } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'page_created' | 'page_updated' | 'page_deleted' | 'project_created' | 'project_updated' | 'user_created' | 'user_updated' | 'system_backup' | 'system_restore';
  description: string;
  timestamp: string;
  user: string;
  resource_id?: string;
  resource_type?: string;
}

interface ActivityFeedProps {
  limit?: number;
  showFilters?: boolean;
  className?: string;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ 
  limit = 10, 
  showFilters = true, 
  className = '' 
}) => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      // For now, use mock data since we don't have the activity API yet
      // TODO: Replace with actual API call
      const mockActivities: ActivityItem[] = [
        {
          id: '1',
          type: 'page_created',
          description: 'New page "About Us" created',
          timestamp: new Date().toISOString(),
          user: 'admin@example.com',
          resource_id: 'page-1',
          resource_type: 'page'
        },
        {
          id: '2',
          type: 'project_updated',
          description: 'Project "KPP Technology" updated',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          user: 'editor@example.com',
          resource_id: 'project-1',
          resource_type: 'project'
        },
        {
          id: '3',
          type: 'user_created',
          description: 'New user "john.doe@example.com" created',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          user: 'admin@example.com',
          resource_id: 'user-1',
          resource_type: 'user'
        },
        {
          id: '4',
          type: 'system_backup',
          description: 'System backup created successfully',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          user: 'system',
          resource_type: 'system'
        },
        {
          id: '5',
          type: 'page_updated',
          description: 'Page "Services" content updated',
          timestamp: new Date(Date.now() - 14400000).toISOString(),
          user: 'editor@example.com',
          resource_id: 'page-2',
          resource_type: 'page'
        }
      ];

      setActivities(mockActivities);
    } catch (err) {
      setError('Failed to fetch activities');
      console.error('Error fetching activities:', err);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'page_created':
      case 'page_updated':
      case 'page_deleted':
        return <FileText className="w-4 h-4" />;
      case 'project_created':
      case 'project_updated':
        return <Activity className="w-4 h-4" />;
      case 'user_created':
      case 'user_updated':
        return <User className="w-4 h-4" />;
      case 'system_backup':
      case 'system_restore':
        return <Settings className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'page_created':
      case 'project_created':
      case 'user_created':
        return 'text-green-600 bg-green-100';
      case 'page_updated':
      case 'project_updated':
      case 'user_updated':
        return 'text-blue-600 bg-blue-100';
      case 'page_deleted':
        return 'text-red-600 bg-red-100';
      case 'system_backup':
      case 'system_restore':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.type.includes(filter);
  }).slice(0, limit);

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3 animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchActivities}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
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
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <Activity className="w-5 h-5 text-gray-400" />
        </div>

        {showFilters && (
          <div className="mb-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Activities</option>
              <option value="page">Pages</option>
              <option value="project">Projects</option>
              <option value="user">Users</option>
              <option value="system">System</option>
            </select>
          </div>
        )}

        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>No recent activity</p>
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{activity.user}</span>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimestamp(activity.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {activities.length > limit && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View all activities
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed; 