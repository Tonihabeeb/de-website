import Link from 'next/link';
import type { Metadata } from 'next';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import ScrollTriggeredDiagram from '@/components/animations/ScrollTriggeredDiagram';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import HeroSection from '@/components/sections/HeroSection';
import { Wind, ArrowUp, Zap, RotateCcw, Fuel, Sun, Leaf, TrendingUp, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How KPP Works',
  description:
    'Discover how the Kinetic Power Plant (KPP) technology works - from air injection to energy conversion. Learn the science behind fuel-free, 24/7 power generation.',
  keywords:
    'how KPP works, kinetic power plant process, fuel-free energy generation, KPP technology explanation, renewable energy science, continuous power generation',
  openGraph: {
    title: 'How KPP Works - The Science Behind Fuel-Free Power Generation',
    description:
      'Discover how the Kinetic Power Plant (KPP) technology works - from air injection to energy conversion. Learn the science behind fuel-free, 24/7 power generation.',
    url: 'https://deepengineering.co/technology/how-it-works',
    images: [
      {
        url: '/how-kpp-works-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'How KPP Technology Works',
      },
    ],
  },
  twitter: {
    title: 'How KPP Works - The Science Behind Fuel-Free Power Generation',
    description:
      'Discover how the Kinetic Power Plant (KPP) technology works - from air injection to energy conversion. Learn the science behind fuel-free, 24/7 power generation.',
  },
  alternates: {
    canonical: '/technology/how-it-works',
  },
};

const processSteps = [
  {
    step: '01',
    title: 'Air Injection',
    description:
      'Air is injected into underwater floaters, causing them to rise due to buoyancy forces.',
    icon: <Wind className='w-8 h-8' />,
  },
  {
    step: '02',
    title: 'Buoyancy-Driven Motion',
    description:
      'The rising floaters drive a chain system that converts vertical motion into rotational energy.',
    icon: <ArrowUp className='w-8 h-8' />,
  },
  {
    step: '03',
    title: 'Energy Conversion',
    description:
      'Rotational energy turns a generator to produce clean electrical power.',
    icon: <Zap className='w-8 h-8' />,
  },
  {
    step: '04',
    title: 'Air Release & Cycle',
    description:
      'At the top, air is released and the floater sinks back down to repeat the cycle continuously.',
    icon: <RotateCcw className='w-8 h-8' />,
  },
];

const keyAdvantages = [
  {
    title: 'No Fuel Required',
    description:
      'Operates entirely on kinetic energy, eliminating fuel costs and supply chain dependencies.',
    icon: <Fuel className='w-8 h-8' />,
  },
  {
    title: 'Weather Independent',
    description:
      'Unlike solar or wind, KPP technology works continuously regardless of weather conditions.',
    icon: <Sun className='w-8 h-8' />,
  },
  {
    title: 'Zero Emissions',
    description:
      'Clean energy generation with no CO2, NOx, or particulate emissions.',
    icon: <Leaf className='w-8 h-8' />,
  },
  {
    title: 'Baseload Capability',
    description:
      'Provides reliable 24/7 power generation to meet continuous energy demands.',
    icon: <TrendingUp className='w-8 h-8' />,
  },
];

export default function HowItWorksPage() {
  return (
    <div>
      <HeroSection
        title='How KPP Works'
        subtitle="Discover the innovative physics and engineering behind the Kinetic Power Plant technology that's revolutionizing energy generation."
      />

      <div className='container'>
        <Breadcrumbs />
      </div>

      {/* Process Overview */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <FadeInWhenVisible>
            <div className='text-center mb-12'>
              <h2 className='mb-4'>The KPP Process</h2>
              <p className="text-lg text-white">
                KPP technology harnesses kinetic energy through a sophisticated
                mechanical system that converts motion into clean, continuous
                electrical power.
              </p>
            </div>
          </FadeInWhenVisible>

          <ScrollTriggeredDiagram steps={processSteps} />
        </div>
      </section>

      {/* Technical Explanation */}
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='mb-6'>The Physics Behind KPP</h2>
              <p className="text-lg text-white">
                By leveraging Archimedes' Principle (buoyancy) and gravity in a
                closed-loop, KPP continuously converts mechanical motion into
                electricity.
              </p>
              <p className="text-lg text-white">
                The system uses an innovative air injection engine that creates
                controlled buoyancy forces, driving a chain mechanism that
                converts vertical motion into rotational energy with high
                efficiency.
              </p>
              <p className="text-lg text-white">
                A 500 kW Low-Speed Permanent Magnet Generator runs at 375 RPM
                with ~95% efficiency, enabling direct grid connection without
                gearboxes.
              </p>
              <p className="text-lg text-white">
                The entire process is controlled by an integrated SCADA system
                that ensures optimal performance and safety, automatically
                adjusting air input and monitoring output in real-time.
              </p>
              <div className='mt-8'>
                <Link
                  href='/technology/physics'
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-b from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 active:from-blue-900 active:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none focus:bg-primary-dark focus:text-white transition-colors shadow-lg hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-white text-white"
                  style={{
                    transition: 'color 0.2s, background 0.2s, transform 0.2s',
                  }}
                >
                  More Details
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className='bg-white rounded-lg p-8'>
              <div className="w-full h-64 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center text-white">
                <div className='text-white text-center'>
                  <svg
                    className='w-4 h-4 mx-auto mb-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                    />
                  </svg>
                  <p className='text-lg font-semibold'>Technical Diagram</p>
                  <p className='text-base opacity-90'>Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Key Advantages</h2>
            <p className="text-lg text-white">
              KPP technology offers significant advantages over traditional and
              renewable energy sources, making it ideal for Iraq's energy needs.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {keyAdvantages.map((advantage, index) => (
              <div key={index} className='bg-gray-light p-6 rounded-lg'>
                <div className='flex items-start'>
                  <div className='text-4xl mr-4'>{advantage.icon}</div>
                  <div>
                    <h3 className='text-xl font-semibold text-primary mb-2'>
                      {advantage.title}
                    </h3>
                    <p className="text-white">{advantage.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section Placeholder */}
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <div className='text-center mb-8'>
            <h2 className='mb-4'>See KPP in Action</h2>
            <p className="text-lg text-white">
              Watch our detailed video explaining how KPP technology works and
              see it in operation at our demonstration facility.
            </p>
          </div>

          <div className='bg-white rounded-lg p-8 text-center'>
            <div className="w-full h-64 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center text-white">
              <div className='text-white text-center'>
                <svg
                  className='w-4 h-4 mx-auto mb-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <p className='text-lg font-semibold'>KPP Technology Video</p>
                <p className='text-base opacity-90'>Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Further Section (existing) */}
      <section className='section-padding bg-primary text-white'>
        <div className='container'>
          <div className='text-center mb-8'>
            <h2 className='mb-4'>Explore Further</h2>
            <p className='text-xl text-white max-w-3xl mx-auto'>
              Learn more about KPP components and performance specifications.
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/technology/components'
              className='bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 min-w-[44px] min-h-[44px] inline-block text-center'
            >
              View Components
            </Link>
            <Link
              href='/technology/performance'
              className='border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200 min-w-[44px] min-h-[44px] inline-block text-center'
            >
              Performance Data
            </Link>
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
              className="bg-gradient-to-b from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 active:from-blue-900 active:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none hover:text-white focus:text-white transition-colors text-white"
            >
              Technology Overview
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
            <Link
              href='/technology/animation-demo'
              className='bg-white text-primary border border-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors'
            >
              Interactive Diagrams
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
