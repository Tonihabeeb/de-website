'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  AlertCircle,
} from 'lucide-react';
import ProjectTimeline from '@/components/admin/ProjectTimeline';

interface Milestone {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: 'completed' | 'in-progress' | 'pending' | 'overdue';
  progress: number;
  assigned_to?: string;
  created_at: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string;
}

export default function ProjectTimelinePage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
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
        return;
      }

      // For now, use mock milestones since we don't have the timeline API yet
      // TODO: Replace with actual API call to /api/admin/projects/[id]/timeline
      const mockMilestones: Milestone[] = [
        {
          id: '1',
          title: 'Project Planning',
          description:
            'Complete initial project planning and requirements gathering',
          due_date: '2024-12-20',
          status: 'completed',
          progress: 100,
          assigned_to: 'John Doe',
          created_at: '2024-12-01T00:00:00Z',
        },
        {
          id: '2',
          title: 'Design Phase',
          description: 'Create detailed design specifications and mockups',
          due_date: '2024-12-25',
          status: 'in-progress',
          progress: 75,
          assigned_to: 'Jane Smith',
          created_at: '2024-12-05T00:00:00Z',
        },
        {
          id: '3',
          title: 'Development Phase',
          description: 'Implement core functionality and features',
          due_date: '2025-01-15',
          status: 'pending',
          progress: 0,
          assigned_to: 'Mike Johnson',
          created_at: '2024-12-10T00:00:00Z',
        },
        {
          id: '4',
          title: 'Testing Phase',
          description: 'Comprehensive testing and quality assurance',
          due_date: '2025-01-30',
          status: 'pending',
          progress: 0,
          assigned_to: 'Sarah Wilson',
          created_at: '2024-12-15T00:00:00Z',
        },
        {
          id: '5',
          title: 'Deployment',
          description: 'Production deployment and go-live',
          due_date: '2025-02-15',
          status: 'pending',
          progress: 0,
          assigned_to: 'David Brown',
          created_at: '2024-12-20T00:00:00Z',
        },
      ];

      setMilestones(mockMilestones);
    } catch (err) {
      setError('Error fetching project data');
    } finally {
      setLoading(false);
    }
  };

  const handleMilestoneUpdate = async (
    milestoneId: string,
    updates: Partial<Milestone>
  ) => {
    try {
      // TODO: Implement actual API call to update milestone

      // For now, update local state
      setMilestones(prev =>
        prev.map(milestone =>
          milestone.id === milestoneId
            ? { ...milestone, ...updates }
            : milestone
        )
      );
    } catch (err) {
      setError('Error updating milestone');
    }
  };

  const handleMilestoneAdd = async (
    milestone: Omit<Milestone, 'id' | 'created_at'>
  ) => {
    try {
      // TODO: Implement actual API call to add milestone

      const newMilestone: Milestone = {
        ...milestone,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };

      setMilestones(prev => [...prev, newMilestone]);
    } catch (err) {
      setError('Error adding milestone');
    }
  };

  const handleMilestoneDelete = async (milestoneId: string) => {
    try {
      // TODO: Implement actual API call to delete milestone

      setMilestones(prev =>
        prev.filter(milestone => milestone.id !== milestoneId)
      );
    } catch (err) {
      setError('Error deleting milestone');
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
              <AlertCircle className='w-5 h-5 text-red-400 mr-2' />
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
            className="flex items-center text-gray-600 hover:text-white"
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Project
          </button>

          <div className='flex items-center justify-between'>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {project.name} - Timeline
              </h1>
              <p className="text-white">{project.description}</p>
            </div>

            <div className="flex items-center space-x-4 text-sm text-white">
              <div className='flex items-center'>
                <Calendar className='w-4 h-4 mr-1' />
                <span>
                  Start: {new Date(project.start_date).toLocaleDateString()}
                </span>
              </div>
              <div className='flex items-center'>
                <Clock className='w-4 h-4 mr-1' />
                <span>
                  End: {new Date(project.end_date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Status Summary */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className="text-sm text-white">Total Milestones</p>
                <p className="text-2xl font-bold text-white">
                  {milestones.length}
                </p>
              </div>
              <Calendar className='w-8 h-8 text-blue-400' />
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className="text-sm text-white">Completed</p>
                <p className='text-2xl font-bold text-green-600'>
                  {milestones.filter(m => m.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className='w-8 h-8 text-green-400' />
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className="text-sm text-white">In Progress</p>
                <p className='text-2xl font-bold text-blue-600'>
                  {milestones.filter(m => m.status === 'in-progress').length}
                </p>
              </div>
              <Clock className='w-8 h-8 text-blue-400' />
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className="text-sm text-white">Pending</p>
                <p className="text-2xl font-bold text-white">
                  {milestones.filter(m => m.status === 'pending').length}
                </p>
              </div>
              <Circle className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Timeline Component */}
        <ProjectTimeline
          projectId={projectId}
          milestones={milestones}
          onMilestoneUpdate={handleMilestoneUpdate}
          onMilestoneAdd={handleMilestoneAdd}
          onMilestoneDelete={handleMilestoneDelete}
        />
      </div>
    </div>
  );
}
