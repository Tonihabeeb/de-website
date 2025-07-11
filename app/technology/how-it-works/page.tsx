import Link from 'next/link';

const processSteps = [
  {
    step: '01',
    title: 'Kinetic Energy Input',
    description: 'The system receives kinetic energy from various sources, including wind, water flow, or mechanical motion.',
    icon: '🌪️'
  },
  {
    step: '02',
    title: 'Energy Conversion',
    description: 'Advanced mechanical systems convert kinetic energy into rotational motion with high efficiency.',
    icon: '⚙️'
  },
  {
    step: '03',
    title: 'Power Generation',
    description: 'Rotational energy drives generators to produce clean, continuous electrical power.',
    icon: '⚡'
  },
  {
    step: '04',
    title: 'Grid Integration',
    description: 'Smart control systems ensure seamless integration with existing power infrastructure.',
    icon: '🔌'
  }
];

const keyAdvantages = [
  {
    title: 'No Fuel Required',
    description: 'Operates entirely on kinetic energy, eliminating fuel costs and supply chain dependencies.',
    icon: '🚫⛽'
  },
  {
    title: 'Weather Independent',
    description: 'Unlike solar or wind, KPP technology works continuously regardless of weather conditions.',
    icon: '🌤️'
  },
  {
    title: 'Zero Emissions',
    description: 'Clean energy generation with no CO2, NOx, or particulate emissions.',
    icon: '🌱'
  },
  {
    title: 'Baseload Capability',
    description: 'Provides reliable 24/7 power generation to meet continuous energy demands.',
    icon: '📈'
  }
];

export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">How KPP Technology Works</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Discover the innovative physics and engineering behind the Kinetic Power Plant 
              technology that's revolutionizing energy generation.
            </p>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">The KPP Process</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              KPP technology harnesses kinetic energy through a sophisticated mechanical 
              system that converts motion into clean, continuous electrical power.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-primary mb-3">{step.title}</h3>
                <p className="text-gray-text">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Explanation */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">The Physics Behind KPP</h2>
              <p className="text-lg text-gray-text mb-6 leading-relaxed">
                KPP technology is based on fundamental principles of kinetic energy and 
                mechanical energy conversion. The system captures kinetic energy from 
                various sources and converts it into rotational mechanical energy.
              </p>
              <p className="text-lg text-gray-text mb-6 leading-relaxed">
                Through a series of precisely engineered mechanical components, including 
                specialized gears, flywheels, and transmission systems, the kinetic energy 
                is amplified and converted into electrical energy via high-efficiency generators.
              </p>
              <p className="text-lg text-gray-text leading-relaxed">
                The entire process is controlled by advanced SCADA systems that monitor 
                performance, optimize efficiency, and ensure safe operation around the clock.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8">
              <div className="w-full h-64 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <p className="text-lg font-semibold">Technical Diagram</p>
                  <p className="text-sm opacity-90">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Key Advantages</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              KPP technology offers significant advantages over traditional and renewable 
              energy sources, making it ideal for Iraq's energy needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {keyAdvantages.map((advantage, index) => (
              <div key={index} className="bg-gray-light p-6 rounded-lg">
                <div className="flex items-start">
                  <div className="text-3xl mr-4">{advantage.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">{advantage.title}</h3>
                    <p className="text-gray-text">{advantage.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section Placeholder */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="mb-4">See KPP in Action</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Watch our detailed video explaining how KPP technology works and see it 
              in operation at our demonstration facility.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="w-full h-64 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-semibold">KPP Technology Video</p>
                <p className="text-sm opacity-90">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-padding bg-primary text-white">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="mb-4">Explore Further</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Learn more about KPP components and performance specifications.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/technology/components"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              View Components
            </Link>
            <Link 
              href="/technology/performance"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200"
            >
              Performance Data
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 