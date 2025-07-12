import Link from 'next/link';
import { getTechSections } from '@/utils/sanity-data';

const technologyFeatures = [
  {
    title: 'Clean Power',
    description: 'Operates without any fuel, water, wind or solar input – generating electricity with zero emissions (no CO₂, NOx, or other pollutants).',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    title: 'Continuous Power',
    description: 'Provides stable baseload power 24/7, independent of weather conditions, with built-in redundancy ensuring near 100% uptime.',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Decentralized',
    description: 'Can be installed at the point of need – even off-grid locations – reducing transmission losses.',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: 'Scalable',
    description: 'Modular design allows capacity from a few megawatts to 100+ MW by paralleling units. Start with what you need and expand easily.',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    title: 'Small Footprint',
    description: 'Requires far less land than solar or wind: ~300 m² per MW (vs. thousands for other sources).',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    title: 'Competitive',
    description: 'Projected levelized cost ~€25/MWh – delivering affordable energy along with grid stability benefits.',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

const technologySections = [
  {
    title: 'How It Works',
    description: 'Understand the physics and engineering behind KPP technology.',
    href: '/technology/how-it-works',
    icon: '⚙️'
  },
  {
    title: 'Components',
    description: 'Explore the key components that make up a KPP power plant.',
    href: '/technology/components',
    icon: '🔧'
  },
  {
    title: 'Performance',
    description: 'View detailed specifications, efficiency data, and environmental impact.',
    href: '/technology/performance',
    icon: '📊'
  }
];

export default async function TechnologyPage() {
  // Fetch technology sections from CMS
  const techSections = await getTechSections();
  const overviewSection = techSections?.find((section: any) => section.category === 'overview');

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">KPP Technology</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              The revolutionary Kinetic Power Plant (KPP) technology delivers continuous, 
              clean energy without fuel dependency or weather constraints.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Overview */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Revolutionary Energy Technology</h2>
              {overviewSection ? (
                <div className="prose prose-lg text-gray-text">
                  {/* Render CMS content here when available */}
                  <p className="text-lg text-gray-text mb-6 leading-relaxed">
                    KPP technology represents a breakthrough in renewable energy generation. 
                    Unlike solar or wind power, KPP plants operate continuously, providing 
                    reliable baseload electricity 24 hours a day, 365 days a year.
                  </p>
                  <p className="text-lg text-gray-text mb-6 leading-relaxed">
                    Developed by Rosch Innovations in Germany, this patented technology 
                    harnesses kinetic energy through an innovative mechanical system that 
                    generates electricity without combustion, fuel consumption, or harmful emissions.
                  </p>
                  <p className="text-lg text-gray-text leading-relaxed">
                    As the exclusive KPP licensee for Iraq, Deep Engineering is bringing 
                    this world-class technology to deliver clean, continuous power where 
                    it's needed most.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-lg text-gray-text mb-6 leading-relaxed">
                    KPP technology represents a breakthrough in renewable energy generation. 
                    Unlike solar or wind power, KPP plants operate continuously, providing 
                    reliable baseload electricity 24 hours a day, 365 days a year.
                  </p>
                  <p className="text-lg text-gray-text mb-6 leading-relaxed">
                    Developed by Rosch Innovations in Germany, this patented technology 
                    harnesses kinetic energy through an innovative mechanical system that 
                    generates electricity without combustion, fuel consumption, or harmful emissions.
                  </p>
                  <p className="text-lg text-gray-text leading-relaxed">
                    As the exclusive KPP licensee for Iraq, Deep Engineering is bringing 
                    this world-class technology to deliver clean, continuous power where 
                    it's needed most.
                  </p>
                </>
              )}
            </div>
            <div className="bg-gray-light rounded-lg p-8 text-center">
              <div className="flex items-center justify-center h-32">
                <svg className="w-4 h-4 text-primary mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-lg font-semibold mt-2">KPP Power Plant</p>
              <p className="text-sm opacity-90">Continuous Clean Energy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Features Grid */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Why KPP Technology?</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              KPP technology offers unprecedented advantages over traditional and 
              renewable energy sources, making it the ideal solution for Iraq's energy needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologyFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">{feature.title}</h3>
                <p className="text-gray-text">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Sections Navigation */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Explore KPP Technology</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Dive deeper into the technology that's revolutionizing energy generation 
              in Iraq and beyond.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technologySections.map((section, index) => (
              <Link 
                key={index}
                href={section.href}
                className="block bg-gray-light p-8 rounded-lg hover:shadow-lg transition-shadow text-center"
              >
                <div className="text-[16px] mb-4">{section.icon}</div>
                <h3 className="text-xl font-semibold text-primary mb-3">{section.title}</h3>
                <p className="text-gray-text">{section.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-white">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Learn More?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Discover how KPP technology works and explore its components and performance 
            specifications in detail.
          </p>
          <Link 
            href="/technology/how-it-works"
            className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
          >
            How It Works
          </Link>
        </div>
      </section>
    </div>
  );
} 