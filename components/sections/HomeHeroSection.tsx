'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function HomeHeroSection() {
  return (
    <section className='relative h-screen flex items-center justify-center text-primary overflow-hidden' style={{ marginTop: '-80px', paddingTop: '80px' }}>
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='/herosection2.png'
          alt='Hero Section Background'
          fill
          className='object-contain'
          priority
          quality={100}
          style={{
            objectPosition: 'center center',
            width: '100%',
            height: '100%'
          }}
        />
        {/* Overlay for text readability */}
        <div className='absolute inset-0 bg-black/30' />
      </div>
      
      {/* Clean content without animations */}
      <div className='container relative z-20 text-center pt-24'>
        {/* Intro Message */}
        <div className='mb-12 max-w-4xl mx-auto'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6 leading-tight'>
            Continuous Clean Energy, Anywhere
          </h1>
          <p className='text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto'>
            Delivering 24/7 renewable power through the revolutionary Kinetic Power Plant (KPP) technology by Rosch Innovations – no fuel, no emissions.
          </p>
        </div>

        {/* Call-to-Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
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
          <div>
            <Link
              href='/about/learn-more'
              className='inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg bg-transparent hover:bg-white hover:text-primary transition-colors shadow-lg hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-white'
              style={{
                transition: 'color 0.2s, background 0.2s, transform 0.2s',
              }}
            >
              Learn more about us
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
        </div>
      </div>
    </section>
  );
}
