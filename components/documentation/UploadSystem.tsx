'use client';
import { useRef, useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';

interface UploadFile {
  file: File;
  name: string;
  size: number;
}

interface MediaItem {
  id: string;
  filename: string;
  original_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  tags?: string[];
  created_at: string;
}

const TAG_OPTIONS = ['Technical', 'Legal', 'Environmental', 'Business'];

export default function UploadSystem() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState(TAG_OPTIONS[0]);
  const [uploadedFiles, setUploadedFiles] = useState<MediaItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch uploaded files from /api/admin/media
  const fetchUploadedFiles = async () => {
    try {
      const res = await fetch('/api/admin/media');
      if (res.ok) {
        const data = await res.json();
        setUploadedFiles(Array.isArray(data.media) ? data.media : []);
      } else {
        setUploadedFiles([]);
      }
    } catch {
      setUploadedFiles([]);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList).map(f => ({
      file: f,
      name: f.name,
      size: f.size,
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    setUploadStatus(null);
    const formData = new FormData();
    files.forEach(f => formData.append('files', f.file));
    // Use tags as an array
    formData.append('tags', selectedTag);
    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setUploadStatus('Upload successful!');
        setFiles([]);
        await fetchUploadedFiles();
      } else {
        const data = await res.json();
        setUploadStatus('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err: any) {
      setUploadStatus('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Group files by tag using tags property
  const filesByTag: { [tag: string]: MediaItem[] } = {};
  uploadedFiles.forEach(file => {
    const tagList = file.tags || ['Untagged'];
    tagList.forEach(tag => {
      if (!filesByTag[tag]) filesByTag[tag] = [];
      filesByTag[tag].push(file);
    });
  });

  return (
    <div className='w-full max-w-2xl mx-auto'>
      <div
        className='flex flex-col items-center justify-center border-2 border-dashed border-primary rounded-lg p-8 bg-gray-50 cursor-pointer hover:bg-blue-50 transition-colors mb-4'
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        tabIndex={0}
        aria-label='Upload documents'
      >
        <Upload className='w-10 h-10 text-primary mb-2' />
        <span className='font-semibold text-primary'>
          Drag & drop files here or click to select
        </span>
        <input
          ref={inputRef}
          type='file'
          multiple
          className='hidden'
          onChange={e => handleFiles(e.target.files)}
          aria-label='Select files to upload'
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='tag-select'
          className='block mb-1 font-medium text-primary'
        >
          Select Tag:
        </label>
        <select
          id='tag-select'
          className='border rounded px-3 py-2'
          value={selectedTag}
          onChange={e => setSelectedTag(e.target.value)}
        >
          {TAG_OPTIONS.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      {files.length > 0 && (
        <div className='bg-white border rounded-lg p-4'>
          <h3 className='font-semibold mb-2 text-primary'>Files to upload</h3>
          <ul className='divide-y divide-gray-200'>
            {files.map((file, i) => (
              <li key={i} className='flex items-center justify-between py-2'>
                <span>
                  {file.name}{' '}
                  <span className='text-xs text-gray-500'>
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </span>
                <button
                  className='ml-2 text-red-500 hover:text-red-700'
                  onClick={e => {
                    e.stopPropagation();
                    handleRemove(i);
                  }}
                  aria-label={`Remove ${file.name}`}
                >
                  <X className='w-5 h-5' />
                </button>
              </li>
            ))}
          </ul>
          <button
            className='mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 disabled:opacity-50'
            onClick={handleUpload}
            disabled={uploading}
            aria-busy={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
          {uploadStatus && (
            <div className='mt-2 text-sm text-center text-primary'>
              {uploadStatus}
            </div>
          )}
        </div>
      )}
      {/* Uploaded files grouped by tag */}
      <div className='mt-8'>
        <h3 className='font-semibold text-lg mb-2 text-primary'>
          Uploaded Files
        </h3>
        {Object.keys(filesByTag).length === 0 && (
          <div className='text-gray-500'>No files uploaded yet.</div>
        )}
        {Object.entries(filesByTag).map(([tag, files]) => (
          <div key={tag} className='mb-4'>
            <div className='font-semibold text-blue-700 mb-1'>{tag}</div>
            <ul className='list-disc list-inside'>
              {files.map(file => (
                <li key={file.id}>
                  <a
                    href={file.file_path}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 underline hover:text-blue-800'
                  >
                    {file.original_name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
