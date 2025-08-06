'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DocumentUpload from '@/components/documents/DocumentUpload';
import DocumentList from '@/components/documents/DocumentList';
import RoleGuard from '@/components/auth/RoleGuard';
import { Upload, Folder, FileText, Users, Settings } from 'lucide-react';

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

const tabs = [
  { id: 'all', name: 'All Documents', icon: Folder },
  { id: 'document', name: 'Documents', icon: FileText },
  { id: 'project', name: 'Projects', icon: Folder },
  { id: 'team', name: 'Team', icon: Users },
];

export default function DocumentsPage() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [showUpload, setShowUpload] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );

  const handleUploadSuccess = (document: any) => {
    setShowUpload(false);
    // Optionally refresh the document list or show success message
    console.log('Document uploaded successfully:', document);
  };

  const handleUploadError = (error: string) => {
    console.error('Upload error:', error);
    // Optionally show error message to user
  };

  const handleDocumentSelect = (media: MediaItem) => {
    // Convert MediaItem to Document format for the modal
    const document: Document = {
      _id: media.id,
      title: media.original_name || media.filename,
      description: media.caption || '',
      filename: media.filename,
      originalName: media.original_name,
      mimetype: media.mime_type,
      size: media.file_size,
      category: media.tags?.[0] || 'General',
      type: media.mime_type,
      uploadedBy: {
        _id: media.uploaded_by || '',
        name: 'Unknown',
        email: '',
      },
      createdAt: media.created_at,
      updatedAt: media.created_at,
    };
    setSelectedDocument(document);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Document Management
              </h1>
              <p className="text-white">
                Upload, organize, and manage your documents and files
              </p>
            </div>

            <RoleGuard roles={['admin', 'editor']}>
              <button
                onClick={() => setShowUpload(!showUpload)}
                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
              >
                <Upload className='h-4 w-4 mr-2' />
                {showUpload ? 'Cancel Upload' : 'Upload Document'}
              </button>
            </RoleGuard>
          </div>
        </div>

        {/* Upload Section */}
        {showUpload && (
          <div className='mb-8'>
            <div className='bg-white rounded-lg shadow p-6'>
              <h2 className="text-xl font-semibold text-white">
                Upload New Document
              </h2>
              <DocumentUpload
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
                multiple={true}
              />
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className='bg-white rounded-lg shadow mb-6'>
          <div className='border-b border-gray-200'>
            <nav className='-mb-px flex space-x-8 px-6'>
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-700 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className='h-4 w-4' />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Document List */}
        <div className='bg-white rounded-lg shadow p-6'>
          <DocumentList
            mimeTypes={activeTab === 'all' ? undefined : [activeTab]}
            showActions={true}
            onDocumentSelect={handleDocumentSelect}
          />
        </div>

        {/* Document Details Modal (placeholder) */}
        {selectedDocument && (
          <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
            <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
              <div className='mt-3'>
                <h3 className="text-lg font-medium text-white">
                  Document Details
                </h3>
                <div className='space-y-3'>
                  <div>
                    <label className="text-sm font-medium text-white">
                      Title:
                    </label>
                    <p className="text-sm text-white">
                      {selectedDocument.title}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white">
                      Description:
                    </label>
                    <p className="text-sm text-white">
                      {selectedDocument.description}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white">
                      Category:
                    </label>
                    <p className="text-sm text-white">
                      {selectedDocument.category}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white">
                      Uploaded by:
                    </label>
                    <p className="text-sm text-white">
                      {selectedDocument.uploadedBy.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white">
                      Upload date:
                    </label>
                    <p className="text-sm text-white">
                      {new Date(
                        selectedDocument.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className='flex justify-end space-x-3 mt-6'>
                  <button
                    onClick={() => setSelectedDocument(null)}
                    className="px-4 py-2 text-sm font-medium text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
