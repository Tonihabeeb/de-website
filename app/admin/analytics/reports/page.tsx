'use client';

import { useState, useEffect } from 'react';
import {
  BarChart3,
  Calendar,
  Download,
  Plus,
  Settings,
  Trash2,
  Edit,
  Eye,
  Clock,
  FileText,
  Users,
  TrendingUp,
  Activity,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { toast } from '@/components/ui/Toast';

interface Report {
  id: string;
  name: string;
  description: string;
  type: 'content' | 'user' | 'system' | 'performance' | 'custom';
  schedule: 'daily' | 'weekly' | 'monthly' | 'manual';
  format: 'json' | 'csv' | 'excel' | 'pdf';
  filters: Record<string, unknown>;
  recipients: string[];
  is_active: boolean;
  last_run?: string;
  next_run?: string;
  created_at: string;
  updated_at: string;
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  default_filters: Record<string, unknown>;
}

export default function CustomReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'content' as Report['type'],
    schedule: 'manual' as Report['schedule'],
    format: 'json' as Report['format'],
    filters: {} as Record<string, unknown>,
    recipients: [] as string[],
  });

  useEffect(() => {
    fetchReports();
    fetchTemplates();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/admin/analytics/reports');
      if (response.ok) {
        const data = await response.json();
        setReports(data.reports || []);
      }
    } catch (error) {
      toast.error('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await fetch(
        '/api/admin/analytics/reports?templates=true'
      );
      if (response.ok) {
        const data = await response.json();
        setTemplates(data.templates || []);
      }
    } catch (error) {
      toast.error('Failed to fetch templates');
    }
  };

  const handleCreateReport = async () => {
    try {
      const response = await fetch('/api/admin/analytics/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Report created successfully');
        setShowCreateModal(false);
        resetForm();
        fetchReports();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to create report');
      }
    } catch (error) {
      toast.error('Failed to create report');
    }
  };

  const handleUpdateReport = async () => {
    if (!selectedReport) return;

    try {
      const response = await fetch(
        `/api/admin/analytics/reports/${selectedReport.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success('Report updated successfully');
        setShowEditModal(false);
        resetForm();
        fetchReports();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to update report');
      }
    } catch (error) {
      toast.error('Failed to update report');
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return;

    try {
      const response = await fetch(`/api/admin/analytics/reports/${reportId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Report deleted successfully');
        fetchReports();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to delete report');
      }
    } catch (error) {
      toast.error('Failed to delete report');
    }
  };

  const handleRunReport = async (reportId: string) => {
    try {
      const response = await fetch(
        `/api/admin/analytics/reports/${reportId}/run`,
        {
          method: 'POST',
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report-${reportId}.${formData.format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('Report generated and downloaded');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to run report');
      }
    } catch (error) {
      toast.error('Failed to run report');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      type: 'content',
      schedule: 'manual',
      format: 'json',
      filters: {},
      recipients: [],
    });
  };

  const openEditModal = (report: Report) => {
    setSelectedReport(report);
    setFormData({
      name: report.name,
      description: report.description,
      type: report.type,
      schedule: report.schedule,
      format: report.format,
      filters: report.filters,
      recipients: report.recipients,
    });
    setShowEditModal(true);
  };

  const openViewModal = (report: Report) => {
    setSelectedReport(report);
    setShowViewModal(true);
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'content':
        return <FileText className='w-4 h-4' />;
      case 'user':
        return <Users className='w-4 h-4' />;
      case 'system':
        return <Activity className='w-4 h-4' />;
      case 'performance':
        return <TrendingUp className='w-4 h-4' />;
      default:
        return <BarChart3 className='w-4 h-4' />;
    }
  };

  const getScheduleColor = (schedule: string) => {
    switch (schedule) {
      case 'daily':
        return 'text-blue-600 bg-blue-50';
      case 'weekly':
        return 'text-green-600 bg-green-50';
      case 'monthly':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 p-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='animate-pulse'>
            <div className='h-8 bg-gray-200 rounded w-1/4 mb-6'></div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {[...Array(6)].map((_, i) => (
                <div key={i} className='bg-white rounded-lg shadow p-6'>
                  <div className='h-4 bg-gray-200 rounded w-3/4 mb-4'></div>
                  <div className='h-3 bg-gray-200 rounded w-1/2 mb-2'></div>
                  <div className='h-3 bg-gray-200 rounded w-2/3'></div>
                </div>
              ))}
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
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Custom Reports</h1>
            <p className='text-gray-600 mt-2'>
              Create and manage custom analytics reports
            </p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className='flex items-center gap-2'
          >
            <Plus className='w-4 h-4' />
            Create Report
          </Button>
        </div>

        {/* Report Templates */}
        {templates.length > 0 && (
          <div className='mb-8'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              Report Templates
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {templates.map(template => (
                <div
                  key={template.id}
                  className='bg-white rounded-lg border p-4 hover:shadow-md transition-shadow cursor-pointer'
                  onClick={() => {
                    setFormData({
                      name: template.name,
                      description: template.description,
                      type: template.type as Report['type'],
                      schedule: 'manual',
                      format: 'json',
                      filters: template.default_filters,
                      recipients: [],
                    });
                    setShowCreateModal(true);
                  }}
                >
                  <div className='flex items-center gap-2 mb-2'>
                    {getReportTypeIcon(template.type)}
                    <h3 className='font-medium text-gray-900'>
                      {template.name}
                    </h3>
                  </div>
                  <p className='text-sm text-gray-600'>
                    {template.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {reports.map(report => (
            <div
              key={report.id}
              className='bg-white rounded-lg shadow-sm border'
            >
              <div className='p-6'>
                <div className='flex items-start justify-between mb-4'>
                  <div className='flex items-center gap-2'>
                    {getReportTypeIcon(report.type)}
                    <h3 className='font-semibold text-gray-900'>
                      {report.name}
                    </h3>
                  </div>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() => openViewModal(report)}
                      className='p-1 text-gray-400 hover:text-gray-600'
                    >
                      <Eye className='w-4 h-4' />
                    </button>
                    <button
                      onClick={() => openEditModal(report)}
                      className='p-1 text-gray-400 hover:text-blue-600'
                    >
                      <Edit className='w-4 h-4' />
                    </button>
                    <button
                      onClick={() => handleDeleteReport(report.id)}
                      className='p-1 text-gray-400 hover:text-red-600'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                </div>

                <p className='text-sm text-gray-600 mb-4'>
                  {report.description}
                </p>

                <div className='space-y-2 mb-4'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getScheduleColor(report.schedule)}`}
                    >
                      {report.schedule}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FileText className='w-4 h-4 text-gray-400' />
                    <span className='text-xs text-gray-600'>
                      {report.format.toUpperCase()}
                    </span>
                  </div>
                  {report.last_run && (
                    <div className='flex items-center gap-2'>
                      <Clock className='w-4 h-4 text-gray-400' />
                      <span className='text-xs text-gray-600'>
                        Last run:{' '}
                        {new Date(report.last_run).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className='flex gap-2'>
                  <Button
                    onClick={() => handleRunReport(report.id)}
                    size='sm'
                    className='flex-1'
                  >
                    <Download className='w-4 h-4 mr-1' />
                    Run Now
                  </Button>
                  <Button
                    onClick={() => openEditModal(report)}
                    size='sm'
                    className='bg-gray-100 text-gray-700 hover:bg-gray-200'
                  >
                    <Settings className='w-4 h-4' />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {reports.length === 0 && (
          <div className='text-center py-12'>
            <BarChart3 className='w-12 h-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No reports yet
            </h3>
            <p className='text-gray-600 mb-4'>
              Create your first custom report to get started
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className='w-4 h-4 mr-2' />
              Create Report
            </Button>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showCreateModal || showEditModal}
        onClose={() => {
          setShowCreateModal(false);
          setShowEditModal(false);
          resetForm();
        }}
        title={showCreateModal ? 'Create New Report' : 'Edit Report'}
      >
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Report Name
            </label>
            <input
              type='text'
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter report name'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={e =>
                setFormData({ ...formData, description: e.target.value })
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              rows={3}
              placeholder='Enter report description'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Report Type
              </label>
              <select
                value={formData.type}
                onChange={e =>
                  setFormData({
                    ...formData,
                    type: e.target.value as Report['type'],
                  })
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value='content'>Content Analytics</option>
                <option value='user'>User Analytics</option>
                <option value='system'>System Analytics</option>
                <option value='performance'>Performance Analytics</option>
                <option value='custom'>Custom</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Schedule
              </label>
              <select
                value={formData.schedule}
                onChange={e =>
                  setFormData({
                    ...formData,
                    schedule: e.target.value as Report['schedule'],
                  })
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value='manual'>Manual</option>
                <option value='daily'>Daily</option>
                <option value='weekly'>Weekly</option>
                <option value='monthly'>Monthly</option>
              </select>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Export Format
            </label>
            <select
              value={formData.format}
              onChange={e =>
                setFormData({
                  ...formData,
                  format: e.target.value as Report['format'],
                })
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='json'>JSON</option>
              <option value='csv'>CSV</option>
              <option value='excel'>Excel</option>
              <option value='pdf'>PDF</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Recipients (comma-separated emails)
            </label>
            <input
              type='text'
              value={formData.recipients.join(', ')}
              onChange={e =>
                setFormData({
                  ...formData,
                  recipients: e.target.value
                    .split(',')
                    .map(email => email.trim())
                    .filter(Boolean),
                })
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='email1@example.com, email2@example.com'
            />
          </div>
        </div>

        <div className='flex justify-end gap-3 mt-6'>
          <Button
            onClick={() => {
              setShowCreateModal(false);
              setShowEditModal(false);
              resetForm();
            }}
            className='bg-gray-100 text-gray-700 hover:bg-gray-200'
          >
            Cancel
          </Button>
          <Button
            onClick={showCreateModal ? handleCreateReport : handleUpdateReport}
          >
            {showCreateModal ? 'Create Report' : 'Update Report'}
          </Button>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title='Report Details'
      >
        {selectedReport && (
          <div className='space-y-4'>
            <div>
              <h3 className='font-medium text-gray-900'>
                {selectedReport.name}
              </h3>
              <p className='text-sm text-gray-600 mt-1'>
                {selectedReport.description}
              </p>
            </div>

            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div>
                <span className='font-medium text-gray-700'>Type:</span>
                <span className='ml-2 text-gray-600'>
                  {selectedReport.type}
                </span>
              </div>
              <div>
                <span className='font-medium text-gray-700'>Schedule:</span>
                <span className='ml-2 text-gray-600'>
                  {selectedReport.schedule}
                </span>
              </div>
              <div>
                <span className='font-medium text-gray-700'>Format:</span>
                <span className='ml-2 text-gray-600'>
                  {selectedReport.format.toUpperCase()}
                </span>
              </div>
              <div>
                <span className='font-medium text-gray-700'>Status:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    selectedReport.is_active
                      ? 'text-green-600 bg-green-50'
                      : 'text-red-600 bg-red-50'
                  }`}
                >
                  {selectedReport.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {selectedReport.last_run && (
              <div className='text-sm'>
                <span className='font-medium text-gray-700'>Last Run:</span>
                <span className='ml-2 text-gray-600'>
                  {new Date(selectedReport.last_run).toLocaleString()}
                </span>
              </div>
            )}

            {selectedReport.next_run && (
              <div className='text-sm'>
                <span className='font-medium text-gray-700'>Next Run:</span>
                <span className='ml-2 text-gray-600'>
                  {new Date(selectedReport.next_run).toLocaleString()}
                </span>
              </div>
            )}

            {selectedReport.recipients.length > 0 && (
              <div>
                <span className='font-medium text-gray-700 text-sm'>
                  Recipients:
                </span>
                <div className='mt-1'>
                  {selectedReport.recipients.map((email, index) => (
                    <span
                      key={index}
                      className='inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-2 mb-1'
                    >
                      {email}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className='flex gap-3 pt-4'>
              <Button
                onClick={() => handleRunReport(selectedReport.id)}
                className='flex-1'
              >
                <Download className='w-4 h-4 mr-2' />
                Run Report
              </Button>
              <Button
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(selectedReport);
                }}
                className='bg-gray-100 text-gray-700 hover:bg-gray-200'
              >
                <Edit className='w-4 h-4 mr-2' />
                Edit
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
