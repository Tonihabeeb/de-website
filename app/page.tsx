import { Fragment } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Heart, CheckCircle, MessageCircle, FolderOpen } from 'lucide-react';
import StructuredData from '@/components/StructuredData';
import HomeHeroSection from '@/components/sections/HomeHeroSection';
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

      {/* Home Hero Section */}
      <HomeHeroSection />

      {/* Mini About Section */}
      <MiniAbout />

      {/* Mini Projects Section */}
      <MiniProjects />

      {/* Additional Static Content */}
      <section className='section-padding bg-white'>
        <div className='container'>
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
                <Zap className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-primary mb-2'>
                24/7 Power Generation
              </h3>
              <p className='text-gray-text'>
                Our KPP technology provides continuous energy generation without
                interruption, ensuring reliable power supply around the clock.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
                <Heart className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-primary mb-2'>
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
                <CheckCircle className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-primary mb-2'>
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
      <section className='section-padding bg-primary text-white'>
        <div className='container text-center'>
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
              <MessageCircle className='w-5 h-5 mr-2' />
              Get in Touch
            </Link>
            <Link
              href='/projects'
              className='inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors'
            >
              <FolderOpen className='w-5 h-5 mr-2' />
              View Our Projects
            </Link>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
