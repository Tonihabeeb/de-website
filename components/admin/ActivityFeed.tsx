'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Clock,
  User,
  FileText,
  Settings,
  Trash2,
  Plus,
  Edit,
  Eye,
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type:
    | 'page_created'
    | 'page_updated'
    | 'page_deleted'
    | 'project_created'
    | 'project_updated'
    | 'user_created'
    | 'user_updated'
    | 'system_backup'
    | 'system_restore'
    | 'user_activity'
    | 'page_updated'
    | 'project_updated';
  description: string;
  timestamp: string;
  user: string;
  resource_id?: string;
  resource_type?: string;
  resource_name?: string;
  user_email?: string;
}

interface ActivityFeedProps {
  limit?: number;
  showFilters?: boolean;
  className?: string;
  activities?: ActivityItem[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  limit = 10,
  showFilters = true,
  className = '',
  activities: propActivities,
}) => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (propActivities) {
      // Use provided activities
      setActivities(propActivities.slice(0, limit));
      setLoading(false);
    } else {
      // Fallback to mock data if no activities provided
      fetchActivities();
    }
  }, [propActivities, limit]);

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
          resource_type: 'page',
        },
        {
          id: '2',
          type: 'project_updated',
          description: 'Project "KPP Technology" updated',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          user: 'editor@example.com',
          resource_id: 'project-1',
          resource_type: 'project',
        },
        {
          id: '3',
          type: 'user_created',
          description: 'New user "john.doe@example.com" created',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          user: 'admin@example.com',
          resource_id: 'user-1',
          resource_type: 'user',
        },
        {
          id: '4',
          type: 'system_backup',
          description: 'System backup created successfully',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          user: 'system',
          resource_type: 'system',
        },
        {
          id: '5',
          type: 'page_updated',
          description: 'Page "Services" content updated',
          timestamp: new Date(Date.now() - 14400000).toISOString(),
          user: 'editor@example.com',
          resource_id: 'page-2',
          resource_type: 'page',
        },
      ];

      setActivities(mockActivities.slice(0, limit));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setError('Failed to load activities');
      setLoading(false);
    }
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'page_created':
      case 'page_updated':
        return <FileText className='w-4 h-4' />;
      case 'project_created':
      case 'project_updated':
        return <Activity className='w-4 h-4' />;
      case 'user_created':
      case 'user_updated':
      case 'user_activity':
        return <User className='w-4 h-4' />;
      case 'system_backup':
      case 'system_restore':
        return <Settings className='w-4 h-4' />;
      default:
        return <Activity className='w-4 h-4' />;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'page_created':
      case 'page_updated':
        return 'text-blue-600 bg-blue-100';
      case 'project_created':
      case 'project_updated':
        return 'text-green-600 bg-green-100';
      case 'user_created':
      case 'user_updated':
      case 'user_activity':
        return 'text-purple-600 bg-purple-100';
      case 'system_backup':
      case 'system_restore':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-text bg-gray-100';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='animate-pulse'>
            <div className='flex items-center space-x-3'>
              <div className='w-8 h-8 bg-gray-200 rounded-full'></div>
              <div className='flex-1'>
                <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                <div className='h-3 bg-gray-200 rounded w-1/2 mt-2'></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className='text-red-600 mb-2'>Failed to load activities</div>
        <button
          onClick={fetchActivities}
          className='text-blue-600 hover:text-blue-800 text-sm'
        >
          Retry
        </button>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className='text-gray-500'>No recent activity</div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {showFilters && (
        <div className='flex space-x-2 mb-4'>
          {['all', 'pages', 'projects', 'users', 'system'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 text-sm rounded-full ${
                filter === filterType
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-text hover:bg-gray-200'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      )}

      {activities.map((activity) => (
        <div key={activity.id} className='flex items-start space-x-3'>
          <div
            className={`p-2 rounded-full ${getActivityColor(activity.type)}`}
          >
            {getActivityIcon(activity.type)}
          </div>
          <div className='flex-1 min-w-0'>
            <div className='flex items-center justify-between'>
              <p className='text-sm font-medium text-primary truncate'>
                {activity.description}
              </p>
              <span className='text-xs text-gray-500 flex items-center'>
                <Clock className='w-3 h-3 mr-1' />
                {formatTimestamp(activity.timestamp)}
              </span>
            </div>
            <p className='text-xs text-gray-500 mt-1'>
              by {activity.user}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
