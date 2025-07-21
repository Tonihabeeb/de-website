'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  TrendingUp,
  Activity,
  CheckCircle,
  Clock,
  AlertCircle,
  Save,
  X,
} from 'lucide-react';

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

export default function ProjectProgressManagement() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(
    null
  );
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  // Form data
  const [milestoneForm, setMilestoneForm] = useState({
    project_id: 'project-001',
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    status: 'upcoming' as 'completed' | 'in-progress' | 'upcoming',
    progress: 0,
  });

  const [activityForm, setActivityForm] = useState({
    project_id: 'project-001',
    type: 'milestone_updated',
    title: '',
    description: '',
    user: 'Admin User',
  });

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

  const handleMilestoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingMilestone
        ? `/api/admin/project-progress/milestones/${editingMilestone.id}`
        : '/api/admin/project-progress';

      const method = editingMilestone ? 'PUT' : 'POST';
      const body = editingMilestone
        ? { type: 'milestone', data: milestoneForm }
        : { type: 'milestone', data: milestoneForm };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        fetchProjectProgress();
        resetMilestoneForm();
        setShowMilestoneForm(false);
        setEditingMilestone(null);
      } else {
        alert('Failed to save milestone: ' + data.error);
      }
    } catch (err) {
      alert('Failed to save milestone');
      console.error('Error saving milestone:', err);
    }
  };

  const handleActivitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/admin/project-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'activity', data: activityForm }),
      });

      const data = await response.json();

      if (data.success) {
        fetchProjectProgress();
        resetActivityForm();
        setShowActivityForm(false);
      } else {
        alert('Failed to log activity: ' + data.error);
      }
    } catch (err) {
      alert('Failed to log activity');
      console.error('Error logging activity:', err);
    }
  };

  const handleDeleteMilestone = async (milestoneId: string) => {
    if (!confirm('Are you sure you want to delete this milestone?')) return;

    try {
      const response = await fetch(
        `/api/admin/project-progress/milestones/${milestoneId}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();
      if (data.success) {
        fetchProjectProgress();
      } else {
        alert('Failed to delete milestone: ' + data.error);
      }
    } catch (err) {
      alert('Failed to delete milestone');
      console.error('Error deleting milestone:', err);
    }
  };

  const resetMilestoneForm = () => {
    setMilestoneForm({
      project_id: 'project-001',
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      status: 'upcoming',
      progress: 0,
    });
  };

  const resetActivityForm = () => {
    setActivityForm({
      project_id: 'project-001',
      type: 'milestone_updated',
      title: '',
      description: '',
      user: 'Admin User',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className='w-4 h-4 text-green-500' />;
      case 'in-progress':
        return <Clock className='w-4 h-4 text-yellow-500' />;
      case 'upcoming':
        return <AlertCircle className='w-4 h-4 text-gray-400' />;
      default:
        return <AlertCircle className='w-4 h-4 text-gray-400' />;
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
      <div className='p-6'>
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
      </div>
    );
  }

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='mb-6'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>
              Project Progress Management
            </h1>
            <p className='text-gray-600 mt-1'>
              Manage project milestones, metrics, and activity logs
            </p>
          </div>
          <div className='flex gap-2'>
            <button
              onClick={() => setShowMilestoneForm(true)}
              className='inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              <Plus className='w-4 h-4 mr-2' />
              Add Milestone
            </button>
            <button
              onClick={() => setShowActivityForm(true)}
              className='inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              <Activity className='w-4 h-4 mr-2' />
              Log Activity
            </button>
          </div>
        </div>
      </div>

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
            </div>
          </div>
        </div>
      )}

      {/* Milestones Section */}
      <section className='mb-8'>
        <h2 className='text-xl font-semibold flex items-center gap-2 mb-4'>
          <Calendar className='w-5 h-5 text-blue-600' />
          Project Milestones
        </h2>
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Milestone
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Progress
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Timeline
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {milestones.map(milestone => (
                  <tr key={milestone.id}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div>
                        <div className='text-sm font-medium text-gray-900'>
                          {milestone.name}
                        </div>
                        <div className='text-sm text-gray-500'>
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
                            className='bg-blue-600 h-2 rounded-full'
                            style={{ width: `${milestone.progress}%` }}
                          ></div>
                        </div>
                        <span className='text-sm text-gray-900'>
                          {milestone.progress}%
                        </span>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {milestone.start_date} → {milestone.end_date}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                      <div className='flex items-center space-x-2'>
                        <button
                          onClick={() => {
                            setEditingMilestone(milestone);
                            setMilestoneForm({
                              project_id: milestone.project_id,
                              name: milestone.name,
                              description: milestone.description,
                              start_date: milestone.start_date,
                              end_date: milestone.end_date,
                              status: milestone.status,
                              progress: milestone.progress,
                            });
                            setShowMilestoneForm(true);
                          }}
                          className='text-blue-600 hover:text-blue-900'
                        >
                          <Edit className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => handleDeleteMilestone(milestone.id)}
                          className='text-red-600 hover:text-red-900'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className='mb-8'>
        <h2 className='text-xl font-semibold flex items-center gap-2 mb-4'>
          <Activity className='w-5 h-5 text-green-600' />
          Recent Activity
        </h2>
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Activity
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Type
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    User
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {activity.slice(0, 10).map(item => (
                  <tr key={item.id}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div>
                        <div className='text-sm font-medium text-gray-900'>
                          {item.title}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {item.description}
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                        {item.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {item.user}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {new Date(item.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Milestone Form Modal */}
      {showMilestoneForm && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                {editingMilestone ? 'Edit Milestone' : 'Add New Milestone'}
              </h3>
              <form onSubmit={handleMilestoneSubmit} className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Name
                  </label>
                  <input
                    type='text'
                    value={milestoneForm.name}
                    onChange={e =>
                      setMilestoneForm({
                        ...milestoneForm,
                        name: e.target.value,
                      })
                    }
                    className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Description
                  </label>
                  <textarea
                    value={milestoneForm.description}
                    onChange={e =>
                      setMilestoneForm({
                        ...milestoneForm,
                        description: e.target.value,
                      })
                    }
                    className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    rows={3}
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Start Date
                    </label>
                    <input
                      type='date'
                      value={milestoneForm.start_date}
                      onChange={e =>
                        setMilestoneForm({
                          ...milestoneForm,
                          start_date: e.target.value,
                        })
                      }
                      className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      End Date
                    </label>
                    <input
                      type='date'
                      value={milestoneForm.end_date}
                      onChange={e =>
                        setMilestoneForm({
                          ...milestoneForm,
                          end_date: e.target.value,
                        })
                      }
                      className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      required
                    />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Status
                    </label>
                    <select
                      value={milestoneForm.status}
                      onChange={e =>
                        setMilestoneForm({
                          ...milestoneForm,
                          status: e.target.value as any,
                        })
                      }
                      className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='upcoming'>Upcoming</option>
                      <option value='in-progress'>In Progress</option>
                      <option value='completed'>Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Progress (%)
                    </label>
                    <input
                      type='number'
                      min='0'
                      max='100'
                      value={milestoneForm.progress}
                      onChange={e =>
                        setMilestoneForm({
                          ...milestoneForm,
                          progress: parseInt(e.target.value),
                        })
                      }
                      className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>
                </div>
                <div className='flex justify-end space-x-3 pt-4'>
                  <button
                    type='button'
                    onClick={() => {
                      setShowMilestoneForm(false);
                      setEditingMilestone(null);
                      resetMilestoneForm();
                    }}
                    className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  >
                    <Save className='w-4 h-4 mr-2' />
                    {editingMilestone ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Activity Form Modal */}
      {showActivityForm && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                Log Activity
              </h3>
              <form onSubmit={handleActivitySubmit} className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Activity Type
                  </label>
                  <select
                    value={activityForm.type}
                    onChange={e =>
                      setActivityForm({ ...activityForm, type: e.target.value })
                    }
                    className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                  >
                    <option value='milestone_completed'>
                      Milestone Completed
                    </option>
                    <option value='milestone_updated'>Milestone Updated</option>
                    <option value='cost_updated'>Cost Updated</option>
                    <option value='schedule_updated'>Schedule Updated</option>
                    <option value='issue_identified'>Issue Identified</option>
                    <option value='issue_resolved'>Issue Resolved</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Title
                  </label>
                  <input
                    type='text'
                    value={activityForm.title}
                    onChange={e =>
                      setActivityForm({
                        ...activityForm,
                        title: e.target.value,
                      })
                    }
                    className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Description
                  </label>
                  <textarea
                    value={activityForm.description}
                    onChange={e =>
                      setActivityForm({
                        ...activityForm,
                        description: e.target.value,
                      })
                    }
                    className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    rows={3}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    User
                  </label>
                  <input
                    type='text'
                    value={activityForm.user}
                    onChange={e =>
                      setActivityForm({ ...activityForm, user: e.target.value })
                    }
                    className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                </div>
                <div className='flex justify-end space-x-3 pt-4'>
                  <button
                    type='button'
                    onClick={() => {
                      setShowActivityForm(false);
                      resetActivityForm();
                    }}
                    className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                  >
                    <Save className='w-4 h-4 mr-2' />
                    Log Activity
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
