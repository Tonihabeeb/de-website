import Link from 'next/link';

const technologyFeatures = [
  {
    title: 'Continuous Power',
    description: '24/7 baseload electricity without fuel dependency or weather constraints.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Zero Emissions',
    description: 'Clean energy generation with no CO2, NOx, or particulate emissions.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    title: 'Modular Design',
    description: 'Scalable from 25MW to 100MW+ installations with standardized components.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    title: 'Grid Integration',
    description: 'Seamless connection to existing power infrastructure with smart controls.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    )
  },
  {
    title: 'Low Maintenance',
    description: 'Minimal operational requirements with automated monitoring and control.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: 'Rapid Deployment',
    description: 'Quick installation and commissioning compared to traditional power plants.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default function TechnologyPage() {
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
            <div className="bg-gray-light rounded-lg p-8 text-center">
              <div className="w-full h-64 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-lg font-semibold">KPP Power Plant</p>
                  <p className="text-sm opacity-90">Continuous Clean Energy</p>
                </div>
              </div>
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
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-4">
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
                <div className="text-4xl mb-4">{section.icon}</div>
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