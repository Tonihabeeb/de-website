'use client';

import { useState, useEffect } from 'react';
import {
  Save,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  FileText,
  Image,
  Link,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';

interface ProjectFormData {
  title: string;
  description: string;
  client: string;
  location: string;
  budget: number;
  start_date: string;
  end_date: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  team_members: string[];
  technologies: string[];
  objectives: string[];
  risks: string[];
  attachments: File[];
}

interface ProjectFormProps {
  project?: Partial<ProjectFormData>;
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
  loading?: boolean;
  isEdit?: boolean;
}

export default function ProjectForm({
  project,
  onSubmit,
  onCancel,
  loading = false,
  isEdit = false,
}: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: project?.title || '',
    description: project?.description || '',
    client: project?.client || '',
    location: project?.location || '',
    budget: project?.budget || 0,
    start_date: project?.start_date || '',
    end_date: project?.end_date || '',
    status: project?.status || 'planning',
    progress: project?.progress || 0,
    team_members: project?.team_members || [],
    technologies: project?.technologies || [],
    objectives: project?.objectives || [],
    risks: project?.risks || [],
    attachments: project?.attachments || [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<
    'details' | 'team' | 'objectives' | 'risks' | 'attachments'
  >('details');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }

    if (!formData.client.trim()) {
      newErrors.client = 'Client name is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Project location is required';
    }

    if (formData.budget <= 0) {
      newErrors.budget = 'Budget must be greater than 0';
    }

    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required';
    }

    if (!formData.end_date) {
      newErrors.end_date = 'End date is required';
    }

    if (
      formData.start_date &&
      formData.end_date &&
      new Date(formData.start_date) > new Date(formData.end_date)
    ) {
      newErrors.end_date = 'End date must be after start date';
    }

    if (formData.progress < 0 || formData.progress > 100) {
      newErrors.progress = 'Progress must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addArrayItem = (field: keyof ProjectFormData, value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()],
      }));
    }
  };

  const removeArrayItem = (field: keyof ProjectFormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles],
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'on-hold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='max-w-4xl mx-auto'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>
            {isEdit ? 'Edit Project' : 'Create New Project'}
          </h2>
          <p className='text-gray-600 mt-1'>
            {isEdit
              ? 'Update project information and settings'
              : 'Add a new project to your portfolio'}
          </p>
        </div>
        <div className='flex items-center space-x-3'>
          <button
            onClick={onCancel}
            className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50'
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2'
          >
            <Save className='w-4 h-4' />
            <span>{loading ? 'Saving...' : 'Save Project'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className='border-b border-gray-200 mb-6'>
        <nav className='-mb-px flex space-x-8'>
          {[
            { id: 'details', label: 'Project Details', icon: FileText },
            { id: 'team', label: 'Team & Tech', icon: Users },
            { id: 'objectives', label: 'Objectives', icon: CheckCircle },
            { id: 'risks', label: 'Risks', icon: AlertCircle },
            { id: 'attachments', label: 'Attachments', icon: Image },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className='w-4 h-4' />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Project Details Tab */}
        {activeTab === 'details' && (
          <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Project Title *
                </label>
                <input
                  type='text'
                  id='title'
                  value={formData.title}
                  onChange={e => handleInputChange('title', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder='Enter project title...'
                />
                {errors.title && (
                  <p className='mt-1 text-sm text-red-600'>{errors.title}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='client'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Client *
                </label>
                <input
                  type='text'
                  id='client'
                  value={formData.client}
                  onChange={e => handleInputChange('client', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.client ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder='Enter client name...'
                />
                {errors.client && (
                  <p className='mt-1 text-sm text-red-600'>{errors.client}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='location'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Location *
                </label>
                <div className='relative'>
                  <MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                  <input
                    type='text'
                    id='location'
                    value={formData.location}
                    onChange={e =>
                      handleInputChange('location', e.target.value)
                    }
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.location ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder='Enter project location...'
                  />
                </div>
                {errors.location && (
                  <p className='mt-1 text-sm text-red-600'>{errors.location}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='budget'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Budget *
                </label>
                <div className='relative'>
                  <DollarSign className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                  <input
                    type='number'
                    id='budget'
                    value={formData.budget}
                    onChange={e =>
                      handleInputChange(
                        'budget',
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.budget ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder='0'
                    min='0'
                    step='1000'
                  />
                </div>
                {errors.budget && (
                  <p className='mt-1 text-sm text-red-600'>{errors.budget}</p>
                )}
                <p className='mt-1 text-sm text-gray-500'>
                  {formatCurrency(formData.budget)}
                </p>
              </div>

              <div>
                <label
                  htmlFor='start_date'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Start Date *
                </label>
                <div className='relative'>
                  <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                  <input
                    type='date'
                    id='start_date'
                    value={formData.start_date}
                    onChange={e =>
                      handleInputChange('start_date', e.target.value)
                    }
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.start_date ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.start_date && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.start_date}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='end_date'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  End Date *
                </label>
                <div className='relative'>
                  <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                  <input
                    type='date'
                    id='end_date'
                    value={formData.end_date}
                    onChange={e =>
                      handleInputChange('end_date', e.target.value)
                    }
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.end_date ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.end_date && (
                  <p className='mt-1 text-sm text-red-600'>{errors.end_date}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='status'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Status
                </label>
                <select
                  id='status'
                  value={formData.status}
                  onChange={e => handleInputChange('status', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value='planning'>Planning</option>
                  <option value='in-progress'>In Progress</option>
                  <option value='completed'>Completed</option>
                  <option value='on-hold'>On Hold</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor='progress'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Progress (%)
                </label>
                <div className='relative'>
                  <Clock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                  <input
                    type='number'
                    id='progress'
                    value={formData.progress}
                    onChange={e =>
                      handleInputChange(
                        'progress',
                        parseInt(e.target.value) || 0
                      )
                    }
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.progress ? 'border-red-300' : 'border-gray-300'
                    }`}
                    min='0'
                    max='100'
                  />
                </div>
                {errors.progress && (
                  <p className='mt-1 text-sm text-red-600'>{errors.progress}</p>
                )}
                <div className='mt-2 w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-blue-600 h-2 rounded-full'
                    style={{ width: `${formData.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor='description'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Project Description *
              </label>
              <textarea
                id='description'
                value={formData.description}
                onChange={e => handleInputChange('description', e.target.value)}
                rows={6}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder='Describe the project scope, objectives, and key deliverables...'
              />
              {errors.description && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Team & Tech Tab */}
        {activeTab === 'team' && (
          <div className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Team Members
              </label>
              <div className='space-y-2'>
                {formData.team_members.map((member, index) => (
                  <div key={index} className='flex items-center space-x-2'>
                    <input
                      type='text'
                      value={member}
                      onChange={e => {
                        const newMembers = [...formData.team_members];
                        newMembers[index] = e.target.value;
                        handleInputChange('team_members', newMembers);
                      }}
                      className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Team member name...'
                    />
                    <button
                      type='button'
                      onClick={() => removeArrayItem('team_members', index)}
                      className='p-2 text-red-600 hover:bg-red-50 rounded-lg'
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type='button'
                  onClick={() => addArrayItem('team_members', '')}
                  className='text-blue-600 hover:text-blue-800 text-sm'
                >
                  + Add Team Member
                </button>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Technologies Used
              </label>
              <div className='space-y-2'>
                {formData.technologies.map((tech, index) => (
                  <div key={index} className='flex items-center space-x-2'>
                    <input
                      type='text'
                      value={tech}
                      onChange={e => {
                        const newTechs = [...formData.technologies];
                        newTechs[index] = e.target.value;
                        handleInputChange('technologies', newTechs);
                      }}
                      className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Technology name...'
                    />
                    <button
                      type='button'
                      onClick={() => removeArrayItem('technologies', index)}
                      className='p-2 text-red-600 hover:bg-red-50 rounded-lg'
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type='button'
                  onClick={() => addArrayItem('technologies', '')}
                  className='text-blue-600 hover:text-blue-800 text-sm'
                >
                  + Add Technology
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Objectives Tab */}
        {activeTab === 'objectives' && (
          <div className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Project Objectives
              </label>
              <div className='space-y-2'>
                {formData.objectives.map((objective, index) => (
                  <div key={index} className='flex items-center space-x-2'>
                    <input
                      type='text'
                      value={objective}
                      onChange={e => {
                        const newObjectives = [...formData.objectives];
                        newObjectives[index] = e.target.value;
                        handleInputChange('objectives', newObjectives);
                      }}
                      className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Project objective...'
                    />
                    <button
                      type='button'
                      onClick={() => removeArrayItem('objectives', index)}
                      className='p-2 text-red-600 hover:bg-red-50 rounded-lg'
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type='button'
                  onClick={() => addArrayItem('objectives', '')}
                  className='text-blue-600 hover:text-blue-800 text-sm'
                >
                  + Add Objective
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Risks Tab */}
        {activeTab === 'risks' && (
          <div className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Project Risks
              </label>
              <div className='space-y-2'>
                {formData.risks.map((risk, index) => (
                  <div key={index} className='flex items-center space-x-2'>
                    <input
                      type='text'
                      value={risk}
                      onChange={e => {
                        const newRisks = [...formData.risks];
                        newRisks[index] = e.target.value;
                        handleInputChange('risks', newRisks);
                      }}
                      className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Potential risk...'
                    />
                    <button
                      type='button'
                      onClick={() => removeArrayItem('risks', index)}
                      className='p-2 text-red-600 hover:bg-red-50 rounded-lg'
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type='button'
                  onClick={() => addArrayItem('risks', '')}
                  className='text-blue-600 hover:text-blue-800 text-sm'
                >
                  + Add Risk
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Attachments Tab */}
        {activeTab === 'attachments' && (
          <div className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Project Attachments
              </label>
              <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center'>
                <input
                  type='file'
                  multiple
                  onChange={e => handleFileUpload(e.target.files)}
                  className='hidden'
                  id='file-upload'
                />
                <label htmlFor='file-upload' className='cursor-pointer'>
                  <Image className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                  <p className='text-gray-600 mb-2'>
                    Click to upload files or drag and drop
                  </p>
                  <p className='text-sm text-gray-500'>
                    PDF, DOC, images, or other project files
                  </p>
                </label>
              </div>
            </div>

            {formData.attachments.length > 0 && (
              <div>
                <h4 className='text-sm font-medium text-gray-700 mb-3'>
                  Uploaded Files
                </h4>
                <div className='space-y-2'>
                  {formData.attachments.map((file, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                    >
                      <div className='flex items-center space-x-3'>
                        <FileText className='w-5 h-5 text-gray-400' />
                        <div>
                          <p className='text-sm font-medium text-gray-900'>
                            {file.name}
                          </p>
                          <p className='text-xs text-gray-500'>
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type='button'
                        onClick={() => removeFile(index)}
                        className='p-1 text-red-600 hover:bg-red-50 rounded'
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
