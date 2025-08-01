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

interface MediaItem {
  id: string;
  filename: string;
  original_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  alt_text?: string;
  caption?: string;
  tags?: string[];
  uploaded_by?: string;
  created_at: string;
}

interface DocumentListProps {
  mimeTypes?: string[]; // e.g., ['application/pdf', 'application/msword']
  showActions?: boolean;
  onDocumentSelect?: (media: MediaItem) => void;
}

export default function DocumentList({
  mimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  showActions = true,
  onDocumentSelect,
}: DocumentListProps) {
  const { isAuthenticated, hasRole } = useAuth();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [filteredMedia, setFilteredMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchMedia();
  }, [mimeTypes]);

  useEffect(() => {
    filterMedia();
  }, [media, searchTerm]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      setError(null);
      let url = '/api/admin/media';
      if (mimeTypes && mimeTypes.length > 0) {
        url += `?mime_type=${encodeURIComponent(mimeTypes[0])}`;
      }
      console.log('[DEBUG] fetchMedia called, url:', url);
      const response = await apiFetch<{ media: MediaItem[] }>(url);
      let items = response.media || [];
      if (mimeTypes.length > 1) {
        items = items.filter(item => mimeTypes.includes(item.mime_type));
      }
      setMedia(items);
      console.log('[DEBUG] setMedia called, items:', items);
    } catch (err: any) {
      if (err instanceof ApiException) {
        setError(err.message || 'Failed to load documents.');
      } else {
        setError('Failed to load documents. Please try again.');
      }
    } finally {
      setLoading(false);
      console.log('[DEBUG] setLoading(false) called');
    }
  };

  const filterMedia = () => {
    let filtered = media;
    if (searchTerm) {
      filtered = filtered.filter(
        item =>
          (item.original_name &&
            item.original_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (item.caption &&
            item.caption.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.alt_text &&
            item.alt_text.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredMedia(filtered);
    console.log('[DEBUG] setFilteredMedia called, filtered:', filtered);
  };

  const handleDownload = async (item: MediaItem) => {
    try {
      const url = item.file_path.startsWith('/')
        ? item.file_path
        : `/uploads/${item.filename}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = item.original_name || item.filename;
      window.document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(a.href);
      window.document.body.removeChild(a);
    } catch {
      alert('Failed to download document');
    }
  };

  const handleDelete = async (mediaId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    try {
      await apiFetch(`/api/admin/media?ids=${mediaId}`, { method: 'DELETE' });
      setMedia(prev => prev.filter(item => item.id !== mediaId));
    } catch {
      alert('Failed to delete document');
    }
  };

  const getFileIcon = (mime_type: string | undefined) => {
    if (!mime_type) return <File className='h-6 w-6' />;
    if (mime_type.startsWith('image/')) return <Image className='h-6 w-6' />;
    if (mime_type.includes('pdf')) return <FileText className='h-6 w-6' />;
    if (mime_type.includes('zip') || mime_type.includes('rar'))
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
          onClick={fetchMedia}
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
      {/* Search Controls */}
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
      {/* Documents Display */}
      {filteredMedia.length === 0 ? (
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
            {searchTerm
              ? 'Try adjusting your search criteria.'
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
          {filteredMedia.map(item => (
            <div
              key={item.id}
              className={`border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white ${viewMode === 'list' ? 'flex items-center space-x-4' : ''}`}
            >
              <div
                className={`flex items-start space-x-4 ${viewMode === 'list' ? 'flex-1' : ''}`}
              >
                <div className='flex-shrink-0'>
                  <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
                    {getFileIcon(item.mime_type)}
                  </div>
                </div>
                <div className='flex-1 min-w-0'>
                  <h3 className='text-lg font-semibold text-gray-900 truncate'>
                    {item.original_name || 'Untitled Document'}
                  </h3>
                  <p className='text-sm text-gray-500 mt-1'>
                    {item.filename || 'Unknown file'}
                  </p>
                  {item.caption && (
                    <p className='text-sm text-gray-600 mt-2 line-clamp-2'>
                      {item.caption}
                    </p>
                  )}
                  <div className='flex items-center space-x-4 mt-3 text-xs text-gray-500'>
                    <span>{formatFileSize(item.file_size || 0)}</span>
                    <span>{item.tags?.join(', ') || 'No tags'}</span>
                    <span>
                      {formatDate(item.created_at || new Date().toISOString())}
                    </span>
                  </div>
                  <div className='text-xs text-gray-400 mt-1'>
                    Uploaded by {item.uploaded_by || 'Unknown user'}
                  </div>
                </div>
              </div>
              {showActions && (
                <div className='flex items-center space-x-2 mt-4'>
                  <button
                    onClick={() => handleDownload(item)}
                    className='p-2 text-gray-400 hover:text-primary transition-colors'
                    title='Download'
                  >
                    <Download className='h-4 w-4' />
                  </button>
                  {onDocumentSelect && (
                    <button
                      onClick={() => onDocumentSelect(item)}
                      className='p-2 text-gray-400 hover:text-primary transition-colors'
                      title='View'
                    >
                      <Eye className='h-4 w-4' />
                    </button>
                  )}
                  <RoleGuard roles={['admin', 'editor']}>
                    <button
                      onClick={() => onDocumentSelect?.(item)}
                      className='p-2 text-gray-400 hover:text-primary transition-colors'
                      title='Edit'
                    >
                      <Edit className='h-4 w-4' />
                    </button>
                  </RoleGuard>
                  <RoleGuard roles={['admin']}>
                    <button
                      onClick={() => handleDelete(item.id)}
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
      <div className='text-sm text-gray-500 text-center'>
        Showing {filteredMedia.length} of {media.length} documents
      </div>
    </div>
  );
}
