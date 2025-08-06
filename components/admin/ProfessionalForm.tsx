'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import FormField from '@/components/ui/forms/FormField';
import RichTextEditor from '@/components/ui/RichTextEditor';
import FileUpload from '@/components/ui/FileUpload';
import Modal from '@/components/ui/Modal';
import { toast } from '@/components/ui/Toast';
import Button from '@/components/ui/Button';

// Form validation schema
const formSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  content: z.string().min(1, 'Content is required'),
  startDate: z.string().min(1, 'Start date is required'),
  budget: z.number().min(0, 'Budget must be positive'),
  priority: z.enum(['low', 'medium', 'high']),
});

type FormData = z.infer<typeof formSchema>;

const ProfessionalForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [richTextContent, setRichTextContent] = React.useState(
    '<p>Start writing your content...</p>'
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      email: '',
      category: '',
      description: '',
      content: richTextContent,
      startDate: format(new Date(), 'yyyy-MM-dd'),
      budget: 0,
      priority: 'medium',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Form data:', data);
      console.log('Selected files:', selectedFiles);

      toast.success('Form submitted successfully!');
      reset();
      setSelectedFiles([]);
      setRichTextContent('<p>Start writing your content...</p>');
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
    }
  };

  const handleFileSelection = (files: File[]) => {
    setSelectedFiles(files);
    toast.info(`Selected ${files.length} file(s)`);
  };

  const handleContentChange = (content: string) => {
    setRichTextContent(content);
    setValue('content', content);
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <div className='bg-white rounded-lg shadow-lg p-8'>
        <div className='mb-8'>
          <h2 className="text-3xl font-bold text-white">
            Professional Form Example
          </h2>
          <p className="text-white">
            This form demonstrates the new professional components with
            validation and enhanced UX.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/* Basic Information */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FormField
              name='title'
              label='Project Title'
              type='text'
              placeholder='Enter project title'
              required
            />

            <FormField
              name='email'
              label='Email Address'
              type='email'
              placeholder='Enter email address'
              required
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <FormField
              name='category'
              label='Category'
              type='select'
              required
              options={[
                { value: 'technology', label: 'Technology' },
                { value: 'energy', label: 'Energy' },
                { value: 'infrastructure', label: 'Infrastructure' },
                { value: 'research', label: 'Research' },
              ]}
            />

            <FormField
              name='startDate'
              label='Start Date'
              type='text'
              required
            />

            <FormField
              name='budget'
              label='Budget (USD)'
              type='number'
              placeholder='0'
              required
            />
          </div>

          <FormField
            name='priority'
            label='Priority'
            type='select'
            required
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
          />

          <FormField
            name='description'
            label='Description'
            type='textarea'
            placeholder='Enter project description'
            rows={4}
            required
          />

          {/* Rich Text Editor */}
          <div className='space-y-2'>
            <label className="block text-sm font-medium text-white">
              Content <span className='text-red-500'>*</span>
            </label>
            <RichTextEditor
              content={richTextContent}
              onChange={handleContentChange}
              placeholder='Start writing your content...'
            />
            {errors.content && (
              <div className='flex items-center space-x-1 text-sm text-red-600'>
                <span>{errors.content.message}</span>
              </div>
            )}
          </div>

          {/* File Upload */}
          <div className='space-y-2'>
            <label className="block text-sm font-medium text-white">
              Attachments
            </label>
            <FileUpload
              onFilesSelected={handleFileSelection}
              maxFiles={5}
              maxSize={5 * 1024 * 1024} // 5MB
              accept={{
                'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
                'application/pdf': ['.pdf'],
                'text/*': ['.txt', '.md'],
              }}
            />
          </div>

          {/* Form Actions */}
          <div className='flex items-center justify-between pt-6 border-t border-gray-200'>
            <div className='flex space-x-4'>
              <Button
                type='button'
                variant='secondary'
                onClick={() => setIsModalOpen(true)}
              >
                Preview Form
              </Button>

              <Button
                type='button'
                variant='secondary'
                onClick={() => {
                  reset();
                  setSelectedFiles([]);
                  setRichTextContent('<p>Start writing your content...</p>');
                  toast.info('Form reset');
                }}
              >
                Reset Form
              </Button>
            </div>

            <Button
              type='submit'
              disabled={isSubmitting}
              className='min-w-[120px]'
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </Button>
          </div>
        </form>

        {/* Preview Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title='Form Preview'
          size='lg'
        >
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div>
                <span className='font-medium'>Title:</span>
                <p className="text-white">
                  {watch('title') || 'Not provided'}
                </p>
              </div>
              <div>
                <span className='font-medium'>Email:</span>
                <p className="text-white">
                  {watch('email') || 'Not provided'}
                </p>
              </div>
              <div>
                <span className='font-medium'>Category:</span>
                <p className="text-white">
                  {watch('category') || 'Not provided'}
                </p>
              </div>
              <div>
                <span className='font-medium'>Priority:</span>
                <p className="text-white">
                  {watch('priority') || 'Not provided'}
                </p>
              </div>
            </div>

            <div>
              <span className='font-medium'>Description:</span>
              <p className="text-white">
                {watch('description') || 'Not provided'}
              </p>
            </div>

            <div>
              <span className='font-medium'>Content:</span>
              <div
                className="mt-1 text-white"
                dangerouslySetInnerHTML={{
                  __html: watch('content') || 'Not provided',
                }}
              />
            </div>

            <div>
              <span className='font-medium'>Files:</span>
              <p className="text-white">
                {selectedFiles.length > 0
                  ? `${selectedFiles.length} file(s) selected`
                  : 'No files selected'}
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProfessionalForm;
