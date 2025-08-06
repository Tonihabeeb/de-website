'use client';

import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import { toast } from '@/components/ui/Toast';
import FileUpload from '@/components/ui/FileUpload';
import {
  Users,
  UserPlus,
  UserMinus,
  Shield,
  Mail,
  Download,
  Upload,
  CheckSquare,
  Square,
  Trash2,
  Edit,
  Eye,
  Filter,
  RefreshCw,
} from 'lucide-react';
import Button from '@/components/ui/Button';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor' | 'author' | 'user';
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: string;
  createdAt: string;
  department?: string;
  permissions: string[];
}

interface BulkOperation {
  type: 'role_update' | 'status_update' | 'delete' | 'export' | 'import';
  selectedUsers: string[];
  data?: any;
}

const BulkUserOperations: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    department: '',
  });
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkOperation, setBulkOperation] = useState<BulkOperation | null>(
    null
  );
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);

  // Mock data
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: new Date(Date.now() - 3600000).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      department: 'Engineering',
      permissions: ['read', 'write', 'delete'],
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'editor',
      status: 'active',
      lastLogin: new Date(Date.now() - 7200000).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
      department: 'Marketing',
      permissions: ['read', 'write'],
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'user',
      status: 'inactive',
      lastLogin: new Date(Date.now() - 86400000 * 7).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
      department: 'Sales',
      permissions: ['read'],
    },
    {
      id: '4',
      name: 'Alice Brown',
      email: 'alice@example.com',
      role: 'author',
      status: 'pending',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      department: 'Content',
      permissions: ['read', 'write'],
    },
    {
      id: '5',
      name: 'Charlie Wilson',
      email: 'charlie@example.com',
      role: 'user',
      status: 'active',
      lastLogin: new Date(Date.now() - 3600000).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
      department: 'Support',
      permissions: ['read'],
    },
  ];

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBulkOperation = (operation: BulkOperation['type']) => {
    if (selectedUsers.length === 0) {
      toast.warning('Please select users first');
      return;
    }

    setBulkOperation({
      type: operation,
      selectedUsers,
    });
    setIsBulkModalOpen(true);
  };

  const executeBulkOperation = async () => {
    if (!bulkOperation) return;

    try {
      setLoading(true);

      switch (bulkOperation.type) {
        case 'role_update':
          await updateUserRoles(
            bulkOperation.selectedUsers,
            bulkOperation.data.role
          );
          break;
        case 'status_update':
          await updateUserStatuses(
            bulkOperation.selectedUsers,
            bulkOperation.data.status
          );
          break;
        case 'delete':
          await deleteUsers(bulkOperation.selectedUsers);
          break;
        case 'export':
          await exportUsers(bulkOperation.selectedUsers);
          break;
      }

      toast.success(`Bulk operation completed successfully`);
      setSelectedUsers([]);
      loadUsers();
    } catch (error) {
      toast.error('Bulk operation failed');
    } finally {
      setLoading(false);
      setIsBulkModalOpen(false);
      setBulkOperation(null);
    }
  };

  const updateUserRoles = async (userIds: string[], role: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUsers(prev =>
      prev.map(user =>
        userIds.includes(user.id)
          ? { ...user, role: role as User['role'] }
          : user
      )
    );
  };

  const updateUserStatuses = async (userIds: string[], status: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUsers(prev =>
      prev.map(user =>
        userIds.includes(user.id)
          ? { ...user, status: status as User['status'] }
          : user
      )
    );
  };

  const deleteUsers = async (userIds: string[]) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUsers(prev => prev.filter(user => !userIds.includes(user.id)));
  };

  const exportUsers = async (userIds: string[]) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const usersToExport = users.filter(user => userIds.includes(user.id));
    const csvContent = generateCSV(usersToExport);
    downloadCSV(csvContent, 'users_export.csv');
  };

  const generateCSV = (users: User[]) => {
    const headers = [
      'Name',
      'Email',
      'Role',
      'Status',
      'Department',
      'Created At',
    ];
    const rows = users.map(user => [
      user.name,
      user.email,
      user.role,
      user.status,
      user.department || '',
      new Date(user.createdAt).toLocaleDateString(),
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleImport = async () => {
    if (!importFile) {
      toast.warning('Please select a file to import');
      return;
    }

    try {
      setLoading(true);
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate adding new users
      const newUsers: User[] = [
        {
          id: Date.now().toString(),
          name: 'Imported User 1',
          email: 'imported1@example.com',
          role: 'user',
          status: 'pending',
          createdAt: new Date().toISOString(),
          permissions: ['read'],
        },
        {
          id: (Date.now() + 1).toString(),
          name: 'Imported User 2',
          email: 'imported2@example.com',
          role: 'editor',
          status: 'active',
          createdAt: new Date().toISOString(),
          permissions: ['read', 'write'],
        },
      ];

      setUsers(prev => [...prev, ...newUsers]);
      toast.success(`Successfully imported ${newUsers.length} users`);
      setIsImportModalOpen(false);
      setImportFile(null);
    } catch (error) {
      toast.error('Import failed');
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-100 text-red-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'editor':
        return 'bg-blue-100 text-blue-800';
      case 'author':
        return 'bg-green-100 text-green-800';
      case 'user':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      id: 'select',
      header: () => (
        <button onClick={handleSelectAll} className='p-1'>
          {selectedUsers.length === filteredUsers.length ? (
            <CheckSquare className='w-4 h-4 text-blue-600' />
          ) : (
            <Square className="w-4 h-4 text-white" />
          )}
        </button>
      ),
      cell: ({ row }) => (
        <button
          onClick={() => handleSelectUser(row.original.id)}
          className='p-1'
        >
          {selectedUsers.includes(row.original.id) ? (
            <CheckSquare className='w-4 h-4 text-blue-600' />
          ) : (
            <Square className="w-4 h-4 text-white" />
          )}
        </button>
      ),
    },
    {
      accessorKey: 'name',
      header: 'User',
      cell: ({ row }) => (
        <div>
          <p className="text-sm font-medium text-white">
            {row.getValue('name')}
          </p>
          <p className="text-xs text-white">{row.original.email}</p>
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(row.getValue('role') as string)}`}
        >
          {(row.getValue('role') as string).replace('_', ' ')}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.getValue('status') as string)}`}
        >
          {row.getValue('status') as string}
        </span>
      ),
    },
    {
      accessorKey: 'department',
      header: 'Department',
      cell: ({ row }) => (
        <span className="text-sm text-white">
          {row.original.department || '-'}
        </span>
      ),
    },
    {
      accessorKey: 'lastLogin',
      header: 'Last Login',
      cell: ({ row }) => (
        <span className="text-sm text-white">
          {row.original.lastLogin
            ? new Date(row.original.lastLogin).toLocaleDateString()
            : 'Never'}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className='flex space-x-1'>
          <Button variant='secondary' size='sm'>
            <Eye className='w-4 h-4' />
          </Button>
          <Button variant='secondary' size='sm'>
            <Edit className='w-4 h-4' />
          </Button>
        </div>
      ),
    },
  ];

  const filteredUsers = users.filter(user => {
    if (filters.role && user.role !== filters.role) return false;
    if (filters.status && user.status !== filters.status) return false;
    if (filters.department && user.department !== filters.department)
      return false;
    return true;
  });

  return (
    <div className='space-y-6'>
      {/* Statistics */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center'>
            <div className="p-2 bg-blue-100 rounded-lg text-white">
              <Users className='w-6 h-6 text-blue-600' />
            </div>
            <div className='ml-4'>
              <p className="text-sm font-medium text-white">Total Users</p>
              <p className="text-2xl font-bold text-white">{users.length}</p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center'>
            <div className='p-2 bg-green-100 rounded-lg'>
              <UserPlus className='w-6 h-6 text-green-600' />
            </div>
            <div className='ml-4'>
              <p className="text-sm font-medium text-white">Active Users</p>
              <p className="text-2xl font-bold text-white">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center'>
            <div className='p-2 bg-yellow-100 rounded-lg'>
              <Shield className='w-6 h-6 text-yellow-600' />
            </div>
            <div className='ml-4'>
              <p className="text-sm font-medium text-white">Admins</p>
              <p className="text-2xl font-bold text-white">
                {
                  users.filter(
                    u => u.role === 'admin' || u.role === 'super_admin'
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center'>
            <div className='p-2 bg-purple-100 rounded-lg'>
              <Mail className='w-6 h-6 text-purple-600' />
            </div>
            <div className='ml-4'>
              <p className="text-sm font-medium text-white">Pending</p>
              <p className="text-2xl font-bold text-white">
                {users.filter(u => u.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-lg shadow p-6'>
        <h3 className="text-lg font-medium text-white">Filters</h3>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div>
            <label className="block text-sm font-medium text-white">
              Role
            </label>
            <select
              value={filters.role}
              onChange={e =>
                setFilters(prev => ({ ...prev, role: e.target.value }))
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>All Roles</option>
              <option value='super_admin'>Super Admin</option>
              <option value='admin'>Admin</option>
              <option value='editor'>Editor</option>
              <option value='author'>Author</option>
              <option value='user'>User</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Status
            </label>
            <select
              value={filters.status}
              onChange={e =>
                setFilters(prev => ({ ...prev, status: e.target.value }))
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>All Statuses</option>
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
              <option value='pending'>Pending</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Department
            </label>
            <select
              value={filters.department}
              onChange={e =>
                setFilters(prev => ({ ...prev, department: e.target.value }))
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>All Departments</option>
              <option value='Engineering'>Engineering</option>
              <option value='Marketing'>Marketing</option>
              <option value='Sales'>Sales</option>
              <option value='Content'>Content</option>
              <option value='Support'>Support</option>
            </select>
          </div>

          <div className='flex items-end'>
            <Button variant='secondary' onClick={loadUsers}>
              <RefreshCw className='w-4 h-4 mr-2' />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className='bg-white rounded-lg shadow p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className="text-lg font-medium text-white">Bulk Operations</h3>
          <div className="text-sm text-white">
            {selectedUsers.length} user(s) selected
          </div>
        </div>

        <div className='flex flex-wrap gap-3'>
          <Button
            variant='secondary'
            onClick={() => handleBulkOperation('role_update')}
            disabled={selectedUsers.length === 0}
          >
            <Shield className='w-4 h-4 mr-2' />
            Update Role
          </Button>

          <Button
            variant='secondary'
            onClick={() => handleBulkOperation('status_update')}
            disabled={selectedUsers.length === 0}
          >
            <UserPlus className='w-4 h-4 mr-2' />
            Update Status
          </Button>

          <Button
            variant='secondary'
            onClick={() => handleBulkOperation('export')}
            disabled={selectedUsers.length === 0}
          >
            <Download className='w-4 h-4 mr-2' />
            Export Selected
          </Button>

          <Button
            variant='secondary'
            onClick={() => setIsImportModalOpen(true)}
          >
            <Upload className='w-4 h-4 mr-2' />
            Import Users
          </Button>

          <Button
            onClick={() => handleBulkOperation('delete')}
            disabled={selectedUsers.length === 0}
            className='bg-red-600 hover:bg-red-700'
          >
            <Trash2 className='w-4 h-4 mr-2' />
            Delete Selected
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className='bg-white rounded-lg shadow'>
        <div className='px-6 py-4 border-b border-gray-200'>
          <h2 className="text-xl font-bold text-white">User Management</h2>
        </div>
        <DataTable
          columns={columns}
          data={filteredUsers}
          searchKey='name'
          searchPlaceholder='Search users...'
          pageSize={10}
        />
      </div>

      {/* Bulk Operation Modal */}
      <Modal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        title={`Bulk ${bulkOperation?.type.replace('_', ' ')}`}
        size='md'
      >
        {bulkOperation && (
          <div className='space-y-4'>
            <p className="text-white">
              You are about to perform a bulk operation on{' '}
              {bulkOperation.selectedUsers.length} user(s).
            </p>

            {bulkOperation.type === 'role_update' && (
              <div>
                <label className="block text-sm font-medium text-white">
                  New Role
                </label>
                <select
                  onChange={e =>
                    setBulkOperation(prev =>
                      prev ? { ...prev, data: { role: e.target.value } } : null
                    )
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value=''>Select Role</option>
                  <option value='admin'>Admin</option>
                  <option value='editor'>Editor</option>
                  <option value='author'>Author</option>
                  <option value='user'>User</option>
                </select>
              </div>
            )}

            {bulkOperation.type === 'status_update' && (
              <div>
                <label className="block text-sm font-medium text-white">
                  New Status
                </label>
                <select
                  onChange={e =>
                    setBulkOperation(prev =>
                      prev
                        ? { ...prev, data: { status: e.target.value } }
                        : null
                    )
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value=''>Select Status</option>
                  <option value='active'>Active</option>
                  <option value='inactive'>Inactive</option>
                  <option value='pending'>Pending</option>
                </select>
              </div>
            )}

            {bulkOperation.type === 'delete' && (
              <div className='bg-red-50 border border-red-200 rounded-md p-4'>
                <p className='text-red-800 font-medium'>
                  Warning: This action cannot be undone!
                </p>
                <p className='text-red-600 text-sm mt-1'>
                  All selected users will be permanently deleted from the
                  system.
                </p>
              </div>
            )}

            <div className='flex justify-end space-x-3'>
              <Button
                variant='secondary'
                onClick={() => setIsBulkModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={executeBulkOperation}
                disabled={!bulkOperation.data || loading}
                className={
                  bulkOperation.type === 'delete'
                    ? 'bg-red-600 hover:bg-red-700'
                    : ''
                }
              >
                {loading ? 'Processing...' : 'Confirm'}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Import Modal */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title='Import Users'
        size='lg'
      >
        <div className='space-y-4'>
          <p className="text-white">
            Upload a CSV file with user data. The file should contain columns:
            Name, Email, Role, Department.
          </p>

          <FileUpload
            onFilesSelected={files => setImportFile(files[0])}
            maxFiles={1}
            accept={{
              'text/csv': ['.csv'],
              'application/vnd.ms-excel': ['.xls'],
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                ['.xlsx'],
            }}
          />

          {importFile && (
            <div className='bg-gray-50 p-4 rounded-md'>
              <p className="text-sm font-medium text-white">
                Selected File:
              </p>
              <p className="text-sm text-white">{importFile.name}</p>
              <p className="text-xs text-white">
                {(importFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          <div className='flex justify-end space-x-3'>
            <Button
              variant='secondary'
              onClick={() => setIsImportModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleImport} disabled={!importFile || loading}>
              {loading ? 'Importing...' : 'Import Users'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BulkUserOperations;
