'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  TrendingUp,
  Eye,
  Link,
  Tag,
  AlertCircle,
  CheckCircle,
  Info,
  BarChart3,
} from 'lucide-react';

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  url: string;
  content: string;
}

interface SEOAnalysis {
  score: number;
  issues: SEOIssue[];
  suggestions: SEOSuggestion[];
  preview: {
    title: string;
    url: string;
    description: string;
  };
}

interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  field: string;
}

interface SEOSuggestion {
  type: 'improvement' | 'optimization';
  message: string;
  impact: 'high' | 'medium' | 'low';
}

interface SEOManagementPanelProps {
  seoData: SEOData;
  onUpdate: (field: string, value: string) => void;
  className?: string;
}

export default function SEOManagementPanel({
  seoData,
  onUpdate,
  className = '',
}: SEOManagementPanelProps) {
  const [analysis, setAnalysis] = useState<SEOAnalysis>({
    score: 0,
    issues: [],
    suggestions: [],
    preview: {
      title: '',
      url: '',
      description: '',
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    analyzeSEO();
  }, [seoData]);

  const analyzeSEO = () => {
    setLoading(true);

    // Simulate SEO analysis
    setTimeout(() => {
      const issues: SEOIssue[] = [];
      const suggestions: SEOSuggestion[] = [];
      let score = 100;

      // Title analysis
      if (!seoData.title) {
        issues.push({
          type: 'error',
          message: 'Page title is missing',
          field: 'title',
        });
        score -= 20;
      } else if (seoData.title.length < 30) {
        issues.push({
          type: 'warning',
          message: 'Title is too short (recommended: 30-60 characters)',
          field: 'title',
        });
        score -= 10;
      } else if (seoData.title.length > 60) {
        issues.push({
          type: 'warning',
          message: 'Title is too long (recommended: 30-60 characters)',
          field: 'title',
        });
        score -= 10;
      }

      // Description analysis
      if (!seoData.description) {
        issues.push({
          type: 'warning',
          message: 'Meta description is missing',
          field: 'description',
        });
        score -= 15;
      } else if (seoData.description.length < 120) {
        issues.push({
          type: 'warning',
          message: 'Description is too short (recommended: 120-160 characters)',
          field: 'description',
        });
        score -= 5;
      } else if (seoData.description.length > 160) {
        issues.push({
          type: 'warning',
          message: 'Description is too long (recommended: 120-160 characters)',
          field: 'description',
        });
        score -= 5;
      }

      // Keywords analysis
      if (!seoData.keywords) {
        suggestions.push({
          type: 'improvement',
          message: 'Add relevant keywords for better search visibility',
          impact: 'medium',
        });
        score -= 10;
      } else {
        const keywordCount = seoData.keywords.split(',').length;
        if (keywordCount < 3) {
          suggestions.push({
            type: 'optimization',
            message: 'Consider adding more keywords (3-5 recommended)',
            impact: 'low',
          });
        } else if (keywordCount > 10) {
          suggestions.push({
            type: 'optimization',
            message: 'Too many keywords may be considered spammy',
            impact: 'medium',
          });
        }
      }

      // Content analysis
      if (seoData.content.length < 300) {
        issues.push({
          type: 'warning',
          message: 'Content is too short (recommended: 300+ words)',
          field: 'content',
        });
        score -= 15;
      }

      // URL analysis
      if (seoData.url.includes('_') || seoData.url.includes(' ')) {
        suggestions.push({
          type: 'optimization',
          message: 'Use hyphens instead of underscores or spaces in URLs',
          impact: 'low',
        });
      }

      // Positive suggestions
      if (
        seoData.title &&
        seoData.title.length >= 30 &&
        seoData.title.length <= 60
      ) {
        suggestions.push({
          type: 'optimization',
          message: 'Title length is optimal',
          impact: 'high',
        });
      }

      if (
        seoData.description &&
        seoData.description.length >= 120 &&
        seoData.description.length <= 160
      ) {
        suggestions.push({
          type: 'optimization',
          message: 'Description length is optimal',
          impact: 'high',
        });
      }

      setAnalysis({
        score: Math.max(0, score),
        issues,
        suggestions,
        preview: {
          title: seoData.title || 'Page Title',
          url: seoData.url || 'https://example.com/page',
          description:
            seoData.description || 'Page description will appear here...',
        },
      });

      setLoading(false);
    }, 500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* SEO Score */}
      <div className='bg-white border border-gray-200 rounded-lg p-6'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-medium text-gray-900'>SEO Analysis</h3>
          <div className='flex items-center space-x-2'>
            <BarChart3 className='w-5 h-5 text-gray-400' />
            <span className='text-sm text-gray-600'>Real-time analysis</span>
          </div>
        </div>

        <div className='text-center'>
          <div
            className={`text-4xl font-bold ${getScoreColor(analysis.score)}`}
          >
            {analysis.score}
          </div>
          <div className='text-sm text-gray-600 mb-4'>SEO Score</div>
          <div className='w-full bg-gray-200 rounded-full h-3 mb-2'>
            <div
              className={`h-3 rounded-full ${getScoreBgColor(analysis.score).replace('bg-', 'bg-')}`}
              style={{ width: `${analysis.score}%` }}
            ></div>
          </div>
          <div className='text-xs text-gray-500'>
            {analysis.score >= 90
              ? 'Excellent'
              : analysis.score >= 70
                ? 'Good'
                : analysis.score >= 50
                  ? 'Fair'
                  : 'Poor'}
          </div>
        </div>
      </div>

      {/* Search Preview */}
      <div className='bg-white border border-gray-200 rounded-lg p-6'>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Search Preview
        </h3>
        <div className='border border-gray-300 rounded-lg p-4 bg-gray-50'>
          <div className='text-sm text-gray-600 mb-1'>
            {analysis.preview.url}
          </div>
          <div className='text-lg text-blue-600 font-medium mb-1 hover:underline cursor-pointer'>
            {analysis.preview.title}
          </div>
          <div className='text-sm text-gray-700'>
            {analysis.preview.description}
          </div>
        </div>
        <p className='mt-2 text-xs text-gray-500'>
          This is how your page might appear in search results
        </p>
      </div>

      {/* SEO Fields */}
      <div className='bg-white border border-gray-200 rounded-lg p-6'>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>SEO Settings</h3>

        <div className='space-y-4'>
          <div>
            <label
              htmlFor='seo-title'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Meta Title
            </label>
            <input
              type='text'
              id='seo-title'
              value={seoData.title}
              onChange={e => onUpdate('title', e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='SEO title for search engines...'
              maxLength={60}
            />
            <div className='flex justify-between mt-1'>
              <p className='text-sm text-gray-500'>
                {seoData.title.length}/60 characters
              </p>
              <p className='text-xs text-gray-400'>
                {seoData.title.length >= 30 && seoData.title.length <= 60
                  ? '✅ Optimal'
                  : '⚠️ Adjust length'}
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor='seo-description'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Meta Description
            </label>
            <textarea
              id='seo-description'
              value={seoData.description}
              onChange={e => onUpdate('description', e.target.value)}
              rows={3}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Brief description for search results...'
              maxLength={160}
            />
            <div className='flex justify-between mt-1'>
              <p className='text-sm text-gray-500'>
                {seoData.description.length}/160 characters
              </p>
              <p className='text-xs text-gray-400'>
                {seoData.description.length >= 120 &&
                seoData.description.length <= 160
                  ? '✅ Optimal'
                  : '⚠️ Adjust length'}
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor='seo-keywords'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Meta Keywords
            </label>
            <input
              type='text'
              id='seo-keywords'
              value={seoData.keywords}
              onChange={e => onUpdate('keywords', e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='keyword1, keyword2, keyword3...'
            />
            <p className='mt-1 text-sm text-gray-500'>
              Separate keywords with commas (3-5 recommended)
            </p>
          </div>
        </div>
      </div>

      {/* Issues and Suggestions */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Issues */}
        <div className='bg-white border border-gray-200 rounded-lg p-6'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Issues to Fix
          </h3>
          {loading ? (
            <div className='animate-pulse space-y-3'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='h-4 bg-gray-200 rounded'></div>
              ))}
            </div>
          ) : analysis.issues.length > 0 ? (
            <div className='space-y-3'>
              {analysis.issues.map((issue, index) => (
                <div
                  key={index}
                  className='flex items-start space-x-3 p-3 bg-red-50 rounded-lg'
                >
                  <AlertCircle className='w-5 h-5 text-red-500 mt-0.5' />
                  <div>
                    <p className='text-sm font-medium text-red-800'>
                      {issue.message}
                    </p>
                    <p className='text-xs text-red-600'>Field: {issue.field}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-4'>
              <CheckCircle className='w-8 h-8 text-green-500 mx-auto mb-2' />
              <p className='text-sm text-gray-600'>No issues found!</p>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className='bg-white border border-gray-200 rounded-lg p-6'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Suggestions
          </h3>
          {loading ? (
            <div className='animate-pulse space-y-3'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='h-4 bg-gray-200 rounded'></div>
              ))}
            </div>
          ) : analysis.suggestions.length > 0 ? (
            <div className='space-y-3'>
              {analysis.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className='flex items-start space-x-3 p-3 bg-blue-50 rounded-lg'
                >
                  <Info className='w-5 h-5 text-blue-500 mt-0.5' />
                  <div>
                    <p className='text-sm font-medium text-blue-800'>
                      {suggestion.message}
                    </p>
                    <p className='text-xs text-blue-600'>
                      Impact:{' '}
                      {suggestion.impact.charAt(0).toUpperCase() +
                        suggestion.impact.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-4'>
              <CheckCircle className='w-8 h-8 text-green-500 mx-auto mb-2' />
              <p className='text-sm text-gray-600'>
                No suggestions at this time
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className='bg-white border border-gray-200 rounded-lg p-6'>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Quick Actions
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <button className='flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
            <Search className='w-5 h-5 text-blue-600 mr-3' />
            <div className='text-left'>
              <p className='font-medium text-gray-900'>Keyword Research</p>
              <p className='text-sm text-gray-600'>Find relevant keywords</p>
            </div>
          </button>

          <button className='flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
            <TrendingUp className='w-5 h-5 text-green-600 mr-3' />
            <div className='text-left'>
              <p className='font-medium text-gray-900'>SEO Analytics</p>
              <p className='text-sm text-gray-600'>View performance data</p>
            </div>
          </button>

          <button className='flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
            <Link className='w-5 h-5 text-purple-600 mr-3' />
            <div className='text-left'>
              <p className='font-medium text-gray-900'>Link Building</p>
              <p className='text-sm text-gray-600'>Manage backlinks</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
