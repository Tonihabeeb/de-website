'use client';

import { useState } from 'react';
import { 
  FileText, 
  Link, 
  Image, 
  Settings, 
  Eye,
  Save,
  Plus,
  Trash2,
  Calendar,
  User,
  Tag
} from 'lucide-react';
import RichTextEditor from './RichTextEditor';

interface PageContentFormProps {
  formData: {
    title: string;
    slug: string;
    content: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    status: 'draft' | 'published';
  };
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  isEdit?: boolean;
}

export default function PageContentForm({
  formData,
  onChange,
  onSubmit,
  loading = false,
  isEdit = false
}: PageContentFormProps) {
  const [activeSection, setActiveSection] = useState<'content' | 'seo' | 'settings' | 'preview'>('content');
  const [showPreview, setShowPreview] = useState(false);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    onChange('title', title);
    if (!isEdit) {
      onChange('slug', generateSlug(title));
    }
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    if (!formData.title.trim()) {
      errors.push('Page title is required');
    }
    
    if (!formData.slug.trim()) {
      errors.push('URL slug is required');
    }
    
    if (!formData.content.trim()) {
      errors.push('Page content is required');
    }
    
    if (formData.meta_title && formData.meta_title.length > 60) {
      errors.push('Meta title must be 60 characters or less');
    }
    
    if (formData.meta_description && formData.meta_description.length > 160) {
      errors.push('Meta description must be 160 characters or less');
    }
    
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (errors.length > 0) {
      alert('Please fix the following errors:\n' + errors.join('\n'));
      return;
    }
    
    onSubmit();
  };

  const getSeoScore = () => {
    let score = 0;
    let maxScore = 5;
    
    if (formData.title.length > 0) score++;
    if (formData.title.length >= 30 && formData.title.length <= 60) score++;
    if (formData.meta_description.length > 0) score++;
    if (formData.meta_description.length >= 120 && formData.meta_description.length <= 160) score++;
    if (formData.meta_keywords.length > 0) score++;
    
    return { score, maxScore, percentage: Math.round((score / maxScore) * 100) };
  };

  const seoScore = getSeoScore();

  return (
    <div className="space-y-6">
      {/* Form Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            {isEdit ? 'Edit Page' : 'Create New Page'}
          </h2>
          <p className="text-sm text-gray-600">
            {isEdit ? 'Update your page content and settings' : 'Add a new page to your website'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>{showPreview ? 'Hide Preview' : 'Preview'}</span>
          </button>
          <button
            type="submit"
            form="page-form"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Save Page'}</span>
          </button>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'content', label: 'Content', icon: FileText },
            { id: 'seo', label: 'SEO', icon: Link },
            { id: 'settings', label: 'Settings', icon: Settings },
            { id: 'preview', label: 'Preview', icon: Eye }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeSection === section.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <section.icon className="w-4 h-4" />
              <span>{section.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Form Content */}
      <form id="page-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {activeSection === 'content' && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Page Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter page title..."
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.title.length}/60 characters
                  </p>
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      /
                    </span>
                    <input
                      type="text"
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => onChange('slug', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="page-url-slug"
                      required
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    This will be the URL of your page
                  </p>
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Page Content *
                  </label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(content) => onChange('content', content)}
                    placeholder="Enter your page content here..."
                    height={400}
                  />
                </div>
              </div>
            )}

            {activeSection === 'seo' && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    id="meta_title"
                    value={formData.meta_title}
                    onChange={(e) => onChange('meta_title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="SEO title for search engines..."
                    maxLength={60}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.meta_title.length}/60 characters
                  </p>
                </div>

                <div>
                  <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    id="meta_description"
                    value={formData.meta_description}
                    onChange={(e) => onChange('meta_description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description for search results..."
                    maxLength={160}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.meta_description.length}/160 characters
                  </p>
                </div>

                <div>
                  <label htmlFor="meta_keywords" className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    id="meta_keywords"
                    value={formData.meta_keywords}
                    onChange={(e) => onChange('meta_keywords', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="keyword1, keyword2, keyword3..."
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Separate keywords with commas
                  </p>
                </div>
              </div>
            )}

            {activeSection === 'settings' && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Page Status
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => onChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-yellow-800">Additional Settings</h3>
                  <p className="mt-1 text-sm text-yellow-700">
                    Advanced page settings like navigation order, template selection, and custom CSS will be available in the next phase.
                  </p>
                </div>
              </div>
            )}

            {activeSection === 'preview' && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Page Preview</h3>
                <div className="prose max-w-none">
                  <h1>{formData.title || 'Page Title'}</h1>
                  <div dangerouslySetInnerHTML={{ __html: formData.content || '<p>Page content will appear here...</p>' }} />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Page Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Page Information</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                    formData.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {formData.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">URL:</span>
                  <span className="ml-2 text-gray-900">/{formData.slug || 'page-slug'}</span>
                </div>
                <div>
                  <span className="text-gray-500">Created:</span>
                  <span className="ml-2 text-gray-900">{isEdit ? 'Updated' : 'Just now'}</span>
                </div>
              </div>
            </div>

            {/* SEO Score */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">SEO Score</h3>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{seoScore.percentage}%</div>
                <div className="text-sm text-gray-600">{seoScore.score}/{seoScore.maxScore} points</div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${seoScore.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-xs text-gray-600">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${formData.title.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Title filled
                </div>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${formData.title.length >= 30 && formData.title.length <= 60 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Title length optimal
                </div>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${formData.meta_description.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Meta description
                </div>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${formData.meta_description.length >= 120 && formData.meta_description.length <= 160 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Description length optimal
                </div>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${formData.meta_keywords.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Keywords added
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Actions</h3>
              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
                >
                  {loading ? 'Saving...' : 'Save Page'}
                </button>
                <button
                  type="button"
                  className="w-full bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 text-sm"
                >
                  Save as Draft
                </button>
                {isEdit && (
                  <button
                    type="button"
                    className="w-full border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Duplicate Page
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 