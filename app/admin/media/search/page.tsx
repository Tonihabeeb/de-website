'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Eye, 
  Download, 
  Trash2, 
  Edit,
  Tag,
  Folder,
  Calendar,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  X,
  SlidersHorizontal,
  SortAsc,
  SortDesc,
  RefreshCw,
  Save
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

interface SearchFilters {
  query: string;
  fileType: string[];
  sizeRange: {
    min: number;
    max: number;
  };
  dateRange: {
    start: string;
    end: string;
  };
  tags: string[];
  folders: string[];
  uploadedBy: string[];
}

interface SortOption {
  field: 'filename' | 'size' | 'created_at' | 'uploaded_by';
  direction: 'asc' | 'desc';
}

export default function MediaSearch() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Search and filter state
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    fileType: [],
    sizeRange: { min: 0, max: 1000000000 },
    dateRange: { start: '', end: '' },
    tags: [],
    folders: [],
    uploadedBy: []
  });
  
  const [sortOption, setSortOption] = useState<SortOption>({
    field: 'created_at',
    direction: 'desc'
  });

  // Available options for filters
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [availableFolders, setAvailableFolders] = useState<string[]>([]);
  const [availableUsers, setAvailableUsers] = useState<string[]>([]);

  useEffect(() => {
    fetchMedia();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [mediaItems, filters, sortOption]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/media');
      const data = await response.json();
      
      if (data.success) {
        setMediaItems(data.media || []);
        
        // Extract available options for filters
        const tags = new Set<string>();
        const folders = new Set<string>();
        const users = new Set<string>();
        
        data.media.forEach((item: MediaItem) => {
          item.tags?.forEach(tag => tags.add(tag));
          if (item.folder) folders.add(item.folder);
          users.add(item.uploaded_by);
        });
        
        setAvailableTags(Array.from(tags));
        setAvailableFolders(Array.from(folders));
        setAvailableUsers(Array.from(users));
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

  const applyFilters = () => {
    let filtered = [...mediaItems];

    // Text search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(item =>
        item.filename.toLowerCase().includes(query) ||
        item.original_name.toLowerCase().includes(query) ||
        item.alt_text?.toLowerCase().includes(query) ||
        item.caption?.toLowerCase().includes(query) ||
        item.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // File type filter
    if (filters.fileType.length > 0) {
      filtered = filtered.filter(item =>
        filters.fileType.some(type => item.mime_type.startsWith(type))
      );
    }

    // Size range filter
    filtered = filtered.filter(item =>
      item.file_size >= filters.sizeRange.min && item.file_size <= filters.sizeRange.max
    );

    // Date range filter
    if (filters.dateRange.start) {
      filtered = filtered.filter(item =>
        new Date(item.created_at) >= new Date(filters.dateRange.start)
      );
    }
    if (filters.dateRange.end) {
      filtered = filtered.filter(item =>
        new Date(item.created_at) <= new Date(filters.dateRange.end)
      );
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(item =>
        item.tags && filters.tags.some(tag => item.tags!.includes(tag))
      );
    }

    // Folders filter
    if (filters.folders.length > 0) {
      filtered = filtered.filter(item =>
        item.folder && filters.folders.includes(item.folder)
      );
    }

    // Uploaded by filter
    if (filters.uploadedBy.length > 0) {
      filtered = filtered.filter(item =>
        filters.uploadedBy.includes(item.uploaded_by)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortOption.field) {
        case 'filename':
          aValue = a.filename.toLowerCase();
          bValue = b.filename.toLowerCase();
          break;
        case 'size':
          aValue = a.file_size;
          bValue = b.file_size;
          break;
        case 'created_at':
          aValue = new Date(a.created_at);
          bValue = new Date(b.created_at);
          break;
        case 'uploaded_by':
          aValue = a.uploaded_by.toLowerCase();
          bValue = b.uploaded_by.toLowerCase();
          break;
        default:
          return 0;
      }
      
      if (sortOption.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredItems(filtered);
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      fileType: [],
      sizeRange: { min: 0, max: 1000000000 },
      dateRange: { start: '', end: '' },
      tags: [],
      folders: [],
      uploadedBy: []
    });
  };

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => {
      const currentArray = prev[key] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [key]: newArray };
    });
  };

  const deleteMedia = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch(`/api/admin/media/${itemId}`, {
        method: 'DELETE'
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

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="w-6 h-6 text-blue-500" />;
    if (mimeType.startsWith('video/')) return <Video className="w-6 h-6 text-purple-500" />;
    if (mimeType.startsWith('audio/')) return <Music className="w-6 h-6 text-green-500" />;
    if (mimeType.includes('zip') || mimeType.includes('rar')) return <Archive className="w-6 h-6 text-orange-500" />;
    return <FileText className="w-6 h-6 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeCategory = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return 'Images';
    if (mimeType.startsWith('video/')) return 'Videos';
    if (mimeType.startsWith('audio/')) return 'Audio';
    if (mimeType.includes('pdf')) return 'Documents';
    if (mimeType.includes('zip') || mimeType.includes('rar')) return 'Archives';
    return 'Other';
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading media search...</span>
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
            <h1 className="text-2xl font-bold text-gray-900">Media Search & Filter</h1>
            <p className="text-gray-600 mt-1">Advanced search and filtering for media files</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <Save className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-green-800">{success}</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <X className="w-5 h-5 text-red-400 mr-2" />
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search media files by name, tags, or content..."
            value={filters.query}
            onChange={(e) => updateFilter('query', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mb-6 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Advanced Filters
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* File Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">File Type</label>
              <div className="space-y-2">
                {['image/', 'video/', 'audio/', 'application/pdf', 'application/zip'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.fileType.includes(type)}
                      onChange={() => toggleArrayFilter('fileType', type)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{getFileTypeCategory(type)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">File Size</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min (bytes)"
                    value={filters.sizeRange.min || ''}
                    onChange={(e) => updateFilter('sizeRange', { 
                      ...filters.sizeRange, 
                      min: parseInt(e.target.value) || 0 
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    placeholder="Max (bytes)"
                    value={filters.sizeRange.max || ''}
                    onChange={(e) => updateFilter('sizeRange', { 
                      ...filters.sizeRange, 
                      max: parseInt(e.target.value) || 1000000000 
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Date</label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => updateFilter('dateRange', { 
                    ...filters.dateRange, 
                    start: e.target.value 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => updateFilter('dateRange', { 
                    ...filters.dateRange, 
                    end: e.target.value 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {availableTags.map((tag) => (
                  <label key={tag} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.tags.includes(tag)}
                      onChange={() => toggleArrayFilter('tags', tag)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Folders Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Folders</label>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {availableFolders.map((folder) => (
                  <label key={folder} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.folders.includes(folder)}
                      onChange={() => toggleArrayFilter('folders', folder)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{folder}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Uploaded By Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Uploaded By</label>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {availableUsers.map((user) => (
                  <label key={user} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.uploadedBy.includes(user)}
                      onChange={() => toggleArrayFilter('uploadedBy', user)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{user}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Search Results ({filteredItems.length} files)
          </h2>
          {Object.values(filters).some(value => 
            Array.isArray(value) ? value.length > 0 : 
            typeof value === 'object' ? Object.values(value).some(v => v !== '' && v !== 0) :
            value !== ''
          ) && (
            <p className="text-sm text-gray-600 mt-1">Filters applied</p>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Sort Options */}
          <select
            value={`${sortOption.field}-${sortOption.direction}`}
            onChange={(e) => {
              const [field, direction] = e.target.value.split('-') as [SortOption['field'], SortOption['direction']];
              setSortOption({ field, direction });
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="created_at-desc">Newest First</option>
            <option value="created_at-asc">Oldest First</option>
            <option value="filename-asc">Name A-Z</option>
            <option value="filename-desc">Name Z-A</option>
            <option value="size-desc">Largest First</option>
            <option value="size-asc">Smallest First</option>
            <option value="uploaded_by-asc">Uploader A-Z</option>
          </select>
          
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow">
        {viewMode === 'grid' ? (
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="group relative bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                  <div className="aspect-square flex items-center justify-center mb-2">
                    {item.mime_type.startsWith('image/') ? (
                      <img
                        src={item.thumbnail_url || item.file_path}
                        alt={item.alt_text || item.filename}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      getFileIcon(item.mime_type)
                    )}
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900 truncate" title={item.filename}>
                      {item.filename}
                    </div>
                    <div className="text-xs text-gray-500">{formatFileSize(item.file_size)}</div>
                    {item.folder && (
                      <div className="text-xs text-blue-600 mt-1">{item.folder}</div>
                    )}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1 justify-center">
                        {item.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block w-2 h-2 rounded-full bg-blue-500"
                            title={tag}
                          />
                        ))}
                        {item.tags.length > 2 && (
                          <span className="text-xs text-gray-500">+{item.tags.length - 2}</span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.open(item.file_path, '_blank')}
                        className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => window.open(item.file_path, '_blank')}
                        className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteMedia(item.id)}
                        className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Folder
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tags
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getFileIcon(item.mime_type)}
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{item.filename}</div>
                          <div className="text-sm text-gray-500">{item.original_name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getFileTypeCategory(item.mime_type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatFileSize(item.file_size)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.folder || 'Root'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {item.tags?.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => window.open(item.file_path, '_blank')}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => window.open(item.file_path, '_blank')}
                          className="text-green-600 hover:text-green-900"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteMedia(item.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
} 