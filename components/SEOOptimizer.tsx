'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonical: string;
  structuredData?: any;
}

const seoConfigs: Record<string, SEOConfig> = {
  '/': {
    title: 'Deep Engineering - Continuous Clean Energy, Anywhere',
    description: 'Delivering 24/7 renewable power through the revolutionary Kinetic Power Plant (KPP) technology – no fuel, no emissions. Iraq\'s pioneer in renewable energy project development.',
    keywords: ['renewable energy', 'kinetic power plant', 'KPP', 'clean energy', 'Iraq', 'sustainable power', 'green energy', '24/7 power', 'fuel-free energy'],
    ogImage: '/og-home.jpg',
    canonical: 'https://deepengineering.co/',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Deep Engineering',
      url: 'https://deepengineering.co',
      logo: 'https://deepengineering.co/logo.svg',
      description: 'Iraq\'s pioneer in renewable energy project development. Exclusive KPP licensee.',
      sameAs: [
        'https://www.linkedin.com/company/deepengineering/'
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+964 750 466 3879',
          contactType: 'customer support',
          areaServed: 'IQ',
          availableLanguage: ['English', 'Arabic']
        }
      ]
    }
  },
  '/technology/specifications': {
    title: 'KPP Technical Specifications - Deep Engineering',
    description: 'Comprehensive technical specifications for Kinetic Power Plant (KPP) technology. Generator specs, air compressor details, water consumption, dimensions, and performance metrics.',
    keywords: ['KPP technical specifications', 'kinetic power plant specs', 'generator specifications', 'air compressor details', 'water consumption', 'performance metrics', 'renewable energy technology'],
    ogImage: '/og-kpp-specs.jpg',
    canonical: 'https://deepengineering.co/technology/specifications',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'KPP Technical Specifications - Deep Engineering',
      description: 'Comprehensive technical specifications for Kinetic Power Plant (KPP) technology including generator specs, air compressor details, and performance metrics.',
      author: {
        '@type': 'Organization',
        name: 'Deep Engineering'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Deep Engineering',
        logo: {
          '@type': 'ImageObject',
          url: 'https://deepengineering.co/logo.svg'
        }
      },
      about: [
        {
          '@type': 'Thing',
          name: 'Kinetic Power Plant',
          description: 'Revolutionary renewable energy technology'
        },
        {
          '@type': 'Thing',
          name: 'Generator Specifications',
          description: '500 kW generator with 95.2% efficiency'
        }
      ]
    }
  },
  '/economics': {
    title: 'KPP Economic Analysis & ROI - Deep Engineering',
    description: 'Comprehensive economic analysis of Kinetic Power Plant (KPP) technology. Cost comparisons vs diesel/solar/gas, ROI projections, fuel savings, and investment opportunities in Iraq.',
    keywords: ['KPP economics', 'kinetic power plant cost analysis', 'renewable energy ROI', 'Iraq energy investment', 'fuel cost savings', 'LCOE comparison', 'clean energy economics'],
    ogImage: '/og-economics.jpg',
    canonical: 'https://deepengineering.co/economics',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'KPP Economic Analysis & ROI - Deep Engineering',
      description: 'Comprehensive economic analysis of Kinetic Power Plant (KPP) technology with cost comparisons, ROI projections, and investment opportunities.',
      author: {
        '@type': 'Organization',
        name: 'Deep Engineering'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Deep Engineering',
        logo: {
          '@type': 'ImageObject',
          url: 'https://deepengineering.co/logo.svg'
        }
      },
      about: [
        {
          '@type': 'Thing',
          name: 'Economic Analysis',
          description: 'Cost comparison and ROI analysis of KPP technology'
        },
        {
          '@type': 'Thing',
          name: 'LCOE Comparison',
          description: 'Levelized Cost of Energy comparison with traditional sources'
        }
      ]
    }
  },
  '/projects': {
    title: 'KPP Projects in Iraq - Deep Engineering',
    description: 'Explore our Kinetic Power Plant (KPP) projects across Iraq including Zakho 100MW, Soran 100MW, Raparin 50MW, and Garmian 50MW installations.',
    keywords: ['KPP projects', 'Iraq renewable energy', 'Zakho project', 'Soran project', 'Raparin project', 'Garmian project', 'renewable energy Iraq'],
    ogImage: '/og-projects.jpg',
    canonical: 'https://deepengineering.co/projects',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'KPP Projects in Iraq',
      description: 'Kinetic Power Plant projects across Iraq',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Project',
            name: 'Zakho 100MW Project',
            description: '100MW KPP installation in Duhok Governorate',
            location: {
              '@type': 'Place',
              name: 'Duhok Governorate, Iraq'
            }
          }
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'Project',
            name: 'Soran 100MW Project',
            description: '100MW KPP installation in Erbil Governorate',
            location: {
              '@type': 'Place',
              name: 'Erbil Governorate, Iraq'
            }
          }
        }
      ]
    }
  },
  '/interactive-features': {
    title: 'Interactive Features - Deep Engineering',
    description: 'Explore our interactive tools including energy cost calculator, project tracker, and enhanced contact forms for KPP technology.',
    keywords: ['interactive features', 'energy calculator', 'project tracker', 'contact forms', 'KPP tools', 'renewable energy calculator'],
    ogImage: '/og-interactive.jpg',
    canonical: 'https://deepengineering.co/interactive-features',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Deep Engineering Interactive Tools',
      description: 'Interactive tools for KPP technology analysis and project tracking',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  },
  '/team': {
    title: 'Our Team - Deep Engineering',
    description: 'Meet the passionate professionals behind Deep Engineering\'s mission to revolutionize Iraq\'s energy landscape with KPP technology.',
    keywords: ['team', 'leadership', 'engineers', 'Deep Engineering team', 'KPP experts', 'renewable energy professionals'],
    ogImage: '/og-team.jpg',
    canonical: 'https://deepengineering.co/team',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Deep Engineering Team',
      description: 'Professional team leading renewable energy innovation in Iraq',
      url: 'https://deepengineering.co/team'
    }
  },
  '/team/careers': {
    title: 'Careers at Deep Engineering - Join Our Team',
    description: 'Join Deep Engineering\'s mission to revolutionize Iraq\'s energy landscape. Explore career opportunities in renewable energy, engineering, and project management.',
    keywords: ['careers', 'jobs', 'renewable energy careers', 'engineering jobs Iraq', 'KPP technology careers', 'Deep Engineering jobs'],
    ogImage: '/og-careers.jpg',
    canonical: 'https://deepengineering.co/team/careers',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: 'Careers at Deep Engineering',
      description: 'Join Deep Engineering\'s mission to revolutionize Iraq\'s energy landscape with innovative KPP technology.',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'Deep Engineering',
        url: 'https://deepengineering.co'
      },
      jobLocation: {
        '@type': 'Place',
        addressCountry: 'IQ',
        addressRegion: 'Kurdistan Region'
      },
      employmentType: 'FULL_TIME',
      industry: 'Renewable Energy',
      datePosted: new Date().toISOString().split('T')[0]
    }
  }
};

export default function SEOOptimizer() {
  const pathname = usePathname();

  useEffect(() => {
    const config = seoConfigs[pathname];
    if (!config) return;

    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const updatePropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update title
    document.title = config.title;

    // Update meta description
    updateMetaTag('description', config.description);

    // Update keywords
    updateMetaTag('keywords', config.keywords.join(', '));

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', config.canonical);

    // Update Open Graph tags
    updatePropertyTag('og:title', config.title);
    updatePropertyTag('og:description', config.description);
    updatePropertyTag('og:url', config.canonical);
    updatePropertyTag('og:image', config.ogImage);
    updatePropertyTag('og:type', 'website');

    // Update Twitter Card tags
    updatePropertyTag('twitter:card', 'summary_large_image');
    updatePropertyTag('twitter:title', config.title);
    updatePropertyTag('twitter:description', config.description);
    updatePropertyTag('twitter:image', config.ogImage);

    // Add structured data
    if (config.structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(config.structuredData);
    }

    // Track page view for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: pathname,
        page_title: config.title
      });
    }
  }, [pathname]);

  return null;
}

// Analytics tracking
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Performance monitoring
export const trackPerformance = (metric: string, value: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: metric,
      value: Math.round(value)
    });
  }
};

// Error tracking
export const trackError = (error: Error, context?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: false,
      custom_map: {
        context: context || 'unknown'
      }
    });
  }
};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
} 