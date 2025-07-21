import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/studio/',
        '/api/',
        '/_next/',
        '/static/',
        '/admin/',
        '/private/',
        '/test/',
        '/cms-test/',
        '/offline/',
      ],
    },
    sitemap: 'https://deepengineering.co/sitemap.xml',
    host: 'https://deepengineering.co',
  };
}
