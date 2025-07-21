'use client';

import Script from 'next/script';
import { useEffect } from 'react';

// Google Analytics 4 Measurement ID
// Replace with your actual GA4 Measurement ID
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Web Vitals tracking
export function reportWebVitals(metric: any) {
  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(
        metric.name === 'CLS' ? metric.value * 1000 : metric.value
      ),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }
}

// Utility functions for tracking
export const trackEvent = (
  eventName: string,
  parameters: Record<string, any> = {}
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

export const trackFeatureUsage = (featureName: string, action: string) => {
  trackEvent('feature_usage', {
    feature_name: featureName,
    action: action,
  });
};

export const trackCalculatorUsage = (
  calculatorType: string,
  inputs: any,
  results: any
) => {
  trackEvent('calculator_usage', {
    calculator_type: calculatorType,
    input_values: JSON.stringify(inputs),
    results: JSON.stringify(results),
  });
};

export const trackFormSubmission = (formType: string, success: boolean) => {
  trackEvent('form_submission', {
    form_type: formType,
    success: success,
  });
};

export const trackContentEngagement = (
  contentType: string,
  engagementLevel: string
) => {
  trackEvent('content_engagement', {
    content_type: contentType,
    engagement_level: engagementLevel,
  });
};

export const trackDiagramInteraction = (
  diagramType: string,
  interactionType: string
) => {
  trackEvent('diagram_interaction', {
    diagram_type: diagramType,
    interaction_type: interactionType,
  });
};

export const trackMobilePerformance = () => {
  const isMobile =
    typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  if (isMobile && typeof window !== 'undefined') {
    trackEvent('mobile_performance', {
      load_time: performance.now(),
      device_type: getDeviceType(),
      connection_type: getConnectionType(),
    });
  }
};

// Helper functions
const getDeviceType = (): string => {
  if (typeof window === 'undefined') return 'unknown';

  const userAgent = navigator.userAgent;
  if (/Android/i.test(userAgent)) return 'android';
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'ios';
  if (/Windows/i.test(userAgent)) return 'windows';
  if (/Mac/i.test(userAgent)) return 'mac';
  if (/Linux/i.test(userAgent)) return 'linux';
  return 'other';
};

const getConnectionType = (): string => {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const connection = (navigator as any).connection;
    return connection?.effectiveType || 'unknown';
  }
  return 'unknown';
};

// Analytics component
export default function Analytics() {
  useEffect(() => {
    // Track initial page load
    trackPageView(window.location.pathname);

    // Track mobile performance
    trackMobilePerformance();

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        trackEvent('page_visible');
      } else {
        trackEvent('page_hidden');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Only render analytics in production or when GA_MEASUREMENT_ID is set
  if (
    process.env.NODE_ENV === 'development' &&
    GA_MEASUREMENT_ID === 'G-XXXXXXXXXX'
  ) {
    return null;
  }

  return (
    <>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              custom_map: {
                'custom_parameter_1': 'page_category',
                'custom_parameter_2': 'user_type'
              }
            });
          `,
        }}
      />
    </>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
