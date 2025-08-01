import Link from 'next/link';
import type { Metadata } from 'next';
import KPPDiagram from '@/components/technical/KPPDiagram';
import HeroSection from '@/components/sections/HeroSection';
import {
  Heart,
  Clock,
  MapPin,
  Building2,
  Home,
  Zap,
  Brain,
  Plug,
  Settings,
  BarChart3,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'KPP Technology',
  description:
    'Discover the revolutionary Kinetic Power Plant (KPP) technology - fuel-free, emissions-free power generation that works 24/7. Learn how KPP provides continuous clean energy anywhere.',
  keywords:
    'KPP technology, kinetic power plant, fuel-free energy, emissions-free power, 24/7 renewable energy, continuous power generation, clean energy technology',
  openGraph: {
    title: 'KPP Technology - Revolutionary Fuel-Free Power Generation',
    description:
      'Discover the revolutionary Kinetic Power Plant (KPP) technology - fuel-free, emissions-free power generation that works 24/7. Learn how KPP provides continuous clean energy anywhere.',
    url: 'https://deepengineering.co/technology',
    images: [
      {
        url: '/technology-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KPP Technology - Kinetic Power Plant',
      },
    ],
  },
  twitter: {
    title: 'KPP Technology - Revolutionary Fuel-Free Power Generation',
    description:
      'Discover the revolutionary Kinetic Power Plant (KPP) technology - fuel-free, emissions-free power generation that works 24/7. Learn how KPP provides continuous clean energy anywhere.',
  },
  alternates: {
    canonical: '/technology',
  },
};

const technologyFeatures = [
  {
    title: 'Clean Power',
    description:
      'Operates without any fuel, water, wind or solar input – generating electricity with zero emissions (no CO₂, NOx, or other pollutants).',
    icon: <Heart className='w-8 h-8' />,
  },
  {
    title: 'Continuous Power',
    description:
      'Provides stable baseload power 24/7, independent of weather conditions, with built-in redundancy ensuring near 100% uptime.',
    icon: <Clock className='w-8 h-8' />,
  },
  {
    title: 'Decentralized',
    description:
      'Can be installed at the point of need – even off-grid locations – reducing transmission losses.',
    icon: <MapPin className='w-8 h-8' />,
  },
  {
    title: 'Scalable',
    description:
      'Modular design allows capacity from a few megawatts to 100+ MW by paralleling units. Start with what you need and expand easily.',
    icon: <Building2 className='w-8 h-8' />,
  },
  {
    title: 'Small Footprint',
    description:
      'Requires far less land than solar or wind: ~300 m² per MW (vs. thousands for other sources).',
    icon: <Home className='w-8 h-8' />,
  },
  {
    title: 'Competitive',
    description:
      'Projected levelized cost ~€25/MWh – delivering affordable energy along with grid stability benefits.',
    icon: <Zap className='w-8 h-8' />,
  },
];

const components = [
  {
    name: 'Kinetic Module',
    icon: <Zap className='w-6 h-6' />,
    description: 'The core unit that converts kinetic energy into electricity.',
  },
  {
    name: 'Control System',
    icon: <Brain className='w-6 h-6' />,
    description:
      'Advanced electronics for monitoring and optimizing performance.',
  },
  {
    name: 'Power Electronics',
    icon: <Plug className='w-6 h-6' />,
    description: 'Inverters and converters to deliver grid-ready power.',
  },
];

const technologySections = [
  {
    title: 'How It Works',
    description:
      'Understand the physics and engineering behind KPP technology.',
    href: '/technology/how-it-works',
    icon: <Settings className='w-6 h-6' />,
  },
  {
    title: 'Components',
    description: 'Explore the key components that make up a KPP power plant.',
    href: '/technology/components',
    icon: <Settings className='w-6 h-6' />,
  },
  {
    title: 'Performance',
    description:
      'View detailed specifications, efficiency data, and environmental impact.',
    href: '/technology/performance',
    icon: <BarChart3 className='w-6 h-6' />,
  },
];

export default async function TechnologyPage() {
  // TODO: Refactor to fetch tech sections from backend API
  const overviewSection = null; // Placeholder for now

  return (
    <div>
      <HeroSection
        title='Kinetic Power Plant Technology'
        subtitle="Discover the revolutionary Kinetic Power Plant technology that's transforming renewable energy in Iraq and beyond. Clean, continuous, and deployable anywhere."
      />

      <section
        className='section-padding bg-white'
        aria-label='Technology overview content'
      >
        <div className='container'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='mb-6'>Revolutionary Energy Generation</h2>
              <p className='text-lg text-gray-text mb-6'>
                The Kinetic Power Plant (KPP) represents a breakthrough in
                renewable energy technology. By harnessing the principles of
                kinetic energy and advanced engineering, KPP systems generate
                clean, continuous power without the limitations of traditional
                renewable sources.
              </p>
              <p className='text-gray-text mb-6'>
                Our technology operates 24/7, requires no fuel, produces zero
                emissions, and can be deployed anywhere - from urban centers to
                remote locations. This makes KPP the ideal solution for Iraq's
                energy needs and global sustainability goals.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Link
                  href='/technology/how-it-works'
                  className='bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 text-center'
                >
                  How It Works
                </Link>
                <Link
                  href='/technology/specifications'
                  className='border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors duration-200 text-center'
                >
                  Technical Specs
                </Link>
              </div>
            </div>
            <div className='relative'>
              <KPPDiagram />
            </div>
          </div>
        </div>
      </section>

      <section
        className='section-padding bg-gray-light'
        aria-label='Key advantages'
      >
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Why Choose KPP Technology?</h2>
            <p className='text-lg text-gray-text max-w-3xl mx-auto'>
              KPP technology offers unparalleled advantages over traditional
              energy sources, making it the ideal choice for sustainable power
              generation.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {technologyFeatures.map((advantage, index) => (
              <div key={index} className='text-center'>
                <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
                  <div className='text-white'>{advantage.icon}</div>
                </div>
                <h3 className='text-xl font-semibold mb-2'>
                  {advantage.title}
                </h3>
                <p className='text-gray-text'>{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className='section-padding bg-white'
        aria-label='Technology components'
      >
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>System Components</h2>
            <p className='text-lg text-gray-text max-w-3xl mx-auto'>
              KPP systems consist of carefully engineered components that work
              together to generate clean, reliable power efficiently.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {components.map((component, index) => (
              <div key={index} className='bg-gray-light p-6 rounded-lg'>
                <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4'>
                  <div className='text-white'>{component.icon}</div>
                </div>
                <h3 className='text-lg font-semibold mb-2'>{component.name}</h3>
                <p className='text-gray-text'>{component.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className='section-padding bg-primary text-white'
        aria-label='Call to action'
      >
        <div className='container text-center'>
          <h2 className='mb-4'>Ready to Explore KPP Technology?</h2>
          <p className='text-xl text-white mb-8 max-w-3xl mx-auto'>
            Dive deeper into the science, specifications, and applications of
            our revolutionary Kinetic Power Plant technology.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/technology/how-it-works'
              className='bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200'
            >
              Learn How It Works
            </Link>
            <Link
              href='/technology/specifications'
              className='border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200'
            >
              View Specifications
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
