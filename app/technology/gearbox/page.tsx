import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import {
  Cog,
  Settings,
  Zap,
  Shield,
  TrendingUp,
  Gauge,
  Layers,
  BarChart3,
  Wrench,
  ClipboardCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'KPP Gearbox - Power Transmission Technology',
  description:
    'Explore the advanced gearbox technology that optimizes power transmission in KPP systems. Learn about efficiency, reliability, and precision engineering.',
  keywords:
    'KPP gearbox, power transmission, mechanical efficiency, renewable energy gearbox, sustainable power transmission',
  openGraph: {
    title: 'KPP Gearbox - Power Transmission Technology',
    description:
      'Explore the advanced gearbox technology that optimizes power transmission in KPP systems. Learn about efficiency, reliability, and precision engineering.',
    url: 'https://deepengineering.co/technology/gearbox',
    images: [
      {
        url: '/gearbox-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KPP Gearbox Technology',
      },
    ],
  },
  twitter: {
    title: 'KPP Gearbox - Power Transmission Technology',
    description:
      'Explore the advanced gearbox technology that optimizes power transmission in KPP systems. Learn about efficiency, reliability, and precision engineering.',
  },
  alternates: {
    canonical: '/technology/gearbox',
  },
};

const gearboxFeatures = [
  {
    title: 'High Efficiency',
    description:
      'Precision-engineered gears achieve 95-98% transmission efficiency with minimal energy losses.',
    icon: <TrendingUp className='w-8 h-8' />,
  },
  {
    title: 'Variable Ratio',
    description:
      'Adaptive gear ratios optimize power transmission based on operating conditions.',
    icon: <Gauge className='w-8 h-8' />,
  },
  {
    title: 'Low Maintenance',
    description:
      'Advanced lubrication systems and sealed design ensure minimal maintenance requirements.',
    icon: <Settings className='w-8 h-8' />,
  },
  {
    title: 'High Reliability',
    description:
      'Robust construction and quality materials ensure long-term operational reliability.',
    icon: <Shield className='w-8 h-8' />,
  },
  {
    title: 'Smooth Operation',
    description:
      'Precision manufacturing ensures smooth, vibration-free power transmission.',
    icon: <Zap className='w-8 h-8' />,
  },
  {
    title: 'Modular Design',
    description:
      'Scalable architecture allows for easy maintenance and capacity adjustment.',
    icon: <Cog className='w-8 h-8' />,
  },
];

const technicalSpecs = [
  {
    category: 'Power Transmission',
    specs: [
      {
        name: 'Power Rating',
        value: '50-200 MW',
        description: 'Configurable power capacity',
      },
      {
        name: 'Gear Ratio',
        value: '10:1 to 50:1',
        description: 'Variable ratio capability',
      },
      {
        name: 'Input Speed',
        value: '100-500 RPM',
        description: 'Flexible input speed range',
      },
      {
        name: 'Output Speed',
        value: '1000-3000 RPM',
        description: 'Optimized for generator operation',
      },
    ],
  },
  {
    category: 'Performance Parameters',
    specs: [
      {
        name: 'Transmission Efficiency',
        value: '95-98%',
        description: 'High efficiency operation',
      },
      {
        name: 'Torque Capacity',
        value: '1000-5000 kNm',
        description: 'High torque handling capability',
      },
      {
        name: 'Response Time',
        value: '< 1 second',
        description: 'Rapid ratio adjustment',
      },
      {
        name: 'Lifespan',
        value: '25+ years',
        description: 'Extended operational life',
      },
    ],
  },
  {
    category: 'Operational',
    specs: [
      {
        name: 'Maintenance Interval',
        value: '18 months',
        description: 'Extended maintenance schedule',
      },
      {
        name: 'Temperature Range',
        value: '-20°C to +60°C',
        description: 'Wide operating temperature',
      },
      {
        name: 'Environmental Protection',
        value: 'IP65',
        description: 'Dust and water protection',
      },
      { name: 'Noise Level', value: '< 70 dB', description: 'Quiet operation' },
    ],
  },
];

export default function GearboxPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className='section-padding bg-gradient-to-br from-primary to-primary-dark text-white'>
        <div className='container'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='mb-6 text-white font-bold text-4xl md:text-5xl'>
              KPP Gearbox Technology
            </h1>
            <p className='text-xl text-white font-semibold leading-relaxed'>
              Advanced power transmission technology that optimizes kinetic
              energy transfer with exceptional efficiency and reliability for
              sustainable power generation.
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
              <h2 className='mb-6'>Precision Power Transmission</h2>
              <p className='text-lg text-gray-text mb-6'>
                The KPP gearbox represents the heart of our power transmission
                system, efficiently converting and optimizing kinetic energy
                from the buoyancy-driven floater to the electrical generator.
              </p>
              <p className='text-gray-text mb-6'>
                Our advanced gearbox technology ensures maximum energy transfer
                efficiency while maintaining reliability and minimizing
                maintenance requirements, making it a critical component in the
                KPP power generation process.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Link
                  href='/technology/how-it-works'
                  className='bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 text-center'
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
                <Cog className='w-24 h-24 text-primary mx-auto mb-6' />
                <h3 className='text-2xl font-semibold text-primary mb-4'>
                  Gearbox Overview
                </h3>
                <div className='space-y-4 text-left'>
                  <div className='flex justify-between'>
                    <span className='text-gray-text'>Power Rating:</span>
                    <span className='font-semibold'>50-200 MW</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-text'>Efficiency:</span>
                    <span className='font-semibold'>95-98%</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-text'>Gear Ratio:</span>
                    <span className='font-semibold'>10:1 to 50:1</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-text'>Lifespan:</span>
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
            <p className='text-lg text-gray-text max-w-3xl mx-auto'>
              The KPP gearbox incorporates cutting-edge engineering to ensure
              optimal power transmission with maximum efficiency and
              reliability.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {gearboxFeatures.map((feature, index) => (
              <div key={index} className='bg-white p-6 rounded-lg shadow-sm'>
                <div className='w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4'>
                  <div className='text-white'>{feature.icon}</div>
                </div>
                <h3 className='text-xl font-semibold text-primary mb-3'>
                  {feature.title}
                </h3>
                <p className='text-gray-text'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Technical Specifications</h2>
            <p className='text-lg text-gray-text max-w-3xl mx-auto'>
              Detailed technical specifications and performance parameters of
              the KPP gearbox system.
            </p>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {technicalSpecs.map((category, index) => (
              <div key={index} className='bg-gray-light p-6 rounded-lg'>
                <h3 className='text-xl font-semibold text-primary mb-6'>
                  {category.category}
                </h3>
                <div className='space-y-4'>
                  {category.specs.map((spec, sIndex) => (
                    <div key={sIndex} className='border-b border-gray-300 pb-4'>
                      <div className='flex justify-between items-start mb-2'>
                        <span className='font-medium text-gray-text'>
                          {spec.name}
                        </span>
                        <span className='font-bold text-primary text-lg'>
                          {spec.value}
                        </span>
                      </div>
                      <p className='text-sm text-gray-text'>
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
      <section className='section-padding bg-gray-light border-t'>
        <div className='container grid grid-cols-1 md:grid-cols-2 gap-12'>
          {/* Detailed Engineering Data */}
          <div>
            <h2 className='flex items-center gap-2 text-2xl font-semibold mb-4'>
              <Layers className='w-6 h-6 text-blue-600' />
              Detailed Engineering Data
            </h2>
            <div className='bg-white border rounded p-4 text-gray-700'>
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  Connects the drive shaft to the generator, increasing rotation
                  speed to the generator's rated RPM.
                </li>
                <li>
                  Precision-engineered gears for high efficiency and minimal
                  energy loss.
                </li>
                <li>
                  Robust construction with high-quality materials for long
                  operational life.
                </li>
                <li>
                  Sealed housing for dust and water protection (IP65 rating).
                </li>
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
            <div className='bg-white border rounded p-4 text-gray-700'>
              <ul className='list-disc pl-6 space-y-2'>
                <li>Transmission efficiency: 95–98%.</li>
                <li>Torque capacity: 1000–5000 kNm.</li>
                <li>
                  Rapid response time: &lt; 1 second for ratio adjustment.
                </li>
                <li>Durability for 25+ years of continuous operation.</li>
                <li>Quiet operation: &lt; 70 dB.</li>
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
            <div className='bg-white border rounded p-4 text-gray-700'>
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  Oil change and lubrication at recommended intervals (18 months
                  typical).
                </li>
                <li>
                  Periodic inspection for wear, alignment, and seal integrity.
                </li>
                <li>
                  Replacement of gears or bearings as needed (modular design).
                </li>
                <li>
                  Low maintenance due to robust design and quality components.
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
            <div className='bg-white border rounded p-4 text-gray-700'>
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  Modular and compatible with various generator types and KPP
                  module sizes.
                </li>
                <li>
                  Designed for seamless integration with drive shaft and
                  generator.
                </li>
                <li>Supports both grid-connected and off-grid applications.</li>
                <li>
                  Synchronized with PLC-based control system for optimal
                  performance.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='container mt-8 text-sm text-gray-500'>
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
