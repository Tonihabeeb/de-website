'use client';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import { toast } from '@/components/ui/Toast';
import {
  User,
  Clock,
  Activity,
  Eye,
  FileText,
  Settings,
  Calendar,
  Filter,
  Download,
  RefreshCw,
} from 'lucide-react';
import Button from '@/components/ui/Button';

interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  action: string;
  resource: string;
  resourceType: 'page' | 'project' | 'document' | 'user' | 'system';
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  sessionId: string;
  details?: any;
}

interface ActivityFilter {
  userId?: string;
  action?: string;
  resourceType?: string;
  dateFrom?: string;
  dateTo?: string;
}

const UserActivityMonitor: React.FC = () => {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ActivityFilter>({});
  const [selectedActivity, setSelectedActivity] = useState<UserActivity | null>(
    null
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalActivities: 0,
    todayActivities: 0,
    activeUsers: 0,
    topActions: [] as { action: string; count: number }[],
  });

  // Mock data for demonstration
  const mockActivities: UserActivity[] = [
    {
      id: '1',
      userId: 'user1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      action: 'login',
      resource: 'Authentication',
      resourceType: 'system',
      timestamp: new Date().toISOString(),
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      sessionId: 'sess_123456',
      details: { browser: 'Chrome', os: 'Windows 10' },
    },
    {
      id: '2',
      userId: 'user1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      action: 'create',
      resource: 'Project Alpha',
      resourceType: 'project',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      sessionId: 'sess_123456',
      details: { projectId: 'proj_001', projectName: 'Project Alpha' },
    },
    {
      id: '3',
      userId: 'user2',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      action: 'edit',
      resource: 'About Page',
      resourceType: 'page',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      sessionId: 'sess_789012',
      details: {
        pageId: 'page_001',
        changes: ['Updated content', 'Modified meta tags'],
      },
    },
    {
      id: '4',
      userId: 'user3',
      userName: 'Bob Johnson',
      userEmail: 'bob@example.com',
      action: 'upload',
      resource: 'Technical Document',
      resourceType: 'document',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      sessionId: 'sess_345678',
      details: { fileName: 'tech_doc.pdf', fileSize: '2.5MB' },
    },
    {
      id: '5',
      userId: 'user1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      action: 'delete',
      resource: 'Old Project',
      resourceType: 'project',
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      sessionId: 'sess_123456',
      details: { projectId: 'proj_002', reason: 'Archived' },
    },
  ];

  useEffect(() => {
    loadActivities();
    loadStats();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setActivities(mockActivities);
    } catch (error) {
      toast.error('Failed to load user activities');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      // Simulate API call for stats
      const mockStats = {
        totalActivities: mockActivities.length,
        todayActivities: mockActivities.filter(
          a =>
            new Date(a.timestamp).toDateString() === new Date().toDateString()
        ).length,
        activeUsers: new Set(mockActivities.map(a => a.userId)).size,
        topActions: [
          { action: 'login', count: 15 },
          { action: 'edit', count: 12 },
          { action: 'create', count: 8 },
          { action: 'upload', count: 5 },
        ],
      };
      setStats(mockStats);
    } catch (error) {
      toast.error('Failed to load activity statistics');
    }
  };

  const handleFilterChange = (key: keyof ActivityFilter, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleExport = () => {
    toast.success('Activity data exported successfully');
  };

  const handleRefresh = () => {
    loadActivities();
    loadStats();
    toast.info('Activity data refreshed');
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'login':
        return <User className='w-4 h-4 text-green-600' />;
      case 'create':
        return <FileText className='w-4 h-4 text-blue-600' />;
      case 'edit':
        return <Settings className='w-4 h-4 text-yellow-600' />;
      case 'delete':
        return <FileText className='w-4 h-4 text-red-600' />;
      case 'upload':
        return <FileText className='w-4 h-4 text-purple-600' />;
      default:
        return <Activity className="w-4 h-4 text-white" />;
    }
  };

  const getResourceTypeColor = (type: string) => {
    switch (type) {
      case 'page':
        return 'bg-blue-100 text-blue-800';
      case 'project':
        return 'bg-green-100 text-green-800';
      case 'document':
        return 'bg-purple-100 text-purple-800';
      case 'user':
        return 'bg-orange-100 text-orange-800';
      case 'system':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns: ColumnDef<UserActivity>[] = [
    {
      accessorKey: 'userName',
      header: 'User',
      cell: ({ row }) => (
        <div className='flex items-center space-x-2'>
          <User className="w-4 h-4 text-white" />
          <div>
            <p className="text-sm font-medium text-white">
              {row.getValue('userName')}
            </p>
            <p className="text-xs text-white">{row.original.userEmail}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <div className='flex items-center space-x-2'>
          {getActionIcon(row.getValue('action'))}
          <span className='text-sm font-medium capitalize'>
            {row.getValue('action')}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'resource',
      header: 'Resource',
      cell: ({ row }) => (
        <div>
          <p className="text-sm text-white">{row.getValue('resource')}</p>
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getResourceTypeColor(row.original.resourceType)}`}
          >
            {row.original.resourceType}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'timestamp',
      header: 'Timestamp',
      cell: ({ row }) => (
        <div className='flex items-center space-x-2'>
          <Clock className="w-4 h-4 text-white" />
          <span className="text-sm text-white">
            {format(new Date(row.getValue('timestamp')), 'MMM dd, yyyy HH:mm')}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'ipAddress',
      header: 'IP Address',
      cell: ({ row }) => (
        <span className="text-sm text-white">
          {row.getValue('ipAddress')}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Button
          variant='secondary'
          size='sm'
          onClick={() => {
            setSelectedActivity(row.original);
            setIsDetailModalOpen(true);
          }}
        >
          <Eye className='w-4 h-4' />
        </Button>
      ),
    },
  ];

  const filteredActivities = activities.filter(activity => {
    if (filters.userId && activity.userId !== filters.userId) return false;
    if (filters.action && activity.action !== filters.action) return false;
    if (filters.resourceType && activity.resourceType !== filters.resourceType)
      return false;
    if (
      filters.dateFrom &&
      new Date(activity.timestamp) < new Date(filters.dateFrom)
    )
      return false;
    if (
      filters.dateTo &&
      new Date(activity.timestamp) > new Date(filters.dateTo)
    )
      return false;
    return true;
  });

  return (
    <div className='space-y-6'>
      {/* Statistics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center'>
            <div className="p-2 bg-blue-100 rounded-lg text-white">
              <Activity className='w-6 h-6 text-blue-600' />
            </div>
            <div className='ml-4'>
              <p className="text-sm font-medium text-white">
                Total Activities
              </p>
              <p className="text-2xl font-bold text-white">
                {stats.totalActivities}
              </p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center'>
            <div className='p-2 bg-green-100 rounded-lg'>
              <Calendar className='w-6 h-6 text-green-600' />
            </div>
            <div className='ml-4'>
              <p className="text-sm font-medium text-white">
                Today's Activities
              </p>
              <p className="text-2xl font-bold text-white">
                {stats.todayActivities}
              </p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center'>
            <div className='p-2 bg-purple-100 rounded-lg'>
              <User className='w-6 h-6 text-purple-600' />
            </div>
            <div className='ml-4'>
              <p className="text-sm font-medium text-white">Active Users</p>
              <p className="text-2xl font-bold text-white">
                {stats.activeUsers}
              </p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center'>
            <div className='p-2 bg-orange-100 rounded-lg'>
              <Filter className='w-6 h-6 text-orange-600' />
            </div>
            <div className='ml-4'>
              <p className="text-sm font-medium text-white">Top Action</p>
              <p className="text-lg font-bold text-white">
                {stats.topActions[0]?.action || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-lg shadow p-6'>
        <h3 className="text-lg font-medium text-white">Filters</h3>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
          <div>
            <label className="block text-sm font-medium text-white">
              User
            </label>
            <select
              value={filters.userId || ''}
              onChange={e => handleFilterChange('userId', e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>All Users</option>
              {Array.from(new Set(activities.map(a => a.userId))).map(
                userId => {
                  const user = activities.find(a => a.userId === userId);
                  return (
                    <option key={userId} value={userId}>
                      {user?.userName}
                    </option>
                  );
                }
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Action
            </label>
            <select
              value={filters.action || ''}
              onChange={e => handleFilterChange('action', e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>All Actions</option>
              <option value='login'>Login</option>
              <option value='create'>Create</option>
              <option value='edit'>Edit</option>
              <option value='delete'>Delete</option>
              <option value='upload'>Upload</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Resource Type
            </label>
            <select
              value={filters.resourceType || ''}
              onChange={e => handleFilterChange('resourceType', e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>All Types</option>
              <option value='page'>Page</option>
              <option value='project'>Project</option>
              <option value='document'>Document</option>
              <option value='user'>User</option>
              <option value='system'>System</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              From Date
            </label>
            <input
              type='date'
              value={filters.dateFrom || ''}
              onChange={e => handleFilterChange('dateFrom', e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              To Date
            </label>
            <input
              type='date'
              value={filters.dateTo || ''}
              onChange={e => handleFilterChange('dateTo', e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className='flex justify-between items-center'>
        <h2 className="text-xl font-bold text-white">User Activity Log</h2>
        <div className='flex space-x-3'>
          <Button variant='secondary' onClick={handleRefresh}>
            <RefreshCw className='w-4 h-4 mr-2' />
            Refresh
          </Button>
          <Button variant='secondary' onClick={handleExport}>
            <Download className='w-4 h-4 mr-2' />
            Export
          </Button>
        </div>
      </div>

      {/* Activity Table */}
      <DataTable
        columns={columns}
        data={filteredActivities}
        searchKey='userName'
        searchPlaceholder='Search by user name...'
        pageSize={10}
      />

      {/* Activity Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title='Activity Details'
        size='lg'
      >
        {selectedActivity && (
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className="block text-sm font-medium text-white">
                  User
                </label>
                <p className="text-sm text-white">
                  {selectedActivity.userName}
                </p>
                <p className="text-xs text-white">
                  {selectedActivity.userEmail}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Action
                </label>
                <div className='flex items-center space-x-2'>
                  {getActionIcon(selectedActivity.action)}
                  <span className='text-sm font-medium capitalize'>
                    {selectedActivity.action}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Resource
                </label>
                <p className="text-sm text-white">
                  {selectedActivity.resource}
                </p>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getResourceTypeColor(selectedActivity.resourceType)}`}
                >
                  {selectedActivity.resourceType}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Timestamp
                </label>
                <p className="text-sm text-white">
                  {format(
                    new Date(selectedActivity.timestamp),
                    'MMM dd, yyyy HH:mm:ss'
                  )}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  IP Address
                </label>
                <p className="text-sm font-mono text-white">
                  {selectedActivity.ipAddress}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Session ID
                </label>
                <p className="text-sm font-mono text-white">
                  {selectedActivity.sessionId}
                </p>
              </div>
            </div>

            {selectedActivity.details && (
              <div>
                <label className="block text-sm font-medium text-white">
                  Details
                </label>
                <pre className='bg-gray-50 p-3 rounded text-sm overflow-auto max-h-32'>
                  {JSON.stringify(selectedActivity.details, null, 2)}
                </pre>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white">
                User Agent
              </label>
              <p className="text-xs text-white">
                {selectedActivity.userAgent}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserActivityMonitor;
