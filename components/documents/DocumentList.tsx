'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiFetch, ApiException } from '@/utils/api';
import {
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  File,
  FileText,
  Image,
  FileArchive,
} from 'lucide-react';
import RoleGuard from '@/components/auth/RoleGuard';
import { InlineLoader } from '@/components/ui/LoadingSpinner';

interface Document {
  _id: string;
  title: string;
  description: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  category: string;
  type: string;
  uploadedBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface DocumentListProps {
  type?: string;
  category?: string;
  showActions?: boolean;
  onDocumentSelect?: (document: Document) => void;
}

export default function DocumentList({
  type,
  category,
  showActions = true,
  onDocumentSelect,
}: DocumentListProps) {
  const { isAuthenticated, hasRole } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchDocuments();
  }, [type, category]);

  useEffect(() => {
    filterDocuments();
  }, [documents, searchTerm, selectedCategory]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = '/api/documents';
      const params = new URLSearchParams();

      if (type) params.append('type', type);
      if (category) params.append('category', category);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await apiFetch<{ documents: Document[] }>(url);
      setDocuments(response.documents || []);
    } catch (err: any) {
      // Silently handle errors in test environment

      // Handle different types of errors
      if (err instanceof ApiException) {
        if (err.status === 401) {
          setError('Authentication required to view documents.');
        } else if (err.status === 403) {
          setError('You do not have permission to view documents.');
        } else if (err.status === 404) {
          setError('Documents not found.');
        } else if (err.status >= 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(err.message || 'Failed to load documents.');
        }
      } else {
        setError('Failed to load documents. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const filterDocuments = () => {
    let filtered = documents;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        doc =>
          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.originalName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(doc => doc.category === selectedCategory);
    }

    setFilteredDocuments(filtered);
  };

  const handleDownload = async (document: Document) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/documents/${document._id}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = document.originalName;
      window.document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      window.document.body.removeChild(a);
    } catch (error: any) {
      // Silently handle download errors in test environment
      alert('Failed to download document');
    }
  };

  const handleDelete = async (documentId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      await apiFetch(`/api/documents/${documentId}`, {
        method: 'DELETE',
      });

      setDocuments(prev => prev.filter(doc => doc._id !== documentId));
    } catch (error: any) {
      // Silently handle delete errors in test environment
      alert('Failed to delete document');
    }
  };

  const getFileIcon = (mimetype: string | undefined) => {
    if (!mimetype) return <File className='h-6 w-6' />;
    if (mimetype.startsWith('image/')) return <Image className='h-6 w-6' />;
    if (mimetype.includes('pdf')) return <FileText className='h-6 w-6' />;
    if (mimetype.includes('zip') || mimetype.includes('rar'))
      return <FileArchive className='h-6 w-6' />;
    return <File className='h-6 w-6' />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const categories = [
    'all',
    'general',
    'project',
    'technical',
    'financial',
    'legal',
  ];

  if (loading) {
    return <InlineLoader text='Loading documents...' />;
  }

  if (error) {
    return (
      <div className='text-center py-12'>
        <div className='text-red-600 mb-4'>
          <svg
            className='w-12 h-12 mx-auto'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
        </div>
        <h3 className='text-lg font-semibold text-gray-900 mb-2'>
          Error Loading Documents
        </h3>
        <p className='text-gray-600 mb-4'>{error}</p>
        <button
          onClick={fetchDocuments}
          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors'
        >
          <svg
            className='w-4 h-4 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
            />
          </svg>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Search and Filter Controls */}
      <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
        <div className='flex flex-1 max-w-md'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
            <input
              type='text'
              placeholder='Search documents...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'
            />
          </div>
        </div>

        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-2'>
            <Filter className='h-4 w-4 text-gray-400' />
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all'
                    ? 'All Categories'
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className='flex border border-gray-300 rounded-md'>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Documents Display */}
      {filteredDocuments.length === 0 ? (
        <div className='text-center py-12'>
          <div className='text-gray-600 mb-4'>
            <svg
              className='w-12 h-12 mx-auto'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
              />
            </svg>
          </div>
          <h3 className='text-lg font-semibold text-gray-900 mb-2'>
            No Documents Found
          </h3>
          <p className='text-gray-600'>
            {searchTerm || selectedCategory !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'No documents have been uploaded yet.'}
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredDocuments.map(document => (
            <div
              key={document._id}
              className={`border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white ${
                viewMode === 'list' ? 'flex items-center space-x-4' : ''
              }`}
            >
              <div
                className={`flex items-start space-x-4 ${viewMode === 'list' ? 'flex-1' : ''}`}
              >
                <div className='flex-shrink-0'>
                  <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
                    {getFileIcon(document.mimetype)}
                  </div>
                </div>

                <div className='flex-1 min-w-0'>
                  <h3 className='text-lg font-semibold text-gray-900 truncate'>
                    {document.title || 'Untitled Document'}
                  </h3>
                  <p className='text-sm text-gray-500 mt-1'>
                    {document.originalName || 'Unknown file'}
                  </p>
                  {document.description && (
                    <p className='text-sm text-gray-600 mt-2 line-clamp-2'>
                      {document.description}
                    </p>
                  )}

                  <div className='flex items-center space-x-4 mt-3 text-xs text-gray-500'>
                    <span>{formatFileSize(document.size || 0)}</span>
                    <span>{document.category || 'Uncategorized'}</span>
                    <span>
                      {formatDate(
                        document.createdAt || new Date().toISOString()
                      )}
                    </span>
                  </div>

                  <div className='text-xs text-gray-400 mt-1'>
                    Uploaded by {document.uploadedBy?.name || 'Unknown user'}
                  </div>
                </div>
              </div>

              {showActions && (
                <div className='flex items-center space-x-2 mt-4'>
                  <button
                    onClick={() => handleDownload(document)}
                    className='p-2 text-gray-400 hover:text-primary transition-colors'
                    title='Download'
                  >
                    <Download className='h-4 w-4' />
                  </button>

                  {onDocumentSelect && (
                    <button
                      onClick={() => onDocumentSelect(document)}
                      className='p-2 text-gray-400 hover:text-primary transition-colors'
                      title='View'
                    >
                      <Eye className='h-4 w-4' />
                    </button>
                  )}

                  <RoleGuard roles={['admin', 'editor']}>
                    <button
                      onClick={() => onDocumentSelect?.(document)}
                      className='p-2 text-gray-400 hover:text-primary transition-colors'
                      title='Edit'
                    >
                      <Edit className='h-4 w-4' />
                    </button>
                  </RoleGuard>

                  <RoleGuard roles={['admin']}>
                    <button
                      onClick={() => handleDelete(document._id)}
                      className='p-2 text-gray-400 hover:text-red-500 transition-colors'
                      title='Delete'
                    >
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </RoleGuard>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className='text-sm text-gray-500 text-center'>
        Showing {filteredDocuments.length} of {documents.length} documents
      </div>
    </div>
  );
}
