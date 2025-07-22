'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Eye, ArrowLeft, Settings, FileText, Search } from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';
import Image from 'next/image';

interface PageFormData {
  title: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  status: 'draft' | 'published';
  publish_at: string;
  unpublish_at: string;
}

export default function NewPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<PageFormData>({
    title: '',
    slug: '',
    content: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image: '',
    status: 'draft',
    publish_at: '',
    unpublish_at: '',
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>(
    'content'
  );
  const [previewLoading, setPreviewLoading] = useState(false);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement API call to create page
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/pages');
      } else {
        throw new Error('Failed to create page');
      }
    } catch (error) {
      setError('Error creating page');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async () => {
    if (!formData.title || !formData.content) return;
    setPreviewLoading(true);
    try {
      const res = await fetch('/api/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'page',
          id: formData.slug || 'new',
          draft: formData,
        }),
      });
      const data = await res.json();
      if (data.success && data.redirect) {
        window.open(data.redirect, '_blank', 'noopener');
      } else {
        alert(data.error || 'Failed to open preview');
      }
    } catch (err) {
      alert('Failed to open preview');
    } finally {
      setPreviewLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <button
            onClick={() => router.back()}
            className='text-gray-600 hover:text-gray-900'
          >
            <ArrowLeft className='w-5 h-5' />
          </button>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>
              Create New Page
            </h1>
            <p className='text-gray-600'>Add a new page to your website</p>
          </div>
        </div>
        <div className='flex items-center space-x-3'>
          <button
            type='button'
            onClick={handlePreview}
            disabled={!formData.title || !formData.content || previewLoading}
            className='px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center space-x-2 disabled:opacity-50'
          >
            <Eye className='w-4 h-4 mr-2' />
            {previewLoading ? 'Loading...' : 'Preview'}
          </button>
          <button
            type='submit'
            form='page-form'
            disabled={loading}
            className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2'
          >
            <Save className='w-4 h-4' />
            <span>{loading ? 'Saving...' : 'Save Page'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className='border-b border-gray-200'>
        <nav className='-mb-px flex space-x-8'>
          <button
            onClick={() => setActiveTab('content')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'content'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FileText className='w-4 h-4 inline mr-2' />
            Content
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'seo'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Search className='w-4 h-4 inline mr-2' />
            SEO
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Settings className='w-4 h-4 inline mr-2' />
            Settings
          </button>
        </nav>
      </div>

      {/* Form */}
      <form id='page-form' onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {activeTab === 'content' && (
              <>
                <div>
                  <label
                    htmlFor='title'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Page Title *
                  </label>
                  <input
                    type='text'
                    id='title'
                    value={formData.title}
                    onChange={e => handleTitleChange(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Enter page title...'
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='slug'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    URL Slug *
                  </label>
                  <div className='flex'>
                    <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
                      /
                    </span>
                    <input
                      type='text'
                      id='slug'
                      value={formData.slug}
                      onChange={e =>
                        setFormData(prev => ({ ...prev, slug: e.target.value }))
                      }
                      className='flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='page-url-slug'
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='content'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Page Content *
                  </label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={content =>
                      setFormData(prev => ({ ...prev, content }))
                    }
                    placeholder='Enter your page content here...'
                    height={400}
                  />
                </div>
              </>
            )}

            {activeTab === 'seo' && (
              <div className='space-y-6'>
                <div>
                  <label
                    htmlFor='meta_title'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Meta Title
                  </label>
                  <input
                    type='text'
                    id='meta_title'
                    value={formData.meta_title}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        meta_title: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='SEO title for search engines...'
                    maxLength={60}
                  />
                  <p className='mt-1 text-sm text-gray-500'>
                    {formData.meta_title.length}/60 characters
                  </p>
                </div>

                <div>
                  <label
                    htmlFor='meta_description'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Meta Description
                  </label>
                  <textarea
                    id='meta_description'
                    value={formData.meta_description}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        meta_description: e.target.value,
                      }))
                    }
                    rows={3}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Brief description for search results...'
                    maxLength={160}
                  />
                  <p className='mt-1 text-sm text-gray-500'>
                    {formData.meta_description.length}/160 characters
                  </p>
                </div>

                <div>
                  <label
                    htmlFor='meta_keywords'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Meta Keywords
                  </label>
                  <input
                    type='text'
                    id='meta_keywords'
                    value={formData.meta_keywords}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        meta_keywords: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='keyword1, keyword2, keyword3...'
                  />
                  <p className='mt-1 text-sm text-gray-500'>
                    Separate keywords with commas
                  </p>
                </div>

                <div>
                  <label
                    htmlFor='og_title'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Open Graph Title
                  </label>
                  <input
                    type='text'
                    id='og_title'
                    value={formData.og_title}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        og_title: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Open Graph title for social media...'
                    maxLength={60}
                  />
                  <p className='mt-1 text-sm text-gray-500'>
                    {formData.og_title.length}/60 characters
                  </p>
                </div>

                <div>
                  <label
                    htmlFor='og_description'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Open Graph Description
                  </label>
                  <textarea
                    id='og_description'
                    value={formData.og_description}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        og_description: e.target.value,
                      }))
                    }
                    rows={3}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Brief description for Open Graph...'
                    maxLength={160}
                  />
                  <p className='mt-1 text-sm text-gray-500'>
                    {formData.og_description.length}/160 characters
                  </p>
                </div>

                <div>
                  <label
                    htmlFor='og_image'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Open Graph Image
                  </label>
                  <input
                    type='url'
                    id='og_image'
                    value={formData.og_image}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        og_image: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='https://example.com/og-image.jpg'
                  />
                  {formData.og_image && (
                    <Image
                      src={formData.og_image}
                      alt='OG'
                      width={256}
                      height={128}
                      className='mt-2 max-h-32 rounded object-contain'
                    />
                  )}
                </div>

                <div>
                  <label
                    htmlFor='twitter_title'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Twitter Title
                  </label>
                  <input
                    type='text'
                    id='twitter_title'
                    value={formData.twitter_title}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        twitter_title: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Twitter title for social media...'
                    maxLength={60}
                  />
                  <p className='mt-1 text-sm text-gray-500'>
                    {formData.twitter_title.length}/60 characters
                  </p>
                </div>

                <div>
                  <label
                    htmlFor='twitter_description'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Twitter Description
                  </label>
                  <textarea
                    id='twitter_description'
                    value={formData.twitter_description}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        twitter_description: e.target.value,
                      }))
                    }
                    rows={3}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Brief description for Twitter...'
                    maxLength={160}
                  />
                  <p className='mt-1 text-sm text-gray-500'>
                    {formData.twitter_description.length}/160 characters
                  </p>
                </div>

                <div>
                  <label
                    htmlFor='twitter_image'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Twitter Image
                  </label>
                  <input
                    type='url'
                    id='twitter_image'
                    value={formData.twitter_image}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        twitter_image: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='https://example.com/twitter-image.jpg'
                  />
                  {formData.twitter_image && (
                    <Image
                      src={formData.twitter_image}
                      alt='Twitter'
                      width={256}
                      height={128}
                      className='mt-2 max-h-32 rounded object-contain'
                    />
                  )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className='space-y-6'>
                <div>
                  <label
                    htmlFor='status'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Page Status
                  </label>
                  <select
                    id='status'
                    value={formData.status}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        status: e.target.value as 'draft' | 'published',
                      }))
                    }
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  >
                    <option value='draft'>Draft</option>
                    <option value='published'>Published</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Publish At
                  </label>
                  <input
                    type='datetime-local'
                    value={formData.publish_at}
                    onChange={e =>
                      setFormData(f => ({ ...f, publish_at: e.target.value }))
                    }
                    className='w-full px-3 py-2 border rounded-lg'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Unpublish At
                  </label>
                  <input
                    type='datetime-local'
                    value={formData.unpublish_at}
                    onChange={e =>
                      setFormData(f => ({ ...f, unpublish_at: e.target.value }))
                    }
                    className='w-full px-3 py-2 border rounded-lg'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Schedule Status
                  </label>
                  <div className='px-3 py-2 border rounded-lg bg-gray-50'>
                    {(() => {
                      const now = new Date();
                      const pub = formData.publish_at
                        ? new Date(formData.publish_at)
                        : null;
                      const unpub = formData.unpublish_at
                        ? new Date(formData.unpublish_at)
                        : null;
                      if (pub && now < pub)
                        return (
                          <span className='text-yellow-600'>
                            Scheduled (will publish at {pub.toLocaleString()})
                          </span>
                        );
                      if (unpub && now > unpub)
                        return (
                          <span className='text-gray-500'>
                            Expired (unpublished at {unpub.toLocaleString()})
                          </span>
                        );
                      if (pub && (!unpub || now < unpub) && now >= pub)
                        return (
                          <span className='text-green-700'>Published</span>
                        );
                      return (
                        <span className='text-blue-700'>
                          Draft / Unscheduled
                        </span>
                      );
                    })()}
                  </div>
                </div>

                <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
                  <h3 className='text-sm font-medium text-yellow-800'>
                    Additional Settings
                  </h3>
                  <p className='mt-1 text-sm text-yellow-700'>
                    Advanced page settings like navigation order, template
                    selection, and custom CSS will be available in the next
                    phase.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Page Info */}
            <div className='bg-white border border-gray-200 rounded-lg p-4'>
              <h3 className='text-sm font-medium text-gray-900 mb-3'>
                Page Information
              </h3>
              <div className='space-y-2 text-sm'>
                <div>
                  <span className='text-gray-500'>Status:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      formData.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {formData.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div>
                  <span className='text-gray-500'>URL:</span>
                  <span className='ml-2 text-gray-900'>
                    /{formData.slug || 'page-slug'}
                  </span>
                </div>
                <div>
                  <span className='text-gray-500'>Created:</span>
                  <span className='ml-2 text-gray-900'>Just now</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className='bg-white border border-gray-200 rounded-lg p-4'>
              <h3 className='text-sm font-medium text-gray-900 mb-3'>
                Actions
              </h3>
              <div className='space-y-2'>
                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm'
                >
                  {loading ? 'Saving...' : 'Save Page'}
                </button>
                <button
                  type='button'
                  className='w-full bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 text-sm'
                >
                  Save as Draft
                </button>
                <button
                  type='button'
                  onClick={() => router.back()}
                  className='w-full border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
