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
  ArrowRight,
  CheckCircle,
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
    icon: <Heart className='w-8 h-8 text-white' />,
    color: 'from-primary to-primary-dark',
  },
  {
    title: 'Continuous Power',
    description:
      'Provides stable baseload power 24/7, independent of weather conditions, with built-in redundancy ensuring near 100% uptime.',
    icon: <Clock className='w-8 h-8 text-white' />,
    color: 'from-primary to-primary-dark',
  },
  {
    title: 'Decentralized',
    description:
      'Can be installed at the point of need – even off-grid locations – reducing transmission losses.',
    icon: <MapPin className='w-8 h-8 text-white' />,
    color: 'from-primary to-primary-dark',
  },
  {
    title: 'Scalable',
    description:
      'Modular design allows capacity from a few megawatts to 100+ MW by paralleling units. Start with what you need and expand easily.',
    icon: <Building2 className='w-8 h-8 text-white' />,
    color: 'from-primary to-primary-dark',
  },
  {
    title: 'Small Footprint',
    description:
      'Requires far less land than solar or wind: ~300 m² per MW (vs. thousands for other sources).',
    icon: <Home className='w-8 h-8 text-white' />,
    color: 'from-primary to-primary-dark',
  },
  {
    title: 'Competitive',
    description:
      'Projected levelized cost ~€25/MWh – delivering affordable energy along with grid stability benefits.',
    icon: <Zap className='w-8 h-8 text-white' />,
    color: 'from-primary to-primary-dark',
  },
];

const components = [
  {
    name: 'Kinetic Module',
    icon: <Zap className='w-6 h-6 text-white' />,
    description: 'The core unit that converts kinetic energy into electricity.',
    gradient: 'from-primary to-primary-dark',
  },
  {
    name: 'Control System',
    icon: <Brain className='w-6 h-6 text-white' />,
    description:
      'Advanced electronics for monitoring and optimizing performance.',
    gradient: 'from-primary to-primary-dark',
  },
  {
    name: 'Power Electronics',
    icon: <Plug className='w-6 h-6 text-white' />,
    description: 'Inverters and converters to deliver grid-ready power.',
    gradient: 'from-primary to-primary-dark',
  },
];

const technologySections = [
  {
    title: 'How It Works',
    description:
      'Understand the physics and engineering behind KPP technology.',
    href: '/technology/how-it-works',
    icon: <Settings className='w-6 h-6 text-white' />,
  },
  {
    title: 'Components',
    description: 'Explore the key components that make up a KPP power plant.',
    href: '/technology/components',
    icon: <Settings className='w-6 h-6 text-white' />,
  },
  {
    title: 'Performance',
    description:
      'View detailed specifications, efficiency data, and environmental impact.',
    href: '/technology/performance',
    icon: <BarChart3 className='w-6 h-6 text-white' />,
  },
];

export default async function TechnologyPage() {
  // TODO: Refactor to fetch tech sections from backend API
  const overviewSection = null; // Placeholder for now

  return (
    <div className='relative'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50 -z-10' />
      
      <HeroSection
        title='Kinetic Power Plant Technology'
        subtitle="Discover the revolutionary Kinetic Power Plant that's transforming renewable energy in Iraq and beyond. Clean, continuous, and deployable anywhere."
      />



      <section
        className='section-padding bg-white'
        aria-label='Technology overview content'
      >
        <div className='container'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
            <div className='space-y-8'>
              <div className='inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4'>
                <CheckCircle className='w-4 h-4 mr-2' />
                Revolutionary Technology
              </div>
              <h2 className='text-4xl font-bold text-primary leading-tight'>
                Revolutionary Energy Generation
              </h2>
              <div className='space-y-6 text-lg text-gray-text leading-relaxed'>
                <p>
                  The Kinetic Power Plant (KPP) represents a breakthrough in
                  renewable energy technology. By harnessing the principles of
                  kinetic energy and advanced engineering, KPP systems generate
                  clean, continuous power without the limitations of traditional
                  renewable sources.
                </p>
                <p>
                  Our technology operates 24/7, requires no fuel, produces zero
                  emissions, and can be deployed anywhere - from urban centers to
                  remote locations. This makes KPP the ideal solution for Iraq's
                  energy needs and global sustainability goals.
                </p>
              </div>
              <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                <Link
                  href='/technology/how-it-works'
                  className='group bg-gradient-to-r from-primary to-primary-light text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary hover:text-white transition-all duration-200 text-center flex items-center justify-center'
                >
                  How It Works
                  <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
                </Link>
                <Link
                  href='/technology/specifications'
                  className='border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200 text-center'
                >
                  Technical Specs
                </Link>
              </div>
            </div>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-light/20 rounded-3xl blur-3xl'></div>
              <div className='relative bg-white rounded-3xl shadow-2xl p-8'>
                <KPPDiagram />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className='section-padding bg-gradient-to-br from-gray-50 to-white'
        aria-label='Key advantages'
      >
        <div className='container'>
          <div className='text-center mb-16'>
            <div className='inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6'>
              <Zap className='w-4 h-4 mr-2' />
              Key Advantages
            </div>
            <h2 className='text-4xl font-bold text-primary mb-6'>
              Why Choose KPP Technology?
            </h2>
            <p className='text-xl text-gray-text max-w-4xl mx-auto leading-relaxed'>
              KPP technology offers unparalleled advantages over traditional
              energy sources, making it the ideal choice for sustainable power
              generation.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {technologyFeatures.map((advantage, index) => (
              <div key={index} className='group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100'>
                <div className={`w-16 h-16 bg-gradient-to-r ${advantage.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {advantage.icon}
                </div>
                <h3 className='text-xl font-bold text-primary mb-4 text-center'>
                  {advantage.title}
                </h3>
                <p className='text-gray-text text-center leading-relaxed'>
                  {advantage.description}
                </p>
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
          <div className='text-center mb-16'>
            <div className='inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6'>
              <Settings className='w-4 h-4 mr-2' />
              System Architecture
            </div>
            <h2 className='text-4xl font-bold text-primary mb-6'>
              System Components
            </h2>
            <p className='text-xl text-gray-text max-w-4xl mx-auto leading-relaxed'>
              KPP systems consist of carefully engineered components that work
              together to generate clean, reliable power efficiently.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {components.map((component, index) => (
              <div key={index} className='group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300'>
                <div className={`w-14 h-14 bg-gradient-to-r ${component.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {component.icon}
                </div>
                <h3 className='text-xl font-bold text-primary mb-4'>{component.name}</h3>
                <p className='text-gray-text leading-relaxed'>{component.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className='section-padding bg-gradient-to-r from-primary via-primary-dark to-primary text-white relative overflow-hidden'
        aria-label='Call to action'
      >
        {/* Background Pattern */}
        <div className='absolute inset-0 bg-gradient-to-r from-primary/90 via-primary-dark/90 to-primary/90' />
        <div className='absolute inset-0 opacity-20' style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        
        <div className='container text-center relative z-10'>
          <div className='inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6'>
            <Zap className='w-4 h-4 mr-2' />
            Ready to Explore
          </div>
          <h2 className='text-4xl font-bold mb-6 text-white'>
            Ready to Explore KPP Technology?
          </h2>
          <p className='text-xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed'>
            Dive deeper into the science, specifications, and applications of
            our revolutionary Kinetic Power Plant technology.
          </p>
          <div className='flex flex-col sm:flex-row gap-6 justify-center'>
            <Link
              href='/technology/how-it-works'
              className='group bg-white text-primary px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center'
            >
              Learn How It Works
              <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
            </Link>
            <Link
              href='/technology/specifications'
              className='border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white hover:text-primary transition-all duration-300'
            >
              View Specifications
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
