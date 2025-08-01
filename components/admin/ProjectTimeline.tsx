'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react';

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

interface ProjectTimelineProps {
  projectId: string;
  milestones?: Milestone[];
  onMilestoneUpdate?: (
    milestoneId: string,
    updates: Partial<Milestone>
  ) => void;
  onMilestoneAdd?: (milestone: Omit<Milestone, 'id' | 'created_at'>) => void;
  onMilestoneDelete?: (milestoneId: string) => void;
  className?: string;
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({
  projectId,
  milestones = [],
  onMilestoneUpdate,
  onMilestoneAdd,
  onMilestoneDelete,
  className = '',
}) => {
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<string | null>(null);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'pending' as Milestone['status'],
    progress: 0,
    assigned_to: '',
  });

  const sortedMilestones = [...milestones].sort(
    (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
  );

  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className='w-5 h-5 text-green-500' />;
      case 'in-progress':
        return <Clock className='w-5 h-5 text-blue-500' />;
      case 'overdue':
        return <AlertCircle className='w-5 h-5 text-red-500' />;
      default:
        return <Circle className='w-5 h-5 text-gray-400' />;
    }
  };

  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'in-progress':
        return 'border-blue-500 bg-blue-50';
      case 'overdue':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleAddMilestone = () => {
    if (newMilestone.title && newMilestone.due_date) {
      onMilestoneAdd?.(newMilestone);
      setNewMilestone({
        title: '',
        description: '',
        due_date: '',
        status: 'pending',
        progress: 0,
        assigned_to: '',
      });
      setIsAddingMilestone(false);
    }
  };

  const handleUpdateMilestone = (
    milestoneId: string,
    updates: Partial<Milestone>
  ) => {
    onMilestoneUpdate?.(milestoneId, updates);
    setEditingMilestone(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = (dueDate: string) => {
    return (
      new Date(dueDate) < new Date() &&
      new Date(dueDate).getTime() !== new Date().setHours(0, 0, 0, 0)
    );
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      <div className='p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-lg font-semibold text-gray-900'>
            Project Timeline
          </h3>
          <button
            onClick={() => setIsAddingMilestone(true)}
            className='flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
          >
            <Plus className='w-4 h-4' />
            <span>Add Milestone</span>
          </button>
        </div>

        {/* Add Milestone Form */}
        {isAddingMilestone && (
          <div className='mb-6 p-4 bg-gray-50 rounded-lg border'>
            <h4 className='text-sm font-medium text-gray-900 mb-3'>
              Add New Milestone
            </h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Title
                </label>
                <input
                  type='text'
                  value={newMilestone.title}
                  onChange={e =>
                    setNewMilestone({ ...newMilestone, title: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Milestone title'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Due Date
                </label>
                <input
                  type='date'
                  value={newMilestone.due_date}
                  onChange={e =>
                    setNewMilestone({
                      ...newMilestone,
                      due_date: e.target.value,
                    })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div className='md:col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Description
                </label>
                <textarea
                  value={newMilestone.description}
                  onChange={e =>
                    setNewMilestone({
                      ...newMilestone,
                      description: e.target.value,
                    })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  rows={3}
                  placeholder='Milestone description'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Status
                </label>
                <select
                  value={newMilestone.status}
                  onChange={e =>
                    setNewMilestone({
                      ...newMilestone,
                      status: e.target.value as Milestone['status'],
                    })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='pending'>Pending</option>
                  <option value='in-progress'>In Progress</option>
                  <option value='completed'>Completed</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Progress (%)
                </label>
                <input
                  type='number'
                  min='0'
                  max='100'
                  value={newMilestone.progress}
                  onChange={e =>
                    setNewMilestone({
                      ...newMilestone,
                      progress: parseInt(e.target.value) || 0,
                    })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </div>
            <div className='flex items-center space-x-3 mt-4'>
              <button
                onClick={handleAddMilestone}
                className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
              >
                Add Milestone
              </button>
              <button
                onClick={() => setIsAddingMilestone(false)}
                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors'
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className='space-y-4'>
          {sortedMilestones.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
              <Calendar className='w-12 h-12 mx-auto mb-4 text-gray-300' />
              <p>No milestones yet</p>
              <p className='text-sm'>
                Add milestones to track project progress
              </p>
            </div>
          ) : (
            sortedMilestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className={`relative border-l-4 pl-6 pb-6 ${getStatusColor(milestone.status)}`}
              >
                {/* Timeline connector */}
                {index < sortedMilestones.length - 1 && (
                  <div className='absolute left-3 top-8 w-0.5 h-16 bg-gray-300'></div>
                )}

                <div className='flex items-start justify-between'>
                  <div className='flex items-start space-x-3 flex-1'>
                    <div className='flex-shrink-0 mt-1'>
                      {getStatusIcon(milestone.status)}
                    </div>

                    <div className='flex-1 min-w-0'>
                      {editingMilestone === milestone.id ? (
                        <div className='space-y-3'>
                          <input
                            type='text'
                            defaultValue={milestone.title}
                            className='w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            onBlur={e =>
                              handleUpdateMilestone(milestone.id, {
                                title: e.target.value,
                              })
                            }
                          />
                          <textarea
                            defaultValue={milestone.description}
                            className='w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            rows={2}
                            onBlur={e =>
                              handleUpdateMilestone(milestone.id, {
                                description: e.target.value,
                              })
                            }
                          />
                          <div className='flex items-center space-x-4'>
                            <input
                              type='date'
                              defaultValue={milestone.due_date}
                              className='px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                              onBlur={e =>
                                handleUpdateMilestone(milestone.id, {
                                  due_date: e.target.value,
                                })
                              }
                            />
                            <select
                              defaultValue={milestone.status}
                              className='px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                              onChange={e =>
                                handleUpdateMilestone(milestone.id, {
                                  status: e.target.value as Milestone['status'],
                                })
                              }
                            >
                              <option value='pending'>Pending</option>
                              <option value='in-progress'>In Progress</option>
                              <option value='completed'>Completed</option>
                            </select>
                            <input
                              type='number'
                              min='0'
                              max='100'
                              defaultValue={milestone.progress}
                              className='w-20 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                              onBlur={e =>
                                handleUpdateMilestone(milestone.id, {
                                  progress: parseInt(e.target.value) || 0,
                                })
                              }
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className='flex items-center justify-between'>
                            <h4 className='text-sm font-medium text-gray-900'>
                              {milestone.title}
                            </h4>
                            <div className='flex items-center space-x-2'>
                              <button
                                onClick={() =>
                                  setEditingMilestone(milestone.id)
                                }
                                className='p-1 text-gray-400 hover:text-gray-600'
                              >
                                <Edit className='w-4 h-4' />
                              </button>
                              <button
                                onClick={() =>
                                  onMilestoneDelete?.(milestone.id)
                                }
                                className='p-1 text-gray-400 hover:text-red-600'
                              >
                                <Trash2 className='w-4 h-4' />
                              </button>
                            </div>
                          </div>

                          {milestone.description && (
                            <p className='text-sm text-gray-600 mt-1'>
                              {milestone.description}
                            </p>
                          )}

                          <div className='flex items-center space-x-4 mt-2'>
                            <div className='flex items-center space-x-1 text-xs text-gray-500'>
                              <Calendar className='w-3 h-3' />
                              <span
                                className={
                                  isOverdue(milestone.due_date)
                                    ? 'text-red-600 font-medium'
                                    : ''
                                }
                              >
                                {formatDate(milestone.due_date)}
                                {isOverdue(milestone.due_date) && ' (Overdue)'}
                              </span>
                            </div>

                            {milestone.assigned_to && (
                              <span className='text-xs text-gray-500'>
                                Assigned to: {milestone.assigned_to}
                              </span>
                            )}
                          </div>

                          {/* Progress bar */}
                          <div className='mt-3'>
                            <div className='flex items-center justify-between text-xs text-gray-500 mb-1'>
                              <span>Progress</span>
                              <span>{milestone.progress}%</span>
                            </div>
                            <div className='w-full bg-gray-200 rounded-full h-2'>
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(milestone.progress)}`}
                                style={{ width: `${milestone.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;
