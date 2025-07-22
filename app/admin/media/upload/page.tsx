'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Image,
  File,
  Video,
  Music,
  Archive,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  Download,
  Trash2,
  Edit,
  Search,
  Filter,
  Grid,
  List,
  FolderPlus,
  Plus,
  RefreshCw,
} from 'lucide-react';
import Image from 'next/image'; // Add this import

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
  uploaded_by: string;
  created_at: string;
  thumbnail_url?: string;
}

interface UploadProgress {
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

export default function MediaUpload() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [uploadQueue, setUploadQueue] = useState<UploadProgress[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/media');
      const data = await response.json();

      if (data.success) {
        setMediaItems(data.media || []);
      } else {
        setError('Failed to load media');
      }
    } catch (err) {
      setError('Failed to load media');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    setSelectedFiles(prev => [...prev, ...newFiles]);

    // Add to upload queue
    const newUploads = newFiles.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const,
    }));

    setUploadQueue(prev => [...prev, ...newUploads]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) return;

    try {
      setUploading(true);
      setError(null);

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('alt_text', file.name);
        formData.append('caption', '');
        formData.append('tags', JSON.stringify([]));

        try {
          const response = await fetch('/api/admin/media', {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();

          if (data.success) {
            // Update progress
            setUploadQueue(prev =>
              prev.map((item, index) =>
                item.file === file
                  ? { ...item, progress: 100, status: 'completed' }
                  : item
              )
            );
          } else {
            setUploadQueue(prev =>
              prev.map((item, index) =>
                item.file === file
                  ? { ...item, status: 'error', error: data.error }
                  : item
              )
            );
          }
        } catch (err) {
          setUploadQueue(prev =>
            prev.map((item, index) =>
              item.file === file
                ? { ...item, status: 'error', error: 'Upload failed' }
                : item
            )
          );
        }
      }

      setSuccess('Files uploaded successfully!');
      setSelectedFiles([]);
      setUploadQueue([]);
      fetchMedia();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to upload files');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (file: File) => {
    setSelectedFiles(prev => prev.filter(f => f !== file));
    setUploadQueue(prev => prev.filter(item => item.file !== file));
  };

  const deleteMedia = async (mediaId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch(`/api/admin/media/${mediaId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('File deleted successfully!');
        fetchMedia();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.error || 'Failed to delete file');
      }
    } catch (err) {
      setError('Failed to delete file');
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/'))
      return <Image className='w-8 h-8 text-blue-500' />;
    if (mimeType.startsWith('video/'))
      return <Video className='w-8 h-8 text-purple-500' />;
    if (mimeType.startsWith('audio/'))
      return <Music className='w-8 h-8 text-green-500' />;
    if (mimeType.includes('zip') || mimeType.includes('rar'))
      return <Archive className='w-8 h-8 text-orange-500' />;
    return <File className='w-8 h-8 text-gray-500' />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch =
      item.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.original_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === 'all' || item.mime_type.startsWith(filterType);
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className='p-6'>
        <div className='flex items-center justify-center h-64'>
          <Loader2 className='w-8 h-8 animate-spin text-blue-600' />
          <span className='ml-2 text-gray-600'>Loading media library...</span>
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
              Media Upload & Gallery
            </h1>
            <p className='text-gray-600 mt-1'>Upload and manage media files</p>
          </div>
          <div className='flex space-x-3'>
            <button
              onClick={fetchMedia}
              className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center'
            >
              <RefreshCw className='w-4 h-4 mr-2' />
              Refresh
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center'
            >
              <Plus className='w-4 h-4 mr-2' />
              Add Files
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className='mb-6 bg-green-50 border border-green-200 rounded-lg p-4'>
          <div className='flex items-center'>
            <CheckCircle className='w-5 h-5 text-green-400 mr-2' />
            <span className='text-green-800'>{success}</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className='mb-6 bg-red-50 border border-red-200 rounded-lg p-4'>
          <div className='flex items-center'>
            <AlertCircle className='w-5 h-5 text-red-400 mr-2' />
            <span className='text-red-800'>{error}</span>
          </div>
        </div>
      )}

      {/* Upload Area */}
      {selectedFiles.length > 0 && (
        <div className='mb-6 bg-blue-50 border border-blue-200 rounded-lg p-6'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Upload Queue
          </h3>

          <div className='space-y-3'>
            {selectedFiles.map((file, index) => {
              const uploadItem = uploadQueue.find(item => item.file === file);
              return (
                <div
                  key={index}
                  className='flex items-center justify-between p-3 bg-white rounded-lg border'
                >
                  <div className='flex items-center space-x-3'>
                    {getFileIcon(file.type)}
                    <div>
                      <div className='font-medium text-gray-900'>
                        {file.name}
                      </div>
                      <div className='text-sm text-gray-500'>
                        {formatFileSize(file.size)}
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center space-x-3'>
                    {uploadItem && (
                      <div className='flex items-center space-x-2'>
                        {uploadItem.status === 'uploading' && (
                          <Loader2 className='w-4 h-4 animate-spin text-blue-500' />
                        )}
                        {uploadItem.status === 'completed' && (
                          <CheckCircle className='w-4 h-4 text-green-500' />
                        )}
                        {uploadItem.status === 'error' && (
                          <AlertCircle className='w-4 h-4 text-red-500' />
                        )}
                        <span className='text-sm text-gray-600'>
                          {uploadItem.status === 'error'
                            ? uploadItem.error
                            : `${uploadItem.progress}%`}
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => removeFile(file)}
                      className='text-red-600 hover:text-red-800'
                    >
                      <X className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className='mt-4 flex justify-end'>
            <button
              onClick={uploadFiles}
              disabled={uploading}
              className='px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors flex items-center'
            >
              {uploading ? (
                <Loader2 className='w-4 h-4 animate-spin mr-2' />
              ) : (
                <Upload className='w-4 h-4 mr-2' />
              )}
              {uploading ? 'Uploading...' : 'Upload Files'}
            </button>
          </div>
        </div>
      )}

      {/* Drop Zone */}
      <div
        ref={dropZoneRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className='mb-6 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors'
      >
        <Upload className='w-12 h-12 text-gray-400 mx-auto mb-4' />
        <h3 className='text-lg font-medium text-gray-900 mb-2'>
          Drop files here
        </h3>
        <p className='text-gray-600 mb-4'>or click to select files</p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors'
        >
          Select Files
        </button>
        <input
          ref={fileInputRef}
          type='file'
          multiple
          onChange={e => handleFileSelect(e.target.files)}
          className='hidden'
          accept='image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar'
        />
      </div>

      {/* Filters and Search */}
      <div className='mb-6 flex flex-col sm:flex-row gap-4'>
        <div className='flex-1'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <input
              type='text'
              placeholder='Search media files...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>
        </div>

        <div className='flex space-x-2'>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          >
            <option value='all'>All Types</option>
            <option value='image/'>Images</option>
            <option value='video/'>Videos</option>
            <option value='audio/'>Audio</option>
            <option value='application/'>Documents</option>
          </select>

          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'
          >
            {viewMode === 'grid' ? (
              <List className='w-4 h-4' />
            ) : (
              <Grid className='w-4 h-4' />
            )}
          </button>
        </div>
      </div>

      {/* Media Gallery */}
      <div className='bg-white rounded-lg shadow'>
        <div className='p-6 border-b border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-900'>
            Media Library ({filteredMedia.length} files)
          </h2>
        </div>

        {viewMode === 'grid' ? (
          <div className='p-6'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
              {filteredMedia.map(item => (
                <div
                  key={item.id}
                  className='group relative bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors'
                >
                  <div className='aspect-square flex items-center justify-center mb-2'>
                    {item.mime_type.startsWith('image/') ? (
                      <Image
                        src={item.thumbnail_url || item.file_path}
                        alt={item.alt_text || item.filename}
                        width={200}
                        height={200}
                        className='w-full h-full object-cover rounded'
                      />
                    ) : (
                      getFileIcon(item.mime_type)
                    )}
                  </div>

                  <div className='text-center'>
                    <div
                      className='text-sm font-medium text-gray-900 truncate'
                      title={item.filename}
                    >
                      {item.filename}
                    </div>
                    <div className='text-xs text-gray-500'>
                      {formatFileSize(item.file_size)}
                    </div>
                  </div>

                  <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100'>
                    <div className='flex space-x-2'>
                      <button
                        onClick={() => window.open(item.file_path, '_blank')}
                        className='p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100'
                        title='View'
                      >
                        <Eye className='w-4 h-4' />
                      </button>
                      <button
                        onClick={() => window.open(item.file_path, '_blank')}
                        className='p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100'
                        title='Download'
                      >
                        <Download className='w-4 h-4' />
                      </button>
                      <button
                        onClick={() => deleteMedia(item.id)}
                        className='p-2 bg-white rounded-full text-red-600 hover:bg-red-50'
                        title='Delete'
                      >
                        <Trash2 className='w-4 h-4' />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    File
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Type
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Size
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Uploaded
                  </th>
                  <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredMedia.map(item => (
                  <tr key={item.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        {getFileIcon(item.mime_type)}
                        <div className='ml-3'>
                          <div className='text-sm font-medium text-gray-900'>
                            {item.filename}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {item.original_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {item.mime_type}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {formatFileSize(item.file_size)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <div className='flex items-center justify-end space-x-2'>
                        <button
                          onClick={() => window.open(item.file_path, '_blank')}
                          className='text-blue-600 hover:text-blue-900'
                          title='View'
                        >
                          <Eye className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => window.open(item.file_path, '_blank')}
                          className='text-green-600 hover:text-green-900'
                          title='Download'
                        >
                          <Download className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => deleteMedia(item.id)}
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
        )}

        {filteredMedia.length === 0 && (
          <div className='text-center py-12'>
            <Upload className='w-12 h-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No media files found
            </h3>
            <p className='text-gray-600'>
              Upload your first file to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
