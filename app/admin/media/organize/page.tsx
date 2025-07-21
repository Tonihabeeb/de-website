'use client';

import { useState, useEffect } from 'react';
import {
  Folder,
  FolderPlus,
  Tag,
  Edit,
  Trash2,
  Move,
  Copy,
  Download,
  Search,
  Filter,
  Grid,
  List,
  CheckSquare,
  Square,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Save,
  X,
  Eye,
  FileText,
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

interface Folder {
  id: string;
  name: string;
  path: string;
  item_count: number;
  created_at: string;
}

interface Tag {
  id: string;
  name: string;
  color: string;
  item_count: number;
}

export default function MediaOrganize() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFolder, setFilterFolder] = useState<string>('all');
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Modal states
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showCreateTag, setShowCreateTag] = useState(false);
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);

  // Form states
  const [newFolderName, setNewFolderName] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#3B82F6');
  const [bulkTags, setBulkTags] = useState<string[]>([]);
  const [bulkFolder, setBulkFolder] = useState<string>('');
  const [moveTargetFolder, setMoveTargetFolder] = useState<string>('');

  useEffect(() => {
    fetchMedia();
    fetchFolders();
    fetchTags();
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
      console.error('Error fetching media:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFolders = async () => {
    try {
      const response = await fetch('/api/admin/media/folders');
      const data = await response.json();

      if (data.success) {
        setFolders(data.folders || []);
      }
    } catch (err) {
      console.error('Error fetching folders:', err);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/admin/media/tags');
      const data = await response.json();

      if (data.success) {
        setTags(data.tags || []);
      }
    } catch (err) {
      console.error('Error fetching tags:', err);
    }
  };

  const createFolder = async () => {
    if (!newFolderName.trim()) return;

    try {
      const response = await fetch('/api/admin/media/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newFolderName }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Folder created successfully!');
        setNewFolderName('');
        setShowCreateFolder(false);
        fetchFolders();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.error || 'Failed to create folder');
      }
    } catch (err) {
      setError('Failed to create folder');
      console.error('Error creating folder:', err);
    }
  };

  const createTag = async () => {
    if (!newTagName.trim()) return;

    try {
      const response = await fetch('/api/admin/media/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTagName,
          color: newTagColor,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Tag created successfully!');
        setNewTagName('');
        setNewTagColor('#3B82F6');
        setShowCreateTag(false);
        fetchTags();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.error || 'Failed to create tag');
      }
    } catch (err) {
      setError('Failed to create tag');
      console.error('Error creating tag:', err);
    }
  };

  const updateMediaItem = async (
    itemId: string,
    updates: Partial<MediaItem>
  ) => {
    try {
      const response = await fetch(`/api/admin/media/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Media updated successfully!');
        fetchMedia();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.error || 'Failed to update media');
      }
    } catch (err) {
      setError('Failed to update media');
      console.error('Error updating media:', err);
    }
  };

  const bulkUpdateMedia = async () => {
    if (selectedItems.length === 0) return;

    try {
      const updates: any = {};
      if (bulkTags.length > 0) updates.tags = bulkTags;
      if (bulkFolder) updates.folder = bulkFolder;

      const response = await fetch('/api/admin/media/bulk-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_ids: selectedItems,
          updates,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Bulk update completed successfully!');
        setSelectedItems([]);
        setShowBulkEdit(false);
        setBulkTags([]);
        setBulkFolder('');
        fetchMedia();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.error || 'Failed to update media');
      }
    } catch (err) {
      setError('Failed to update media');
      console.error('Error bulk updating media:', err);
    }
  };

  const moveToFolder = async () => {
    if (selectedItems.length === 0 || !moveTargetFolder) return;

    try {
      const response = await fetch('/api/admin/media/bulk-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_ids: selectedItems,
          updates: { folder: moveTargetFolder },
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Files moved successfully!');
        setSelectedItems([]);
        setShowMoveModal(false);
        setMoveTargetFolder('');
        fetchMedia();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.error || 'Failed to move files');
      }
    } catch (err) {
      setError('Failed to move files');
      console.error('Error moving files:', err);
    }
  };

  const deleteMedia = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch(`/api/admin/media/${itemId}`, {
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
      console.error('Error deleting file:', err);
    }
  };

  const toggleSelection = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredMedia.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredMedia.map(item => item.id));
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/'))
      return <FileText className='w-6 h-6 text-blue-500' />;
    if (mimeType.startsWith('video/'))
      return <FileText className='w-6 h-6 text-purple-500' />;
    if (mimeType.startsWith('audio/'))
      return <FileText className='w-6 h-6 text-green-500' />;
    return <FileText className='w-6 h-6 text-gray-500' />;
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
    const matchesFolder =
      filterFolder === 'all' || item.folder === filterFolder;
    const matchesTags =
      filterTags.length === 0 ||
      filterTags.some(tag => item.tags?.includes(tag));
    return matchesSearch && matchesFolder && matchesTags;
  });

  if (loading) {
    return (
      <div className='p-6'>
        <div className='flex items-center justify-center h-64'>
          <RefreshCw className='w-8 h-8 animate-spin text-blue-600' />
          <span className='ml-2 text-gray-600'>Loading media organizer...</span>
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
              Media Organization
            </h1>
            <p className='text-gray-600 mt-1'>
              Organize media with folders, tags, and bulk operations
            </p>
          </div>
          <div className='flex space-x-3'>
            <button
              onClick={() => setShowCreateFolder(true)}
              className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center'
            >
              <FolderPlus className='w-4 h-4 mr-2' />
              New Folder
            </button>
            <button
              onClick={() => setShowCreateTag(true)}
              className='px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center'
            >
              <Tag className='w-4 h-4 mr-2' />
              New Tag
            </button>
            {selectedItems.length > 0 && (
              <button
                onClick={() => setShowBulkEdit(true)}
                className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center'
              >
                <Edit className='w-4 h-4 mr-2' />
                Bulk Edit ({selectedItems.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className='mb-6 bg-green-50 border border-green-200 rounded-lg p-4'>
          <div className='flex items-center'>
            <Save className='w-5 h-5 text-green-400 mr-2' />
            <span className='text-green-800'>{success}</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className='mb-6 bg-red-50 border border-red-200 rounded-lg p-4'>
          <div className='flex items-center'>
            <X className='w-5 h-5 text-red-400 mr-2' />
            <span className='text-red-800'>{error}</span>
          </div>
        </div>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* Sidebar - Folders and Tags */}
        <div className='lg:col-span-1 space-y-6'>
          {/* Folders */}
          <div className='bg-white rounded-lg shadow p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
              <Folder className='w-5 h-5 mr-2' />
              Folders
            </h3>

            <div className='space-y-2'>
              <button
                onClick={() => setFilterFolder('all')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  filterFolder === 'all'
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-50'
                }`}
              >
                All Files ({mediaItems.length})
              </button>

              {folders.map(folder => (
                <button
                  key={folder.id}
                  onClick={() => setFilterFolder(folder.path)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                    filterFolder === folder.path
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className='flex items-center'>
                    <Folder className='w-4 h-4 mr-2' />
                    {folder.name}
                  </span>
                  <span className='text-sm text-gray-500'>
                    {folder.item_count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className='bg-white rounded-lg shadow p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
              <Tag className='w-5 h-5 mr-2' />
              Tags
            </h3>

            <div className='space-y-2'>
              {tags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => {
                    if (filterTags.includes(tag.name)) {
                      setFilterTags(filterTags.filter(t => t !== tag.name));
                    } else {
                      setFilterTags([...filterTags, tag.name]);
                    }
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                    filterTags.includes(tag.name)
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className='flex items-center'>
                    <div
                      className='w-3 h-3 rounded-full mr-2'
                      style={{ backgroundColor: tag.color }}
                    />
                    {tag.name}
                  </span>
                  <span className='text-sm text-gray-500'>
                    {tag.item_count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='lg:col-span-3'>
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
              <button
                onClick={toggleSelectAll}
                className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'
              >
                {selectedItems.length === filteredMedia.length ? (
                  <CheckSquare className='w-4 h-4' />
                ) : (
                  <Square className='w-4 h-4' />
                )}
              </button>

              <button
                onClick={() =>
                  setViewMode(viewMode === 'grid' ? 'list' : 'grid')
                }
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

          {/* Media Grid/List */}
          <div className='bg-white rounded-lg shadow'>
            <div className='p-6 border-b border-gray-200'>
              <h2 className='text-lg font-semibold text-gray-900'>
                Media Files ({filteredMedia.length} files)
                {selectedItems.length > 0 && (
                  <span className='ml-2 text-sm text-blue-600'>
                    {selectedItems.length} selected
                  </span>
                )}
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
                      <div className='flex items-center mb-2'>
                        <input
                          type='checkbox'
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleSelection(item.id)}
                          className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                        />
                        <div className='ml-2 flex-1'>
                          {getFileIcon(item.mime_type)}
                        </div>
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
                        {item.folder && (
                          <div className='text-xs text-blue-600 mt-1'>
                            {item.folder}
                          </div>
                        )}
                        {item.tags && item.tags.length > 0 && (
                          <div className='flex flex-wrap gap-1 mt-1'>
                            {item.tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className='inline-block w-2 h-2 rounded-full bg-blue-500'
                                title={tag}
                              />
                            ))}
                            {item.tags.length > 2 && (
                              <span className='text-xs text-gray-500'>
                                +{item.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}
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
                        <input
                          type='checkbox'
                          checked={
                            selectedItems.length === filteredMedia.length
                          }
                          onChange={toggleSelectAll}
                          className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                        />
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        File
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Folder
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Tags
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Size
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
                          <input
                            type='checkbox'
                            checked={selectedItems.includes(item.id)}
                            onChange={() => toggleSelection(item.id)}
                            className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                          />
                        </td>
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
                          {item.folder || 'Root'}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex flex-wrap gap-1'>
                            {item.tags?.map((tag, index) => (
                              <span
                                key={index}
                                className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800'
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {formatFileSize(item.file_size)}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                          <div className='flex items-center justify-end space-x-2'>
                            <button
                              onClick={() =>
                                window.open(item.file_path, '_blank')
                              }
                              className='text-blue-600 hover:text-blue-900'
                              title='View'
                            >
                              <Eye className='w-4 h-4' />
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
                <Folder className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  No media files found
                </h3>
                <p className='text-gray-600'>
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Folder Modal */}
      {showCreateFolder && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                Create New Folder
              </h3>
              <input
                type='text'
                placeholder='Folder name'
                value={newFolderName}
                onChange={e => setNewFolderName(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
              <div className='flex justify-end space-x-3 mt-4'>
                <button
                  onClick={() => setShowCreateFolder(false)}
                  className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={createFolder}
                  className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Tag Modal */}
      {showCreateTag && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                Create New Tag
              </h3>
              <input
                type='text'
                placeholder='Tag name'
                value={newTagName}
                onChange={e => setNewTagName(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3'
              />
              <input
                type='color'
                value={newTagColor}
                onChange={e => setNewTagColor(e.target.value)}
                className='w-full h-10 border border-gray-300 rounded-lg'
              />
              <div className='flex justify-end space-x-3 mt-4'>
                <button
                  onClick={() => setShowCreateTag(false)}
                  className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={createTag}
                  className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors'
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Edit Modal */}
      {showBulkEdit && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                Bulk Edit ({selectedItems.length} items)
              </h3>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Tags
                  </label>
                  <div className='flex flex-wrap gap-2'>
                    {tags.map(tag => (
                      <button
                        key={tag.id}
                        onClick={() => {
                          if (bulkTags.includes(tag.name)) {
                            setBulkTags(bulkTags.filter(t => t !== tag.name));
                          } else {
                            setBulkTags([...bulkTags, tag.name]);
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          bulkTags.includes(tag.name)
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        style={{ borderColor: tag.color }}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Folder
                  </label>
                  <select
                    value={bulkFolder}
                    onChange={e => setBulkFolder(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  >
                    <option value=''>No folder</option>
                    {folders.map(folder => (
                      <option key={folder.id} value={folder.path}>
                        {folder.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='flex justify-end space-x-3 mt-6'>
                <button
                  onClick={() => setShowBulkEdit(false)}
                  className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={bulkUpdateMedia}
                  className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
