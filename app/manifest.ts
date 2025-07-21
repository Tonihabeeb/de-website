import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Deep Engineering - Continuous Clean Energy, Anywhere',
    short_name: 'Deep Engineering',
    description:
      "Iraq's pioneer in renewable energy project development. Exclusive KPP licensee delivering 24/7 renewable power.",
    start_url: '/',
    display: 'standalone',
    background_color: '#1e40af',
    theme_color: '#1e40af',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
    categories: ['business', 'productivity', 'utilities'],
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/screenshot-desktop.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Deep Engineering Desktop View',
      },
      {
        src: '/screenshot-mobile.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Deep Engineering Mobile View',
      },
    ],
    shortcuts: [
      {
        name: 'Technology',
        short_name: 'Tech',
        description: 'View KPP technology specifications',
        url: '/technology/specifications',
        icons: [
          {
            src: '/icon-96x96.png',
            sizes: '96x96',
          },
        ],
      },
      {
        name: 'Economics',
        short_name: 'Econ',
        description: 'View economic analysis and ROI',
        url: '/economics',
        icons: [
          {
            src: '/icon-96x96.png',
            sizes: '96x96',
          },
        ],
      },
      {
        name: 'Projects',
        short_name: 'Projects',
        description: 'View KPP projects in Iraq',
        url: '/projects',
        icons: [
          {
            src: '/icon-96x96.png',
            sizes: '96x96',
          },
        ],
      },
      {
        name: 'Contact',
        short_name: 'Contact',
        description: 'Contact Deep Engineering',
        url: '/contact',
        icons: [
          {
            src: '/icon-96x96.png',
            sizes: '96x96',
          },
        ],
      },
    ],
    related_applications: [
      {
        platform: 'webapp',
        url: 'https://deepengineering.co',
      },
    ],
    prefer_related_applications: false,
  };
}
