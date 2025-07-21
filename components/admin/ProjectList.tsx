'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Download,
  Share2,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  client: string;
  location: string;
  budget: number;
  start_date: string;
  end_date: string;
  progress: number;
  created_at: string;
  updated_at: string;
}

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onView: (project: Project) => void;
  onCreateNew: () => void;
  loading?: boolean;
}

export default function ProjectList({
  projects,
  onEdit,
  onDelete,
  onView,
  onCreateNew,
  loading = false,
}: ProjectListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const statusColors = {
    planning: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    'on-hold': 'bg-red-100 text-red-800',
  };

  const statusIcons = {
    planning: Clock,
    'in-progress': AlertCircle,
    completed: CheckCircle,
    'on-hold': AlertCircle,
  };

  const filteredProjects = projects
    .filter(project => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy as keyof Project];
      let bValue: any = b[sortBy as keyof Project];

      if (sortBy === 'budget') {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      } else if (sortBy === 'progress') {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSelectAll = () => {
    if (selectedProjects.length === filteredProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(filteredProjects.map(p => p.id));
    }
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className='bg-white border border-gray-200 rounded-lg p-6 animate-pulse'
          >
            <div className='flex items-center space-x-4'>
              <div className='w-12 h-12 bg-gray-200 rounded-lg'></div>
              <div className='flex-1 space-y-2'>
                <div className='h-4 bg-gray-200 rounded w-1/4'></div>
                <div className='h-3 bg-gray-200 rounded w-1/2'></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0'>
        <div>
          <h2 className='text-lg font-medium text-gray-900'>Projects</h2>
          <p className='text-sm text-gray-600'>
            {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
        <div className='flex items-center space-x-3'>
          <button
            onClick={onCreateNew}
            className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2'
          >
            <Plus className='w-4 h-4' />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className='bg-white border border-gray-200 rounded-lg p-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {/* Search */}
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <input
              type='text'
              placeholder='Search projects...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          >
            <option value='all'>All Status</option>
            <option value='planning'>Planning</option>
            <option value='in-progress'>In Progress</option>
            <option value='completed'>Completed</option>
            <option value='on-hold'>On Hold</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          >
            <option value='created_at'>Date Created</option>
            <option value='title'>Title</option>
            <option value='client'>Client</option>
            <option value='budget'>Budget</option>
            <option value='progress'>Progress</option>
            <option value='status'>Status</option>
          </select>

          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}
            className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          >
            <option value='desc'>Descending</option>
            <option value='asc'>Ascending</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedProjects.length > 0 && (
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <span className='text-sm font-medium text-blue-900'>
                {selectedProjects.length} project(s) selected
              </span>
              <button
                onClick={() => setSelectedProjects([])}
                className='text-sm text-blue-600 hover:text-blue-800'
              >
                Clear selection
              </button>
            </div>
            <div className='flex items-center space-x-2'>
              <button className='px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700'>
                Export
              </button>
              <button className='px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700'>
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className='space-y-4'>
        {filteredProjects.length === 0 ? (
          <div className='text-center py-12'>
            <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Search className='w-8 h-8 text-gray-400' />
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No projects found
            </h3>
            <p className='text-gray-600 mb-4'>
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first project'}
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <button
                onClick={onCreateNew}
                className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
              >
                Create First Project
              </button>
            )}
          </div>
        ) : (
          filteredProjects.map(project => {
            const StatusIcon = statusIcons[project.status];

            return (
              <div
                key={project.id}
                className='bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow'
              >
                <div className='flex items-start space-x-4'>
                  {/* Checkbox */}
                  <input
                    type='checkbox'
                    checked={selectedProjects.includes(project.id)}
                    onChange={() => handleSelectProject(project.id)}
                    className='mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                  />

                  {/* Project Info */}
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1 min-w-0'>
                        <h3 className='text-lg font-medium text-gray-900 truncate'>
                          {project.title}
                        </h3>
                        <p className='text-sm text-gray-600 mt-1 line-clamp-2'>
                          {project.description}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div
                        className={`ml-4 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${statusColors[project.status]}`}
                      >
                        <StatusIcon className='w-3 h-3' />
                        <span>{project.status.replace('-', ' ')}</span>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className='mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                      <div className='flex items-center space-x-2'>
                        <MapPin className='w-4 h-4 text-gray-400' />
                        <span className='text-gray-600'>
                          {project.location}
                        </span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <DollarSign className='w-4 h-4 text-gray-400' />
                        <span className='text-gray-600'>
                          {formatCurrency(project.budget)}
                        </span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Calendar className='w-4 h-4 text-gray-400' />
                        <span className='text-gray-600'>
                          {formatDate(project.start_date)}
                        </span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Clock className='w-4 h-4 text-gray-400' />
                        <span className='text-gray-600'>
                          {formatDate(project.end_date)}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className='mt-4'>
                      <div className='flex items-center justify-between text-sm mb-2'>
                        <span className='text-gray-600'>Progress</span>
                        <span className='font-medium'>{project.progress}%</span>
                      </div>
                      <div className='w-full bg-gray-200 rounded-full h-2'>
                        <div
                          className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className='mt-4 flex items-center justify-between'>
                      <div className='text-xs text-gray-500'>
                        Created {formatDate(project.created_at)}
                      </div>
                      <div className='flex items-center space-x-2'>
                        <button
                          onClick={() => onView(project)}
                          className='p-2 text-gray-400 hover:text-gray-600'
                          title='View project'
                        >
                          <Eye className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => onEdit(project)}
                          className='p-2 text-gray-400 hover:text-blue-600'
                          title='Edit project'
                        >
                          <Edit className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => onDelete(project.id)}
                          className='p-2 text-gray-400 hover:text-red-600'
                          title='Delete project'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                        <button className='p-2 text-gray-400 hover:text-gray-600'>
                          <MoreHorizontal className='w-4 h-4' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
