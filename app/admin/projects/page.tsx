'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Copy, 
  Calendar,
  MapPin,
  DollarSign,
  Filter,
  MoreVertical
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: string;
  capacity_mw?: number;
  location?: string;
  start_date?: string;
  end_date?: string;
  budget?: number;
  budget_currency?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      const response = await fetch('/api/admin/projects?limit=1000', {
        headers
      });
      
      if (!response.ok) {
        if (response.status === 403) {
          setError('Access denied. Please check your permissions.');
        } else if (response.status === 401) {
          setError('Authentication required. Please log in again.');
        } else {
          setError(`Failed to load projects: ${response.statusText}`);
        }
        return;
      }
      
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.projects || []);
      } else {
        setError(data.error || 'Failed to load projects');
      }
    } catch (err) {
      setError('Failed to load projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchProjects();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      const response = await fetch(`/api/admin/projects/search?q=${encodeURIComponent(searchTerm)}`, {
        headers
      });
      
      if (!response.ok) {
        setError('Search failed');
        return;
      }
      
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.projects || []);
      } else {
        setError('Search failed');
      }
    } catch (err) {
      setError('Search failed');
      console.error('Error searching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'DELETE',
        headers
      });

      const data = await response.json();
      if (data.success) {
        fetchProjects(); // Refresh the list
        alert('Project deleted successfully!');
      } else {
        alert('Failed to delete project: ' + data.error);
      }
    } catch (err) {
      alert('Failed to delete project');
      console.error('Error deleting project:', err);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (project.location && project.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      planning: { color: 'bg-blue-100 text-blue-800', label: 'Planning' },
      'in-progress': { color: 'bg-yellow-100 text-yellow-800', label: 'In Progress' },
      completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.planning;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects Management</h1>
            <p className="text-gray-600 mt-1">Manage your engineering projects and timelines</p>
          </div>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Link>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              onClick={handleSearch}
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={fetchProjects}
                  className="text-sm font-medium text-red-800 hover:text-red-900 underline"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500">
              <p className="text-lg font-medium">No projects found.</p>
              <p className="mt-1">Get started by creating your first project.</p>
              <Link
                href="/admin/projects/new"
                className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500"
              >
                <Plus className="w-4 h-4 mr-1" />
                Create your first project
              </Link>
            </div>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                  </div>
                  <div className="ml-4">
                    {getStatusBadge(project.status)}
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {project.location && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {project.location}
                    </div>
                  )}
                  {project.capacity_mw && (
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-4 h-4 mr-2 bg-blue-100 rounded flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">MW</span>
                      </div>
                      {project.capacity_mw} MW
                    </div>
                  )}
                  {project.budget && (
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {project.budget.toLocaleString()} {project.budget_currency || 'USD'}
                    </div>
                  )}
                  {project.start_date && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(project.start_date).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    Created {new Date(project.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="text-blue-600 hover:text-blue-900 p-1"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="text-green-600 hover:text-green-900 p-1"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600 hover:text-red-900 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 