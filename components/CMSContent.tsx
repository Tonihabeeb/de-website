'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface CMSContentProps {
  fallback?: React.ReactNode;
  className?: string;
  showTitle?: boolean;
}

interface PageData {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  status: string;
}

export default function CMSContent({ 
  fallback, 
  className = '',
  showTitle = true 
}: CMSContentProps) {
  const pathname = usePathname();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Convert pathname to slug
        const slug = pathname === '/' ? 'home' : pathname.slice(1);
        
        const response = await fetch(`/api/pages/${slug}`);
        if (!response.ok) {
          throw new Error('Page not found');
        }
        
        const result = await response.json();
        if (result.success) {
          setPageData(result.data || result);
        } else {
          throw new Error(result.error || 'Failed to fetch page');
        }
      } catch (err) {
        console.error('Error fetching CMS content:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch content');
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, [pathname]);

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (error || !pageData) {
    return fallback ? <>{fallback}</> : null;
  }

  return (
    <div className={className}>
      {showTitle && pageData.title && (
        <h1 className="text-3xl font-bold text-primary mb-6">
          {pageData.title}
        </h1>
      )}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: pageData.content }}
      />
    </div>
  );
} 