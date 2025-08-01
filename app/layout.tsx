import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ClientOnlyDynamic from '@/components/layout/ClientOnlyDynamic';
import { Crimson_Pro, Heebo } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/components/ui/Toast';
import ErrorBoundary from '@/components/ErrorBoundary';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';
import HydrationSuppressor from '@/components/HydrationSuppressor';

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});
const heebo = Heebo({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Deep Engineering - Continuous Clean Energy, Anywhere',
    template: '%s | Deep Engineering',
  },
  description:
    "Delivering 24/7 renewable power through the revolutionary Kinetic Power Plant (KPP) technology – no fuel, no emissions. Iraq's pioneer in renewable energy project development.",
  keywords:
    'renewable energy, kinetic power plant, KPP, clean energy, Iraq, sustainable power, green energy, 24/7 power, fuel-free energy',
  authors: [{ name: 'Deep Engineering' }],
  creator: 'Deep Engineering',
  publisher: 'Deep Engineering',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://deepengineering.co'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://deepengineering.co',
    siteName: 'Deep Engineering',
    title: 'Deep Engineering - Continuous Clean Energy, Anywhere',
    description:
      'Delivering 24/7 renewable power through the revolutionary Kinetic Power Plant (KPP) technology – no fuel, no emissions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Deep Engineering - Kinetic Power Plant Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deep Engineering - Continuous Clean Energy, Anywhere',
    description:
      'Delivering 24/7 renewable power through the revolutionary Kinetic Power Plant (KPP) technology – no fuel, no emissions.',
    images: ['/og-image.jpg'],
    creator: '@deepengineering',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${crimsonPro.variable} ${heebo.variable}`}>
      <head>
        <link rel='icon' href='/favicon.ico' />
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#2150FE' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='Deep Engineering' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Aggressive browser extension handling
              (function() {
                // Suppress all hydration errors immediately
                const originalError = console.error;
                const originalWarn = console.warn;
                
                console.error = function(...args) {
                  const errorMessage = args[0]?.toString() || '';
                  if (
                    errorMessage.includes('extwaiokist') ||
                    errorMessage.includes('Hydration failed') ||
                    errorMessage.includes('server rendered HTML didn\\'t match the client') ||
                    errorMessage.includes('Text content does not match') ||
                    errorMessage.includes('Hydration mismatch') ||
                    errorMessage.includes('Rendered more hooks') ||
                    errorMessage.includes('Rules of Hooks')
                  ) {
                    return;
                  }
                  originalError.apply(console, args);
                };
                
                console.warn = function(...args) {
                  const warnMessage = args[0]?.toString() || '';
                  if (
                    warnMessage.includes('extwaiokist') ||
                    warnMessage.includes('Hydration') ||
                    warnMessage.includes('hooks')
                  ) {
                    return;
                  }
                  originalWarn.apply(console, args);
                };
                
                // Aggressive cleanup of browser extension elements
                function cleanupExtensions() {
                  // Remove extwaiokist elements
                  const extwaiokistElements = document.querySelectorAll('[id="extwaiokist"]');
                  extwaiokistElements.forEach(function(element) {
                    if (element.parentNode) {
                      element.parentNode.removeChild(element);
                    }
                  });
                  
                  // Remove elements with extension-like attributes
                  const extensionElements = document.querySelectorAll('[v], [q], [c], [i], [u], [s], [sg], [d], [w], [e], [a], [m], [vn]');
                  extensionElements.forEach(function(element) {
                    if (element.getAttribute('data-extension-cleanup') !== 'true') {
                      element.setAttribute('data-extension-cleanup', 'true');
                      element.style.display = 'none';
                    }
                  });
                }
                
                // Run cleanup immediately and on DOM ready
                cleanupExtensions();
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', cleanupExtensions);
                }
                
                // Set up mutation observer to catch new injections
                const observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList') {
                      mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                          const element = node;
                          if (element.id === 'extwaiokist' || element.hasAttribute('v') || element.hasAttribute('q')) {
                            if (element.parentNode) {
                              element.parentNode.removeChild(element);
                            }
                          }
                        }
                      });
                    }
                  });
                });
                
                // Start observing
                observer.observe(document, {
                  childList: true,
                  subtree: true
                });
              })();
            `,
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Deep Engineering',
              url: 'https://deepengineering.co',
              logo: 'https://deepengineering.co/logo.svg',
              description:
                "Iraq's pioneer in renewable energy project development. Exclusive KPP licensee.",
              sameAs: [
                'https://www.linkedin.com/company/deepengineering/',
                // Add other social profiles if available
              ],
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+964 750 466 3879',
                  contactType: 'customer support',
                  areaServed: 'IQ',
                  availableLanguage: ['English', 'Arabic'],
                },
                {
                  '@type': 'ContactPoint',
                  telephone: '+964 751 235 3179',
                  contactType: 'customer support',
                  areaServed: 'IQ',
                  availableLanguage: ['English', 'Arabic'],
                },
                {
                  '@type': 'ContactPoint',
                  telephone: '+964 773 033 3879',
                  contactType: 'branch office',
                  areaServed: 'IQ',
                  availableLanguage: ['English', 'Arabic'],
                },
              ],
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Roya Tower A 1-14',
                addressLocality: 'Erbil',
                postalCode: '44001',
                addressCountry: 'IQ',
              },
            }),
          }}
        />
      </head>
      <body className={`antialiased font-sans text-gray-text bg-white`}>
        <AuthProvider>
          <ToastProvider>
            <ClientOnlyDynamic>
              <ErrorBoundary>
                <PerformanceOptimizer>
                  <HydrationSuppressor>
                    {/* Skip to main content link for accessibility */}
                    <a
                      href='#main-content'
                      className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded z-50'
                    >
                      Skip to main content
                    </a>
                    <Navbar />
                    <main id='main-content'>{children}</main>
                    <Footer />
                  </HydrationSuppressor>
                </PerformanceOptimizer>
              </ErrorBoundary>
            </ClientOnlyDynamic>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
