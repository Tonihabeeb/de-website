'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
} from 'lucide-react';
import ProjectAnalytics from '@/components/admin/ProjectAnalytics';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string;
}

export default function ProjectAnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);

      // Fetch project details
      const projectResponse = await fetch(`/api/admin/projects/${projectId}`);
      const projectData = await projectResponse.json();

      if (projectData.success) {
        setProject(projectData.project);
      } else {
        setError('Failed to load project');
      }
    } catch (err) {
      setError('Failed to load project data');
      console.error('Error fetching project data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 p-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='animate-pulse'>
            <div className='h-8 bg-gray-200 rounded w-1/4 mb-8'></div>
            <div className='h-96 bg-gray-200 rounded'></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className='min-h-screen bg-gray-50 p-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
            <div className='flex'>
              <div className='w-5 h-5 text-red-400 mr-2'>⚠️</div>
              <p className='text-red-800'>{error || 'Project not found'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <button
            onClick={() => router.back()}
            className='flex items-center text-gray-600 hover:text-gray-900 mb-4'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Project
          </button>

          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>
                {project.name} - Analytics
              </h1>
              <p className='text-gray-600 mt-2'>{project.description}</p>
            </div>

            <div className='flex items-center space-x-4 text-sm text-gray-500'>
              <div className='flex items-center'>
                <Calendar className='w-4 h-4 mr-1' />
                <span>
                  Start: {new Date(project.start_date).toLocaleDateString()}
                </span>
              </div>
              <div className='flex items-center'>
                <Calendar className='w-4 h-4 mr-1' />
                <span>
                  End: {new Date(project.end_date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Analytics Component */}
        <ProjectAnalytics projectId={projectId} />
      </div>
    </div>
  );
}
