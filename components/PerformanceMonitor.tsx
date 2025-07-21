'use client';

import { useEffect } from 'react';
import { trackPerformance, trackError } from './SEOOptimizer';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Track Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          trackPerformance('LCP', lastEntry.startTime);
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.processingStart && entry.startTime) {
            trackPerformance('FID', entry.processingStart - entry.startTime);
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        trackPerformance('CLS', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const firstEntry = entries[0];
        if (firstEntry) {
          trackPerformance('FCP', firstEntry.startTime);
        }
      });
      fcpObserver.observe({ entryTypes: ['first-contentful-paint'] });

      // Time to First Byte (TTFB)
      const navigationObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.responseStart > 0) {
            trackPerformance('TTFB', entry.responseStart - entry.requestStart);
          }
        });
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });
    }

    // Track page load time
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const loadTime = performance.now();
        trackPerformance('PageLoadTime', loadTime);

        // Track resource loading times
        const resources = performance.getEntriesByType('resource');
        resources.forEach(resource => {
          if (resource.duration > 1000) {
            // Only track slow resources
            trackPerformance('SlowResource', resource.duration);
          }
        });
      });
    }

    // Track memory usage
    if ('memory' in performance) {
      const memoryObserver = new PerformanceObserver(() => {
        const memory = (performance as any).memory;
        if (memory) {
          trackPerformance('MemoryUsage', memory.usedJSHeapSize);
        }
      });
      memoryObserver.observe({ entryTypes: ['measure'] });
    }

    // Track errors
    window.addEventListener('error', event => {
      trackError(new Error(event.message), 'runtime');
    });

    window.addEventListener('unhandledrejection', event => {
      trackError(new Error(event.reason), 'promise');
    });

    // Track user interactions
    const trackInteraction = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target) {
        const tagName = target.tagName.toLowerCase();
        const className = target.className || '';
        const id = target.id || '';

        // Track button clicks
        if (tagName === 'button' || target.closest('button')) {
          trackPerformance('ButtonClick', performance.now());
        }

        // Track form submissions
        if (tagName === 'form' || target.closest('form')) {
          trackPerformance('FormSubmission', performance.now());
        }

        // Track navigation
        if (tagName === 'a' && target.getAttribute('href')) {
          trackPerformance('Navigation', performance.now());
        }
      }
    };

    document.addEventListener('click', trackInteraction);
    document.addEventListener('submit', trackInteraction);

    // Track scroll performance
    let scrollTimeout: NodeJS.Timeout;
    document.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        trackPerformance('ScrollEnd', performance.now());
      }, 150);
    });

    // Track viewport changes
    let resizeTimeout: NodeJS.Timeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        trackPerformance('ResizeEnd', performance.now());
      }, 150);
    });

    // Track network status
    const trackNetworkStatus = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection) {
          trackPerformance('NetworkSpeed', connection.downlink || 0);
          trackPerformance('NetworkLatency', connection.rtt || 0);
        }
      }
    };

    trackNetworkStatus();
    window.addEventListener('online', trackNetworkStatus);
    window.addEventListener('offline', trackNetworkStatus);

    // Cleanup
    return () => {
      document.removeEventListener('click', trackInteraction);
      document.removeEventListener('submit', trackInteraction);
      window.removeEventListener('online', trackNetworkStatus);
      window.removeEventListener('offline', trackNetworkStatus);
    };
  }, []);

  return null;
}

// Performance utilities
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  trackPerformance(name, end - start);
};

export const measureAsyncPerformance = async (
  name: string,
  fn: () => Promise<void>
) => {
  const start = performance.now();
  await fn();
  const end = performance.now();
  trackPerformance(name, end - start);
};

// Resource loading optimization
export const preloadResource = (href: string, as: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

// Image optimization tracking
export const trackImageLoad = (src: string, loadTime: number) => {
  if (loadTime > 1000) {
    // Track slow image loads
    trackPerformance('SlowImageLoad', loadTime);
  }
};

// Bundle size tracking
export const trackBundleSize = (bundleName: string, size: number) => {
  trackPerformance(`BundleSize_${bundleName}`, size);
};
