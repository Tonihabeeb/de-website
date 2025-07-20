'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Save, 
  X, 
  Shield, 
  User, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  ArrowLeft,
  Settings,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

export default function UserRoleAssignment() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [selectedRole, setSelectedRole] = useState('');
  const [customPermissions, setCustomPermissions] = useState<string[]>([]);
  const [showCustomPermissions, setShowCustomPermissions] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUser();
      fetchRoles();
      fetchPermissions();
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        setSelectedRole(data.user.role_id || '');
      } else {
        setError('User not found');
      }
    } catch (err) {
      setError('Failed to load user');
      console.error('Error fetching user:', err);
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
      console.error('Error fetching roles:', err);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await fetch('/api/admin/permissions');
      const data = await response.json();
      
      if (data.success) {
        setPermissions(data.permissions || []);
      }
    } catch (err) {
      console.error('Error fetching permissions:', err);
    }
  };

  const handleRoleChange = (roleId: string) => {
    setSelectedRole(roleId);
    const role = roles.find(r => r.id === roleId);
    if (role) {
      setCustomPermissions(role.permissions);
    }
  };

  const handlePermissionToggle = (permissionId: string) => {
    setCustomPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // Update user role
      const roleResponse = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role_id: selectedRole })
      });

      const roleData = await roleResponse.json();

      if (roleData.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/users');
        }, 2000);
      } else {
        setError(roleData.error || 'Failed to update user role');
      }
    } catch (err) {
      setError('Failed to update user role');
      console.error('Error updating user role:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
      router.push('/admin/users');
    }
  };

  const getRoleColor = (roleName: string) => {
    switch (roleName) {
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

  const groupedPermissions = permissions.reduce((acc, permission) => {
    const resource = permission.resource;
    if (!acc[resource]) {
      acc[resource] = [];
    }
    acc[resource].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading user...</span>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <span className="text-red-800">{error}</span>
          </div>
          <button
            onClick={() => router.push('/admin/users')}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Role Assignment</h1>
            <p className="text-gray-600 mt-1">
              Manage role and permissions for {user?.name}
            </p>
          </div>
          <button
            onClick={() => router.push('/admin/users')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </button>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-green-800">User role updated successfully! Redirecting...</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}

      {user && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                User Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="text-sm text-gray-900 mt-1">{user.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm text-gray-900 mt-1">{user.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Role</label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Member Since</label>
                  <p className="text-sm text-gray-900 mt-1">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Role Assignment */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Role Assignment
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Role *
                    </label>
                    <select
                      required
                      value={selectedRole}
                      onChange={(e) => handleRoleChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Choose a role</option>
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedRole && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Role Description</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {roles.find(r => r.id === selectedRole)?.description}
                      </p>
                      
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Default Permissions</h5>
                      <div className="space-y-1">
                        {roles.find(r => r.id === selectedRole)?.permissions.map((permission, index) => (
                          <div key={index} className="text-sm text-gray-600 flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {permission}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Custom Permissions */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Custom Permissions
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowCustomPermissions(!showCustomPermissions)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {showCustomPermissions ? 'Hide' : 'Show'} Custom Permissions
                  </button>
                </div>
                
                {showCustomPermissions && (
                  <div className="space-y-4">
                    {Object.entries(groupedPermissions).map(([resource, resourcePermissions]) => (
                      <div key={resource} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3 capitalize">
                          {resource.replace('_', ' ')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {resourcePermissions.map(permission => (
                            <label key={permission.id} className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={customPermissions.includes(permission.id)}
                                onChange={() => handlePermissionToggle(permission.id)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <div>
                                <span className="text-sm font-medium text-gray-900">
                                  {permission.action.replace('_', ' ')}
                                </span>
                                <p className="text-xs text-gray-500">
                                  {permission.description}
                                </p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !selectedRole}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {saving ? 'Updating...' : 'Update Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 