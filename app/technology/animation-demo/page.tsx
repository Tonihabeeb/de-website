import Link from 'next/link';
import type { Metadata } from 'next';
import KPPDiagram from '@/components/technical/KPPDiagram';
import KPPAnimation from '@/components/animations/KPPAnimation';
import KPPAnimationBlueprint from '@/components/animations/KPPAnimationBlueprint';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import HeroSection from '@/components/sections/HeroSection';

export const metadata: Metadata = {
  title: 'KPP Interactive Diagrams & Animations',
  description:
    'Explore interactive technical diagrams and animations showcasing the Kinetic Power Plant (KPP) technology. From system overviews to detailed blueprints.',
  keywords:
    'KPP diagrams, interactive animations, technical schematics, KPP technology visualization, engineering blueprints',
  openGraph: {
    title: 'KPP Interactive Diagrams & Animations - Deep Engineering',
    description:
      'Explore interactive technical diagrams and animations showcasing the Kinetic Power Plant (KPP) technology.',
    url: 'https://deepengineering.co/technology/animation-demo',
    images: [
      {
        url: '/kpp-animations-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KPP Interactive Diagrams and Animations',
      },
    ],
  },
  twitter: {
    title: 'KPP Interactive Diagrams & Animations - Deep Engineering',
    description:
      'Explore interactive technical diagrams and animations showcasing the Kinetic Power Plant (KPP) technology.',
  },
  alternates: {
    canonical: '/technology/animation-demo',
  },
};

export default function AnimationDemoPage() {
  return (
    <div>
      <HeroSection
        title='Interactive KPP Diagrams'
        subtitle='Explore our comprehensive collection of interactive diagrams and animations that bring KPP technology to life through engaging visual experiences.'
      />

      <div className='container'>
        <Breadcrumbs />
      </div>

      {/* System Overview Diagram */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <FadeInWhenVisible>
            <div className='text-center mb-12'>
              <h2 className='mb-4'>System Overview Diagram</h2>
              <p className="text-lg text-white">
                Interactive system diagram showing all KPP components and their
                relationships. Hover over components to see labels and click for
                detailed specifications.
              </p>
            </div>
          </FadeInWhenVisible>

          <KPPDiagram />
        </div>
      </section>

      {/* KPP Animation */}
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <FadeInWhenVisible>
            <div className='text-center mb-12'>
              <h2 className='mb-4'>KPP Animation</h2>
              <p className="text-lg text-white">
                Watch the complete energy generation cycle with air injection,
                floater movement, chain drive, and power generation. Control the
                animation speed and playback.
              </p>
            </div>
          </FadeInWhenVisible>

          <KPPAnimation />
        </div>
      </section>

      {/* Blueprint Animation */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <FadeInWhenVisible>
            <div className='text-center mb-12'>
              <h2 className='mb-4'>Technical Blueprint View</h2>
              <p className="text-lg text-white">
                Professional engineering blueprint style animation with
                technical specifications, measurement indicators, and detailed
                component information.
              </p>
            </div>
          </FadeInWhenVisible>

          <KPPAnimationBlueprint />
        </div>
      </section>

      {/* Component Comparison */}
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <FadeInWhenVisible>
            <div className='text-center mb-12'>
              <h2 className='mb-4'>Animation Styles Comparison</h2>
              <p className="text-lg text-white">
                Compare different visualization styles for understanding KPP
                technology.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='bg-white rounded-xl p-6 border border-gray-200'>
              <h3 className='text-lg font-semibold text-primary mb-4'>
                Interactive Diagram
              </h3>
              <p className="text-white">
                Clickable components with detailed specifications and hover
                effects.
              </p>
              <ul className="text-base text-white">
                <li>• Component details on click</li>
                <li>• Hover labels and tooltips</li>
                <li>• System relationship visualization</li>
                <li>• Technical specifications panel</li>
              </ul>
            </div>

            <div className='bg-white rounded-xl p-6 border border-gray-200'>
              <h3 className='text-lg font-semibold text-primary mb-4'>
                Dynamic Animation
              </h3>
              <p className="text-white">
                Full cycle animation showing the complete energy generation
                process.
              </p>
              <ul className="text-base text-white">
                <li>• Play/pause controls</li>
                <li>• Adjustable speed settings</li>
                <li>• Real-time energy flow visualization</li>
                <li>• Component interaction effects</li>
              </ul>
            </div>

            <div className='bg-white rounded-xl p-6 border border-gray-200'>
              <h3 className='text-lg font-semibold text-primary mb-4'>
                Blueprint View
              </h3>
              <p className="text-white">
                Professional engineering schematic with technical measurements.
              </p>
              <ul className="text-base text-white">
                <li>• Engineering blueprint style</li>
                <li>• Technical specifications overlay</li>
                <li>• Measurement indicators</li>
                <li>• Professional documentation format</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='text-center'>
            <h2 className='mb-6'>Explore More KPP Technology</h2>
            <div className='flex flex-wrap justify-center gap-4'>
              <Link
                href='/technology/how-it-works'
                className="px-6 py-3 bg-gradient-to-b from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 active:from-blue-900 active:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none transition-colors min-w-[44px] min-h-[44px] inline-block text-center text-white"
              >
                How KPP Works
              </Link>
              <Link
                href='/technology/components'
                className="px-6 py-3 bg-gray-100 text-white"
              >
                KPP Components
              </Link>
              <Link
                href='/technology/specifications'
                className="px-6 py-3 bg-gray-100 text-white"
              >
                Technical Specifications
              </Link>
              <Link
                href='/interactive-features'
                className="px-6 py-3 bg-gray-100 text-white"
              >
                Interactive Features
              </Link>
            </div>
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
            <p className="text-base text-white">
              Explore more about KPP technology and related topics:
            </p>
          </div>
          <div className='flex flex-wrap justify-center gap-4'>
            <Link
              href='/technology'
              className="bg-gradient-to-b from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 active:from-blue-900 active:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none transition-colors text-white"
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
              href='/technology/specifications'
              className='bg-white text-primary border border-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors'
            >
              Technical Specifications
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
