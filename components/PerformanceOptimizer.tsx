'use client';

import { useEffect, useState } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

export default function PerformanceOptimizer({ children }: PerformanceOptimizerProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Performance detection
    const detectPerformance = () => {
      // Check for low-end devices
      const connection = (navigator as any).connection;
      const isSlowConnection = connection && (
        connection.effectiveType === 'slow-2g' ||
        connection.effectiveType === '2g' ||
        connection.effectiveType === '3g'
      );

      // Check for low memory devices
      const isLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;

      // Check for low-end CPUs
      const isLowCPU = (navigator as any).hardwareConcurrency && (navigator as any).hardwareConcurrency < 4;

      setIsLowPerformance(isSlowConnection || isLowMemory || isLowCPU);
    };

    detectPerformance();

    // Add performance class to body
    document.body.classList.toggle('reduced-motion', prefersReducedMotion);
    document.body.classList.toggle('low-performance', isLowPerformance);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      document.body.classList.remove('reduced-motion', 'low-performance');
    };
  }, [prefersReducedMotion, isLowPerformance]);

  // Performance monitoring
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            const firstInputEntry = entry as PerformanceEventTiming;
            console.log('FID:', firstInputEntry.processingStart - firstInputEntry.startTime);
          }
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className={`performance-optimizer ${prefersReducedMotion ? 'reduced-motion' : ''} ${isLowPerformance ? 'low-performance' : ''}`}>
      {children}
    </div>
  );
} 