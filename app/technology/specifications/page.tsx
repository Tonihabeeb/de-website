import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Link from 'next/link';
import HeroSection from '@/components/sections/HeroSection';

export const metadata: Metadata = {
  title: 'KPP Technical Specifications - Deep Engineering',
  description:
    'Comprehensive technical specifications for Kinetic Power Plant (KPP) technology. Generator specs, air compressor details, water consumption, dimensions, and performance metrics.',
  keywords:
    'KPP technical specifications, kinetic power plant specs, generator specifications, air compressor details, water consumption, performance metrics, renewable energy technology',
  openGraph: {
    title: 'KPP Technical Specifications - Deep Engineering',
    description:
      'Comprehensive technical specifications for Kinetic Power Plant (KPP) technology including generator specs, air compressor details, and performance metrics.',
    type: 'website',
    url: 'https://deepengineering.co/technology/specifications',
    images: [
      {
        url: '/og-kpp-specs.jpg',
        width: 1200,
        height: 630,
        alt: 'KPP Technical Specifications - Deep Engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KPP Technical Specifications - Deep Engineering',
    description:
      'Comprehensive technical specifications for Kinetic Power Plant (KPP) technology.',
    images: ['/og-kpp-specs.jpg'],
  },
  alternates: {
    canonical: '/technology/specifications',
  },
};

export default function TechnologySpecificationsPage() {
  return (
    <div>
      <HeroSection
        title='KPP Technical Specifications'
        subtitle='Comprehensive technical specifications for our revolutionary Kinetic Power Plant (KPP) technology. Detailed component specifications, performance metrics, and operational parameters.'
      />

      <div className='container'>
        <Breadcrumbs />
      </div>

      {/* Technical Specifications */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='max-w-6xl mx-auto'>
            {/* Generator Specifications */}
            <div className='mb-16'>
              <h2 className='text-3xl font-bold text-primary mb-8 text-center'>
                Generator Specifications
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                <div className='bg-gray-50 rounded-lg p-6'>
                  <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                    Power Output
                  </h3>
                  <div className='space-y-3'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Rated Power:</span>
                      <span className='font-semibold'>500 kW</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Operating Speed:</span>
                      <span className='font-semibold'>375 RPM</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Efficiency:</span>
                      <span className='font-semibold'>95.2%</span>
                    </div>
                  </div>
                </div>

                <div className='bg-gray-50 rounded-lg p-6'>
                  <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                    Physical Dimensions
                  </h3>
                  <div className='space-y-3'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Diameter:</span>
                      <span className='font-semibold'>800 mm</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Height:</span>
                      <span className='font-semibold'>2,400 mm</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Weight:</span>
                      <span className='font-semibold'>4,700 kg</span>
                    </div>
                  </div>
                </div>

                <div className='bg-gray-50 rounded-lg p-6'>
                  <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                    Environmental
                  </h3>
                  <div className='space-y-3'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Protection Class:</span>
                      <span className='font-semibold'>IP54</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Temperature Range:</span>
                      <span className='font-semibold'>90-130°C</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Noise Level:</span>
                      <span className='font-semibold'>&lt;65 dB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Air Compressor System */}
            <div className='mb-16'>
              <h2 className='text-3xl font-bold text-primary mb-8 text-center'>
                Air Compressor System
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='bg-gray-50 rounded-lg p-6'>
                  <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                    Compression Parameters
                  </h3>
                  <div className='space-y-3'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Operating Pressure:</span>
                      <span className='font-semibold'>10 bar</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Air Flow Rate:</span>
                      <span className='font-semibold'>1.2-1.5 m³/min</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Compression Ratio:</span>
                      <span className='font-semibold'>10:1</span>
                    </div>
                  </div>
                </div>

                <div className='bg-gray-50 rounded-lg p-6'>
                  <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                    System Components
                  </h3>
                  <div className='space-y-3'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Compressor Type:</span>
                      <span className='font-semibold'>Reciprocating</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Cooling System:</span>
                      <span className='font-semibold'>Water-cooled</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Control System:</span>
                      <span className='font-semibold'>PLC-based</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Water Consumption */}
            <div className='mb-16'>
              <h2 className='text-3xl font-bold text-primary mb-8 text-center'>
                Water Consumption & Management
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div className='bg-gray-50 rounded-lg p-6'>
                  <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                    Initial Fill
                  </h3>
                  <div className='text-center'>
                    <div className='text-4xl font-bold text-primary mb-2'>
                      30 m³
                    </div>
                    <p className='text-gray-600'>
                      Initial water requirement for system startup
                    </p>
                  </div>
                </div>

                <div className='bg-gray-50 rounded-lg p-6'>
                  <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                    Annual Consumption
                  </h3>
                  <div className='text-center'>
                    <div className='text-4xl font-bold text-primary mb-2'>
                      &lt;5%
                    </div>
                    <p className='text-gray-600'>
                      Annual water loss through evaporation
                    </p>
                  </div>
                </div>

                <div className='bg-gray-50 rounded-lg p-6'>
                  <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                    Water Quality
                  </h3>
                  <div className='space-y-2'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>pH Level:</span>
                      <span className='font-semibold'>6.5-8.5</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Hardness:</span>
                      <span className='font-semibold'>&lt;150 ppm</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>TDS:</span>
                      <span className='font-semibold'>&lt;500 ppm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className='mb-16'>
              <h2 className='text-3xl font-bold text-primary mb-8 text-center'>
                Performance Metrics
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <div className='bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 text-center'>
                  <div className='text-3xl font-bold mb-2'>24/7</div>
                  <div className='text-base'>Continuous Operation</div>
                </div>
                <div className='bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 text-center'>
                  <div className='text-3xl font-bold mb-2'>95.2%</div>
                  <div className='text-base'>System Efficiency</div>
                </div>
                <div className='bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 text-center'>
                  <div className='text-3xl font-bold mb-2'>0</div>
                  <div className='text-base'>Emissions</div>
                </div>
                <div className='bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-6 text-center'>
                  <div className='text-3xl font-bold mb-2'>&lt;3s</div>
                  <div className='text-base'>Startup Time</div>
                </div>
              </div>
            </div>

            {/* Download Section */}
            <div className='bg-gray-50 rounded-lg p-8 text-center'>
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>
                Download Technical Documentation
              </h2>
              <p className='text-gray-600 mb-6'>
                Access detailed technical specifications, installation guides,
                and maintenance manuals.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <button className='bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 min-w-[44px] min-h-[44px]'>
                  Download Full Specifications (PDF)
                </button>
                <button className='border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors duration-200 min-w-[44px] min-h-[44px]'>
                  Installation Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='section-padding bg-primary text-white'>
        <div className='container text-center'>
          <h2 className='mb-4'>Ready to Learn More?</h2>
          <p className='text-xl text-white mb-8 max-w-3xl mx-auto'>
            Contact our technical team for detailed specifications, custom
            solutions, and implementation support.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href='/contact'
              className='bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 min-w-[44px] min-h-[44px] inline-block text-center'
            >
              Contact Technical Team
            </a>
            <a
              href='/technology/how-it-works'
              className='border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200 min-w-[44px] min-h-[44px] inline-block text-center'
            >
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Related Links Section */}
      <section className='section-padding bg-gray-100 border-t border-gray-200'>
        <div className='container'>
          <div className='text-center mb-6'>
            <h2 className='text-xl font-semibold text-primary mb-2'>
              Related Links
            </h2>
            <p className='text-base text-gray-600'>
              Explore more about KPP technology and related topics:
            </p>
          </div>
          <div className='flex flex-wrap justify-center gap-4'>
            <Link
              href='/technology'
              className='bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors'
            >
              Technology Overview
            </Link>
            <Link
              href='/technology/how-it-works'
              className='bg-white text-primary border border-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors'
            >
              How It Works
            </Link>
            <Link
              href='/technology/components'
              className='bg-white text-primary border border-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors'
            >
              KPP Components
            </Link>
            <Link
              href='/technology/performance'
              className='bg-white text-primary border border-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors'
            >
              Performance & Specs
            </Link>
            <Link
              href='/technology/animation-demo'
              className='bg-white text-primary border border-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors'
            >
              Interactive Diagrams
            </Link>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: 'KPP Technical Specifications - Deep Engineering',
            description:
              'Comprehensive technical specifications for Kinetic Power Plant (KPP) technology including generator specs, air compressor details, and performance metrics.',
            author: {
              '@type': 'Organization',
              name: 'Deep Engineering',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Deep Engineering',
              logo: {
                '@type': 'ImageObject',
                url: 'https://deepengineering.co/logo.svg',
              },
            },
            datePublished: '2024-01-01',
            dateModified: new Date().toISOString().split('T')[0],
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://deepengineering.co/technology/specifications',
            },
            about: [
              {
                '@type': 'Thing',
                name: 'Kinetic Power Plant',
                description: 'Revolutionary renewable energy technology',
              },
              {
                '@type': 'Thing',
                name: 'Generator Specifications',
                description: '500 kW generator with 95.2% efficiency',
              },
              {
                '@type': 'Thing',
                name: 'Air Compressor System',
                description:
                  '10 bar operating pressure with 1.2-1.5 m³/min flow rate',
              },
            ],
            offers: {
              '@type': 'Offer',
              description: 'KPP Technology Solutions',
              url: 'https://deepengineering.co/contact',
            },
          }),
        }}
      />
    </div>
  );
}
