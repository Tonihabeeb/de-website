'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Copy,
  History,
  Filter,
  MoreVertical,
  Calendar,
  User,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/Toast';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

interface Page {
  id: string;
  title: string;
  slug: string;
  status: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

interface Version {
  id: string;
  version_number: number;
  created_at: string;
  created_by?: string;
  content: any; // Keep as any for now, as content is dynamic JSON
  [key: string]: any;
}

export default function AdminPagesPage() {
  const { user } = useAuth();
  const [pages, setPages] = useState<Page[]>([]);
  const [filteredPages, setFilteredPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [importing, setImporting] = useState(false);
  const [importResults, setImportResults] = useState<any[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Version history state
  const [versionModalPageId, setVersionModalPageId] = useState<string | null>(null);
  const [versions, setVersions] = useState<Version[]>([]);
  const [versionLoading, setVersionLoading] = useState(false);
  const [versionError, setVersionError] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    filterPages();
  }, [pages, searchTerm, statusFilter]);

  const fetchPages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/admin/pages');
      if (!response.ok) {
        throw new Error('Failed to fetch pages');
      }
      const data = await response.json();
      setPages(data.data || []);
    } catch (err) {
      console.error('Error fetching pages:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch pages');
    } finally {
      setLoading(false);
    }
  };

  const filterPages = () => {
    let filtered = pages;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(page =>
        page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(page => page.status === statusFilter);
    }

    setFilteredPages(filtered);
  };

  const handleSearch = () => {
    // Search is handled by the filterPages useEffect
  };

  const handleExport = async () => {
    try {
      const dataStr = JSON.stringify(pages, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'pages-export.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Pages exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export pages');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setImporting(true);
      const text = await file.text();
      const importData = JSON.parse(text);
      
      const results = [];
      for (const page of importData) {
        try {
          const response = await fetch('/api/admin/pages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(page),
          });
          
          if (response.ok) {
            results.push({ success: true, slug: page.slug });
          } else {
            const error = await response.json();
            results.push({ success: false, slug: page.slug, error: error.error });
          }
        } catch (error) {
          results.push({ success: false, slug: page.slug, error: 'Import failed' });
        }
      }
      
      setImportResults(results);
      await fetchPages(); // Refresh the list
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import pages');
    } finally {
      setImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handlePublish = async (pageId: string) => {
    try {
      const response = await fetch(`/api/admin/pages/${pageId}/publish`, {
        method: 'POST',
      });
      
      if (response.ok) {
        toast.success('Page published successfully');
        await fetchPages();
      } else {
        toast.error('Failed to publish page');
      }
    } catch (error) {
      console.error('Publish error:', error);
      toast.error('Failed to publish page');
    }
  };

  const handleDuplicate = async (pageId: string) => {
    try {
      const response = await fetch(`/api/admin/pages/${pageId}/duplicate`, {
        method: 'POST',
      });
      
      if (response.ok) {
        toast.success('Page duplicated successfully');
        await fetchPages();
      } else {
        toast.error('Failed to duplicate page');
      }
    } catch (error) {
      console.error('Duplicate error:', error);
      toast.error('Failed to duplicate page');
    }
  };

  const handleDelete = async (pageId: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;
    
    try {
      const response = await fetch(`/api/admin/pages/${pageId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        toast.success('Page deleted successfully');
        await fetchPages();
      } else {
        toast.error('Failed to delete page');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete page');
    }
  };

  const openVersionModal = async (pageId: string) => {
    setVersionModalPageId(pageId);
    setSelectedVersion(null);
    await fetchVersions(pageId);
  };

  const fetchVersions = async (pageId: string) => {
    try {
      setVersionLoading(true);
      setVersionError(null);
      const response = await fetch(`/api/admin/pages/${pageId}/versions`);
      if (!response.ok) {
        throw new Error('Failed to fetch versions');
      }
      const data = await response.json();
      setVersions(data.data || []);
    } catch (err) {
      console.error('Error fetching versions:', err);
      setVersionError(err instanceof Error ? err.message : 'Failed to fetch versions');
    } finally {
      setVersionLoading(false);
    }
  };

  const handleRestoreVersion = async (pageId: string, versionId: string) => {
    try {
      const response = await fetch(`/api/admin/pages/${pageId}/versions/${versionId}/restore`, {
        method: 'POST',
      });
      
      if (response.ok) {
        toast.success('Version restored successfully');
        setVersionModalPageId(null);
        await fetchPages();
      } else {
        toast.error('Failed to restore version');
      }
    } catch (error) {
      console.error('Restore error:', error);
      toast.error('Failed to restore version');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { color: 'bg-green-100 text-green-800', label: 'Published' },
      draft: { color: 'bg-yellow-100 text-yellow-800', label: 'Draft' },
      archived: { color: 'bg-gray-100 text-gray-800', label: 'Archived' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <ProtectedRoute requiredRoles={['admin', 'superadmin']}>
        <div className='p-6'>
          <div className='flex items-center justify-center h-64'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRoles={['admin', 'superadmin']}>
      <div className='p-6'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold'>Pages</h1>
          <div className='flex items-center gap-2'>
            <button
              onClick={handleExport}
              className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
            >
              Export
            </button>
            <button
              onClick={handleImportClick}
              className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
              disabled={importing}
            >
              Import
            </button>
            <input
              type='file'
              accept='.json'
              ref={fileInputRef}
              onChange={handleImportFile}
              className='hidden'
            />
          </div>
        </div>

        {/* Search and Filter */}
        <div className='mb-6'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <input
                  type='text'
                  placeholder='Search pages...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSearch()}
                  className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
            </div>
            <div className='flex gap-2'>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              >
                <option value='all'>All Status</option>
                <option value='published'>Published</option>
                <option value='draft'>Draft</option>
                <option value='archived'>Archived</option>
              </select>
              <button
                onClick={handleSearch}
                className='inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
              >
                <Filter className='w-4 h-4 mr-2' />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-md'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-red-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-red-800'>Error</h3>
                <div className='mt-2 text-sm text-red-700'>
                  <p>{error}</p>
                </div>
                <div className='mt-4'>
                  <button
                    onClick={fetchPages}
                    className='text-sm font-medium text-red-800 hover:text-red-900 underline'
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pages Table */}
        <div className='bg-white shadow overflow-hidden sm:rounded-md'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Page
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Created
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Updated
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={5} className='px-6 py-12 text-center'>
                    <div className='text-gray-500'>
                      <p className='text-lg font-medium'>No pages found.</p>
                      <p className='mt-1'>
                        Get started by creating your first page.
                      </p>
                      <Link
                        href='/admin/pages/new'
                        className='mt-4 inline-flex items-center text-blue-600 hover:opacity-80'
                      >
                        <Plus className='w-4 h-4 mr-1' />
                        Create your first page
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPages.map(page => (
                  <tr key={page.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div>
                        <div className='text-sm font-medium text-primary'>
                          {page.title}
                        </div>
                        <div className='text-sm text-gray-500'>/{page.slug}</div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {getStatusBadge(page.status)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {new Date(page.created_at).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {new Date(page.updated_at).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <div className='flex items-center justify-end space-x-2'>
                        <Link
                          href={`/admin/pages/edit?id=${page.id}`}
                          className='text-blue-600 hover:opacity-80'
                        >
                          <Edit className='w-4 h-4' />
                        </Link>
                        {page.status !== 'published' && (
                          <button
                            onClick={() => handlePublish(page.id)}
                            className='text-green-600 hover:text-green-900'
                          >
                            <Eye className='w-4 h-4' />
                          </button>
                        )}
                        <button
                          onClick={() => handleDuplicate(page.id)}
                          className='text-purple-600 hover:text-purple-900'
                        >
                          <Copy className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => handleDelete(page.id)}
                          className='text-red-600 hover:text-red-900'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => openVersionModal(page.id)}
                          className='text-gray-text hover:opacity-80'
                          aria-label='View version history'
                        >
                          <History className='w-4 h-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Version History Modal */}
        {versionModalPageId && (
          <div
            className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center'
            role='dialog'
            aria-modal='true'
          >
            <div className='bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto'>
              <h3 className='text-lg font-semibold text-primary mb-4'>
                Version History
              </h3>
              {versionLoading ? (
                <div>Loading...</div>
              ) : versionError ? (
                <div className='text-red-600'>{versionError}</div>
              ) : (
                <>
                  {versions.length === 0 ? (
                    <div className='text-gray-500'>
                      No previous versions found.
                    </div>
                  ) : (
                    <table className='min-w-full mb-4'>
                      <thead>
                        <tr>
                          <th className='text-left text-xs font-medium text-gray-500 uppercase px-2 py-1'>
                            Version
                          </th>
                          <th className='text-left text-xs font-medium text-gray-500 uppercase px-2 py-1'>
                            Created
                          </th>
                          <th className='text-left text-xs font-medium text-gray-500 uppercase px-2 py-1'>
                            User
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {versions.map(v => (
                          <tr key={v.id} className='hover:bg-gray-50'>
                            <td className='px-2 py-1'>V{v.version_number}</td>
                            <td className='px-2 py-1'>
                              {new Date(v.created_at).toLocaleString()}
                            </td>
                            <td className='px-2 py-1'>
                              {v.created_by || 'Unknown'}
                            </td>
                            <td className='px-2 py-1 text-right'>
                              <button
                                onClick={() => setSelectedVersion(v)}
                                className='text-blue-600 hover:underline text-xs mr-2'
                              >
                                View
                              </button>
                              <button
                                onClick={() =>
                                  handleRestoreVersion(versionModalPageId, v.id)
                                }
                                className='text-green-600 hover:underline text-xs'
                              >
                                Restore
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {selectedVersion && (
                    <div className='mb-4 p-4 bg-gray-50 rounded border border-gray-200'>
                      <h4 className='font-semibold mb-2'>Version Content</h4>
                      <pre className='text-xs whitespace-pre-wrap'>
                        {JSON.stringify(selectedVersion.content, null, 2)}
                      </pre>
                    </div>
                  )}
                </>
              )}
              <div className='flex justify-end mt-4'>
                <button
                  onClick={() => setVersionModalPageId(null)}
                  className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Import Results Modal/Alert */}
        {importResults && (
          <div className='fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center'>
            <div className='bg-white rounded-lg p-6 w-full max-w-lg'>
              <h3 className='text-lg font-semibold mb-4'>Import Results</h3>
              <ul className='max-h-64 overflow-y-auto mb-4'>
                {importResults.map((r, i) => (
                  <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">{r.success ? '✔' : '✖'} {r.slug || r.id}:{' '}
                    {r.success ? 'Imported' : r.error}</span>
                </li>
                ))}
              </ul>
              <div className='flex justify-end'>
                <button
                  onClick={() => setImportResults(null)}
                  className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
