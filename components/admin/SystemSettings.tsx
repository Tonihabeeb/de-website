'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/forms/FormField';
import Modal from '@/components/ui/Modal';
import { toast } from '@/components/ui/Toast';
import { 
  Settings, 
  Shield, 
  Mail, 
  Database, 
  Bell, 
  Globe, 
  Save, 
  RotateCcw,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Validation schemas
const generalSettingsSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  siteDescription: z.string().optional(),
  timezone: z.string().min(1, 'Timezone is required'),
  dateFormat: z.string().min(1, 'Date format is required'),
  language: z.string().min(1, 'Language is required'),
  maintenanceMode: z.boolean(),
  allowRegistration: z.boolean(),
  requireEmailVerification: z.boolean(),
});

const securitySettingsSchema = z.object({
  sessionTimeout: z.number().min(5, 'Minimum 5 minutes'),
  maxLoginAttempts: z.number().min(1, 'Minimum 1 attempt'),
  passwordMinLength: z.number().min(8, 'Minimum 8 characters'),
  requireStrongPassword: z.boolean(),
  enableTwoFactor: z.boolean(),
  enableAuditLog: z.boolean(),
  allowedFileTypes: z.string().optional(),
  maxFileSize: z.number().min(1, 'Minimum 1MB'),
});

const emailSettingsSchema = z.object({
  smtpHost: z.string().min(1, 'SMTP host is required'),
  smtpPort: z.number().min(1, 'SMTP port is required'),
  smtpUsername: z.string().min(1, 'SMTP username is required'),
  smtpPassword: z.string().min(1, 'SMTP password is required'),
  fromEmail: z.string().email('Invalid email address'),
  fromName: z.string().min(1, 'From name is required'),
  enableEmailNotifications: z.boolean(),
});

type GeneralSettings = z.infer<typeof generalSettingsSchema>;
type SecuritySettings = z.infer<typeof securitySettingsSchema>;
type EmailSettings = z.infer<typeof emailSettingsSchema>;

interface SystemSettingsProps {
  className?: string;
}

export default function SystemSettings({ className = '' }: SystemSettingsProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'email' | 'advanced'>('general');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTestEmailModal, setShowTestEmailModal] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState('');

  // Form hooks
  const generalForm = useForm<GeneralSettings>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      siteName: 'Deep Engineering CMS',
      siteDescription: 'Professional content management system',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      language: 'en',
      maintenanceMode: false,
      allowRegistration: true,
      requireEmailVerification: true,
    },
  });

  const securityForm = useForm<SecuritySettings>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordMinLength: 12,
      requireStrongPassword: true,
      enableTwoFactor: false,
      enableAuditLog: true,
      allowedFileTypes: 'jpg,jpeg,png,gif,pdf,doc,docx,xls,xlsx',
      maxFileSize: 10,
    },
  });

  const emailForm = useForm<EmailSettings>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUsername: '',
      smtpPassword: '',
      fromEmail: 'noreply@deepengineering.com',
      fromName: 'Deep Engineering',
      enableEmailNotifications: true,
    },
  });

  const handleSaveSettings = async (type: 'general' | 'security' | 'email') => {
    setIsLoading(true);
    try {
      let data;
      let isValid;

      switch (type) {
        case 'general':
          isValid = await generalForm.trigger();
          data = generalForm.getValues();
          break;
        case 'security':
          isValid = await securityForm.trigger();
          data = securityForm.getValues();
          break;
        case 'email':
          isValid = await emailForm.trigger();
          data = emailForm.getValues();
          break;
      }

      if (!isValid) {
        toast.error('Please fix validation errors');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} settings saved successfully`);
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestEmail = async () => {
    if (!testEmailAddress) {
      toast.error('Please enter an email address');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`Test email sent to ${testEmailAddress}`);
      setShowTestEmailModal(false);
      setTestEmailAddress('');
    } catch (error) {
      toast.error('Failed to send test email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSettings = async (type: 'general' | 'security' | 'email') => {
    if (!confirm('Are you sure you want to reset these settings to default values?')) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form to default values
      switch (type) {
        case 'general':
          generalForm.reset();
          break;
        case 'security':
          securityForm.reset();
          break;
        case 'email':
          emailForm.reset();
          break;
      }
      
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} settings reset to defaults`);
    } catch (error) {
      toast.error('Failed to reset settings');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'advanced', label: 'Advanced', icon: Database },
  ] as const;

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">System Settings</h2>
        <p className="text-sm text-gray-600 mt-1">
          Configure system-wide settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* General Settings */}
        {activeTab === 'general' && (
          <FormProvider {...generalForm}>
            <form onSubmit={generalForm.handleSubmit(() => handleSaveSettings('general'))}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="siteName"
                    label="Site Name"
                    placeholder="Enter site name"
                  />
                  <FormField
                    name="siteDescription"
                    label="Site Description"
                    placeholder="Enter site description"
                  />
                  <FormField
                    name="timezone"
                    label="Timezone"
                    type="select"
                    options={[
                      { value: 'UTC', label: 'UTC' },
                      { value: 'America/New_York', label: 'Eastern Time' },
                      { value: 'America/Chicago', label: 'Central Time' },
                      { value: 'America/Denver', label: 'Mountain Time' },
                      { value: 'America/Los_Angeles', label: 'Pacific Time' },
                    ]}
                  />
                  <FormField
                    name="dateFormat"
                    label="Date Format"
                    type="select"
                    options={[
                      { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                      { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                      { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
                    ]}
                  />
                  <FormField
                    name="language"
                    label="Language"
                    type="select"
                    options={[
                      { value: 'en', label: 'English' },
                      { value: 'es', label: 'Spanish' },
                      { value: 'fr', label: 'French' },
                      { value: 'de', label: 'German' },
                    ]}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">System Options</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        {...generalForm.register('maintenanceMode')}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        Maintenance Mode - Enable maintenance mode to restrict access
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        {...generalForm.register('allowRegistration')}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        Allow User Registration - Allow new users to register accounts
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        {...generalForm.register('requireEmailVerification')}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        Require Email Verification - Require email verification for new accounts
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => handleResetSettings('general')}
                    disabled={isLoading}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset to Defaults
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? 'Saving...' : 'Save Settings'}
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <FormProvider {...securityForm}>
            <form onSubmit={securityForm.handleSubmit(() => handleSaveSettings('security'))}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="sessionTimeout"
                    label="Session Timeout (minutes)"
                    type="number"
                  />
                  <FormField
                    name="maxLoginAttempts"
                    label="Max Login Attempts"
                    type="number"
                  />
                  <FormField
                    name="passwordMinLength"
                    label="Minimum Password Length"
                    type="number"
                  />
                  <FormField
                    name="maxFileSize"
                    label="Max File Size (MB)"
                    type="number"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Security Options</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        {...securityForm.register('requireStrongPassword')}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        Require Strong Password - Enforce password complexity requirements
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        {...securityForm.register('enableTwoFactor')}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        Enable Two-Factor Authentication - Allow users to enable 2FA for their accounts
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        {...securityForm.register('enableAuditLog')}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        Enable Audit Logging - Log all system activities for security monitoring
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">File Upload Security</h3>
                  <FormField
                    name="allowedFileTypes"
                    label="Allowed File Types"
                    placeholder="jpg,jpeg,png,gif,pdf,doc,docx"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => handleResetSettings('security')}
                    disabled={isLoading}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset to Defaults
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? 'Saving...' : 'Save Settings'}
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        )}

        {/* Email Settings */}
        {activeTab === 'email' && (
          <FormProvider {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(() => handleSaveSettings('email'))}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="smtpHost"
                    label="SMTP Host"
                    placeholder="smtp.gmail.com"
                  />
                  <FormField
                    name="smtpPort"
                    label="SMTP Port"
                    type="number"
                  />
                  <FormField
                    name="smtpUsername"
                    label="SMTP Username"
                    placeholder="your-email@gmail.com"
                  />
                  <div className="relative">
                    <FormField
                      name="smtpPassword"
                      label="SMTP Password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter SMTP password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <FormField
                    name="fromEmail"
                    label="From Email"
                    type="email"
                    placeholder="noreply@yourdomain.com"
                  />
                  <FormField
                    name="fromName"
                    label="From Name"
                    placeholder="Your Company Name"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Email Options</h3>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...emailForm.register('enableEmailNotifications')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Enable Email Notifications - Send email notifications for system events
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowTestEmailModal(true)}
                    disabled={isLoading}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Test Email
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => handleResetSettings('email')}
                    disabled={isLoading}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset to Defaults
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? 'Saving...' : 'Save Settings'}
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        )}

        {/* Advanced Settings */}
        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">
                    Advanced Settings
                  </h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    These settings are for advanced users. Incorrect configuration may affect system performance.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">System Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Cache Duration (seconds)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={3600}
                    min={60}
                    max={86400}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Max Concurrent Users
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={100}
                    min={10}
                    max={1000}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Database Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Connection Pool Size
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={10}
                    min={5}
                    max={50}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Query Timeout (seconds)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={30}
                    min={5}
                    max={300}
                  />
                </div>
              </div>
            </div>

                          <div className="flex justify-end space-x-3">
                <Button variant="secondary">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset to Defaults
                </Button>
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Advanced Settings
                </Button>
              </div>
          </div>
        )}
      </div>

      {/* Test Email Modal */}
      <Modal
        isOpen={showTestEmailModal}
        onClose={() => setShowTestEmailModal(false)}
        title="Send Test Email"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Enter an email address to send a test email and verify your SMTP configuration.
          </p>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={testEmailAddress}
              onChange={(e) => setTestEmailAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="test@example.com"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setShowTestEmailModal(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleTestEmail} disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Test Email'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 