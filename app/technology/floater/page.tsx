import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import {
  Waves,
  Anchor,
  Shield,
  Zap,
  Settings,
  TrendingUp,
  Layers,
  BarChart3,
  Wrench,
  ClipboardCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'KPP Floater - Buoyancy-Driven Energy System',
  description:
    'Discover the innovative floater technology that drives KPP systems through buoyancy forces. Learn about design, efficiency, and sustainable energy generation.',
  keywords:
    'KPP floater, buoyancy system, kinetic energy floater, renewable energy floater, sustainable power generation',
  openGraph: {
    title: 'KPP Floater - Buoyancy-Driven Energy System',
    description:
      'Discover the innovative floater technology that drives KPP systems through buoyancy forces. Learn about design, efficiency, and sustainable energy generation.',
    url: 'https://deepengineering.co/technology/floater',
    images: [
      {
        url: '/floater-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KPP Floater Technology',
      },
    ],
  },
  twitter: {
    title: 'KPP Floater - Buoyancy-Driven Energy System',
    description:
      'Discover the innovative floater technology that drives KPP systems through buoyancy forces. Learn about design, efficiency, and sustainable energy generation.',
  },
  alternates: {
    canonical: '/technology/floater',
  },
};

const floaterFeatures = [
  {
    title: 'Buoyancy-Driven',
    description:
      'Harnesses natural buoyancy forces to create continuous upward motion without external energy input.',
    icon: <Waves className='w-8 h-8' />,
  },
  {
    title: 'High Efficiency',
    description:
      'Optimized design maximizes buoyancy force conversion to kinetic energy with minimal losses.',
    icon: <TrendingUp className='w-8 h-8' />,
  },
  {
    title: 'Weather Resistant',
    description:
      'Robust construction withstands environmental conditions while maintaining optimal performance.',
    icon: <Shield className='w-8 h-8' />,
  },
  {
    title: 'Continuous Operation',
    description:
      '24/7 operation capability with automatic buoyancy cycle management and control.',
    icon: <Zap className='w-8 h-8' />,
  },
  {
    title: 'Modular Design',
    description:
      'Scalable architecture allows for easy capacity adjustment and maintenance access.',
    icon: <Settings className='w-8 h-8' />,
  },
  {
    title: 'Low Maintenance',
    description:
      'Simple mechanical design with minimal moving parts ensures reliable long-term operation.',
    icon: <Anchor className='w-8 h-8' />,
  },
];

const technicalSpecs = [
  {
    category: 'Physical Specifications',
    specs: [
      {
        name: 'Material',
        value: 'Advanced Composites',
        description: 'Lightweight, durable construction',
      },
      {
        name: 'Dimensions',
        value: '3m x 2m x 1.5m',
        description: 'Compact, efficient design',
      },
      {
        name: 'Weight',
        value: '2-5 tons',
        description: 'Optimized for buoyancy efficiency',
      },
      {
        name: 'Buoyancy Force',
        value: '50-200 kN',
        description: 'Configurable based on power requirements',
      },
    ],
  },
  {
    category: 'Performance Parameters',
    specs: [
      {
        name: 'Cycle Time',
        value: '30-60 seconds',
        description: 'Complete buoyancy cycle duration',
      },
      {
        name: 'Efficiency',
        value: '85-92%',
        description: 'Buoyancy to kinetic energy conversion',
      },
      {
        name: 'Operating Depth',
        value: '10-50 meters',
        description: 'Flexible deployment depth range',
      },
      {
        name: 'Lifespan',
        value: '25+ years',
        description: 'Extended operational life expectancy',
      },
    ],
  },
  {
    category: 'Environmental',
    specs: [
      {
        name: 'Temperature Range',
        value: '-10°C to +40°C',
        description: 'Wide operating temperature range',
      },
      {
        name: 'Corrosion Resistance',
        value: 'Marine Grade',
        description: 'Saltwater and environmental protection',
      },
      {
        name: 'Environmental Impact',
        value: 'Minimal',
        description: 'Zero emissions, no marine life disruption',
      },
      {
        name: 'Noise Level',
        value: '< 30 dB',
        description: 'Quiet operation for marine environments',
      },
    ],
  },
];

export default function FloaterPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white text-white">
        <div className='container'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='mb-6 text-white font-bold text-4xl md:text-5xl'>
              KPP Floater Technology
            </h1>
            <p className='text-xl text-white font-semibold leading-relaxed'>
              Revolutionary buoyancy-driven system that harnesses natural forces
              to create continuous kinetic energy for sustainable power
              generation.
            </p>
          </div>
        </div>
      </section>

      <div className='container'>
        <Breadcrumbs />
      </div>

      {/* Overview Section */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='mb-6'>Buoyancy-Driven Innovation</h2>
              <p className="text-lg text-white">
                The KPP floater represents a breakthrough in renewable energy
                technology, utilizing the fundamental principles of buoyancy to
                create continuous motion without requiring fuel, wind, or solar
                energy.
              </p>
              <p className="text-white">
                By harnessing the natural buoyancy forces in water, our floater
                system generates consistent kinetic energy that drives the
                entire KPP power generation process, making it truly sustainable
                and environmentally friendly.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Link
                  href='/technology/how-it-works'
                  className="bg-gradient-to-b from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 active:from-blue-900 active:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none transition-colors duration-200 text-center text-white"
                >
                  Learn How It Works
                </Link>
                <Link
                  href='/technology/components'
                  className='border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors duration-200 text-center'
                >
                  View All Components
                </Link>
              </div>
            </div>
            <div className='bg-gray-light p-8 rounded-lg'>
              <div className='text-center'>
                <Waves className='w-24 h-24 text-primary mx-auto mb-6' />
                <h3 className='text-2xl font-semibold text-primary mb-4'>
                  Floater Overview
                </h3>
                <div className='space-y-4 text-left'>
                  <div className='flex justify-between'>
                    <span className="text-white">Buoyancy Force:</span>
                    <span className='font-semibold'>50-200 kN</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className="text-white">Cycle Time:</span>
                    <span className='font-semibold'>30-60 seconds</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className="text-white">Efficiency:</span>
                    <span className='font-semibold'>85-92%</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className="text-white">Lifespan:</span>
                    <span className='font-semibold'>25+ years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Key Features & Capabilities</h2>
            <p className="text-lg text-white">
              The KPP floater incorporates innovative engineering to maximize
              buoyancy efficiency and ensure reliable, continuous operation.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {floaterFeatures.map((feature, index) => (
              <div key={index} className='bg-white p-6 rounded-lg shadow-sm'>
                <div className='w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4'>
                  <div className='text-white'>{feature.icon}</div>
                </div>
                <h3 className='text-xl font-semibold text-primary mb-3'>
                  {feature.title}
                </h3>
                <p className="text-white">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>How the Floater Works</h2>
            <p className="text-lg text-white">
              Understanding the innovative buoyancy-driven process that powers
              KPP technology.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='text-center'>
              <div className='w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-bold text-xl'>1</span>
              </div>
              <h3 className='text-lg font-semibold text-primary mb-3'>
                Buoyancy Generation
              </h3>
              <p className="text-white">
                The floater creates controlled buoyancy forces through
                innovative design and material selection.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-bold text-xl'>2</span>
              </div>
              <h3 className='text-lg font-semibold text-primary mb-3'>
                Upward Motion
              </h3>
              <p className="text-white">
                Buoyancy forces drive the floater upward, creating kinetic
                energy in the process.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-bold text-xl'>3</span>
              </div>
              <h3 className='text-lg font-semibold text-primary mb-3'>
                Energy Transfer
              </h3>
              <p className="text-white">
                Kinetic energy is transferred to the conveyor chain system for
                power generation.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-bold text-xl'>4</span>
              </div>
              <h3 className='text-lg font-semibold text-primary mb-3'>
                Cycle Reset
              </h3>
              <p className="text-white">
                The system automatically resets for the next buoyancy cycle,
                ensuring continuous operation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Technical Specifications</h2>
            <p className="text-lg text-white">
              Detailed technical specifications and performance parameters of
              the KPP floater system.
            </p>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {technicalSpecs.map((category, index) => (
              <div key={index} className='bg-white p-6 rounded-lg'>
                <h3 className='text-xl font-semibold text-primary mb-6'>
                  {category.category}
                </h3>
                <div className='space-y-4'>
                  {category.specs.map((spec, sIndex) => (
                    <div key={sIndex} className='border-b border-gray-300 pb-4'>
                      <div className='flex justify-between items-start mb-2'>
                        <span className="font-medium text-white">
                          {spec.name}
                        </span>
                        <span className='font-bold text-primary text-lg'>
                          {spec.value}
                        </span>
                      </div>
                      <p className="text-sm text-white">
                        {spec.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Enhancement Sections --- */}
      <section className='section-padding bg-white border-t'>
        <div className='container grid grid-cols-1 md:grid-cols-2 gap-12'>
          {/* Detailed Engineering Data */}
          <div>
            <h2 className='flex items-center gap-2 text-2xl font-semibold mb-4'>
              <Layers className='w-6 h-6 text-blue-600' />
              Detailed Engineering Data
            </h2>
            <div className="bg-gray-50 border rounded p-4 text-white">
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  Each module contains 66 hollow steel floaters attached to an
                  endless chain loop.
                </li>
                <li>
                  Floaters are air-filled for buoyancy (rising) and water-filled
                  for weight (sinking).
                </li>
                <li>
                  Constructed for durability and pressure resistance; designed
                  for 25+ years of operation.
                </li>
                <li>Optimized for minimal drag and maximum buoyant force.</li>
                <li>
                  Modular design allows for easy replacement and maintenance.
                </li>
              </ul>
            </div>
          </div>
          {/* Performance Benchmarks */}
          <div>
            <h2 className='flex items-center gap-2 text-2xl font-semibold mb-4'>
              <BarChart3 className='w-6 h-6 text-orange-600' />
              Performance Benchmarks
            </h2>
            <div className="bg-gray-50 border rounded p-4 text-white">
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  Buoyant force per floater: 50–200 kN (configurable by design).
                </li>
                <li>Cycle time: 30–60 seconds per full loop.</li>
                <li>High durability for continuous 24/7 operation.</li>
                <li>
                  Efficiency: 85–92% buoyancy-to-kinetic energy conversion.
                </li>
                <li>
                  Minimal wear due to robust construction and water lubrication.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='container grid grid-cols-1 md:grid-cols-2 gap-12 mt-12'>
          {/* Maintenance Requirements */}
          <div>
            <h2 className='flex items-center gap-2 text-2xl font-semibold mb-4'>
              <Wrench className='w-6 h-6 text-green-600' />
              Maintenance Requirements
            </h2>
            <div className="bg-gray-50 border rounded p-4 text-white">
              <ul className='list-disc pl-6 space-y-2'>
                <li>Periodic inspection for leaks or corrosion in floaters.</li>
                <li>
                  Chain lubrication and tension adjustment as part of routine
                  maintenance.
                </li>
                <li>Replacement of floaters as needed (modular design).</li>
                <li>
                  Minimal moving parts reduce maintenance frequency and cost.
                </li>
              </ul>
            </div>
          </div>
          {/* Integration Specifications */}
          <div>
            <h2 className='flex items-center gap-2 text-2xl font-semibold mb-4'>
              <ClipboardCheck className='w-6 h-6 text-purple-600' />
              Integration Specifications
            </h2>
            <div className="bg-gray-50 border rounded p-4 text-white">
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  Floaters are synchronized with the PLC-based control system
                  for precise air/water cycling.
                </li>
                <li>Modular and easily replaceable for rapid maintenance.</li>
                <li>
                  Compatible with various shaft heights and KPP module sizes.
                </li>
                <li>
                  Designed for seamless integration with conveyor chain and
                  drive systems.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container mt-8 text-sm text-white">
          <span>
            Source:{' '}
            <a
              href='https://kinetic-power-plant-kpp--kqhcbor.gamma.site/'
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              KPP Technical Overview presentation
            </a>
          </span>
        </div>
      </section>

      {/* Environmental Benefits */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='mb-6'>Environmental Benefits</h2>
              <p className="text-lg text-white">
                The KPP floater technology provides significant environmental
                advantages over traditional power generation methods.
              </p>
              <div className='space-y-4'>
                <div className='flex items-start'>
                  <div className='w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <div>
                    <h4 className='font-semibold text-primary mb-1'>
                      Zero Emissions
                    </h4>
                    <p className="text-white">
                      No CO2, NOx, or particulate emissions during operation
                    </p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <div className='w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <div>
                    <h4 className='font-semibold text-primary mb-1'>
                      No Fuel Required
                    </h4>
                    <p className="text-white">
                      Eliminates fuel extraction, transportation, and combustion
                    </p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <div className='w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <div>
                    <h4 className='font-semibold text-primary mb-1'>
                      Marine Life Friendly
                    </h4>
                    <p className="text-white">
                      Minimal impact on marine ecosystems and wildlife
                    </p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <div className='w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <div>
                    <h4 className='font-semibold text-primary mb-1'>
                      Sustainable Materials
                    </h4>
                    <p className="text-white">
                      Eco-friendly materials with long operational life
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-light p-8 rounded-lg'>
              <h3 className='text-xl font-semibold text-primary mb-6'>
                Applications
              </h3>
              <div className='space-y-4'>
                <div className='flex items-center p-4 bg-white rounded-lg'>
                  <Waves className='w-6 h-6 text-primary mr-3' />
                  <span className='font-medium'>Offshore Power Plants</span>
                </div>
                <div className='flex items-center p-4 bg-white rounded-lg'>
                  <Waves className='w-6 h-6 text-primary mr-3' />
                  <span className='font-medium'>Coastal Communities</span>
                </div>
                <div className='flex items-center p-4 bg-white rounded-lg'>
                  <Waves className='w-6 h-6 text-primary mr-3' />
                  <span className='font-medium'>Island Power Systems</span>
                </div>
                <div className='flex items-center p-4 bg-white rounded-lg'>
                  <Waves className='w-6 h-6 text-primary mr-3' />
                  <span className='font-medium'>Marine Infrastructure</span>
                </div>
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
            Explore other KPP components and understand how they work together
            to create a complete renewable energy solution.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/technology/components'
              className='bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200'
            >
              View All Components
            </Link>
            <Link
              href='/contact'
              className='border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200'
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
