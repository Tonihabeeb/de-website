'use client';

import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/forms/FormField';
import Modal from '@/components/ui/Modal';
import { toast } from '@/components/ui/Toast';
import { 
  Download, 
  Upload, 
  Clock, 
  Calendar, 
  HardDrive, 
  CheckCircle, 
  AlertTriangle, 
  Trash2, 
  RefreshCw,
  Play,
  Pause,
  Settings,
  FileText,
  Database,
  Archive,
  RotateCcw
} from 'lucide-react';

interface BackupInfo {
  id: string;
  name: string;
  type: 'manual' | 'scheduled' | 'auto';
  size: number;
  status: 'completed' | 'in-progress' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  tables: string[];
  compression: boolean;
  encryption: boolean;
  retentionDays: number;
  downloadUrl?: string;
}

interface BackupSchedule {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  dayOfWeek?: number;
  dayOfMonth?: number;
  isActive: boolean;
  lastRun?: Date;
  nextRun?: Date;
  retentionDays: number;
  includeTables: string[];
  excludeTables: string[];
  compression: boolean;
  encryption: boolean;
}

const backupScheduleSchema = z.object({
  name: z.string().min(1, 'Schedule name is required'),
  frequency: z.enum(['daily', 'weekly', 'monthly']),
  time: z.string().min(1, 'Time is required'),
  dayOfWeek: z.number().optional(),
  dayOfMonth: z.number().optional(),
  retentionDays: z.number().min(1, 'Retention days must be at least 1'),
  compression: z.boolean(),
  encryption: z.boolean(),
  includeTables: z.string().optional(),
  excludeTables: z.string().optional(),
});

type BackupScheduleForm = z.infer<typeof backupScheduleSchema>;

export default function BackupRestoreManager({ className = '' }: { className?: string }) {
  const [backups, setBackups] = useState<BackupInfo[]>([]);
  const [schedules, setSchedules] = useState<BackupSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<BackupInfo | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<BackupSchedule | null>(null);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const form = useForm<BackupScheduleForm>({
    resolver: zodResolver(backupScheduleSchema),
    defaultValues: {
      name: '',
      frequency: 'daily',
      time: '02:00',
      retentionDays: 30,
      compression: true,
      encryption: false,
    },
  });

  // Mock data for demonstration
  const mockBackups: BackupInfo[] = [
    {
      id: '1',
      name: 'Full Backup - 2024-12-19',
      type: 'scheduled',
      size: 1024 * 1024 * 50, // 50MB
      status: 'completed',
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      completedAt: new Date(Date.now() - 86390000),
      tables: ['users', 'pages', 'projects', 'media', 'settings'],
      compression: true,
      encryption: false,
      retentionDays: 30,
      downloadUrl: '/api/admin/backup/1/download',
    },
    {
      id: '2',
      name: 'Manual Backup - 2024-12-18',
      type: 'manual',
      size: 1024 * 1024 * 45, // 45MB
      status: 'completed',
      createdAt: new Date(Date.now() - 172800000), // 2 days ago
      completedAt: new Date(Date.now() - 172790000),
      tables: ['users', 'pages', 'projects'],
      compression: false,
      encryption: true,
      retentionDays: 7,
      downloadUrl: '/api/admin/backup/2/download',
    },
    {
      id: '3',
      name: 'Auto Backup - 2024-12-17',
      type: 'auto',
      size: 1024 * 1024 * 48, // 48MB
      status: 'completed',
      createdAt: new Date(Date.now() - 259200000), // 3 days ago
      completedAt: new Date(Date.now() - 259190000),
      tables: ['users', 'pages', 'projects', 'media', 'settings', 'navigation'],
      compression: true,
      encryption: false,
      retentionDays: 7,
      downloadUrl: '/api/admin/backup/3/download',
    },
  ];

  const mockSchedules: BackupSchedule[] = [
    {
      id: '1',
      name: 'Daily Full Backup',
      frequency: 'daily',
      time: '02:00',
      isActive: true,
      lastRun: new Date(Date.now() - 86400000),
      nextRun: new Date(Date.now() + 86400000),
      retentionDays: 30,
      includeTables: ['users', 'pages', 'projects', 'media', 'settings'],
      excludeTables: ['temp_logs'],
      compression: true,
      encryption: false,
    },
    {
      id: '2',
      name: 'Weekly Archive',
      frequency: 'weekly',
      time: '03:00',
      dayOfWeek: 0, // Sunday
      isActive: true,
      lastRun: new Date(Date.now() - 604800000),
      nextRun: new Date(Date.now() + 604800000),
      retentionDays: 90,
      includeTables: ['users', 'pages', 'projects'],
      excludeTables: ['temp_logs', 'session_data'],
      compression: true,
      encryption: true,
    },
  ];

  useEffect(() => {
    loadBackups();
  }, []);

  const loadBackups = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBackups(mockBackups);
      setSchedules(mockSchedules);
    } catch (error) {
      toast.error('Failed to load backup data');
    } finally {
      setIsLoading(false);
    }
  };

  const createBackup = async () => {
    setIsCreatingBackup(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newBackup: BackupInfo = {
        id: Date.now().toString(),
        name: `Manual Backup - ${new Date().toISOString().split('T')[0]}`,
        type: 'manual',
        size: 1024 * 1024 * Math.floor(Math.random() * 20 + 40), // 40-60MB
        status: 'completed',
        createdAt: new Date(),
        completedAt: new Date(),
        tables: ['users', 'pages', 'projects', 'media', 'settings'],
        compression: true,
        encryption: false,
        retentionDays: 30,
      };
      
      setBackups(prev => [newBackup, ...prev]);
      toast.success('Backup created successfully');
    } catch (error) {
      toast.error('Failed to create backup');
    } finally {
      setIsCreatingBackup(false);
    }
  };

  const downloadBackup = async (backupId: string) => {
    try {
      // Simulate download
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Backup download started');
    } catch (error) {
      toast.error('Failed to download backup');
    }
  };

  const deleteBackup = async (backupId: string) => {
    if (!confirm('Are you sure you want to delete this backup? This action cannot be undone.')) {
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setBackups(prev => prev.filter(backup => backup.id !== backupId));
      toast.success('Backup deleted successfully');
    } catch (error) {
      toast.error('Failed to delete backup');
    }
  };

  const restoreBackup = async (backupId: string) => {
    setIsRestoring(true);
    try {
      // Simulate restore process
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      toast.success('Backup restored successfully');
      setShowRestoreModal(false);
      setSelectedBackup(null);
    } catch (error) {
      toast.error('Failed to restore backup');
    } finally {
      setIsRestoring(false);
    }
  };

  const createSchedule = async (data: BackupScheduleForm) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newSchedule: BackupSchedule = {
        id: Date.now().toString(),
        name: data.name,
        frequency: data.frequency,
        time: data.time,
        dayOfWeek: data.dayOfWeek,
        dayOfMonth: data.dayOfMonth,
        isActive: true,
        nextRun: new Date(Date.now() + 86400000),
        retentionDays: data.retentionDays,
        includeTables: data.includeTables ? data.includeTables.split(',') : [],
        excludeTables: data.excludeTables ? data.excludeTables.split(',') : [],
        compression: data.compression,
        encryption: data.encryption,
      };
      
      setSchedules(prev => [...prev, newSchedule]);
      toast.success('Backup schedule created successfully');
      setShowScheduleModal(false);
      form.reset();
    } catch (error) {
      toast.error('Failed to create backup schedule');
    }
  };

  const toggleSchedule = async (scheduleId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSchedules(prev => prev.map(schedule => 
        schedule.id === scheduleId 
          ? { ...schedule, isActive: !schedule.isActive }
          : schedule
      ));
      
      toast.success('Schedule status updated');
    } catch (error) {
      toast.error('Failed to update schedule status');
    }
  };

  const deleteSchedule = async (scheduleId: string) => {
    if (!confirm('Are you sure you want to delete this backup schedule?')) {
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSchedules(prev => prev.filter(schedule => schedule.id !== scheduleId));
      toast.success('Schedule deleted successfully');
    } catch (error) {
      toast.error('Failed to delete schedule');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'failed': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Backup & Restore</h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage database backups and restoration
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setShowScheduleModal(true)}
              variant="secondary"
              size="sm"
            >
              <Settings className="w-4 h-4 mr-2" />
              Schedules
            </Button>
            <Button
              onClick={createBackup}
              variant="primary"
              size="sm"
              disabled={isCreatingBackup}
            >
              {isCreatingBackup ? (
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Archive className="w-4 h-4 mr-2" />
              )}
              {isCreatingBackup ? 'Creating...' : 'Create Backup'}
            </Button>
          </div>
        </div>
      </div>

      {/* Backup Schedules */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Backup Schedules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schedules.map(schedule => (
            <div key={schedule.id} className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{schedule.name}</h4>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleSchedule(schedule.id)}
                    className={`p-1 rounded-full ${
                      schedule.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {schedule.isActive ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                  </button>
                  <button
                    onClick={() => deleteSchedule(schedule.id)}
                    className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Frequency:</span>
                  <span className="capitalize">{schedule.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span>{schedule.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Retention:</span>
                  <span>{schedule.retentionDays} days</span>
                </div>
                <div className="flex justify-between">
                  <span>Next Run:</span>
                  <span>{schedule.nextRun?.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Backup List */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Backups</h3>
        <div className="space-y-4">
          {backups.map(backup => (
            <div key={backup.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${getStatusColor(backup.status)}`}>
                  {getStatusIcon(backup.status)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{backup.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center">
                      <Database className="w-3 h-3 mr-1" />
                      {backup.tables.length} tables
                    </span>
                    <span className="flex items-center">
                      <HardDrive className="w-3 h-3 mr-1" />
                      {formatFileSize(backup.size)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {backup.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => downloadBackup(backup.id)}
                  variant="secondary"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button
                  onClick={() => {
                    setSelectedBackup(backup);
                    setShowRestoreModal(true);
                  }}
                  variant="secondary"
                  size="sm"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Restore
                </Button>
                <Button
                  onClick={() => deleteBackup(backup.id)}
                  variant="secondary"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Schedule Modal */}
      <Modal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        title="Create Backup Schedule"
      >
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(createSchedule)} className="space-y-4">
            <FormField
              name="name"
              label="Schedule Name"
              placeholder="Daily Full Backup"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="frequency"
                label="Frequency"
                type="select"
                options={[
                  { value: 'daily', label: 'Daily' },
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'monthly', label: 'Monthly' },
                ]}
              />
                             <FormField
                 name="time"
                 label="Time"
                 type="text"
                 placeholder="02:00"
               />
            </div>
            
            <FormField
              name="retentionDays"
              label="Retention Days"
              type="number"
              placeholder="30"
            />
            
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...form.register('compression')}
                  className="rounded border-gray-300"
                />
                <label className="ml-2 text-sm text-gray-700">Enable compression</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...form.register('encryption')}
                  className="rounded border-gray-300"
                />
                <label className="ml-2 text-sm text-gray-700">Enable encryption</label>
              </div>
            </div>
            
            <FormField
              name="includeTables"
              label="Include Tables (comma-separated)"
              placeholder="users,pages,projects"
            />
            
            <FormField
              name="excludeTables"
              label="Exclude Tables (comma-separated)"
              placeholder="temp_logs,session_data"
            />
            
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowScheduleModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Create Schedule
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal>

      {/* Restore Modal */}
      <Modal
        isOpen={showRestoreModal}
        onClose={() => setShowRestoreModal(false)}
        title="Restore Backup"
      >
        {selectedBackup && (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-medium text-yellow-900">Warning</h3>
              </div>
              <p className="text-yellow-700">
                Restoring this backup will overwrite all current data. This action cannot be undone.
                Make sure you have a current backup before proceeding.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Backup Details</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span>{selectedBackup.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>{formatFileSize(selectedBackup.size)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span>{selectedBackup.createdAt.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tables:</span>
                  <span>{selectedBackup.tables.length}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => setShowRestoreModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => restoreBackup(selectedBackup.id)}
                disabled={isRestoring}
              >
                {isRestoring ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                    Restoring...
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Restore Backup
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
} 