'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  X,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

interface ProjectFormData {
  title: string;
  description: string;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  start_date: string;
  end_date: string;
  budget: string;
  budget_currency: string;
  location: string;
  client_name: string;
  project_manager: string;
  team_members: string[];
  tags: string[];
  objectives: string;
  deliverables: string;
  risk_level: 'low' | 'medium' | 'high';
  budget_status: 'under_budget' | 'on_budget' | 'over_budget';
}

export default function NewProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<ProjectFormData>({
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
    team_members: [],
    tags: [],
    objectives: '',
    deliverables: '',
    risk_level: 'low',
    budget_status: 'on_budget',
  });

  const [newTag, setNewTag] = useState('');
  const [newTeamMember, setNewTeamMember] = useState('');

  const handleInputChange = (field: keyof ProjectFormData, value: any) => {
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
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
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
        setError(data.error || 'Failed to create project');
      }
    } catch (err) {
      setError('Error creating project');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
      router.push('/admin/projects');
    }
  };

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='mb-6'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Create New Project
            </h1>
            <p className="text-white">
              Set up a new project with all necessary details
            </p>
          </div>
          <div className='flex space-x-3'>
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-white"
            >
              <X className='w-4 h-4 mr-2' />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center text-white"
            >
              {loading ? (
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
              ) : (
                <Save className='w-4 h-4 mr-2' />
              )}
              {loading ? 'Creating...' : 'Create Project'}
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
              Project created successfully! Redirecting...
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
          <h2 className="text-lg font-semibold text-white">
            Basic Information
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className="block text-sm font-medium text-white">
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
              <label className="block text-sm font-medium text-white">
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
              <label className="block text-sm font-medium text-white">
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
              <label className="block text-sm font-medium text-white">
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
            <label className="block text-sm font-medium text-white">
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
          <h2 className="text-lg font-semibold text-white">
            <Calendar className='w-5 h-5 mr-2' />
            Timeline
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className="block text-sm font-medium text-white">
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
              <label className="block text-sm font-medium text-white">
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
          <h2 className="text-lg font-semibold text-white">
            <DollarSign className='w-5 h-5 mr-2' />
            Budget & Financials
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div>
              <label className="block text-sm font-medium text-white">
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
              <label className="block text-sm font-medium text-white">
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
              <label className="block text-sm font-medium text-white">
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
          <h2 className="text-lg font-semibold text-white">
            <Users className='w-5 h-5 mr-2' />
            Team & Stakeholders
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className="block text-sm font-medium text-white">
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
              <label className="block text-sm font-medium text-white">
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
            <label className="block text-sm font-medium text-white">
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
                className="px-4 py-2 bg-gradient-to-b from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 active:from-blue-900 active:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none transition-colors text-white"
              >
                Add
              </button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {formData.team_members.map((member, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 text-white"
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
          <h2 className="text-lg font-semibold text-white">
            <MapPin className='w-5 h-5 mr-2' />
            Location & Additional Details
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className="block text-sm font-medium text-white">
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
              <label className="block text-sm font-medium text-white">
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
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-white"
                  >
                    {tag}
                    <button
                      type='button'
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-gray-600 hover:text-white"
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
              <label className="block text-sm font-medium text-white">
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
              <label className="block text-sm font-medium text-white">
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
            className="px-6 py-2 border border-gray-300 rounded-lg text-white"
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors text-white"
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
}
