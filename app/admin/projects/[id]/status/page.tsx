'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Play,
  Pause,
  Save,
  ArrowLeft,
  Loader2,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  status: string;
  priority: string;
  risk_level: string;
  budget_status: string;
  budget_currency?: string;
  start_date: string;
  end_date: string;
  budget: number;
  created_at: string;
  updated_at: string;
}

interface StatusUpdate {
  id: string;
  status: string;
  notes: string;
  created_at: string;
  created_by: string;
}

export default function ProjectStatusManagement() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [statusHistory, setStatusHistory] = useState<StatusUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [newStatus, setNewStatus] = useState({
    status: '',
    notes: '',
  });

  useEffect(() => {
    if (projectId) {
      fetchProject();
      fetchStatusHistory();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${projectId}`);
      const data = await response.json();

      if (data.success) {
        setProject(data.project);
        setNewStatus(prev => ({ ...prev, status: data.project.status }));
      } else {
        setError('Project not found');
      }
    } catch (err) {
      setError('Failed to load project');
      console.error('Error fetching project:', err);
    }
  };

  const fetchStatusHistory = async () => {
    try {
      setLoading(true);
      // This would typically come from a status history API
      // For now, we'll simulate it
      const mockHistory: StatusUpdate[] = [
        {
          id: '1',
          status: 'planning',
          notes: 'Project initiated and planning phase started',
          created_at: new Date(
            Date.now() - 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
          created_by: 'admin',
        },
        {
          id: '2',
          status: 'active',
          notes: 'Project moved to active development phase',
          created_at: new Date(
            Date.now() - 3 * 24 * 60 * 60 * 1000
          ).toISOString(),
          created_by: 'admin',
        },
      ];
      setStatusHistory(mockHistory);
    } catch (err) {
      console.error('Error fetching status history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatus.status || !newStatus.notes) return;

    try {
      setSaving(true);
      const response = await fetch(`/api/admin/projects/${projectId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus.status,
          notes: newStatus.notes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        fetchProject();
        fetchStatusHistory();
        setNewStatus({ status: newStatus.status, notes: '' });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error || 'Failed to update status');
      }
    } catch (err) {
      setError('Failed to update status');
      console.error('Error updating status:', err);
    } finally {
      setSaving(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className='w-6 h-6 text-green-500' />;
      case 'active':
        return <Play className='w-6 h-6 text-blue-500' />;
      case 'on_hold':
        return <Pause className='w-6 h-6 text-yellow-500' />;
      case 'cancelled':
        return <XCircle className='w-6 h-6 text-red-500' />;
      default:
        return <Clock className='w-6 h-6 text-gray-500' />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBudgetTrend = (status: string) => {
    switch (status) {
      case 'under_budget':
        return <TrendingDown className='w-4 h-4 text-green-500' />;
      case 'over_budget':
        return <TrendingUp className='w-4 h-4 text-red-500' />;
      default:
        return <Minus className='w-4 h-4 text-gray-500' />;
    }
  };

  if (loading) {
    return (
      <div className='p-6'>
        <div className='flex items-center justify-center h-64'>
          <Loader2 className='w-8 h-8 animate-spin text-blue-600' />
          <span className='ml-2 text-gray-600'>Loading project status...</span>
        </div>
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className='p-6'>
        <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
          <div className='flex items-center'>
            <AlertCircle className='w-5 h-5 text-red-400 mr-2' />
            <span className='text-red-800'>{error}</span>
          </div>
          <button
            onClick={() => router.push('/admin/projects')}
            className='mt-4 text-blue-600 hover:text-blue-800'
          >
            Back to Projects
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
            <h1 className='text-2xl font-bold text-gray-900'>
              Project Status Management
            </h1>
            <p className='text-gray-600 mt-1'>
              {project?.title} - Monitor and update project status
            </p>
          </div>
          <button
            onClick={() => router.push(`/admin/projects/${projectId}`)}
            className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Project
          </button>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className='mb-6 bg-green-50 border border-green-200 rounded-lg p-4'>
          <div className='flex items-center'>
            <CheckCircle className='w-5 h-5 text-green-400 mr-2' />
            <span className='text-green-800'>
              Project status updated successfully!
            </span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className='mb-6 bg-red-50 border border-red-200 rounded-lg p-4'>
          <div className='flex items-center'>
            <AlertCircle className='w-5 h-5 text-red-400 mr-2' />
            <span className='text-red-800'>{error}</span>
          </div>
        </div>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Current Status */}
        <div className='lg:col-span-2'>
          <div className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>
              Current Status
            </h2>

            {project && (
              <div className='space-y-4'>
                <div className='flex items-center space-x-4'>
                  {getStatusIcon(project.status)}
                  <div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}
                    >
                      {project.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <h3 className='text-sm font-medium text-gray-700 mb-2'>
                      Priority
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}
                    >
                      {project.priority.toUpperCase()}
                    </span>
                  </div>

                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <h3 className='text-sm font-medium text-gray-700 mb-2'>
                      Risk Level
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(project.risk_level)}`}
                    >
                      {project.risk_level.toUpperCase()}
                    </span>
                  </div>

                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <h3 className='text-sm font-medium text-gray-700 mb-2'>
                      Budget Status
                    </h3>
                    <div className='flex items-center space-x-1'>
                      {getBudgetTrend(project.budget_status)}
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBudgetColor(project.budget_status)}`}
                      >
                        {project.budget_status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <h3 className='text-sm font-medium text-gray-700 mb-2'>
                      Timeline
                    </h3>
                    <div className='text-sm text-gray-600'>
                      <p>
                        Start:{' '}
                        {project.start_date
                          ? new Date(project.start_date).toLocaleDateString()
                          : 'Not set'}
                      </p>
                      <p>
                        End:{' '}
                        {project.end_date
                          ? new Date(project.end_date).toLocaleDateString()
                          : 'Not set'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className='text-sm font-medium text-gray-700 mb-2'>
                      Budget
                    </h3>
                    <div className='text-sm text-gray-600'>
                      <p>
                        {project.budget_currency}{' '}
                        {project.budget?.toLocaleString() || '0'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Status Update Form */}
          <div className='bg-white rounded-lg shadow p-6 mt-6'>
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>
              Update Status
            </h2>

            <form onSubmit={handleStatusUpdate} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  New Status
                </label>
                <select
                  value={newStatus.status}
                  onChange={e =>
                    setNewStatus(prev => ({ ...prev, status: e.target.value }))
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  required
                >
                  <option value=''>Select status</option>
                  <option value='planning'>Planning</option>
                  <option value='active'>Active</option>
                  <option value='on_hold'>On Hold</option>
                  <option value='completed'>Completed</option>
                  <option value='cancelled'>Cancelled</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Status Notes
                </label>
                <textarea
                  rows={3}
                  value={newStatus.notes}
                  onChange={e =>
                    setNewStatus(prev => ({ ...prev, notes: e.target.value }))
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='Explain the status change...'
                  required
                />
              </div>

              <div className='flex justify-end'>
                <button
                  type='submit'
                  disabled={saving || !newStatus.status || !newStatus.notes}
                  className='px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center'
                >
                  {saving ? (
                    <Loader2 className='w-4 h-4 animate-spin mr-2' />
                  ) : (
                    <Save className='w-4 h-4 mr-2' />
                  )}
                  {saving ? 'Updating...' : 'Update Status'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Status History */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>
            Status History
          </h2>

          <div className='space-y-4'>
            {statusHistory.map((update, index) => (
              <div key={update.id} className='border-l-4 border-blue-500 pl-4'>
                <div className='flex items-center justify-between mb-2'>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(update.status)}`}
                  >
                    {update.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className='text-xs text-gray-500'>
                    {new Date(update.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className='text-sm text-gray-600 mb-1'>{update.notes}</p>
                <p className='text-xs text-gray-500'>by {update.created_by}</p>
              </div>
            ))}

            {statusHistory.length === 0 && (
              <div className='text-center py-4'>
                <Clock className='w-8 h-8 text-gray-400 mx-auto mb-2' />
                <p className='text-sm text-gray-500'>No status history yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for budget color
function getBudgetColor(status: string) {
  switch (status) {
    case 'under_budget':
      return 'bg-green-100 text-green-800';
    case 'over_budget':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
