'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  TrendingUp,
  BarChart3,
  Settings,
  Eye,
  Target,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  RefreshCw,
  Download,
  Upload,
} from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

interface SEOData {
  id: string;
  title: string;
  url: string;
  description: string;
  keywords: string;
  content: string;
  status: string;
  seo_score: number;
  last_analyzed: string;
}

interface SEOAnalysis {
  score: number;
  issues: Array<{
    type: 'error' | 'warning' | 'info';
    message: string;
    field: string;
  }>;
  suggestions: Array<{
    type: 'improvement' | 'optimization';
    message: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

export default function AdminSEOPage() {
  const router = useRouter();
  const [pages, setPages] = useState<SEOData[]>([]);
  const [selectedPage, setSelectedPage] = useState<SEOData | null>(null);
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/admin/pages');
      if (!response.ok) {
        throw new Error('Failed to fetch pages');
      }
      const result = await response.json();
      if (result.success) {
        setPages(result.data || []);
      } else {
        throw new Error(result.error || 'Failed to fetch pages');
      }
    } catch (err) {
      console.error('Error fetching pages:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch pages');
    } finally {
      setLoading(false);
    }
  };

  const analyzePage = async (pageId: string) => {
    try {
      setAnalyzing(true);
      setError(null);
      
      const page = pages.find(p => p.id === pageId);
      if (!page) return;

      // Simulate SEO analysis
      const issues = [];
      const suggestions = [];

      // Title analysis
      if (!page.title) {
        issues.push({
          type: 'error',
          message: 'Missing page title',
          field: 'title'
        });
      } else if (page.title.length < 30) {
        issues.push({
          type: 'warning',
          message: 'Title is too short (should be 30-60 characters)',
          field: 'title'
        });
      } else if (page.title.length > 60) {
        issues.push({
          type: 'warning',
          message: 'Title is too long (should be 30-60 characters)',
          field: 'title'
        });
      }

      // Description analysis
      if (!page.description) {
        issues.push({
          type: 'error',
          message: 'Missing meta description',
          field: 'description'
        });
      } else if (page.description.length < 120) {
        issues.push({
          type: 'warning',
          message: 'Description is too short (should be 120-160 characters)',
          field: 'description'
        });
      } else if (page.description.length > 160) {
        issues.push({
          type: 'warning',
          message: 'Description is too long (should be 120-160 characters)',
          field: 'description'
        });
      }

      // Keywords analysis
      if (!page.keywords) {
        issues.push({
          type: 'warning',
          message: 'No keywords specified',
          field: 'keywords'
        });
      } else {
        const keywordCount = page.keywords.split(',').length;
        if (keywordCount < 3) {
          suggestions.push({
            type: 'improvement',
            message: 'Consider adding more keywords (3-5 recommended)',
            priority: 'medium'
          });
        }
      }

      // Content analysis
      if (page.content.length < 300) {
        issues.push({
          type: 'warning',
          message: 'Content is too short (minimum 300 words recommended)',
          field: 'content'
        });
      }

      // URL analysis
      if (page.url.includes('_') || page.url.includes(' ')) {
        suggestions.push({
          type: 'optimization',
          message: 'Use hyphens instead of underscores or spaces in URLs',
          priority: 'high'
        });
      }

      // Calculate score
      let score = 100;
      score -= issues.filter(i => i.type === 'error').length * 20;
      score -= issues.filter(i => i.type === 'warning').length * 10;
      score = Math.max(0, score);

      const analysis: SEOAnalysis = {
        score,
        issues,
        suggestions
      };

      setAnalysis(analysis);
      setSelectedPage(page);
    } catch (err) {
      console.error('Error analyzing page:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze page');
    } finally {
      setAnalyzing(false);
    }
  };

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || page.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-text">Loading SEO management...</p>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.back()}
                  className="flex items-center text-gray-text hover:text-primary"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-primary">
                    SEO Management
                  </h1>
                  <p className="text-sm text-gray-text">
                    Analyze and optimize your pages for search engines
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={fetchPages}
                  className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pages List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-primary mb-4">
                    Pages
                  </h2>
                  
                  {/* Search and Filter */}
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Search pages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-3">
                    {filteredPages.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                        No pages found
                      </p>
                    ) : (
                      filteredPages.map(page => (
                        <div
                          key={page.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedPage?.id === page.id
                              ? 'border-primary bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => analyzePage(page.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-primary truncate">
                                {page.title}
                              </h3>
                              <p className="text-sm text-gray-500 truncate">
                                /{page.url}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                page.seo_score >= 80 ? 'bg-green-100 text-green-800' :
                                page.seo_score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {page.seo_score}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Panel */}
            <div className="lg:col-span-2">
              {selectedPage ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-primary">
                          {selectedPage.title}
                        </h2>
                        <p className="text-sm text-gray-500">
                          /{selectedPage.url}
                        </p>
                      </div>
                      <button
                        onClick={() => analyzePage(selectedPage.id)}
                        disabled={analyzing}
                        className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
                      >
                        <RefreshCw className={`w-4 h-4 mr-2 ${analyzing ? 'animate-spin' : ''}`} />
                        {analyzing ? 'Analyzing...' : 'Re-analyze'}
                      </button>
                    </div>
                  </div>

                  {analysis && (
                    <div className="p-6">
                      {/* SEO Score */}
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-primary">
                            SEO Score
                          </h3>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(analysis.score)} ${getScoreColor(analysis.score)}`}>
                            {analysis.score}/100
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all duration-300 ${
                              analysis.score >= 80 ? 'bg-green-500' :
                              analysis.score >= 60 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${analysis.score}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Issues */}
                      {analysis.issues.length > 0 && (
                        <div className="mb-8">
                          <h3 className="text-lg font-medium text-primary mb-4">
                            Issues Found
                          </h3>
                          <div className="space-y-3">
                            {analysis.issues.map((issue, index) => (
                              <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                                {issue.type === 'error' ? (
                                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                                ) : (
                                  <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                                )}
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-primary">
                                    {issue.message}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Field: {issue.field}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Suggestions */}
                      {analysis.suggestions.length > 0 && (
                        <div className="mb-8">
                          <h3 className="text-lg font-medium text-primary mb-4">
                            Suggestions
                          </h3>
                          <div className="space-y-3">
                            {analysis.suggestions.map((suggestion, index) => (
                              <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-primary">
                                    {suggestion.message}
                                  </p>
                                  <div className="flex items-center space-x-2 mt-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      suggestion.priority === 'high' ? 'bg-red-100 text-red-800' :
                                      suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-blue-100 text-blue-800'
                                    }`}>
                                      {suggestion.priority} priority
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {suggestion.type}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quick Actions */}
                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium text-primary mb-4">
                          Quick Actions
                        </h3>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => router.push(`/admin/pages/edit?id=${selectedPage.id}`)}
                            className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Edit Page
                          </button>
                          <button
                            onClick={() => window.open(`/preview/page/${selectedPage.url}`, '_blank')}
                            className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
                  <div className="text-center">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-primary mb-2">
                      Select a page to analyze
                    </h3>
                    <p className="text-gray-500">
                      Choose a page from the list to view its SEO analysis and get optimization suggestions.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 