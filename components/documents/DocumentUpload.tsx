'use client';

import { useState, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/Toast';
import { Upload, X, File, AlertCircle, CheckCircle } from 'lucide-react';

interface UploadProgress {
  [key: string]: number;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

interface DocumentUploadProps {
  onUploadSuccess?: (document: any) => void;
  onUploadError?: (error: string) => void;
  allowedTypes?: string[];
  maxFileSize?: number; // in MB
  multiple?: boolean;
}

export default function DocumentUpload({
  onUploadSuccess,
  onUploadError,
  allowedTypes = ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png'],
  maxFileSize = 10, // 10MB default
  multiple = false,
}: DocumentUploadProps) {
  const { isAuthenticated } = useAuth();

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
    type: 'document',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size must be less than ${maxFileSize}MB`;
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      return `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`;
    }

    return null;
  };

  const handleFileSelect = useCallback(
    (selectedFiles: FileList | null) => {
      if (!selectedFiles) return;

      const newFiles: UploadedFile[] = [];
      const filesArray = Array.from(selectedFiles);

      filesArray.forEach(file => {
        const error = validateFile(file);
        const fileId = Math.random().toString(36).substr(2, 9);

        newFiles.push({
          id: fileId,
          name: file.name,
          size: file.size,
          type: file.type,
          status: error ? 'error' : 'uploading',
          error: error || undefined,
        });
      });

      setFiles(prev => (multiple ? [...prev, ...newFiles] : newFiles));
    },
    [allowedTypes, maxFileSize, multiple]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const uploadFile = async (file: File, fileId: string) => {
    const formDataToSend = new FormData();
    formDataToSend.append('files', file); // 'files' is the field expected by formidable
    formDataToSend.append('alt_text', formData.title || file.name);
    formDataToSend.append('caption', formData.description);
    // Optionally, add tags if you want: formDataToSend.append('tags', ...);

    try {
      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const result = await response.json();
      setFiles(prev =>
        prev.map(f => (f.id === fileId ? { ...f, status: 'success' } : f))
      );
      toast.success(`${file.name} has been uploaded successfully.`);
      // result.media is an array if multiple files, or a single object
      if (Array.isArray(result.media)) {
        onUploadSuccess?.(result.media[0]);
      } else {
        onUploadSuccess?.(result.media);
      }
    } catch (error: any) {
      setFiles(prev =>
        prev.map(f =>
          f.id === fileId ? { ...f, status: 'error', error: error.message } : f
        )
      );
      toast.error(`Failed to upload ${file.name}: ${error.message}`);
      onUploadError?.(error.message);
    }
  };

  const handleUpload = async () => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to upload documents.');
      onUploadError?.('You must be logged in to upload documents');
      return;
    }

    const filesToUpload = files.filter(file => file.status === 'uploading');
    if (filesToUpload.length === 0) return;

    // Get the actual File objects from the input
    const fileInput = fileInputRef.current;
    if (!fileInput?.files) return;

    const fileArray = Array.from(fileInput.files);

    for (let i = 0; i < filesToUpload.length; i++) {
      const fileToUpload = filesToUpload[i];
      const actualFile = fileArray.find(f => f.name === fileToUpload.name);

      if (actualFile) {
        await uploadFile(actualFile, fileToUpload.id);
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className='w-full max-w-2xl mx-auto'>
      {/* Form Fields */}
      <div className='mb-6 space-y-4'>
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Document Title
          </label>
          <input
            type='text'
            id='title'
            value={formData.title}
            onChange={e =>
              setFormData(prev => ({ ...prev, title: e.target.value }))
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'
            placeholder='Enter document title'
          />
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Description
          </label>
          <textarea
            id='description'
            value={formData.description}
            onChange={e =>
              setFormData(prev => ({ ...prev, description: e.target.value }))
            }
            rows={3}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'
            placeholder='Enter document description'
          />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label
              htmlFor='category'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Category
            </label>
            <select
              id='category'
              value={formData.category}
              onChange={e =>
                setFormData(prev => ({ ...prev, category: e.target.value }))
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'
            >
              <option value='general'>General</option>
              <option value='project'>Project</option>
              <option value='technical'>Technical</option>
              <option value='financial'>Financial</option>
              <option value='legal'>Legal</option>
            </select>
          </div>

          <div>
            <label
              htmlFor='type'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Type
            </label>
            <select
              id='type'
              value={formData.type}
              onChange={e =>
                setFormData(prev => ({ ...prev, type: e.target.value }))
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'
            >
              <option value='document'>Document</option>
              <option value='project'>Project</option>
              <option value='team'>Team</option>
            </select>
          </div>
        </div>
      </div>

      {/* File Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 hover:border-primary hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className='mx-auto h-12 w-12 text-gray-400 mb-4' />
        <div className='text-lg font-medium text-gray-900 mb-2'>
          Drop files here or click to browse
        </div>
        <p className='text-sm text-gray-500 mb-4'>
          Supported formats: {allowedTypes.join(', ')} (Max {maxFileSize}MB)
        </p>
        <button
          type='button'
          onClick={() => fileInputRef.current?.click()}
          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
        >
          Choose Files
        </button>
        <input
          ref={fileInputRef}
          type='file'
          multiple={multiple}
          accept={allowedTypes.join(',')}
          onChange={e => handleFileSelect(e.target.files)}
          className='hidden'
        />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className='mt-6'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Selected Files
          </h3>
          <div className='space-y-3'>
            {files.map(file => (
              <div
                key={file.id}
                className='flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white'
              >
                <div className='flex items-center space-x-3'>
                  <File className='h-5 w-5 text-gray-400' />
                  <div>
                    <p className='text-sm font-medium text-gray-900'>
                      {file.name}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-2'>
                  {file.status === 'uploading' && (
                    <div className='flex items-center space-x-2'>
                      <div className='w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin'></div>
                      <span className='text-sm text-gray-500'>
                        Uploading...
                      </span>
                    </div>
                  )}

                  {file.status === 'success' && (
                    <div className='flex items-center space-x-2 text-green-600'>
                      <CheckCircle className='h-5 w-5' />
                      <span className='text-sm'>Uploaded</span>
                    </div>
                  )}

                  {file.status === 'error' && (
                    <div className='flex items-center space-x-2 text-red-600'>
                      <AlertCircle className='h-5 w-5' />
                      <span className='text-sm'>{file.error}</span>
                    </div>
                  )}

                  <button
                    onClick={() => removeFile(file.id)}
                    className='text-gray-400 hover:text-red-500'
                  >
                    <X className='h-5 w-5' />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-6'>
            <button
              onClick={handleUpload}
              disabled={
                !isAuthenticated || files.every(f => f.status === 'error')
              }
              className='w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {!isAuthenticated ? 'Login to Upload' : 'Upload Documents'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
