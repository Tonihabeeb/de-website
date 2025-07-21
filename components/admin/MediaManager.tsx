'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Image,
  File,
  Folder,
  Search,
  Filter,
  Grid,
  List,
  Download,
  Trash2,
  Edit,
  Eye,
  Plus,
} from 'lucide-react';

interface MediaItem {
  id: string;
  filename: string;
  original_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  alt_text: string;
  caption: string;
  tags: string[];
  uploaded_by: string;
  created_at: string;
  thumbnail_url?: string;
}

interface MediaManagerProps {
  projectId?: string;
  onMediaSelect?: (media: MediaItem) => void;
  onMediaUpload?: (files: File[]) => Promise<MediaItem[]>;
  className?: string;
}

const MediaManager: React.FC<MediaManagerProps> = ({
  projectId,
  onMediaSelect,
  onMediaUpload,
  className = '',
}) => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [editingMedia, setEditingMedia] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, [projectId]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const endpoint = projectId
        ? `/api/admin/projects/${projectId}/media`
        : '/api/admin/media';

      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.success) {
        setMedia(data.media || []);
      } else {
        setError('Failed to fetch media');
      }
    } catch (err) {
      setError('Failed to fetch media');
      console.error('Error fetching media:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadFiles(files);
    setIsUploadModalOpen(true);
  };

  const handleUpload = async () => {
    if (uploadFiles.length === 0) return;

    try {
      setUploading(true);

      const formData = new FormData();
      uploadFiles.forEach(file => {
        formData.append('files', file);
      });

      const endpoint = projectId
        ? `/api/admin/projects/${projectId}/media`
        : '/api/admin/media';

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setMedia(prev => [...(data.media || []), ...prev]);
        setUploadFiles([]);
        setIsUploadModalOpen(false);
      } else {
        setError('Upload failed');
      }
    } catch (err) {
      setError('Upload failed');
      console.error('Error uploading files:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteMedia = async (mediaId: string) => {
    if (!confirm('Are you sure you want to delete this media?')) return;

    try {
      const endpoint = projectId
        ? `/api/admin/projects/${projectId}/media?media_id=${mediaId}`
        : `/api/admin/media/${mediaId}`;

      const response = await fetch(endpoint, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setMedia(prev => prev.filter(item => item.id !== mediaId));
      } else {
        setError('Delete failed');
      }
    } catch (err) {
      setError('Delete failed');
      console.error('Error deleting media:', err);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedMedia.length === 0) return;
    if (
      !confirm(`Are you sure you want to delete ${selectedMedia.length} items?`)
    )
      return;

    try {
      for (const mediaId of selectedMedia) {
        await handleDeleteMedia(mediaId);
      }
      setSelectedMedia([]);
    } catch (err) {
      setError('Bulk delete failed');
    }
  };

  const filteredMedia = media.filter(item => {
    const matchesSearch =
      item.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.alt_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.caption.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === 'all' ||
      (selectedType === 'images' && item.mime_type.startsWith('image/')) ||
      (selectedType === 'documents' &&
        item.mime_type.startsWith('application/'));

    return matchesSearch && matchesType;
  });

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/'))
      return <Image className='w-6 h-6 text-blue-500' />;
    if (mimeType.startsWith('video/'))
      return <File className='w-6 h-6 text-purple-500' />;
    return <File className='w-6 h-6 text-gray-500' />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
        <div className='p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Media Library
            </h3>
            <Folder className='w-5 h-5 text-gray-400' />
          </div>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-pulse'>
            {[...Array(12)].map((_, i) => (
              <div key={i} className='h-32 bg-gray-200 rounded-lg'></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      <div className='p-6'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-lg font-semibold text-gray-900'>Media Library</h3>
          <div className='flex items-center space-x-2'>
            <button
              onClick={() => fileInputRef.current?.click()}
              className='flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
            >
              <Upload className='w-4 h-4' />
              <span>Upload</span>
            </button>
            <input
              ref={fileInputRef}
              type='file'
              multiple
              onChange={handleFileSelect}
              className='hidden'
              accept='image/*,video/*,application/*'
            />
          </div>
        </div>

        {/* Filters and Search */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
              <input
                type='text'
                placeholder='Search media...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='all'>All Types</option>
              <option value='images'>Images</option>
              <option value='documents'>Documents</option>
            </select>
          </div>

          <div className='flex items-center space-x-2'>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid className='w-4 h-4' />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className='w-4 h-4' />
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedMedia.length > 0 && (
          <div className='mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-blue-900'>
                {selectedMedia.length} item(s) selected
              </span>
              <div className='flex items-center space-x-2'>
                <button
                  onClick={handleBulkDelete}
                  className='flex items-center space-x-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm'
                >
                  <Trash2 className='w-4 h-4' />
                  <span>Delete Selected</span>
                </button>
                <button
                  onClick={() => setSelectedMedia([])}
                  className='px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors text-sm'
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Media Grid/List */}
        {filteredMedia.length === 0 ? (
          <div className='text-center py-12 text-gray-500'>
            <Folder className='w-16 h-16 mx-auto mb-4 text-gray-300' />
            <p className='text-lg font-medium'>No media found</p>
            <p className='text-sm'>Upload some files to get started</p>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'
                : 'space-y-2'
            }
          >
            {filteredMedia.map(item => (
              <div
                key={item.id}
                className={`border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
                  selectedMedia.includes(item.id) ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {viewMode === 'grid' ? (
                  <div className='relative group'>
                    <div className='aspect-square bg-gray-100 flex items-center justify-center'>
                      {item.mime_type.startsWith('image/') ? (
                        <img
                          src={item.file_path}
                          alt={item.alt_text || item.original_name}
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        getFileIcon(item.mime_type)
                      )}
                    </div>

                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100'>
                      <div className='flex items-center space-x-2'>
                        <button
                          onClick={() => onMediaSelect?.(item)}
                          className='p-2 bg-white rounded-full hover:bg-gray-100 transition-colors'
                        >
                          <Eye className='w-4 h-4 text-gray-600' />
                        </button>
                        <button
                          onClick={() => setEditingMedia(item.id)}
                          className='p-2 bg-white rounded-full hover:bg-gray-100 transition-colors'
                        >
                          <Edit className='w-4 h-4 text-gray-600' />
                        </button>
                        <button
                          onClick={() => handleDeleteMedia(item.id)}
                          className='p-2 bg-white rounded-full hover:bg-red-100 transition-colors'
                        >
                          <Trash2 className='w-4 h-4 text-red-600' />
                        </button>
                      </div>
                    </div>

                    <div className='p-2'>
                      <p className='text-xs font-medium text-gray-900 truncate'>
                        {item.original_name}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {formatFileSize(item.file_size)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className='flex items-center space-x-3 p-3'>
                    <input
                      type='checkbox'
                      checked={selectedMedia.includes(item.id)}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedMedia(prev => [...prev, item.id]);
                        } else {
                          setSelectedMedia(prev =>
                            prev.filter(id => id !== item.id)
                          );
                        }
                      }}
                      className='rounded border-gray-300'
                    />

                    <div className='w-10 h-10 bg-gray-100 rounded flex items-center justify-center'>
                      {item.mime_type.startsWith('image/') ? (
                        <img
                          src={item.file_path}
                          alt={item.alt_text || item.original_name}
                          className='w-full h-full object-cover rounded'
                        />
                      ) : (
                        getFileIcon(item.mime_type)
                      )}
                    </div>

                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium text-gray-900 truncate'>
                        {item.original_name}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {formatFileSize(item.file_size)} •{' '}
                        {formatDate(item.created_at)}
                      </p>
                    </div>

                    <div className='flex items-center space-x-1'>
                      <button
                        onClick={() => onMediaSelect?.(item)}
                        className='p-1 text-gray-400 hover:text-gray-600'
                      >
                        <Eye className='w-4 h-4' />
                      </button>
                      <button
                        onClick={() => setEditingMedia(item.id)}
                        className='p-1 text-gray-400 hover:text-gray-600'
                      >
                        <Edit className='w-4 h-4' />
                      </button>
                      <button
                        onClick={() => handleDeleteMedia(item.id)}
                        className='p-1 text-gray-400 hover:text-red-600'
                      >
                        <Trash2 className='w-4 h-4' />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white rounded-lg p-6 w-full max-w-md'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              Upload Media
            </h3>

            <div className='space-y-4'>
              {uploadFiles.map((file, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                >
                  <div className='flex items-center space-x-3'>
                    {file.type.startsWith('image/') ? (
                      <Image className='w-6 h-6 text-blue-500' />
                    ) : (
                      <File className='w-6 h-6 text-gray-500' />
                    )}
                    <div>
                      <p className='text-sm font-medium text-gray-900'>
                        {file.name}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setUploadFiles(prev => prev.filter((_, i) => i !== index))
                    }
                    className='text-red-600 hover:text-red-800'
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              ))}
            </div>

            <div className='flex items-center space-x-3 mt-6'>
              <button
                onClick={handleUpload}
                disabled={uploading || uploadFiles.length === 0}
                className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              >
                {uploading ? 'Uploading...' : 'Upload Files'}
              </button>
              <button
                onClick={() => {
                  setIsUploadModalOpen(false);
                  setUploadFiles([]);
                }}
                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaManager;
