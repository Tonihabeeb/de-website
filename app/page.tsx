import { Fragment } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/StructuredData';
import HeroSection from '@/components/sections/HeroSection';
import MiniProjects from '@/components/sections/MiniProjects';
import MiniAbout from '@/components/sections/MiniAbout';

export const metadata: Metadata = {
  title: 'Deep Engineering - Continuous Clean Energy, Anywhere',
  description:
    "Delivering 24/7 renewable power through the revolutionary Kinetic Power Plant (KPP) technology – no fuel, no emissions. Iraq's pioneer in renewable energy project development.",
  keywords:
    'renewable energy, kinetic power plant, KPP, clean energy, Iraq, sustainable power, green energy, 24/7 power, fuel-free energy',
  openGraph: {
    title: 'Deep Engineering - Continuous Clean Energy, Anywhere',
    description:
      'Delivering 24/7 renewable power through the revolutionary Kinetic Power Plant (KPP) technology – no fuel, no emissions.',
    url: 'https://deepengineering.co',
    siteName: 'Deep Engineering',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Deep Engineering - Kinetic Power Plant Technology',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deep Engineering - Continuous Clean Energy, Anywhere',
    description:
      'Delivering 24/7 renewable power through the revolutionary Kinetic Power Plant (KPP) technology – no fuel, no emissions.',
    images: ['/og-image.jpg'],
    creator: '@deepengineering',
  },
  alternates: {
    canonical: '/',
  },
};

// Static generation with revalidation
export const revalidate = 3600; // Revalidate every hour

export default function HomePage() {
  return (
    <Fragment>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Deep Engineering',
          url: 'https://deepengineering.co',
          logo: 'https://deepengineering.co/logo.svg',
          description:
            "Iraq's pioneer in renewable energy project development. Exclusive KPP licensee.",
          foundingDate: '2020',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Roya Tower A 1-14',
            addressLocality: 'Erbil',
            postalCode: '44001',
            addressCountry: 'IQ',
          },
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
          sameAs: ['https://www.linkedin.com/company/deepengineering/'],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Renewable Energy Solutions',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Kinetic Power Plant (KPP) Technology',
                  description:
                    '24/7 renewable energy generation without fuel or emissions',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Project Development',
                  description:
                    'End-to-end renewable energy project development and implementation',
                },
              },
            ],
          },
        }}
      />

      {/* Hero Section */}
      <HeroSection
        title='Continuous Clean Energy, Anywhere'
        subtitle='Delivering 24/7 renewable power through the revolutionary Kinetic Power Plant (KPP) technology – no fuel, no emissions.'
      >
        <div>
          <Link
            href='/technology'
            className='inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl'
          >
            Explore Our Technology
            <svg
              className='ml-2 w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </Link>
        </div>
      </HeroSection>

      {/* Mini About Section */}
      <MiniAbout />

      {/* Mini Projects Section */}
      <MiniProjects />

      {/* Additional Static Content */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-primary mb-4'>
              Why Choose Deep Engineering?
            </h2>
            <p className='text-lg text-gray-text max-w-3xl mx-auto'>
              We're revolutionizing the energy landscape with innovative
              technology and sustainable solutions.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                24/7 Power Generation
              </h3>
              <p className='text-gray-text'>
                Our KPP technology provides continuous energy generation without
                interruption, ensuring reliable power supply around the clock.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                Zero Emissions
              </h3>
              <p className='text-gray-text'>
                Clean, green energy with absolutely no emissions or
                environmental impact, contributing to a sustainable future for
                generations to come.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                Proven Technology
              </h3>
              <p className='text-gray-text'>
                Our KPP technology has been thoroughly tested and validated,
                providing reliable and efficient energy solutions for diverse
                applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-16 bg-primary text-white'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold mb-4'>
            Ready to Transform Your Energy Future?
          </h2>
          <p className='text-xl mb-8 max-w-3xl mx-auto'>
            Join us in revolutionizing the energy landscape with sustainable,
            reliable, and innovative power solutions.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/contact'
              className='inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors'
            >
              Get in Touch
              <svg
                className='ml-2 w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
            </Link>
            <Link
              href='/projects'
              className='inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors'
            >
              View Our Projects
              <svg
                className='ml-2 w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
