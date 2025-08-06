import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import {
  Zap,
  Settings,
  Gauge,
  TrendingUp,
  Shield,
  Cog,
  Wrench,
  BarChart3,
  ClipboardCheck,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'KPP Generator - Advanced Power Generation Technology',
  description:
    'Explore the advanced generator technology used in Kinetic Power Plants. Learn about efficiency, reliability, and innovative power generation capabilities.',
  keywords:
    'KPP generator, kinetic power generator, advanced power generation, renewable energy generator, efficient power conversion',
  openGraph: {
    title: 'KPP Generator - Advanced Power Generation Technology',
    description:
      'Explore the advanced generator technology used in Kinetic Power Plants. Learn about efficiency, reliability, and innovative power generation capabilities.',
    url: 'https://deepengineering.co/technology/generator',
    images: [
      {
        url: '/generator-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KPP Generator Technology',
      },
    ],
  },
  twitter: {
    title: 'KPP Generator - Advanced Power Generation Technology',
    description:
      'Explore the advanced generator technology used in Kinetic Power Plants. Learn about efficiency, reliability, and innovative power generation capabilities.',
  },
  alternates: {
    canonical: '/technology/generator',
  },
};

const generatorFeatures = [
  {
    title: 'High Efficiency',
    description:
      'Advanced electromagnetic design achieves over 95% conversion efficiency from kinetic to electrical energy.',
    icon: <TrendingUp className='w-8 h-8' />,
  },
  {
    title: 'Variable Speed',
    description:
      'Adaptive speed control system optimizes power output based on kinetic input variations.',
    icon: <Gauge className='w-8 h-8' />,
  },
  {
    title: 'Low Maintenance',
    description:
      'Brushless design and sealed bearings ensure minimal maintenance requirements and extended operational life.',
    icon: <Settings className='w-8 h-8' />,
  },
  {
    title: 'Grid Synchronization',
    description:
      'Advanced synchronization technology ensures seamless integration with existing power grids.',
    icon: <Zap className='w-8 h-8' />,
  },
  {
    title: 'Thermal Management',
    description:
      'Innovative cooling system maintains optimal operating temperatures for maximum efficiency.',
    icon: <Shield className='w-8 h-8' />,
  },
  {
    title: 'Modular Design',
    description:
      'Scalable architecture allows for easy capacity expansion and component replacement.',
    icon: <Cog className='w-8 h-8' />,
  },
];

const technicalSpecs = [
  {
    category: 'Power Output',
    specs: [
      {
        name: 'Rated Power',
        value: '50-200 MW',
        description: 'Configurable power output range',
      },
      {
        name: 'Voltage',
        value: '11-33 kV',
        description: 'Medium voltage output for grid connection',
      },
      {
        name: 'Frequency',
        value: '50/60 Hz',
        description: 'Standard grid frequency compatibility',
      },
      {
        name: 'Power Factor',
        value: '0.95-0.99',
        description: 'High power factor for efficient operation',
      },
    ],
  },
  {
    category: 'Efficiency & Performance',
    specs: [
      {
        name: 'Conversion Efficiency',
        value: '95-98%',
        description: 'Kinetic to electrical energy conversion',
      },
      {
        name: 'Response Time',
        value: '< 100ms',
        description: 'Rapid response to load changes',
      },
      {
        name: 'Harmonic Distortion',
        value: '< 2%',
        description: 'Low harmonic content for grid quality',
      },
      {
        name: 'Availability',
        value: '99.5%',
        description: 'High operational availability',
      },
    ],
  },
  {
    category: 'Physical Specifications',
    specs: [
      {
        name: 'Weight',
        value: '15-45 tons',
        description: 'Varies with power rating',
      },
      {
        name: 'Dimensions',
        value: '4m x 3m x 2.5m',
        description: 'Compact footprint design',
      },
      {
        name: 'Operating Temperature',
        value: '-20°C to +50°C',
        description: 'Wide temperature range',
      },
      {
        name: 'Protection Class',
        value: 'IP54',
        description: 'Dust and water protection',
      },
    ],
  },
];

export default function GeneratorPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white text-white">
        <div className='container'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='mb-6 text-white font-bold text-4xl md:text-5xl'>
              KPP Generator Technology
            </h1>
            <p className='text-xl text-white font-semibold leading-relaxed'>
              Advanced power generation technology that converts kinetic energy
              into clean, reliable electricity with exceptional efficiency and
              minimal maintenance.
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
              <h2 className='mb-6'>Revolutionary Power Generation</h2>
              <p className="text-lg text-white">
                The KPP generator represents a breakthrough in power generation
                technology, specifically designed to harness kinetic energy and
                convert it into high-quality electrical power with unprecedented
                efficiency.
              </p>
              <p className="text-white">
                Unlike traditional generators that rely on fuel combustion, our
                generator operates purely on kinetic energy, eliminating
                emissions while maintaining the reliability and performance
                standards required for modern power grids.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Link
                  href='/technology/how-it-works'
                  className="bg-gradient-to-b from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 active:from-blue-900 active:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none transition-colors duration-200 text-center text-white"
                >
                  Learn How It Works
                </Link>
                <Link
                  href='/technology/specifications'
                  className='border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors duration-200 text-center'
                >
                  View Specifications
                </Link>
              </div>
            </div>
            <div className='bg-gray-light p-8 rounded-lg'>
              <div className='text-center'>
                <Zap className='w-24 h-24 text-primary mx-auto mb-6' />
                <h3 className='text-2xl font-semibold text-primary mb-4'>
                  Generator Overview
                </h3>
                <div className='space-y-4 text-left'>
                  <div className='flex justify-between'>
                    <span className="text-white">Power Range:</span>
                    <span className='font-semibold'>50-200 MW</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className="text-white">Efficiency:</span>
                    <span className='font-semibold'>95-98%</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className="text-white">Response Time:</span>
                    <span className='font-semibold'>&lt; 100ms</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className="text-white">Availability:</span>
                    <span className='font-semibold'>99.5%</span>
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
              The KPP generator incorporates cutting-edge technology to deliver
              reliable, efficient, and sustainable power generation.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {generatorFeatures.map((feature, index) => (
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

      {/* Technical Specifications */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Technical Specifications</h2>
            <p className="text-lg text-white">
              Detailed technical specifications and performance parameters of
              the KPP generator system.
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
              <em>
                Detailed engineering data from KPP technical documents will be
                integrated here.
              </em>
            </div>
          </div>
          {/* Performance Benchmarks */}
          <div>
            <h2 className='flex items-center gap-2 text-2xl font-semibold mb-4'>
              <BarChart3 className='w-6 h-6 text-orange-600' />
              Performance Benchmarks
            </h2>
            <div className="bg-gray-50 border rounded p-4 text-white">
              <em>
                Performance benchmarks and real-world data will be visualized
                here.
              </em>
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
              <em>
                Maintenance schedules, requirements, and best practices will be
                provided here.
              </em>
            </div>
          </div>
          {/* Integration Specifications */}
          <div>
            <h2 className='flex items-center gap-2 text-2xl font-semibold mb-4'>
              <ClipboardCheck className='w-6 h-6 text-purple-600' />
              Integration Specifications
            </h2>
            <div className="bg-gray-50 border rounded p-4 text-white">
              <em>
                Integration specifications and grid compatibility details will
                be available here.
              </em>
            </div>
          </div>
        </div>
      </section>

      {/* Integration & Applications */}
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='mb-6'>Grid Integration & Applications</h2>
              <p className="text-lg text-white">
                The KPP generator is designed for seamless integration with
                existing power infrastructure, supporting both grid-connected
                and off-grid applications.
              </p>
              <div className='space-y-4'>
                <div className='flex items-start'>
                  <div className='w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <div>
                    <h4 className='font-semibold text-primary mb-1'>
                      Grid Synchronization
                    </h4>
                    <p className="text-white">
                      Advanced synchronization technology ensures seamless grid
                      integration
                    </p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <div className='w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <div>
                    <h4 className='font-semibold text-primary mb-1'>
                      Load Management
                    </h4>
                    <p className="text-white">
                      Intelligent load balancing and demand response
                      capabilities
                    </p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <div className='w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <div>
                    <h4 className='font-semibold text-primary mb-1'>
                      Remote Monitoring
                    </h4>
                    <p className="text-white">
                      Real-time monitoring and control systems for optimal
                      performance
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-white p-8 rounded-lg'>
              <h3 className='text-xl font-semibold text-primary mb-6'>
                Applications
              </h3>
              <div className='space-y-4'>
                <div className='flex items-center p-4 bg-gray-50 rounded-lg'>
                  <Zap className='w-6 h-6 text-primary mr-3' />
                  <span className='font-medium'>
                    Utility-Scale Power Plants
                  </span>
                </div>
                <div className='flex items-center p-4 bg-gray-50 rounded-lg'>
                  <Zap className='w-6 h-6 text-primary mr-3' />
                  <span className='font-medium'>Industrial Facilities</span>
                </div>
                <div className='flex items-center p-4 bg-gray-50 rounded-lg'>
                  <Zap className='w-6 h-6 text-primary mr-3' />
                  <span className='font-medium'>Remote Communities</span>
                </div>
                <div className='flex items-center p-4 bg-gray-50 rounded-lg'>
                  <Zap className='w-6 h-6 text-primary mr-3' />
                  <span className='font-medium'>Microgrid Systems</span>
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
