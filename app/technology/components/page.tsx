import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KPP Components',
  description: 'Explore the key components of the Kinetic Power Plant (KPP) technology. From floaters and chains to generators and control systems - discover the engineering behind fuel-free power.',
  keywords: 'KPP components, kinetic power plant parts, fuel-free energy components, renewable energy technology parts, KPP engineering, power generation components',
  openGraph: {
    title: 'KPP Components - The Engineering Behind Fuel-Free Power',
    description: 'Explore the key components of the Kinetic Power Plant (KPP) technology. From floaters and chains to generators and control systems - discover the engineering behind fuel-free power.',
    url: 'https://deepengineering.co/technology/components',
    images: [
      {
        url: '/kpp-components-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KPP Technology Components',
      },
    ],
  },
  twitter: {
    title: 'KPP Components - The Engineering Behind Fuel-Free Power',
    description: 'Explore the key components of the Kinetic Power Plant (KPP) technology. From floaters and chains to generators and control systems - discover the engineering behind fuel-free power.',
  },
  alternates: {
    canonical: '/technology/components',
  },
};

const components = [
  {
    name: 'Air Injection Engine',
    description: 'Innovative system that injects air into underwater floaters, creating controlled buoyancy forces.',
    features: ['Precision air control', 'Buoyancy optimization', 'Energy-efficient operation'],
    icon: '💨'
  },
  {
    name: 'Floater & Chain System',
    description: 'Buoyant floaters connected to a chain mechanism that converts vertical motion into rotational energy.',
    features: ['High-efficiency conversion', 'Durable materials', 'Continuous operation'],
    icon: '⬆️'
  },
  {
    name: '500 kW Generator',
    description: 'Low-Speed Permanent Magnet Generator running at 375 RPM with ~95% efficiency.',
    features: ['Direct grid connection', 'No gearboxes required', 'High reliability'],
    icon: '⚡'
  },
  {
    name: 'Water Tank System',
    description: 'Contained water environment where floaters operate, requiring minimal water recirculation.',
    features: ['<5% water top-up needed', 'Efficient heat management', 'Environmental protection'],
    icon: '💧'
  },
  {
    name: 'SCADA Control System',
    description: 'Integrated Supervisory Control and Data Acquisition system for optimal performance.',
    features: ['Real-time monitoring', 'Automated optimization', 'Remote operation'],
    icon: '🖥️'
  },
  {
    name: 'Grid Integration Module',
    description: 'Smart systems ensuring seamless connection with existing power infrastructure.',
    features: ['Grid synchronization', 'Power quality management', 'Load balancing'],
    icon: '🔌'
  }
];

const specifications = [
  {
    category: 'Power Output',
    specs: [
      { name: 'Rated Capacity', value: '25 MW per unit' },
      { name: 'Maximum Output', value: '30 MW per unit' },
      { name: 'Voltage Output', value: '11 kV / 33 kV' },
      { name: 'Frequency', value: '50 Hz' }
    ]
  },
  {
    category: 'Efficiency',
    specs: [
      { name: 'Overall Efficiency', value: '85-90%' },
      { name: 'Generator Efficiency', value: '95%' },
      { name: 'Transmission Efficiency', value: '98%' },
      { name: 'Control System Efficiency', value: '99.9%' }
    ]
  },
  {
    category: 'Operational',
    specs: [
      { name: 'Operating Temperature', value: '-20°C to +50°C' },
      { name: 'Humidity Range', value: '10-95% RH' },
      { name: 'Altitude Range', value: '0-2000m' },
      { name: 'Maintenance Interval', value: 'Annual' }
    ]
  }
];

export default function ComponentsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">KPP Components</h1>
            <p className="text-xl text-white leading-relaxed">
              Explore the sophisticated components that make up a KPP power plant, 
              each designed for maximum efficiency and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Components Overview */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">System Components</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              A KPP power plant consists of six main component systems, each working 
              together to deliver clean, continuous energy with maximum efficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {components.map((component, index) => (
              <div key={index} className="bg-gray-light p-6 rounded-lg">
                <div className="flex items-start mb-4">
                  <div className="text-4xl mr-4" role="img" aria-label={component.name + ' icon'}>{component.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">{component.name}</h3>
                    <p className="text-gray-text mb-4">{component.description}</p>
                    <ul className="space-y-1">
                      {component.features.map((feature, fIndex) => (
                        <li key={fIndex} className="text-sm text-gray-text flex items-center">
                          <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Technical Specifications</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Detailed specifications for KPP components and system performance parameters.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specifications.map((spec, index) => (
              <div key={index} className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-4">{spec.category}</h3>
                <div className="space-y-3">
                  {spec.specs.map((item, sIndex) => (
                    <div key={sIndex} className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-gray-text">{item.name}</span>
                      <span className="font-semibold text-primary">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Component Gallery Placeholder */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="mb-4">Component Gallery</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Visual overview of KPP components and their integration within the power plant.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.slice(0, 6).map((component, index) => (
              <div key={index} className="bg-gray-light rounded-lg p-6 text-center">
                <div className="w-full h-48 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center mb-4">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2" role="img" aria-label={component.name + ' icon'}>{component.icon}</div>
                    <p className="text-sm font-semibold">{component.name}</p>
                  </div>
                </div>
                <h3 className="font-semibold text-primary mb-2">{component.name}</h3>
                <p className="text-sm text-gray-text">{component.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality & Standards */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Quality & Standards</h2>
              <p className="text-lg text-gray-text mb-6 leading-relaxed">
                All KPP components are manufactured to the highest international standards, 
                ensuring reliability, efficiency, and long-term performance in demanding 
                operational environments.
              </p>
              <p className="text-lg text-gray-text mb-6 leading-relaxed">
                Components undergo rigorous testing and quality control procedures, 
                including performance validation, environmental testing, and safety 
                certification to meet global energy industry standards.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary mb-2">ISO 9001</div>
                  <div className="text-sm text-gray-text">Quality Management</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary mb-2">IEC 61400</div>
                  <div className="text-sm text-gray-text">Safety Standards</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-8">
              <h3 className="mb-6">Certifications</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center mr-4">
                    <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-text">ISO 9001:2015 Quality Management</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center mr-4">
                    <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-text">IEC 61400 Safety Standards</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center mr-4">
                    <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-text">CE Marking Compliance</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center mr-4">
                    <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-text">Environmental Compliance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-padding bg-primary text-white">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="mb-4">Learn More</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Explore performance data and see how KPP components work together to deliver 
              clean, continuous energy.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/technology/how-it-works"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              How It Works
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