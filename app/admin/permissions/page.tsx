'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  Users,
  FileText,
  Settings,
  ArrowLeft,
  Save,
  Plus,
  Trash2,
} from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export default function AdminPermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now
    setPermissions([
      { id: '1', name: 'create_users', description: 'Create new users', category: 'User Management' },
      { id: '2', name: 'edit_users', description: 'Edit existing users', category: 'User Management' },
      { id: '3', name: 'delete_users', description: 'Delete users', category: 'User Management' },
      { id: '4', name: 'create_pages', description: 'Create new pages', category: 'Content Management' },
      { id: '5', name: 'edit_pages', description: 'Edit existing pages', category: 'Content Management' },
      { id: '6', name: 'delete_pages', description: 'Delete pages', category: 'Content Management' },
      { id: '7', name: 'publish_pages', description: 'Publish pages', category: 'Content Management' },
      { id: '8', name: 'manage_settings', description: 'Manage system settings', category: 'System' },
    ]);

    setRoles([
      { id: '1', name: 'superadmin', permissions: ['1', '2', '3', '4', '5', '6', '7', '8'] },
      { id: '2', name: 'admin', permissions: ['1', '2', '4', '5', '6', '7'] },
      { id: '3', name: 'editor', permissions: ['4', '5', '7'] },
      { id: '4', name: 'author', permissions: ['4', '5'] },
      { id: '5', name: 'user', permissions: [] },
    ]);

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className='p-6'>
        <div className='flex items-center justify-center h-64'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          <span className='ml-2 text-gray-600'>Loading permissions...</span>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requiredRoles={['admin', 'superadmin']}>
      <div className='p-6'>
        {/* Header */}
        <div className='mb-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Link
                href='/admin/users'
                className='text-gray-500 hover:text-gray-700 transition-colors'
              >
                <ArrowLeft className='w-5 h-5' />
              </Link>
              <div>
                <h1 className='text-2xl font-bold text-gray-900'>
                  Permission Management
                </h1>
                <p className='text-gray-600 mt-1'>
                  Manage roles and permissions
                </p>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors'>
                <Save className='w-4 h-4 mr-2' />
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Permissions Overview */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white p-6 rounded-lg shadow'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Total Permissions</p>
                <p className='text-2xl font-bold text-gray-900'>{permissions.length}</p>
              </div>
              <Shield className='w-8 h-8 text-blue-500' />
            </div>
          </div>
          <div className='bg-white p-6 rounded-lg shadow'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Total Roles</p>
                <p className='text-2xl font-bold text-gray-900'>{roles.length}</p>
              </div>
              <Users className='w-8 h-8 text-green-500' />
            </div>
          </div>
          <div className='bg-white p-6 rounded-lg shadow'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Categories</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {new Set(permissions.map(p => p.category)).size}
                </p>
              </div>
              <FileText className='w-8 h-8 text-purple-500' />
            </div>
          </div>
        </div>

        {/* Roles and Permissions Table */}
        <div className='bg-white rounded-lg shadow'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-lg font-medium text-gray-900'>Role Permissions</h2>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Role
                  </th>
                  {permissions.map(permission => (
                    <th key={permission.id} className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      {permission.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {roles.map(role => (
                  <tr key={role.id}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                        {role.name}
                      </span>
                    </td>
                    {permissions.map(permission => (
                      <td key={permission.id} className='px-6 py-4 whitespace-nowrap'>
                        <input
                          type='checkbox'
                          checked={role.permissions.includes(permission.id)}
                          className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                          readOnly
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Permission Categories */}
        <div className='mt-8 bg-white rounded-lg shadow'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-lg font-medium text-gray-900'>Permission Categories</h2>
          </div>
          <div className='p-6'>
            {Array.from(new Set(permissions.map(p => p.category))).map(category => (
              <div key={category} className='mb-6'>
                <h3 className='text-md font-medium text-gray-900 mb-3'>{category}</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                  {permissions
                    .filter(p => p.category === category)
                    .map(permission => (
                      <div key={permission.id} className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                        <div>
                          <p className='text-sm font-medium text-gray-900'>{permission.name}</p>
                          <p className='text-xs text-gray-500'>{permission.description}</p>
                        </div>
                        <button className='text-red-500 hover:text-red-700'>
                          <Trash2 className='w-4 h-4' />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 