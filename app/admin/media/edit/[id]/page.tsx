'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Save,
  ArrowLeft,
  Eye,
  Download,
  Trash2,
  Tag,
  Folder,
  Calendar,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Copy,
  ExternalLink,
  Edit3,
  Info,
} from 'lucide-react';

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
  folder?: string;
  uploaded_by: string;
  created_at: string;
  thumbnail_url?: string;
}

interface MediaMetadata {
  alt_text: string;
  caption: string;
  tags: string[];
  folder: string;
}

export default function MediaEdit() {
  const params = useParams();
  const router = useRouter();
  const mediaId = params.id as string;

  const [mediaItem, setMediaItem] = useState<MediaItem | null>(null);
  const [metadata, setMetadata] = useState<MediaMetadata>({
    alt_text: '',
    caption: '',
    tags: [],
    folder: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Available options
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [availableFolders, setAvailableFolders] = useState<string[]>([]);

  // Form states
  const [newTag, setNewTag] = useState('');
  const [newFolder, setNewFolder] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [showFolderInput, setShowFolderInput] = useState(false);

  useEffect(() => {
    if (mediaId) {
      fetchMediaItem();
      fetchAvailableOptions();
    }
  }, [mediaId]);

  const fetchMediaItem = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/media/${mediaId}`);
      const data = await response.json();

      if (data.success) {
        setMediaItem(data.media);
        setMetadata({
          alt_text: data.media.alt_text || '',
          caption: data.media.caption || '',
          tags: data.media.tags || [],
          folder: data.media.folder || '',
        });
      } else {
        setError('Failed to load media item');
      }
    } catch (err) {
      setError('Failed to load media item');
      console.error('Error fetching media item:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableOptions = async () => {
    try {
      const response = await fetch('/api/admin/media');
      const data = await response.json();

      if (data.success) {
        const tags = new Set<string>();
        const folders = new Set<string>();

        data.media.forEach((item: MediaItem) => {
          item.tags?.forEach(tag => tags.add(tag));
          if (item.folder) folders.add(item.folder);
        });

        setAvailableTags(Array.from(tags));
        setAvailableFolders(Array.from(folders));
      }
    } catch (err) {
      console.error('Error fetching available options:', err);
    }
  };

  const saveMetadata = async () => {
    if (!mediaItem) return;

    try {
      setSaving(true);
      setError(null);

      const response = await fetch(`/api/admin/media/${mediaId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metadata),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Metadata saved successfully!');
        setMediaItem(data.media);
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.error || 'Failed to save metadata');
      }
    } catch (err) {
      setError('Failed to save metadata');
      console.error('Error saving metadata:', err);
    } finally {
      setSaving(false);
    }
  };

  const deleteMedia = async () => {
    if (
      !mediaItem ||
      !confirm(
        'Are you sure you want to delete this file? This action cannot be undone.'
      )
    )
      return;

    try {
      const response = await fetch(`/api/admin/media/${mediaId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/media');
      } else {
        setError(data.error || 'Failed to delete file');
      }
    } catch (err) {
      setError('Failed to delete file');
      console.error('Error deleting file:', err);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !metadata.tags.includes(newTag.trim())) {
      setMetadata(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
      setShowTagInput(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setMetadata(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const addFolder = () => {
    if (newFolder.trim()) {
      setMetadata(prev => ({
        ...prev,
        folder: newFolder.trim(),
      }));
      setNewFolder('');
      setShowFolderInput(false);
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
    return <FileText className='w-8 h-8 text-gray-500' />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeCategory = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return 'Image';
    if (mimeType.startsWith('video/')) return 'Video';
    if (mimeType.startsWith('audio/')) return 'Audio';
    if (mimeType.includes('pdf')) return 'Document';
    if (mimeType.includes('zip') || mimeType.includes('rar')) return 'Archive';
    return 'File';
  };

  if (loading) {
    return (
      <div className='p-6'>
        <div className='flex items-center justify-center h-64'>
          <Loader2 className='w-8 h-8 animate-spin text-blue-600' />
          <span className='ml-2 text-gray-600'>Loading media item...</span>
        </div>
      </div>
    );
  }

  if (!mediaItem) {
    return (
      <div className='p-6'>
        <div className='text-center py-12'>
          <AlertCircle className='w-12 h-12 text-red-400 mx-auto mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            Media not found
          </h3>
          <p className='text-gray-600'>
            The requested media file could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='mb-6'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center space-x-4'>
            <button
              onClick={() => router.back()}
              className='p-2 text-gray-600 hover:text-gray-900 transition-colors'
            >
              <ArrowLeft className='w-5 h-5' />
            </button>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>Edit Media</h1>
              <p className='text-gray-600 mt-1'>
                Update metadata and properties
              </p>
            </div>
          </div>
          <div className='flex space-x-3'>
            <button
              onClick={() => window.open(mediaItem.file_path, '_blank')}
              className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center'
            >
              <ExternalLink className='w-4 h-4 mr-2' />
              View File
            </button>
            <button
              onClick={saveMetadata}
              disabled={saving}
              className='px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center'
            >
              {saving ? (
                <Loader2 className='w-4 h-4 animate-spin mr-2' />
              ) : (
                <Save className='w-4 h-4 mr-2' />
              )}
              {saving ? 'Saving...' : 'Save Changes'}
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

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* File Preview */}
        <div className='lg:col-span-1'>
          <div className='bg-white rounded-lg shadow p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
              <Eye className='w-5 h-5 mr-2' />
              File Preview
            </h3>

            <div className='space-y-4'>
              {/* File Display */}
              <div className='aspect-square bg-gray-100 rounded-lg flex items-center justify-center'>
                {mediaItem.mime_type.startsWith('image/') ? (
                  <img
                    src={mediaItem.thumbnail_url || mediaItem.file_path}
                    alt={mediaItem.alt_text || mediaItem.filename}
                    className='w-full h-full object-cover rounded-lg'
                  />
                ) : (
                  <div className='text-center'>
                    {getFileIcon(mediaItem.mime_type)}
                    <div className='mt-2 text-sm text-gray-600'>
                      {getFileTypeCategory(mediaItem.mime_type)}
                    </div>
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className='space-y-3'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Filename
                  </label>
                  <div className='text-sm text-gray-900 font-medium'>
                    {mediaItem.filename}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Original Name
                  </label>
                  <div className='text-sm text-gray-600'>
                    {mediaItem.original_name}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    File Type
                  </label>
                  <div className='text-sm text-gray-600'>
                    {mediaItem.mime_type}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    File Size
                  </label>
                  <div className='text-sm text-gray-600'>
                    {formatFileSize(mediaItem.file_size)}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Uploaded
                  </label>
                  <div className='text-sm text-gray-600'>
                    {new Date(mediaItem.created_at).toLocaleString()}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Uploaded By
                  </label>
                  <div className='text-sm text-gray-600'>
                    {mediaItem.uploaded_by}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className='pt-4 border-t border-gray-200'>
                <div className='flex space-x-2'>
                  <button
                    onClick={() => window.open(mediaItem.file_path, '_blank')}
                    className='flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center'
                  >
                    <Eye className='w-4 h-4 mr-2' />
                    View
                  </button>
                  <button
                    onClick={() => window.open(mediaItem.file_path, '_blank')}
                    className='flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center'
                  >
                    <Download className='w-4 h-4 mr-2' />
                    Download
                  </button>
                  <button
                    onClick={deleteMedia}
                    className='px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metadata Editor */}
        <div className='lg:col-span-2'>
          <div className='bg-white rounded-lg shadow p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-6 flex items-center'>
              <Edit3 className='w-5 h-5 mr-2' />
              Edit Metadata
            </h3>

            <div className='space-y-6'>
              {/* Alt Text */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Alt Text
                  <span className='text-gray-500 ml-1'>
                    (for accessibility)
                  </span>
                </label>
                <textarea
                  value={metadata.alt_text}
                  onChange={e =>
                    setMetadata(prev => ({ ...prev, alt_text: e.target.value }))
                  }
                  placeholder='Describe the image for screen readers...'
                  rows={3}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              {/* Caption */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Caption
                  <span className='text-gray-500 ml-1'>
                    (optional description)
                  </span>
                </label>
                <textarea
                  value={metadata.caption}
                  onChange={e =>
                    setMetadata(prev => ({ ...prev, caption: e.target.value }))
                  }
                  placeholder='Add a caption or description...'
                  rows={3}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              {/* Tags */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center'>
                  <Tag className='w-4 h-4 mr-1' />
                  Tags
                </label>
                <div className='space-y-3'>
                  <div className='flex flex-wrap gap-2'>
                    {metadata.tags.map((tag, index) => (
                      <span
                        key={index}
                        className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800'
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className='ml-2 text-blue-600 hover:text-blue-800'
                        >
                          <X className='w-3 h-3' />
                        </button>
                      </span>
                    ))}
                  </div>

                  {showTagInput ? (
                    <div className='flex space-x-2'>
                      <input
                        type='text'
                        value={newTag}
                        onChange={e => setNewTag(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && addTag()}
                        placeholder='Enter tag name...'
                        className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        autoFocus
                      />
                      <button
                        onClick={addTag}
                        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setShowTagInput(false);
                          setNewTag('');
                        }}
                        className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowTagInput(true)}
                      className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center'
                    >
                      <Tag className='w-4 h-4 mr-2' />
                      Add Tag
                    </button>
                  )}

                  {/* Available Tags */}
                  {availableTags.length > 0 && (
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Available Tags
                      </label>
                      <div className='flex flex-wrap gap-2'>
                        {availableTags
                          .filter(tag => !metadata.tags.includes(tag))
                          .map(tag => (
                            <button
                              key={tag}
                              onClick={() =>
                                setMetadata(prev => ({
                                  ...prev,
                                  tags: [...prev.tags, tag],
                                }))
                              }
                              className='px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors'
                            >
                              {tag}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Folder */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center'>
                  <Folder className='w-4 h-4 mr-1' />
                  Folder
                </label>
                <div className='space-y-3'>
                  {showFolderInput ? (
                    <div className='flex space-x-2'>
                      <input
                        type='text'
                        value={newFolder}
                        onChange={e => setNewFolder(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && addFolder()}
                        placeholder='Enter folder name...'
                        className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        autoFocus
                      />
                      <button
                        onClick={addFolder}
                        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                      >
                        Set
                      </button>
                      <button
                        onClick={() => {
                          setShowFolderInput(false);
                          setNewFolder('');
                        }}
                        className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className='flex items-center space-x-3'>
                      <div className='flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50'>
                        {metadata.folder || 'No folder assigned'}
                      </div>
                      <button
                        onClick={() => setShowFolderInput(true)}
                        className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'
                      >
                        Change
                      </button>
                      {metadata.folder && (
                        <button
                          onClick={() =>
                            setMetadata(prev => ({ ...prev, folder: '' }))
                          }
                          className='px-4 py-2 text-red-600 hover:text-red-800'
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  )}

                  {/* Available Folders */}
                  {availableFolders.length > 0 && (
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Available Folders
                      </label>
                      <div className='flex flex-wrap gap-2'>
                        {availableFolders
                          .filter(folder => folder !== metadata.folder)
                          .map(folder => (
                            <button
                              key={folder}
                              onClick={() =>
                                setMetadata(prev => ({ ...prev, folder }))
                              }
                              className='px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors'
                            >
                              {folder}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
