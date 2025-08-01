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
  AlertCircle,
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
  siteLogo: z.string().optional(),
  siteFavicon: z.string().optional(),
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

export default function SystemSettings({
  className = '',
}: SystemSettingsProps) {
  const [activeTab, setActiveTab] = useState<
    'general' | 'security' | 'email' | 'advanced'
  >('general');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTestEmailModal, setShowTestEmailModal] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [logoUploading, setLogoUploading] = useState(false);
  const [faviconUploading, setFaviconUploading] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [settingsError, setSettingsError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      setSettingsLoading(true);
      setSettingsError(null);
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data && Array.isArray(data)) {
          // Convert array of {key, value} to object
          const settingsObj: Record<string, string> = {};
          data.forEach((s: any) => { settingsObj[s.key] = s.value; });
          // Populate forms
          generalForm.reset({
            siteName: settingsObj.site_title || '',
            siteDescription: settingsObj.site_description || '',
            timezone: settingsObj.timezone || 'UTC',
            dateFormat: settingsObj.date_format || 'MM/DD/YYYY',
            language: settingsObj.language || 'en',
            maintenanceMode: settingsObj.maintenance_mode === 'true',
            allowRegistration: settingsObj.allow_registration !== 'false',
            requireEmailVerification: settingsObj.require_email_verification !== 'false',
            siteLogo: settingsObj.site_logo || '',
            siteFavicon: settingsObj.site_favicon || '',
          });
          setLogoPreview(settingsObj.site_logo || '');
          setFaviconPreview(settingsObj.site_favicon || '');
          securityForm.reset({
            sessionTimeout: Number(settingsObj.session_timeout) || 30,
            maxLoginAttempts: Number(settingsObj.max_login_attempts) || 5,
            passwordMinLength: Number(settingsObj.password_min_length) || 12,
            requireStrongPassword: settingsObj.require_strong_password === 'true',
            enableTwoFactor: settingsObj.enable_two_factor === 'true',
            enableAuditLog: settingsObj.enable_audit_log !== 'false',
            allowedFileTypes: settingsObj.allowed_file_types || 'jpg,jpeg,png,gif,pdf,doc,docx,xls,xlsx',
            maxFileSize: Number(settingsObj.max_file_size) || 10,
          });
          emailForm.reset({
            smtpHost: settingsObj.smtp_host || 'smtp.gmail.com',
            smtpPort: Number(settingsObj.smtp_port) || 587,
            smtpUsername: settingsObj.smtp_username || '',
            smtpPassword: settingsObj.smtp_password || '',
            fromEmail: settingsObj.from_email || 'noreply@deepengineering.com',
            fromName: settingsObj.from_name || 'Deep Engineering',
            enableEmailNotifications: settingsObj.enable_email_notifications !== 'false',
          });
        } else {
          setSettingsError('Failed to load settings');
        }
      } catch {
        setSettingsError('Failed to load settings');
      } finally {
        setSettingsLoading(false);
      }
    }
    fetchSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setLogoUploading(true);
      try {
        const formData = new FormData();
        formData.append('files', file);
        formData.append('tag', 'logo');
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.success && data.files && data.files[0]) {
          const url = `/uploads/${data.files[0]}`;
          setLogoPreview(url);
          setLogoFile(null); // Not needed after upload
          generalForm.setValue('siteLogo', url);
          toast.success('Logo uploaded');
        } else {
          toast.error('Logo upload failed');
        }
      } catch {
        toast.error('Logo upload failed');
      } finally {
        setLogoUploading(false);
      }
    }
  }
  async function handleFaviconChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFaviconUploading(true);
      try {
        const formData = new FormData();
        formData.append('files', file);
        formData.append('tag', 'favicon');
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.success && data.files && data.files[0]) {
          const url = `/uploads/${data.files[0]}`;
          setFaviconPreview(url);
          setFaviconFile(null);
          generalForm.setValue('siteFavicon', url);
          toast.success('Favicon uploaded');
        } else {
          toast.error('Favicon upload failed');
        }
      } catch {
        toast.error('Favicon upload failed');
      } finally {
        setFaviconUploading(false);
      }
    }
  }

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
      siteLogo: '',
      siteFavicon: '',
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

  async function handleSaveSettings(type: 'general' | 'security' | 'email') {
    setIsLoading(true);
    try {
      let data: Record<string, any> = {};
      let isValid = false;
      if (type === 'general') {
        isValid = await generalForm.trigger();
        data = generalForm.getValues();
      } else if (type === 'security') {
        isValid = await securityForm.trigger();
        data = securityForm.getValues();
      } else if (type === 'email') {
        isValid = await emailForm.trigger();
        data = emailForm.getValues();
      }
      if (!isValid) {
        toast.error('Please fix validation errors');
        setIsLoading(false);
        return;
      }
      // Gather all settings from all forms for full save
      const allSettings = {
        ...generalForm.getValues(),
        ...securityForm.getValues(),
        ...emailForm.getValues(),
      };
      // Map to backend keys
      const settingsArray = [
        { key: 'site_title', value: allSettings.siteName },
        { key: 'site_description', value: allSettings.siteDescription },
        { key: 'timezone', value: allSettings.timezone },
        { key: 'date_format', value: allSettings.dateFormat },
        { key: 'language', value: allSettings.language },
        { key: 'maintenance_mode', value: String(allSettings.maintenanceMode) },
        { key: 'allow_registration', value: String(allSettings.allowRegistration) },
        { key: 'require_email_verification', value: String(allSettings.requireEmailVerification) },
        { key: 'site_logo', value: allSettings.siteLogo || '' },
        { key: 'site_favicon', value: allSettings.siteFavicon || '' },
        { key: 'session_timeout', value: String(allSettings.sessionTimeout) },
        { key: 'max_login_attempts', value: String(allSettings.maxLoginAttempts) },
        { key: 'password_min_length', value: String(allSettings.passwordMinLength) },
        { key: 'require_strong_password', value: String(allSettings.requireStrongPassword) },
        { key: 'enable_two_factor', value: String(allSettings.enableTwoFactor) },
        { key: 'enable_audit_log', value: String(allSettings.enableAuditLog) },
        { key: 'allowed_file_types', value: allSettings.allowedFileTypes || '' },
        { key: 'max_file_size', value: String(allSettings.maxFileSize) },
        { key: 'smtp_host', value: allSettings.smtpHost },
        { key: 'smtp_port', value: String(allSettings.smtpPort) },
        { key: 'smtp_username', value: allSettings.smtpUsername },
        { key: 'smtp_password', value: allSettings.smtpPassword },
        { key: 'from_email', value: allSettings.fromEmail },
        { key: 'from_name', value: allSettings.fromName },
        { key: 'enable_email_notifications', value: String(allSettings.enableEmailNotifications) },
      ];
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsArray),
      });
      if (!res.ok) throw new Error('Failed to save settings');
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  }

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

  const handleResetSettings = async (
    type: 'general' | 'security' | 'email'
  ) => {
    if (
      !confirm(
        'Are you sure you want to reset these settings to default values?'
      )
    ) {
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

      toast.success(
        `${type.charAt(0).toUpperCase() + type.slice(1)} settings reset to defaults`
      );
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
      <div className='px-6 py-4 border-b border-gray-200'>
        <h2 className='text-xl font-semibold text-primary'>System Settings</h2>
        <p className='text-sm text-gray-text mt-1'>
          Configure system-wide settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className='border-b border-gray-200'>
        <nav className='flex space-x-8 px-6'>
          {tabs.map(tab => {
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
                <Icon className='w-4 h-4' />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className='p-6'>
        {settingsLoading ? (
          <div className='p-8 text-center text-gray-500'>Loading settings...</div>
        ) : settingsError ? (
          <div className='p-8 text-center text-red-500'>{settingsError}</div>
        ) : (
          <>
            {/* General Settings */}
            {activeTab === 'general' && (
              <FormProvider {...generalForm}>
                <form
                  onSubmit={generalForm.handleSubmit(() =>
                    handleSaveSettings('general')
                  )}
                >
                  <div className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <FormField
                        name='siteName'
                        label='Site Name'
                        placeholder='Enter site name'
                      />
                      <FormField
                        name='siteDescription'
                        label='Site Description'
                        placeholder='Enter site description'
                      />
                      <FormField
                        name='timezone'
                        label='Timezone'
                        type='select'
                        options={[
                          { value: 'UTC', label: 'UTC' },
                          { value: 'America/New_York', label: 'Eastern Time' },
                          { value: 'America/Chicago', label: 'Central Time' },
                          { value: 'America/Denver', label: 'Mountain Time' },
                          { value: 'America/Los_Angeles', label: 'Pacific Time' },
                        ]}
                      />
                      <FormField
                        name='dateFormat'
                        label='Date Format'
                        type='select'
                        options={[
                          { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                          { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                          { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
                        ]}
                      />
                      <FormField
                        name='language'
                        label='Language'
                        type='select'
                        options={[
                          { value: 'en', label: 'English' },
                          { value: 'es', label: 'Spanish' },
                          { value: 'fr', label: 'French' },
                          { value: 'de', label: 'German' },
                        ]}
                      />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Site Logo</label>
                        {logoPreview ? (
                          <img src={logoPreview} alt='Logo Preview' className='h-12 mb-2' />
                        ) : (
                          <div className='h-12 mb-2 flex items-center text-gray-400'>No logo uploaded</div>
                        )}
                        <input type='file' accept='image/*' onChange={handleLogoChange} disabled={logoUploading} />
                        {logoUploading && <div className='text-xs text-blue-600 mt-1'>Uploading...</div>}
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Favicon</label>
                        {faviconPreview ? (
                          <img src={faviconPreview} alt='Favicon Preview' className='h-8 w-8 mb-2' />
                        ) : (
                          <div className='h-8 w-8 mb-2 flex items-center text-gray-400'>No favicon uploaded</div>
                        )}
                        <input type='file' accept='image/*' onChange={handleFaviconChange} disabled={faviconUploading} />
                        {faviconUploading && <div className='text-xs text-blue-600 mt-1'>Uploading...</div>}
                      </div>
                    </div>

                    <div className='space-y-4'>
                      <h3 className='text-lg font-medium text-primary'>
                        System Options
                      </h3>
                      <div className='space-y-3'>
                        <div className='flex items-center'>
                          <input
                            type='checkbox'
                            {...generalForm.register('maintenanceMode')}
                            className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                          />
                          <label className='ml-2 text-sm text-gray-700'>
                            Maintenance Mode - Enable maintenance mode to restrict
                            access
                          </label>
                        </div>
                        <div className='flex items-center'>
                          <input
                            type='checkbox'
                            {...generalForm.register('allowRegistration')}
                            className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                          />
                          <label className='ml-2 text-sm text-gray-700'>
                            Allow User Registration - Allow new users to register
                            accounts
                          </label>
                        </div>
                        <div className='flex items-center'>
                          <input
                            type='checkbox'
                            {...generalForm.register('requireEmailVerification')}
                            className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                          />
                          <label className='ml-2 text-sm text-gray-700'>
                            Require Email Verification - Require email verification
                            for new accounts
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className='flex justify-end space-x-3'>
                      <Button
                        type='button'
                        variant='secondary'
                        onClick={() => handleResetSettings('general')}
                        disabled={isLoading}
                      >
                        <RotateCcw className='w-4 h-4 mr-2' />
                        Reset to Defaults
                      </Button>
                      <Button type='submit' disabled={isLoading}>
                        <Save className='w-4 h-4 mr-2' />
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
                <form
                  onSubmit={securityForm.handleSubmit(() =>
                    handleSaveSettings('security')
                  )}
                >
                  <div className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <FormField
                        name='sessionTimeout'
                        label='Session Timeout (minutes)'
                        type='number'
                      />
                      <FormField
                        name='maxLoginAttempts'
                        label='Max Login Attempts'
                        type='number'
                      />
                      <FormField
                        name='passwordMinLength'
                        label='Minimum Password Length'
                        type='number'
                      />
                      <FormField
                        name='maxFileSize'
                        label='Max File Size (MB)'
                        type='number'
                      />
                    </div>

                    <div className='space-y-4'>
                      <h3 className='text-lg font-medium text-primary'>
                        Security Options
                      </h3>
                      <div className='space-y-3'>
                        <div className='flex items-center'>
                          <input
                            type='checkbox'
                            {...securityForm.register('requireStrongPassword')}
                            className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                          />
                          <label className='ml-2 text-sm text-gray-700'>
                            Require Strong Password - Enforce password complexity
                            requirements
                          </label>
                        </div>
                        <div className='flex items-center'>
                          <input
                            type='checkbox'
                            {...securityForm.register('enableTwoFactor')}
                            className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                          />
                          <label className='ml-2 text-sm text-gray-700'>
                            Enable Two-Factor Authentication - Allow users to enable
                            2FA for their accounts
                          </label>
                        </div>
                        <div className='flex items-center'>
                          <input
                            type='checkbox'
                            {...securityForm.register('enableAuditLog')}
                            className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                          />
                          <label className='ml-2 text-sm text-gray-700'>
                            Enable Audit Logging - Log all system activities for
                            security monitoring
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className='space-y-4'>
                      <h3 className='text-lg font-medium text-primary'>
                        File Upload Security
                      </h3>
                      <FormField
                        name='allowedFileTypes'
                        label='Allowed File Types'
                        placeholder='jpg,jpeg,png,gif,pdf,doc,docx'
                      />
                    </div>

                    <div className='flex justify-end space-x-3'>
                      <Button
                        type='button'
                        variant='secondary'
                        onClick={() => handleResetSettings('security')}
                        disabled={isLoading}
                      >
                        <RotateCcw className='w-4 h-4 mr-2' />
                        Reset to Defaults
                      </Button>
                      <Button type='submit' disabled={isLoading}>
                        <Save className='w-4 h-4 mr-2' />
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
                <form
                  onSubmit={emailForm.handleSubmit(() =>
                    handleSaveSettings('email')
                  )}
                >
                  <div className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <FormField
                        name='smtpHost'
                        label='SMTP Host'
                        placeholder='smtp.gmail.com'
                      />
                      <FormField name='smtpPort' label='SMTP Port' type='number' />
                      <FormField
                        name='smtpUsername'
                        label='SMTP Username'
                        placeholder='your-email@gmail.com'
                      />
                      <div className='relative'>
                        <FormField
                          name='smtpPassword'
                          label='SMTP Password'
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Enter SMTP password'
                        />
                        <button
                          type='button'
                          onClick={() => setShowPassword(!showPassword)}
                          className='absolute right-3 top-8 text-gray-400 hover:text-gray-text'
                        >
                          {showPassword ? (
                            <EyeOff className='w-4 h-4' />
                          ) : (
                            <Eye className='w-4 h-4' />
                          )}
                        </button>
                      </div>
                      <FormField
                        name='fromEmail'
                        label='From Email'
                        type='email'
                        placeholder='noreply@yourdomain.com'
                      />
                      <FormField
                        name='fromName'
                        label='From Name'
                        placeholder='Your Company Name'
                      />
                    </div>

                    <div className='space-y-4'>
                      <h3 className='text-lg font-medium text-primary'>
                        Email Options
                      </h3>
                      <div className='flex items-center'>
                        <input
                          type='checkbox'
                          {...emailForm.register('enableEmailNotifications')}
                          className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                        />
                        <label className='ml-2 text-sm text-gray-700'>
                          Enable Email Notifications - Send email notifications for
                          system events
                        </label>
                      </div>
                    </div>

                    <div className='flex justify-end space-x-3'>
                      <Button
                        type='button'
                        variant='secondary'
                        onClick={() => setShowTestEmailModal(true)}
                        disabled={isLoading}
                      >
                        <Mail className='w-4 h-4 mr-2' />
                        Test Email
                      </Button>
                      <Button
                        type='button'
                        variant='secondary'
                        onClick={() => handleResetSettings('email')}
                        disabled={isLoading}
                      >
                        <RotateCcw className='w-4 h-4 mr-2' />
                        Reset to Defaults
                      </Button>
                      <Button type='submit' disabled={isLoading}>
                        <Save className='w-4 h-4 mr-2' />
                        {isLoading ? 'Saving...' : 'Save Settings'}
                      </Button>
                    </div>
                  </div>
                </form>
              </FormProvider>
            )}

            {/* Advanced Settings */}
            {activeTab === 'advanced' && (
              <div className='space-y-6'>
                <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
                  <div className='flex'>
                    <AlertCircle className='w-5 h-5 text-yellow-400 mr-3 mt-0.5' />
                    <div>
                      <h3 className='text-sm font-medium text-yellow-800'>
                        Advanced Settings
                      </h3>
                      <p className='text-sm text-yellow-700 mt-1'>
                        These settings are for advanced users. Incorrect
                        configuration may affect system performance.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <h3 className='text-lg font-medium text-primary'>
                    System Performance
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Cache Duration (seconds)
                      </label>
                      <input
                        type='number'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        defaultValue={3600}
                        min={60}
                        max={86400}
                      />
                    </div>
                    <div className='space-y-2'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Max Concurrent Users
                      </label>
                      <input
                        type='number'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        defaultValue={100}
                        min={10}
                        max={1000}
                      />
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <h3 className='text-lg font-medium text-primary'>
                    Database Settings
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Connection Pool Size
                      </label>
                      <input
                        type='number'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        defaultValue={10}
                        min={5}
                        max={50}
                      />
                    </div>
                    <div className='space-y-2'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Query Timeout (seconds)
                      </label>
                      <input
                        type='number'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        defaultValue={30}
                        min={5}
                        max={300}
                      />
                    </div>
                  </div>
                </div>

                <div className='flex justify-end space-x-3'>
                  <Button variant='secondary'>
                    <RotateCcw className='w-4 h-4 mr-2' />
                    Reset to Defaults
                  </Button>
                  <Button>
                    <Save className='w-4 h-4 mr-2' />
                    Save Advanced Settings
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Test Email Modal */}
      <Modal
        isOpen={showTestEmailModal}
        onClose={() => setShowTestEmailModal(false)}
        title='Send Test Email'
      >
        <div className='space-y-4'>
          <p className='text-sm text-gray-text'>
            Enter an email address to send a test email and verify your SMTP
            configuration.
          </p>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Email Address
            </label>
            <input
              type='email'
              value={testEmailAddress}
              onChange={e => setTestEmailAddress(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='test@example.com'
            />
          </div>
          <div className='flex justify-end space-x-3'>
            <Button
              variant='secondary'
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
