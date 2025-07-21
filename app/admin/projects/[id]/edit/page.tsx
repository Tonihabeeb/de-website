'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Save,
  X,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  start_date: string;
  end_date: string;
  budget: number;
  budget_currency: string;
  location: string;
  client_name: string;
  project_manager: string;
  team_members: string;
  tags: string;
  objectives: string;
  deliverables: string;
  risk_level: string;
  budget_status: string;
  created_at: string;
  updated_at: string;
}

export default function EditProject() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [project, setProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'planning',
    priority: 'medium',
    start_date: '',
    end_date: '',
    budget: '',
    budget_currency: 'USD',
    location: '',
    client_name: '',
    project_manager: '',
    team_members: [] as string[],
    tags: [] as string[],
    objectives: '',
    deliverables: '',
    risk_level: 'low',
    budget_status: 'on_budget',
  });

  const [newTag, setNewTag] = useState('');
  const [newTeamMember, setNewTeamMember] = useState('');

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/projects/${projectId}`);
      const data = await response.json();

      if (data.success) {
        const projectData = data.project;
        setProject(projectData);

        // Format dates for input fields
        const startDate = projectData.start_date
          ? new Date(projectData.start_date).toISOString().split('T')[0]
          : '';
        const endDate = projectData.end_date
          ? new Date(projectData.end_date).toISOString().split('T')[0]
          : '';

        setFormData({
          title: projectData.title || '',
          description: projectData.description || '',
          status: projectData.status || 'planning',
          priority: projectData.priority || 'medium',
          start_date: startDate,
          end_date: endDate,
          budget: projectData.budget?.toString() || '',
          budget_currency: projectData.budget_currency || 'USD',
          location: projectData.location || '',
          client_name: projectData.client_name || '',
          project_manager: projectData.project_manager || '',
          team_members: projectData.team_members
            ? projectData.team_members.split(',').filter(Boolean)
            : [],
          tags: projectData.tags
            ? projectData.tags.split(',').filter(Boolean)
            : [],
          objectives: projectData.objectives || '',
          deliverables: projectData.deliverables || '',
          risk_level: projectData.risk_level || 'low',
          budget_status: projectData.budget_status || 'on_budget',
        });
      } else {
        setError('Project not found');
      }
    } catch (err) {
      setError('Failed to load project');
      console.error('Error fetching project:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange('tags', [...formData.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleInputChange(
      'tags',
      formData.tags.filter(tag => tag !== tagToRemove)
    );
  };

  const addTeamMember = () => {
    if (
      newTeamMember.trim() &&
      !formData.team_members.includes(newTeamMember.trim())
    ) {
      handleInputChange('team_members', [
        ...formData.team_members,
        newTeamMember.trim(),
      ]);
      setNewTeamMember('');
    }
  };

  const removeTeamMember = (memberToRemove: string) => {
    handleInputChange(
      'team_members',
      formData.team_members.filter(member => member !== memberToRemove)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          budget: parseFloat(formData.budget) || 0,
          team_members: formData.team_members.join(','),
          tags: formData.tags.join(','),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/projects');
        }, 2000);
      } else {
        setError(data.error || 'Failed to update project');
      }
    } catch (err) {
      setError('Failed to update project');
      console.error('Error updating project:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
      router.push('/admin/projects');
    }
  };

  if (loading) {
    return (
      <div className='p-6'>
        <div className='flex items-center justify-center h-64'>
          <Loader2 className='w-8 h-8 animate-spin text-blue-600' />
          <span className='ml-2 text-gray-600'>Loading project...</span>
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
            <h1 className='text-2xl font-bold text-gray-900'>Edit Project</h1>
            <p className='text-gray-600 mt-1'>
              Update project details and configuration
            </p>
            {project && (
              <p className='text-sm text-gray-500 mt-1'>
                Last updated:{' '}
                {new Date(project.updated_at).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className='flex space-x-3'>
            <button
              onClick={handleCancel}
              className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center'
            >
              <X className='w-4 h-4 mr-2' />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className='px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center'
            >
              {saving ? (
                <Loader2 className='w-4 h-4 animate-spin mr-2' />
              ) : (
                <Save className='w-4 h-4 mr-2' />
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className='mb-6 bg-green-50 border border-green-200 rounded-lg p-4'>
          <div className='flex items-center'>
            <CheckCircle className='w-5 h-5 text-green-400 mr-2' />
            <span className='text-green-800'>
              Project updated successfully! Redirecting...
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

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>
            Basic Information
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Project Title *
              </label>
              <input
                type='text'
                required
                value={formData.title}
                onChange={e => handleInputChange('title', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Enter project title'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Status
              </label>
              <select
                value={formData.status}
                onChange={e => handleInputChange('status', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value='planning'>Planning</option>
                <option value='active'>Active</option>
                <option value='on_hold'>On Hold</option>
                <option value='completed'>Completed</option>
                <option value='cancelled'>Cancelled</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={e => handleInputChange('priority', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
                <option value='critical'>Critical</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Risk Level
              </label>
              <select
                value={formData.risk_level}
                onChange={e => handleInputChange('risk_level', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>
            </div>
          </div>

          <div className='mt-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={e => handleInputChange('description', e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Describe the project...'
            />
          </div>
        </div>

        {/* Timeline */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
            <Calendar className='w-5 h-5 mr-2' />
            Timeline
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Start Date
              </label>
              <input
                type='date'
                value={formData.start_date}
                onChange={e => handleInputChange('start_date', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                End Date
              </label>
              <input
                type='date'
                value={formData.end_date}
                onChange={e => handleInputChange('end_date', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
            <DollarSign className='w-5 h-5 mr-2' />
            Budget & Financials
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Budget Amount
              </label>
              <input
                type='number'
                step='0.01'
                value={formData.budget}
                onChange={e => handleInputChange('budget', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='0.00'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Currency
              </label>
              <select
                value={formData.budget_currency}
                onChange={e =>
                  handleInputChange('budget_currency', e.target.value)
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
                <option value='GBP'>GBP</option>
                <option value='CAD'>CAD</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Budget Status
              </label>
              <select
                value={formData.budget_status}
                onChange={e =>
                  handleInputChange('budget_status', e.target.value)
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value='under_budget'>Under Budget</option>
                <option value='on_budget'>On Budget</option>
                <option value='over_budget'>Over Budget</option>
              </select>
            </div>
          </div>
        </div>

        {/* Team & Stakeholders */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
            <Users className='w-5 h-5 mr-2' />
            Team & Stakeholders
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Client Name
              </label>
              <input
                type='text'
                value={formData.client_name}
                onChange={e => handleInputChange('client_name', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Enter client name'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Project Manager
              </label>
              <input
                type='text'
                value={formData.project_manager}
                onChange={e =>
                  handleInputChange('project_manager', e.target.value)
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Enter project manager name'
              />
            </div>
          </div>

          <div className='mt-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Team Members
            </label>
            <div className='flex gap-2 mb-2'>
              <input
                type='text'
                value={newTeamMember}
                onChange={e => setNewTeamMember(e.target.value)}
                onKeyPress={e =>
                  e.key === 'Enter' && (e.preventDefault(), addTeamMember())
                }
                className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Add team member'
              />
              <button
                type='button'
                onClick={addTeamMember}
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
              >
                Add
              </button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {formData.team_members.map((member, index) => (
                <span
                  key={index}
                  className='inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800'
                >
                  {member}
                  <button
                    type='button'
                    onClick={() => removeTeamMember(member)}
                    className='ml-2 text-blue-600 hover:text-blue-800'
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Location & Details */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
            <MapPin className='w-5 h-5 mr-2' />
            Location & Additional Details
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Location
              </label>
              <input
                type='text'
                value={formData.location}
                onChange={e => handleInputChange('location', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Enter project location'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Tags
              </label>
              <div className='flex gap-2 mb-2'>
                <input
                  type='text'
                  value={newTag}
                  onChange={e => setNewTag(e.target.value)}
                  onKeyPress={e =>
                    e.key === 'Enter' && (e.preventDefault(), addTag())
                  }
                  className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='Add tag'
                />
                <button
                  type='button'
                  onClick={addTag}
                  className='px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'
                >
                  Add
                </button>
              </div>
              <div className='flex flex-wrap gap-2'>
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className='inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800'
                  >
                    {tag}
                    <button
                      type='button'
                      onClick={() => removeTag(tag)}
                      className='ml-2 text-gray-600 hover:text-gray-800'
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Project Objectives
              </label>
              <textarea
                rows={4}
                value={formData.objectives}
                onChange={e => handleInputChange('objectives', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Define project objectives...'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Deliverables
              </label>
              <textarea
                rows={4}
                value={formData.deliverables}
                onChange={e =>
                  handleInputChange('deliverables', e.target.value)
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='List project deliverables...'
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className='flex justify-end space-x-3'>
          <button
            type='button'
            onClick={handleCancel}
            className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={saving}
            className='px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors'
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
