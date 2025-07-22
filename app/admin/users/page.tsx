'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Shield,
  User,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Download,
  Upload,
  Activity,
  Settings,
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  last_login?: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users?limit=1000');
      const data = await response.json();

      if (data.success) {
        setUsers(data.users || []);
      } else {
        setError('Failed to load users');
      }
    } catch (err) {
      setError('Failed to load users');
      // console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/admin/roles');
      const data = await response.json();

      if (data.success) {
        setRoles(data.roles || []);
      }
    } catch (err) {
      // console.error('Error fetching roles:', err);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchUsers();
      } else {
        setError(data.error || 'Failed to delete user');
      }
    } catch (err) {
      setError('Failed to delete user');
      // console.error('Error deleting user:', err);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return;
    if (
      !confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)
    )
      return;

    try {
      const response = await fetch('/api/admin/users/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'delete',
          user_ids: selectedUsers,
          data: { confirm: true },
        }),
      });

      const data = await response.json();

      if (data.success) {
        fetchUsers();
        setSelectedUsers([]);
        setShowBulkActions(false);
      } else {
        setError(data.error || 'Failed to delete users');
      }
    } catch (err) {
      setError('Failed to delete users');
      // console.error('Error deleting users:', err);
    }
  };

  const handleBulkRoleUpdate = async (roleId: string) => {
    if (selectedUsers.length === 0) return;
    if (
      !confirm(
        `Are you sure you want to assign this role to ${selectedUsers.length} users?`
      )
    )
      return;

    try {
      const response = await fetch('/api/admin/users/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'assign_role',
          user_ids: selectedUsers,
          data: { role_id: roleId },
        }),
      });

      const data = await response.json();

      if (data.success) {
        fetchUsers();
        setSelectedUsers([]);
        setShowBulkActions(false);
      } else {
        setError(data.error || 'Failed to update user roles');
      }
    } catch (err) {
      setError('Failed to update user roles');
      // console.error('Error updating user roles:', err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className='w-4 h-4 text-green-500' />;
      case 'inactive':
        return <XCircle className='w-4 h-4 text-red-500' />;
      default:
        return <Clock className='w-4 h-4 text-yellow-500' />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'editor':
        return 'bg-blue-100 text-blue-800';
      case 'author':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    superAdmin: users.filter(u => u.role === 'super_admin').length,
    admin: users.filter(u => u.role === 'admin').length,
    editor: users.filter(u => u.role === 'editor').length,
    author: users.filter(u => u.role === 'author').length,
    user: users.filter(u => u.role === 'user').length,
  };

  if (loading) {
    return (
      <div className='p-6'>
        <div className='flex items-center justify-center h-64'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          <span className='ml-2 text-gray-600'>Loading users...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='mb-6'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>
              User Management
            </h1>
            <p className='text-gray-600 mt-1'>
              Manage users, roles, and permissions
            </p>
          </div>
          <div className='flex items-center space-x-3'>
            <Link
              href='/admin/users/new'
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors'
            >
              <Plus className='w-4 h-4 mr-2' />
              New User
            </Link>
            <Link
              href='/admin/permissions'
              className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors'
            >
              <Shield className='w-4 h-4 mr-2' />
              Permissions
            </Link>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className='mb-6 bg-red-50 border border-red-200 rounded-lg p-4'>
          <div className='flex items-center'>
            <XCircle className='w-5 h-5 text-red-400 mr-2' />
            <span className='text-red-800'>{error}</span>
          </div>
        </div>
      )}

      {/* User Statistics */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-6'>
        <div className='bg-white p-6 rounded-lg shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Total Users</p>
              <p className='text-2xl font-bold text-gray-900'>
                {userStats.total}
              </p>
            </div>
            <Users className='w-8 h-8 text-blue-500' />
          </div>
          <div className='mt-4'>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600'>Active</span>
              <span className='font-medium text-green-600'>
                {userStats.active}
              </span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600'>Inactive</span>
              <span className='font-medium text-red-600'>
                {userStats.inactive}
              </span>
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Super Admins</p>
              <p className='text-2xl font-bold text-purple-600'>
                {userStats.superAdmin}
              </p>
            </div>
            <Shield className='w-8 h-8 text-purple-500' />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Admins</p>
              <p className='text-2xl font-bold text-red-600'>
                {userStats.admin}
              </p>
            </div>
            <Settings className='w-8 h-8 text-red-500' />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Editors</p>
              <p className='text-2xl font-bold text-blue-600'>
                {userStats.editor}
              </p>
            </div>
            <Edit className='w-8 h-8 text-blue-500' />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className='bg-white p-4 rounded-lg shadow mb-6'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-1'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <input
                type='text'
                placeholder='Search users...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>
          <div className='flex gap-2'>
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            >
              <option value=''>All Roles</option>
              <option value='super_admin'>Super Admin</option>
              <option value='admin'>Admin</option>
              <option value='editor'>Editor</option>
              <option value='author'>Author</option>
              <option value='user'>User</option>
            </select>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            >
              <option value=''>All Status</option>
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </select>
            <button className='px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center transition-colors'>
              <Filter className='w-4 h-4 mr-2' />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className='mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <div className='flex items-center justify-between'>
            <span className='text-blue-800'>
              {selectedUsers.length} user(s) selected
            </span>
            <div className='flex items-center space-x-3'>
              <select
                onChange={e =>
                  e.target.value && handleBulkRoleUpdate(e.target.value)
                }
                className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value=''>Assign Role</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleBulkDelete}
                className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors'
              >
                <Trash2 className='w-4 h-4 mr-2' />
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  <input
                    type='checkbox'
                    checked={
                      selectedUsers.length === filteredUsers.length &&
                      filteredUsers.length > 0
                    }
                    onChange={e => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map(user => user.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                  />
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  User
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Role
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Created
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Last Login
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredUsers.map(user => (
                <tr key={user.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <input
                      type='checkbox'
                      checked={selectedUsers.includes(user.id)}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedUsers(prev => [...prev, user.id]);
                        } else {
                          setSelectedUsers(prev =>
                            prev.filter(id => id !== user.id)
                          );
                        }
                      }}
                    />
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 h-10 w-10'>
                        <div className='h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center'>
                          <User className='w-5 h-5 text-gray-600' />
                        </div>
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-900'>
                          {user.name}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
                    >
                      {user.role.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      {getStatusIcon(user.status)}
                      <span
                        className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}
                      >
                        {user.status.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {user.last_login
                      ? new Date(user.last_login).toLocaleDateString()
                      : 'Never'}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                    <div className='flex items-center justify-end space-x-2'>
                      <Link
                        href={`/admin/users/${user.id}`}
                        className='text-blue-600 hover:text-blue-900'
                        title='Edit'
                      >
                        <Edit className='w-4 h-4' />
                      </Link>
                      <Link
                        href={`/admin/users/${user.id}/activity`}
                        className='text-purple-600 hover:text-purple-900'
                        title='Activity'
                      >
                        <Activity className='w-4 h-4' />
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className='text-red-600 hover:text-red-900'
                        title='Delete'
                      >
                        <Trash2 className='w-4 h-4' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className='text-center py-12'>
            <User className='w-12 h-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No users found
            </h3>
            <p className='text-gray-600 mb-4'>
              {searchTerm || roleFilter || statusFilter
                ? 'Try adjusting your search or filters.'
                : 'Start by creating your first user.'}
            </p>
            {!searchTerm && !roleFilter && !statusFilter && (
              <Link
                href='/admin/users/new'
                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center mx-auto w-fit transition-colors'
              >
                <Plus className='w-4 h-4 mr-2' />
                Create First User
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
