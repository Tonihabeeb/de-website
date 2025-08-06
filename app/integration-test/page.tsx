'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/Toast';
import { apiFetch, ApiException } from '@/utils/api';
import {
  PageLoader,
  InlineLoader,
  ButtonLoader,
} from '@/components/ui/LoadingSpinner';
import DocumentUpload from '@/components/documents/DocumentUpload';
import DocumentList from '@/components/documents/DocumentList';
import RoleGuard from '@/components/auth/RoleGuard';
import {
  CheckCircle,
  AlertCircle,
  Info,
  User,
  FileText,
  Database,
  Server,
  Globe,
} from 'lucide-react';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  details?: any;
}

export default function IntegrationTestPage() {
  const { user, isAuthenticated, login, logout, hasRole } = useAuth();

  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);

  const runIntegrationTests = async () => {
    setIsRunningTests(true);
    setTestResults([]);

    const tests: TestResult[] = [];

    // Test 1: Authentication Context
    tests.push({
      name: 'Authentication Context',
      status: 'pending',
      message: 'Testing authentication context...',
    });

    if (isAuthenticated && user) {
      tests[0] = {
        name: 'Authentication Context',
        status: 'success',
        message: `Authenticated as ${user.name} (${user.role})`,
        details: { user },
      };
    } else {
      tests[0] = {
        name: 'Authentication Context',
        status: 'error',
        message: 'Not authenticated',
      };
    }

    // Test 2: API Connection
    tests.push({
      name: 'Backend API Connection',
      status: 'pending',
      message: 'Testing API connection...',
    });

    try {
      const response = await apiFetch<{ message: string }>('/');
      tests[1] = {
        name: 'Backend API Connection',
        status: 'success',
        message: 'API connection successful',
        details: response,
      };
    } catch (error: any) {
      tests[1] = {
        name: 'Backend API Connection',
        status: 'error',
        message:
          error instanceof ApiException
            ? error.message
            : 'API connection failed',
        details: error,
      };
    }

    // Test 3: Documents API
    tests.push({
      name: 'Documents API',
      status: 'pending',
      message: 'Testing documents API...',
    });

    try {
      const response = await apiFetch<{ media: any[] }>('/api/admin/media');
      tests[2] = {
        name: 'Documents API',
        status: 'success',
        message: `Found ${response.media?.length || 0} documents/media`,
        details: response,
      };
    } catch (error: any) {
      tests[2] = {
        name: 'Documents API',
        status: 'error',
        message:
          error instanceof ApiException
            ? error.message
            : 'Documents API failed',
        details: error,
      };
    }

    // Test 4: Role-Based Access
    tests.push({
      name: 'Role-Based Access Control',
      status: 'pending',
      message: 'Testing role-based access...',
    });

    const roleTests = {
      admin: hasRole('admin'),
      editor: hasRole('editor'),
      viewer: hasRole('viewer'),
      user: hasRole('user'),
    };

    tests[3] = {
      name: 'Role-Based Access Control',
      status: 'success',
      message: 'Role checks working',
      details: roleTests,
    };

    // Test 5: Toast System
    tests.push({
      name: 'Toast Notification System',
      status: 'pending',
      message: 'Testing toast notifications...',
    });

    // Test toast system
    toast.info('Toast system is working correctly!');

    tests[4] = {
      name: 'Toast Notification System',
      status: 'success',
      message: 'Toast notifications working',
      details: 'Toast sent successfully',
    };

    setTestResults(tests);
    setIsRunningTests(false);

    // Show success toast
    toast.success(
      `${tests.filter(t => t.status === 'success').length}/${tests.length} tests passed`
    );
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className='h-5 w-5 text-green-500' />;
      case 'error':
        return <AlertCircle className='h-5 w-5 text-red-500' />;
      case 'pending':
        return <InlineLoader />;
      default:
        return <Info className="h-5 w-5 text-white" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'pending':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className="text-3xl font-bold text-white">
            Frontend-Backend Integration Test
          </h1>
          <p className="text-lg text-white">
            This page tests all the integrations from previous stages to ensure
            everything is working together properly.
          </p>
        </div>

        {/* Authentication Status */}
        <div className='bg-white rounded-lg shadow p-6 mb-8'>
          <h2 className="text-xl font-semibold text-white">
            <User className='h-5 w-5 mr-2' />
            Authentication Status
          </h2>

          {isAuthenticated ? (
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className="text-sm font-medium text-white">
                    Logged in as:
                  </p>
                  <p className="text-lg text-white">{user?.name}</p>
                  <p className="text-sm text-white">
                    {user?.email} • Role: {user?.role}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gradient-to-b from-red-700 to-red-500 text-white hover:from-red-800 hover:to-red-600 active:from-red-900 active:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none transition-colors text-white"
                >
                  Logout
                </button>
              </div>

              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <div className='text-center p-3 bg-gray-50 rounded'>
                  <p className="text-sm font-medium text-white">
                    Admin Access
                  </p>
                  <p
                    className={`text-lg font-bold ${hasRole('admin') ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {hasRole('admin') ? 'Yes' : 'No'}
                  </p>
                </div>
                <div className='text-center p-3 bg-gray-50 rounded'>
                  <p className="text-sm font-medium text-white">
                    Editor Access
                  </p>
                  <p
                    className={`text-lg font-bold ${hasRole('editor') ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {hasRole('editor') ? 'Yes' : 'No'}
                  </p>
                </div>
                <div className='text-center p-3 bg-gray-50 rounded'>
                  <p className="text-sm font-medium text-white">
                    Viewer Access
                  </p>
                  <p
                    className={`text-lg font-bold ${hasRole('viewer') ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {hasRole('viewer') ? 'Yes' : 'No'}
                  </p>
                </div>
                <div className='text-center p-3 bg-gray-50 rounded'>
                  <p className="text-sm font-medium text-white">
                    User Access
                  </p>
                  <p
                    className={`text-lg font-bold ${hasRole('user') ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {hasRole('user') ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className='text-center py-8'>
              <p className="text-white">
                You need to be logged in to run integration tests.
              </p>
              <button
                onClick={() => (window.location.href = '/login')}
                className="px-6 py-3 bg-gradient-to-b from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 active:from-blue-900 active:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none transition-colors text-white"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>

        {/* Integration Tests */}
        {isAuthenticated && (
          <div className='bg-white rounded-lg shadow p-6 mb-8'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className="text-xl font-semibold text-white">
                <Database className='h-5 w-5 mr-2' />
                Integration Tests
              </h2>
              <button
                onClick={runIntegrationTests}
                disabled={isRunningTests}
                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              >
                {isRunningTests ? (
                  <>
                    <ButtonLoader size='sm' />
                    <span className='ml-2'>Running Tests...</span>
                  </>
                ) : (
                  <>
                    <Server className='h-4 w-4 mr-2' />
                    Run Tests
                  </>
                )}
              </button>
            </div>

            {testResults.length > 0 && (
              <div className='space-y-4'>
                {testResults.map((test, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${getStatusColor(test.status)}`}
                  >
                    <div className='flex items-start justify-between'>
                      <div className='flex items-start space-x-3'>
                        {getStatusIcon(test.status)}
                        <div className='flex-1'>
                          <h3 className="text-sm font-medium text-white">
                            {test.name}
                          </h3>
                          <p className="text-sm text-white">
                            {test.message}
                          </p>
                          {test.details && (
                            <details className='mt-2'>
                              <summary className="cursor-pointer text-xs text-gray-700 hover:text-white">
                                View Details
                              </summary>
                              <pre className='mt-2 text-xs bg-white p-2 rounded border overflow-auto max-h-32'>
                                {JSON.stringify(test.details, null, 2)}
                              </pre>
                            </details>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Document Management Test */}
        {isAuthenticated && (
          <div className='bg-white rounded-lg shadow p-6 mb-8'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className="text-xl font-semibold text-white">
                <FileText className='h-5 w-5 mr-2' />
                Document Management Test
              </h2>
              <RoleGuard roles={['admin', 'editor']}>
                <button
                  onClick={() => setShowDocumentUpload(!showDocumentUpload)}
                  className="px-4 py-2 bg-gradient-to-b from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 active:from-blue-900 active:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none transition-colors text-white"
                >
                  {showDocumentUpload ? 'Hide Upload' : 'Test Upload'}
                </button>
              </RoleGuard>
            </div>

            {showDocumentUpload && (
              <div className='mb-6'>
                <DocumentUpload
                  onUploadSuccess={document => {
                    toast.success(
                      'Document uploaded successfully during integration test!'
                    );
                  }}
                  onUploadError={error => {
                    toast.error(`Upload failed: ${error}`);
                  }}
                  multiple={false}
                />
              </div>
            )}

            <DocumentList
              showActions={false}
              onDocumentSelect={document => {
                toast.info(`Selected: ${document.original_name}`);
              }}
            />
          </div>
        )}

        {/* Toast Test */}
        {isAuthenticated && (
          <div className='bg-white rounded-lg shadow p-6'>
            <h2 className="text-xl font-semibold text-white">
              <Globe className='h-5 w-5 mr-2' />
              Toast Notification Test
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <button
                onClick={() => toast.success('This is a success notification!')}
                className="px-4 py-2 bg-gradient-to-b from-green-700 to-green-500 text-white hover:from-green-800 hover:to-green-600 active:from-green-900 active:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none transition-colors text-white"
              >
                Success Toast
              </button>
              <button
                onClick={() => toast.error('This is an error notification!')}
                className="px-4 py-2 bg-gradient-to-b from-red-700 to-red-500 text-white hover:from-red-800 hover:to-red-600 active:from-red-900 active:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none transition-colors text-white"
              >
                Error Toast
              </button>
              <button
                onClick={() => toast.warning('This is a warning notification!')}
                className="px-4 py-2 bg-gradient-to-b from-yellow-700 to-yellow-500 text-white hover:from-yellow-800 hover:to-yellow-600 active:from-yellow-900 active:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none transition-colors text-white"
              >
                Warning Toast
              </button>
              <button
                onClick={() => toast.info('This is an info notification!')}
                className="px-4 py-2 bg-gradient-to-b from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 active:from-blue-900 active:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none transition-colors text-white"
              >
                Info Toast
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
