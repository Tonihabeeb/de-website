'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Eye, 
  Shield, 
  Database, 
  Clock, 
  Download,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Trash2,
  Plus,
  Edit,
  Copy
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { toast } from '@/components/ui/Toast';

interface AnalyticsConfig {
  tracking: {
    enabled: boolean;
    anonymizeData: boolean;
    trackUserBehavior: boolean;
    trackPageViews: boolean;
    trackEvents: boolean;
    trackPerformance: boolean;
    respectDNT: boolean;
  };
  dataRetention: {
    enabled: boolean;
    retentionPeriod: number; // days
    autoDelete: boolean;
    backupBeforeDelete: boolean;
    archiveOldData: boolean;
  };
  privacy: {
    gdprCompliant: boolean;
    cookieConsent: boolean;
    dataProcessing: boolean;
    userConsent: boolean;
    dataExport: boolean;
    dataDeletion: boolean;
  };
  integrations: {
    googleAnalytics: {
      enabled: boolean;
      measurementId: string;
      enhancedEcommerce: boolean;
      demographics: boolean;
      interests: boolean;
    };
    customEvents: {
      enabled: boolean;
      events: Array<{
        id: string;
        name: string;
        category: string;
        action: string;
        label?: string;
        value?: number;
      }>;
    };
  };
  notifications: {
    enabled: boolean;
    emailAlerts: boolean;
    performanceAlerts: boolean;
    errorAlerts: boolean;
    thresholdAlerts: boolean;
    recipients: string[];
  };
  export: {
    autoExport: boolean;
    exportFormat: 'csv' | 'json' | 'excel' | 'pdf';
    exportSchedule: 'daily' | 'weekly' | 'monthly' | 'manual';
    exportTime: string;
    includeCharts: boolean;
    compression: boolean;
  };
}

interface CustomEvent {
  id: string;
  name: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export default function AnalyticsConfigPage() {
  const [config, setConfig] = useState<AnalyticsConfig>({
    tracking: {
      enabled: true,
      anonymizeData: true,
      trackUserBehavior: true,
      trackPageViews: true,
      trackEvents: true,
      trackPerformance: true,
      respectDNT: true,
    },
    dataRetention: {
      enabled: true,
      retentionPeriod: 365,
      autoDelete: false,
      backupBeforeDelete: true,
      archiveOldData: true,
    },
    privacy: {
      gdprCompliant: true,
      cookieConsent: true,
      dataProcessing: true,
      userConsent: true,
      dataExport: true,
      dataDeletion: true,
    },
    integrations: {
      googleAnalytics: {
        enabled: true,
        measurementId: 'G-XXXXXXXXXX',
        enhancedEcommerce: true,
        demographics: true,
        interests: false,
      },
      customEvents: {
        enabled: true,
        events: [
          {
            id: '1',
            name: 'Page View',
            category: 'engagement',
            action: 'page_view',
            label: 'page_title'
          },
          {
            id: '2',
            name: 'Button Click',
            category: 'engagement',
            action: 'click',
            label: 'button_id'
          },
          {
            id: '3',
            name: 'Form Submission',
            category: 'conversion',
            action: 'form_submit',
            label: 'form_type'
          }
        ]
      }
    },
    notifications: {
      enabled: true,
      emailAlerts: true,
      performanceAlerts: true,
      errorAlerts: true,
      thresholdAlerts: true,
      recipients: ['admin@example.com', 'analytics@example.com']
    },
    export: {
      autoExport: false,
      exportFormat: 'csv',
      exportSchedule: 'weekly',
      exportTime: '09:00',
      includeCharts: true,
      compression: true
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CustomEvent | null>(null);
  const [newRecipient, setNewRecipient] = useState('');

  const handleSaveConfig = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Configuration saved successfully');
    } catch (error) {
      toast.error('Failed to save configuration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Google Analytics connection test successful');
    } catch (error) {
      toast.error('Google Analytics connection test failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowEventModal(true);
  };

  const handleEditEvent = (event: CustomEvent) => {
    setEditingEvent(event);
    setShowEventModal(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setConfig(prev => ({
      ...prev,
      integrations: {
        ...prev.integrations,
        customEvents: {
          ...prev.integrations.customEvents,
          events: prev.integrations.customEvents.events.filter(e => e.id !== eventId)
        }
      }
    }));
    toast.success('Event deleted successfully');
  };

  const handleSaveEvent = () => {
    if (editingEvent) {
      // Update existing event
      setConfig(prev => ({
        ...prev,
        integrations: {
          ...prev.integrations,
          customEvents: {
            ...prev.integrations.customEvents,
            events: prev.integrations.customEvents.events.map(e =>
              e.id === editingEvent.id ? editingEvent : e
            )
          }
        }
      }));
    } else {
      // Add new event
      const newEvent = {
        id: Date.now().toString(),
        name: '',
        category: 'engagement',
        action: '',
        label: '',
        value: 0
      };
      setConfig(prev => ({
        ...prev,
        integrations: {
          ...prev.integrations,
          customEvents: {
            ...prev.integrations.customEvents,
            events: [...prev.integrations.customEvents.events, newEvent]
          }
        }
      }));
    }
    setShowEventModal(false);
    setEditingEvent(null);
    toast.success(editingEvent ? 'Event updated successfully' : 'Event added successfully');
  };

  const handleAddRecipient = () => {
    if (newRecipient && !config.notifications.recipients.includes(newRecipient)) {
      setConfig(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          recipients: [...prev.notifications.recipients, newRecipient]
        }
      }));
      setNewRecipient('');
      toast.success('Recipient added successfully');
    }
  };

  const handleRemoveRecipient = (email: string) => {
    setConfig(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        recipients: prev.notifications.recipients.filter(r => r !== email)
      }
    }));
    toast.success('Recipient removed successfully');
  };

  const getStatusIcon = (enabled: boolean) => {
    return enabled ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Configuration</h1>
            <p className="text-gray-600 mt-2">
              Configure analytics tracking, privacy settings, and data management
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={handleTestConnection}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Test Connection
            </Button>
            <Button
              onClick={handleSaveConfig}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isLoading ? 'Saving...' : 'Save Configuration'}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tracking Configuration */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">Tracking Configuration</h2>
            </div>
            <p className="text-gray-600 mt-1">Configure what data to collect and track</p>
          </div>
          <div className="p-6 space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">Enable Analytics Tracking</span>
                <p className="text-sm text-gray-500">Master switch for all analytics tracking</p>
              </div>
              <input
                type="checkbox"
                checked={config.tracking.enabled}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  tracking: { ...prev.tracking, enabled: e.target.checked }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">Anonymize Data</span>
                <p className="text-sm text-gray-500">Remove personally identifiable information</p>
              </div>
              <input
                type="checkbox"
                checked={config.tracking.anonymizeData}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  tracking: { ...prev.tracking, anonymizeData: e.target.checked }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">Track User Behavior</span>
                <p className="text-sm text-gray-500">Monitor user interactions and patterns</p>
              </div>
              <input
                type="checkbox"
                checked={config.tracking.trackUserBehavior}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  tracking: { ...prev.tracking, trackUserBehavior: e.target.checked }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">Track Page Views</span>
                <p className="text-sm text-gray-500">Monitor page visit statistics</p>
              </div>
              <input
                type="checkbox"
                checked={config.tracking.trackPageViews}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  tracking: { ...prev.tracking, trackPageViews: e.target.checked }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">Track Custom Events</span>
                <p className="text-sm text-gray-500">Monitor specific user actions</p>
              </div>
              <input
                type="checkbox"
                checked={config.tracking.trackEvents}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  tracking: { ...prev.tracking, trackEvents: e.target.checked }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">Track Performance</span>
                <p className="text-sm text-gray-500">Monitor Core Web Vitals and performance</p>
              </div>
              <input
                type="checkbox"
                checked={config.tracking.trackPerformance}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  tracking: { ...prev.tracking, trackPerformance: e.target.checked }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">Respect Do Not Track</span>
                <p className="text-sm text-gray-500">Honor browser DNT preferences</p>
              </div>
              <input
                type="checkbox"
                checked={config.tracking.respectDNT}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  tracking: { ...prev.tracking, respectDNT: e.target.checked }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Privacy & Compliance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-900">Privacy & Compliance</h2>
            </div>
            <p className="text-gray-600 mt-1">GDPR and privacy compliance settings</p>
          </div>
          <div className="p-6 space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">GDPR Compliant</span>
                <p className="text-sm text-gray-500">Enable GDPR compliance features</p>
              </div>
              <input
                type="checkbox"
                checked={config.privacy.gdprCompliant}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, gdprCompliant: e.target.checked }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">Cookie Consent</span>
                <p className="text-sm text-gray-500">Require explicit cookie consent</p>
              </div>
              <input
                type="checkbox"
                checked={config.privacy.cookieConsent}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, cookieConsent: e.target.checked }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">Data Processing Consent</span>
                <p className="text-sm text-gray-500">Require consent for data processing</p>
              </div>
              <input
                type="checkbox"
                checked={config.privacy.dataProcessing}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, dataProcessing: e.target.checked }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">User Consent Management</span>
                <p className="text-sm text-gray-500">Allow users to manage their consent</p>
              </div>
              <input
                type="checkbox"
                checked={config.privacy.userConsent}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, userConsent: e.target.checked }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">Data Export Rights</span>
                <p className="text-sm text-gray-500">Allow users to export their data</p>
              </div>
              <input
                type="checkbox"
                checked={config.privacy.dataExport}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, dataExport: e.target.checked }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">Right to be Forgotten</span>
                <p className="text-sm text-gray-500">Allow users to delete their data</p>
              </div>
              <input
                type="checkbox"
                checked={config.privacy.dataDeletion}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, dataDeletion: e.target.checked }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Google Analytics Integration */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-900">Google Analytics Integration</h2>
            </div>
            <p className="text-gray-600 mt-1">Configure Google Analytics 4 integration</p>
          </div>
          <div className="p-6 space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">Enable Google Analytics</span>
                <p className="text-sm text-gray-500">Send data to Google Analytics</p>
              </div>
              <input
                type="checkbox"
                checked={config.integrations.googleAnalytics.enabled}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  integrations: {
                    ...prev.integrations,
                    googleAnalytics: {
                      ...prev.integrations.googleAnalytics,
                      enabled: e.target.checked
                    }
                  }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Measurement ID
              </label>
              <input
                type="text"
                value={config.integrations.googleAnalytics.measurementId}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  integrations: {
                    ...prev.integrations,
                    googleAnalytics: {
                      ...prev.integrations.googleAnalytics,
                      measurementId: e.target.value
                    }
                  }
                }))}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">Enhanced Ecommerce</span>
                <p className="text-sm text-gray-500">Track ecommerce transactions</p>
              </div>
              <input
                type="checkbox"
                checked={config.integrations.googleAnalytics.enhancedEcommerce}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  integrations: {
                    ...prev.integrations,
                    googleAnalytics: {
                      ...prev.integrations.googleAnalytics,
                      enhancedEcommerce: e.target.checked
                    }
                  }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">Demographics</span>
                <p className="text-sm text-gray-500">Track user demographics</p>
              </div>
              <input
                type="checkbox"
                checked={config.integrations.googleAnalytics.demographics}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  integrations: {
                    ...prev.integrations,
                    googleAnalytics: {
                      ...prev.integrations.googleAnalytics,
                      demographics: e.target.checked
                    }
                  }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">Interests</span>
                <p className="text-sm text-gray-500">Track user interests</p>
              </div>
              <input
                type="checkbox"
                checked={config.integrations.googleAnalytics.interests}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  integrations: {
                    ...prev.integrations,
                    googleAnalytics: {
                      ...prev.integrations.googleAnalytics,
                      interests: e.target.checked
                    }
                  }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Custom Events */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-orange-500" />
                <h2 className="text-xl font-semibold text-gray-900">Custom Events</h2>
              </div>
              <Button
                size="sm"
                onClick={handleAddEvent}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Event
              </Button>
            </div>
            <p className="text-gray-600 mt-1">Configure custom event tracking</p>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {config.integrations.customEvents.events.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{event.name}</div>
                    <div className="text-sm text-gray-500">
                      {event.category} • {event.action}
                      {event.label && ` • ${event.label}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEditEvent(event)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <Modal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        title={editingEvent ? 'Edit Custom Event' : 'Add Custom Event'}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Name
            </label>
            <input
              type="text"
              value={editingEvent?.name || ''}
              onChange={(e) => setEditingEvent((prev: CustomEvent | null) => prev ? { ...prev, name: e.target.value } : null)}
              placeholder="e.g., Button Click"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={editingEvent?.category || 'engagement'}
              onChange={(e) => setEditingEvent((prev: CustomEvent | null) => prev ? { ...prev, category: e.target.value } : null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="engagement">Engagement</option>
              <option value="conversion">Conversion</option>
              <option value="error">Error</option>
              <option value="performance">Performance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action
            </label>
            <input
              type="text"
              value={editingEvent?.action || ''}
              onChange={(e) => setEditingEvent((prev: CustomEvent | null) => prev ? { ...prev, action: e.target.value } : null)}
              placeholder="e.g., click, submit, view"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Label (Optional)
            </label>
            <input
              type="text"
              value={editingEvent?.label || ''}
              onChange={(e) => setEditingEvent((prev: CustomEvent | null) => prev ? { ...prev, label: e.target.value } : null)}
              placeholder="e.g., button_id, page_title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="secondary"
            onClick={() => setShowEventModal(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleSaveEvent}>
            {editingEvent ? 'Update Event' : 'Add Event'}
          </Button>
        </div>
      </Modal>
    </div>
  );
} 
