'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

interface ProjectStatus {
  id: string;
  name: string;
  location: string;
  capacity: string;
  status: 'planning' | 'construction' | 'commissioning' | 'operational';
  progress: number;
  startDate: string;
  completionDate: string;
  description: string;
  milestones: {
    id: string;
    title: string;
    date: string;
    completed: boolean;
    description: string;
  }[];
  updates: {
    id: string;
    date: string;
    title: string;
    description: string;
    type: 'milestone' | 'update' | 'photo';
  }[];
}

const projects: ProjectStatus[] = [
  {
    id: 'zakho',
    name: 'Zakho 100MW Project',
    location: 'Duhok Governorate',
    capacity: '100 MW',
    status: 'construction',
    progress: 65,
    startDate: '2024-01-15',
    completionDate: '2025-06-30',
    description:
      'Major KPP installation serving the Duhok region with clean, reliable power.',
    milestones: [
      {
        id: '1',
        title: 'Site Preparation',
        date: '2024-02-15',
        completed: true,
        description: 'Site cleared and foundation work completed',
      },
      {
        id: '2',
        title: 'Equipment Delivery',
        date: '2024-04-20',
        completed: true,
        description: 'All KPP components delivered to site',
      },
      {
        id: '3',
        title: 'Installation Phase 1',
        date: '2024-06-30',
        completed: true,
        description: 'First 25MW unit installed',
      },
      {
        id: '4',
        title: 'Installation Phase 2',
        date: '2024-09-15',
        completed: false,
        description: 'Second 25MW unit installation',
      },
      {
        id: '5',
        title: 'Installation Phase 3',
        date: '2024-12-01',
        completed: false,
        description: 'Third 25MW unit installation',
      },
      {
        id: '6',
        title: 'Installation Phase 4',
        date: '2025-02-15',
        completed: false,
        description: 'Final 25MW unit installation',
      },
      {
        id: '7',
        title: 'Commissioning',
        date: '2025-05-15',
        completed: false,
        description: 'System testing and commissioning',
      },
      {
        id: '8',
        title: 'Grid Connection',
        date: '2025-06-30',
        completed: false,
        description: 'Full operational status',
      },
    ],
    updates: [
      {
        id: '1',
        date: '2024-06-15',
        title: 'Phase 1 Complete',
        description: 'First 25MW unit successfully installed and tested',
        type: 'milestone',
      },
      {
        id: '2',
        date: '2024-05-20',
        title: 'Equipment Arrival',
        description: 'All major components delivered on schedule',
        type: 'update',
      },
      {
        id: '3',
        date: '2024-04-10',
        title: 'Foundation Complete',
        description: 'Site preparation and foundation work finished',
        type: 'milestone',
      },
    ],
  },
  {
    id: 'soran',
    name: 'Soran 100MW Project',
    location: 'Erbil Governorate',
    capacity: '100 MW',
    status: 'planning',
    progress: 25,
    startDate: '2024-08-01',
    completionDate: '2026-01-31',
    description:
      'Strategic KPP project for the Erbil region, supporting economic development.',
    milestones: [
      {
        id: '1',
        title: 'Environmental Assessment',
        date: '2024-07-15',
        completed: true,
        description: 'Environmental impact study completed',
      },
      {
        id: '2',
        title: 'Permit Approval',
        date: '2024-08-01',
        completed: true,
        description: 'All regulatory permits obtained',
      },
      {
        id: '3',
        title: 'Site Survey',
        date: '2024-09-15',
        completed: false,
        description: 'Detailed site survey and planning',
      },
      {
        id: '4',
        title: 'Construction Start',
        date: '2024-11-01',
        completed: false,
        description: 'Site preparation begins',
      },
      {
        id: '5',
        title: 'Equipment Installation',
        date: '2025-03-01',
        completed: false,
        description: 'KPP system installation',
      },
      {
        id: '6',
        title: 'Testing Phase',
        date: '2025-11-01',
        completed: false,
        description: 'System testing and validation',
      },
      {
        id: '7',
        title: 'Commissioning',
        date: '2025-12-15',
        completed: false,
        description: 'Final commissioning and handover',
      },
    ],
    updates: [
      {
        id: '1',
        date: '2024-08-01',
        title: 'Project Approved',
        description: 'All permits and approvals received',
        type: 'milestone',
      },
      {
        id: '2',
        date: '2024-07-20',
        title: 'Environmental Clearance',
        description: 'Environmental assessment completed successfully',
        type: 'update',
      },
    ],
  },
  {
    id: 'raparin',
    name: 'Raparin 50MW Project',
    location: 'Sulaymaniyah Governorate',
    capacity: '50 MW',
    status: 'commissioning',
    progress: 85,
    startDate: '2023-09-01',
    completionDate: '2024-08-31',
    description:
      'Medium-scale KPP installation providing reliable power to Sulaymaniyah.',
    milestones: [
      {
        id: '1',
        title: 'Site Preparation',
        date: '2023-10-15',
        completed: true,
        description: 'Site cleared and prepared',
      },
      {
        id: '2',
        title: 'Equipment Installation',
        date: '2024-02-01',
        completed: true,
        description: 'All KPP units installed',
      },
      {
        id: '3',
        title: 'System Testing',
        date: '2024-06-15',
        completed: true,
        description: 'Initial system testing completed',
      },
      {
        id: '4',
        title: 'Grid Integration',
        date: '2024-07-15',
        completed: false,
        description: 'Grid connection and synchronization',
      },
      {
        id: '5',
        title: 'Final Commissioning',
        date: '2024-08-31',
        completed: false,
        description: 'Full operational status',
      },
    ],
    updates: [
      {
        id: '1',
        date: '2024-06-20',
        title: 'Testing Complete',
        description: 'All system tests passed successfully',
        type: 'milestone',
      },
      {
        id: '2',
        date: '2024-05-15',
        title: 'Installation Finished',
        description: 'All 50MW capacity installed',
        type: 'milestone',
      },
      {
        id: '3',
        date: '2024-04-01',
        title: 'Equipment Testing',
        description: 'Individual component testing in progress',
        type: 'update',
      },
    ],
  },
];

const statusColors = {
  planning: 'bg-blue-500',
  construction: 'bg-yellow-500',
  commissioning: 'bg-orange-500',
  operational: 'bg-green-500',
};

const statusLabels = {
  planning: 'Planning',
  construction: 'Construction',
  commissioning: 'Commissioning',
  operational: 'Operational',
};

export default function ProjectTracker() {
  const [selectedProject, setSelectedProject] = useState<ProjectStatus>(
    projects[0]
  );
  const [activeTab, setActiveTab] = useState<
    'overview' | 'timeline' | 'updates'
  >('overview');

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className='bg-white rounded-lg shadow-lg p-8'>
      <div className='text-center mb-8'>
        <h2 className='text-2xl font-bold text-primary mb-4'>
          Project Status Tracker
        </h2>
        <p className='text-gray-600'>
          Track the real-time progress of our KPP projects across Iraq with
          detailed timelines and updates.
        </p>
      </div>

      {/* Project Selector */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        {projects.map(project => (
          <button
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 touch-target min-w-[44px] min-h-[44px] ${
              selectedProject.id === project.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            <div className='text-left'>
              <h3 className='font-semibold text-gray-800 mb-1'>
                {project.name}
              </h3>
              <p className='text-sm text-gray-600 mb-2'>{project.location}</p>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-700'>
                  {project.capacity}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium text-white ${statusColors[project.status]}`}
                >
                  {statusLabels[project.status]}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Project Details */}
      <div className='bg-gray-50 rounded-lg p-4 md:p-6 mb-8'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
          <div>
            <h3 className='text-xl font-bold text-gray-800 mb-2'>
              {selectedProject.name}
            </h3>
            <p className='text-gray-600 mb-2'>{selectedProject.description}</p>
            <div className='flex items-center gap-4 text-sm text-gray-600'>
              <span>📍 {selectedProject.location}</span>
              <span>
                <Zap className='w-4 h-4 inline mr-1' />{' '}
                {selectedProject.capacity}
              </span>
              <span>
                📅{' '}
                {new Date(selectedProject.completionDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className='mt-4 md:mt-0'>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium text-white ${statusColors[selectedProject.status]}`}
            >
              {statusLabels[selectedProject.status]}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className='mb-4'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm font-medium text-gray-700'>
              Overall Progress
            </span>
            <span className='text-sm font-bold text-gray-800'>
              {selectedProject.progress}%
            </span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-3'>
            <div
              className={`h-3 rounded-full transition-all duration-1000 ${getProgressColor(selectedProject.progress)}`}
              style={{ width: `${selectedProject.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex border-b border-gray-200 mb-6'>
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'timeline', label: 'Timeline' },
          { id: 'updates', label: 'Updates' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h4 className='font-semibold text-gray-800 mb-4'>
              Project Summary
            </h4>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Start Date:</span>
                <span className='font-medium'>
                  {new Date(selectedProject.startDate).toLocaleDateString()}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Completion Date:</span>
                <span className='font-medium'>
                  {new Date(
                    selectedProject.completionDate
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Capacity:</span>
                <span className='font-medium'>{selectedProject.capacity}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Status:</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium text-white ${statusColors[selectedProject.status]}`}
                >
                  {statusLabels[selectedProject.status]}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className='font-semibold text-gray-800 mb-4'>Recent Updates</h4>
            <div className='space-y-3'>
              {selectedProject.updates.slice(0, 3).map(update => (
                <div
                  key={update.id}
                  className='p-3 bg-white rounded-lg border border-gray-200'
                >
                  <div className='flex justify-between items-start mb-1'>
                    <span className='font-medium text-gray-800'>
                      {update.title}
                    </span>
                    <span className='text-xs text-gray-600'>
                      {new Date(update.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className='text-sm text-gray-600'>{update.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className='space-y-6'>
          {selectedProject.milestones.map((milestone, index) => (
            <div key={milestone.id} className='flex items-start gap-4'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                  milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                {milestone.completed ? '✓' : index + 1}
              </div>
              <div className='flex-1'>
                <div className='flex justify-between items-start mb-2'>
                  <h4 className='font-semibold text-gray-800'>
                    {milestone.title}
                  </h4>
                  <span className='text-sm text-gray-600'>
                    {new Date(milestone.date).toLocaleDateString()}
                  </span>
                </div>
                <p className='text-gray-600 text-sm'>{milestone.description}</p>
                {milestone.completed && (
                  <span className='inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded'>
                    Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'updates' && (
        <div className='space-y-4'>
          {selectedProject.updates.map(update => (
            <div
              key={update.id}
              className='p-4 bg-white rounded-lg border border-gray-200'
            >
              <div className='flex justify-between items-start mb-2'>
                <h4 className='font-semibold text-gray-800'>{update.title}</h4>
                <span className='text-sm text-gray-600'>
                  {new Date(update.date).toLocaleDateString()}
                </span>
              </div>
              <p className='text-gray-600 mb-2'>{update.description}</p>
              <span
                className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  update.type === 'milestone'
                    ? 'bg-green-100 text-green-800'
                    : update.type === 'photo'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                }`}
              >
                {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className='mt-8 text-center bg-primary text-white rounded-lg p-6'>
        <h3 className='text-xl font-semibold mb-2'>Stay Updated</h3>
        <p className='mb-4'>
          Get real-time updates on project progress and important milestones
          delivered to your inbox.
        </p>
        <button className='bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors'>
          Subscribe to Updates
        </button>
      </div>
    </div>
  );
}
