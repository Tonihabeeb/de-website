import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://deepengineering.co'
  
  return [
    // Main Pages (High Priority)
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },

    // Technology Section (High Priority)
    {
      url: `${baseUrl}/technology`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/technology/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technology/specifications`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technology/performance`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technology/components`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/technology/animation-demo`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },

    // Projects Section (High Priority)
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },

    // Economics Section (High Priority)
    {
      url: `${baseUrl}/economics`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },

    // Team Section (Medium Priority)
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/team/careers`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },

    // Resources Section (Medium Priority)
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },

    // Interactive Features (Medium Priority)
    {
      url: `${baseUrl}/interactive-features`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },

    // Development/Test Pages (Low Priority - Exclude from production)
    ...(process.env.NODE_ENV === 'development' ? [
      {
        url: `${baseUrl}/test`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.1,
      },
      {
        url: `${baseUrl}/cms-test`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.1,
      },
      {
        url: `${baseUrl}/offline`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.1,
      },
    ] : []),

    // Style Guide (Low Priority - Internal)
    {
      url: `${baseUrl}/style-guide`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]
} 