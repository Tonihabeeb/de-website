'use client';

import React, { useState } from 'react';
import { toast } from '@/components/ui/Toast';
import ProfessionalForm from '@/components/admin/ProfessionalForm';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import FileUpload from '@/components/ui/FileUpload';
import RichTextEditor from '@/components/ui/RichTextEditor';
import Button from '@/components/ui/Button';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const demoUsers: DemoUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '2024-01-14T15:45:00Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'User',
    status: 'inactive',
    lastLogin: '2024-01-10T09:20:00Z',
  },
];

const columns: ColumnDef<DemoUser>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          row.getValue('status') === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {row.getValue('status')}
      </span>
    ),
  },
  {
    accessorKey: 'lastLogin',
    header: 'Last Login',
    cell: ({ row }) =>
      format(new Date(row.getValue('lastLogin')), 'MMM dd, yyyy'),
  },
];

const ComponentsDemoPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [richTextContent, setRichTextContent] = useState(
    '<p>This is a demo of the rich text editor...</p>'
  );
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleToastDemo = () => {
    toast.success('This is a success message!');
    setTimeout(() => toast.error('This is an error message!'), 1000);
    setTimeout(() => toast.warning('This is a warning message!'), 2000);
    setTimeout(() => toast.info('This is an info message!'), 3000);
  };

  const handleFileSelection = (files: File[]) => {
    setSelectedFiles(files);
    toast.info(`Selected ${files.length} file(s)`);
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Professional Components Demo
          </h1>
          <p className='text-lg text-gray-600'>
            Showcase of the new professional UI components implemented with
            open-source libraries.
          </p>
        </div>

        <div className='space-y-12'>
          {/* Toast Notifications Demo */}
          <section className='bg-white rounded-lg shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              Toast Notifications
            </h2>
            <p className='text-gray-600 mb-6'>
              Professional toast notifications using Sonner library.
            </p>
            <div className='flex space-x-4'>
              <Button onClick={handleToastDemo}>Show All Toast Types</Button>
              <Button
                variant='secondary'
                onClick={() => toast.success('Success!')}
              >
                Success
              </Button>
              <Button variant='secondary' onClick={() => toast.error('Error!')}>
                Error
              </Button>
              <Button
                variant='secondary'
                onClick={() => toast.warning('Warning!')}
              >
                Warning
              </Button>
              <Button variant='secondary' onClick={() => toast.info('Info!')}>
                Info
              </Button>
            </div>
          </section>

          {/* Modal Demo */}
          <section className='bg-white rounded-lg shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              Modal Dialog
            </h2>
            <p className='text-gray-600 mb-6'>
              Accessible modal dialogs using Radix UI.
            </p>
            <div className='flex space-x-4'>
              <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            </div>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title='Demo Modal'
              size='md'
            >
              <div className='space-y-4'>
                <p className='text-gray-600'>
                  This is a professional modal dialog with proper accessibility
                  features.
                </p>
                <div className='flex justify-end space-x-3'>
                  <Button
                    variant='secondary'
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setIsModalOpen(false);
                      toast.success('Action completed!');
                    }}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </Modal>
          </section>

          {/* Data Table Demo */}
          <section className='bg-white rounded-lg shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              Data Table
            </h2>
            <p className='text-gray-600 mb-6'>
              Professional data table with sorting, filtering, and pagination
              using TanStack Table.
            </p>
            <DataTable
              columns={columns}
              data={demoUsers}
              searchKey='name'
              searchPlaceholder='Search users...'
              pageSize={5}
            />
          </section>

          {/* Rich Text Editor Demo */}
          <section className='bg-white rounded-lg shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              Rich Text Editor
            </h2>
            <p className='text-gray-600 mb-6'>
              Professional rich text editor using TipTap with formatting tools.
            </p>
            <RichTextEditor
              content={richTextContent}
              onChange={setRichTextContent}
              placeholder='Start writing your content...'
            />
            <div className='mt-4 p-4 bg-gray-50 rounded-lg'>
              <h4 className='font-medium text-gray-900 mb-2'>HTML Output:</h4>
              <pre className='text-sm text-gray-600 overflow-x-auto'>
                {richTextContent}
              </pre>
            </div>
          </section>

          {/* File Upload Demo */}
          <section className='bg-white rounded-lg shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              File Upload
            </h2>
            <p className='text-gray-600 mb-6'>
              Drag and drop file upload with preview using React Dropzone.
            </p>
            <FileUpload
              onFilesSelected={handleFileSelection}
              maxFiles={3}
              maxSize={2 * 1024 * 1024} // 2MB
              accept={{
                'image/*': ['.png', '.jpg', '.jpeg'],
                'application/pdf': ['.pdf'],
                'text/*': ['.txt'],
              }}
            />
          </section>

          {/* Professional Form Demo */}
          <section className='bg-white rounded-lg shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              Professional Form
            </h2>
            <p className='text-gray-600 mb-6'>
              Complete form with validation using React Hook Form and Zod.
            </p>
            <ProfessionalForm />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ComponentsDemoPage;
