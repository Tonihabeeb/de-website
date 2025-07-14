import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KPP Performance & Specifications',
  description: 'Explore the performance metrics and technical specifications of the Kinetic Power Plant (KPP) technology. Discover efficiency, capacity, environmental impact, and operational data.',
  keywords: 'KPP performance, kinetic power plant specifications, fuel-free energy efficiency, renewable energy metrics, KPP technical data, power generation performance',
  openGraph: {
    title: 'KPP Performance & Specifications - Technical Excellence in Renewable Energy',
    description: 'Explore the performance metrics and technical specifications of the Kinetic Power Plant (KPP) technology. Discover efficiency, capacity, environmental impact, and operational data.',
    url: 'https://deepengineering.co/technology/performance',
    images: [
      {
        url: '/kpp-performance-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KPP Performance and Specifications',
      },
    ],
  },
  twitter: {
    title: 'KPP Performance & Specifications - Technical Excellence in Renewable Energy',
    description: 'Explore the performance metrics and technical specifications of the Kinetic Power Plant (KPP) technology. Discover efficiency, capacity, environmental impact, and operational data.',
  },
  alternates: {
    canonical: '/technology/performance',
  },
};

const performanceMetrics = [
  {
    category: 'Power Generation',
    metrics: [
      { name: 'Output Options', value: '1 MW & 5 MW', description: 'Module options available' },
      { name: 'Availability', value: '100%', description: 'Continuous operation capability' },
      { name: 'Load Profiles', value: 'Baseload', description: 'Stable power generation' },
      { name: 'Capacity Factor', value: '95%', description: 'Actual vs. theoretical maximum output' }
    ]
  },
  {
    category: 'Efficiency',
    metrics: [
      { name: 'Overall Efficiency', value: '85-90%', description: 'Total system efficiency' },
      { name: 'Generator Efficiency', value: '95%', description: '500 kW generator at 375 RPM' },
      { name: 'Transmission Efficiency', value: '98%', description: 'Mechanical transmission efficiency' },
      { name: 'Control System', value: '99.9%', description: 'SCADA system reliability' }
    ]
  },
  {
    category: 'Environmental',
    metrics: [
      { name: 'CO2 Emissions', value: '0 g/kWh', description: 'Zero carbon emissions' },
      { name: 'NOx Emissions', value: '0 mg/kWh', description: 'Zero nitrogen oxide emissions' },
      { name: 'Water Usage', value: '<5% recirculation', description: 'Minimal water needs, periodic top-up' },
      { name: 'Land Footprint', value: '~300 m²/MW', description: 'Compact design vs. thousands for other sources' }
    ]
  }
];

const comparisonData = [
  {
    technology: 'KPP',
    capacity: '1-5 MW',
    efficiency: '85-90%',
    emissions: 'Zero',
    availability: '100%',
    fuel: 'None',
    cost: '~€25/MWh'
  },
  {
    technology: 'Solar PV',
    capacity: '1-5 MW',
    efficiency: '15-20%',
    emissions: 'Zero',
    availability: '25%',
    fuel: 'None',
    cost: '€40-60/MWh'
  },
  {
    technology: 'Wind',
    capacity: '1-5 MW',
    efficiency: '30-40%',
    emissions: 'Zero',
    availability: '35%',
    fuel: 'None',
    cost: '€35-55/MWh'
  },
  {
    technology: 'Gas Turbine',
    capacity: '1-5 MW',
    efficiency: '35-45%',
    emissions: 'High',
    availability: '85%',
    fuel: 'Natural Gas',
    cost: '€60-80/MWh'
  }
];

const environmentalBenefits = [
  {
    title: 'Zero Emissions',
    description: 'KPP technology produces no CO2, NOx, or particulate emissions during operation.',
    impact: 'Eliminates air pollution and contributes to climate change mitigation.',
    icon: '🌱'
  },
  {
    title: 'No Fuel Consumption',
    description: 'Operates entirely on kinetic energy, eliminating fuel extraction and transportation.',
    impact: 'Reduces environmental damage from fuel production and logistics.',
    icon: '🚫⛽'
  },
  {
    title: 'Minimal Land Use',
    description: 'Compact design requires significantly less land than traditional power plants.',
    impact: 'Preserves natural habitats and reduces land use conflicts.',
    icon: '🏞️'
  },
  {
    title: 'No Water Usage',
    description: 'Unlike thermal power plants, KPP technology doesn\'t require water for cooling.',
    impact: 'Conserves water resources and eliminates thermal pollution.',
    icon: '💧'
  }
];

export default function PerformancePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">Performance & Specifications</h1>
            <p className="text-xl text-white leading-relaxed">
              Detailed performance data, efficiency metrics, and environmental impact 
              analysis of KPP technology.
            </p>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Performance Metrics</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Comprehensive performance data demonstrating KPP technology's efficiency, 
              reliability, and environmental benefits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {performanceMetrics.map((category, index) => (
              <div key={index} className="bg-gray-light p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-6">{category.category}</h3>
                <div className="space-y-4">
                  {category.metrics.map((metric, mIndex) => (
                    <div key={mIndex} className="border-b border-gray-300 pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-text">{metric.name}</span>
                        <span className="font-bold text-primary text-lg">{metric.value}</span>
                      </div>
                      <p className="text-base text-gray-text">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Comparison */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Technology Comparison</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              How KPP technology compares to other power generation technologies 
              in terms of efficiency, reliability, and environmental impact.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-6 py-4 text-left">Technology</th>
                  <th className="px-6 py-4 text-center">Capacity</th>
                  <th className="px-6 py-4 text-center">Efficiency</th>
                  <th className="px-6 py-4 text-center">Emissions</th>
                  <th className="px-6 py-4 text-center">Availability</th>
                  <th className="px-6 py-4 text-center">Fuel</th>
                  <th className="px-6 py-4 text-center">Levelized Cost</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((tech, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-semibold text-primary">{tech.technology}</td>
                    <td className="px-6 py-4 text-center">{tech.capacity}</td>
                    <td className="px-6 py-4 text-center">{tech.efficiency}</td>
                    <td className="px-6 py-4 text-center">{tech.emissions}</td>
                    <td className="px-6 py-4 text-center">{tech.availability}</td>
                    <td className="px-6 py-4 text-center">{tech.fuel}</td>
                    <td className="px-6 py-4 text-center font-semibold">{tech.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Environmental Benefits */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Environmental Benefits</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              KPP technology delivers significant environmental advantages over 
              traditional power generation methods.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {environmentalBenefits.map((benefit, index) => (
              <div key={index} className="bg-gray-light p-6 rounded-lg">
                <div className="flex items-start">
                  <div className="text-4xl mr-4">{benefit.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-3">{benefit.title}</h3>
                    <p className="text-gray-text mb-3">{benefit.description}</p>
                    <p className="text-base text-accent-warm font-medium">{benefit.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Economic Benefits */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Economic Advantages</h2>
              <p className="text-lg text-gray-text mb-6 leading-relaxed">
                KPP technology offers significant economic benefits through reduced 
                operational costs, minimal maintenance requirements, and elimination 
                of fuel expenses.
              </p>
              <p className="text-lg text-gray-text mb-6 leading-relaxed">
                The modular design allows for scalable deployment, while the high 
                availability factor ensures consistent revenue generation and grid 
                stability.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary mb-2">0%</div>
                  <div className="text-base text-gray-text">Fuel Costs</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary mb-2">98%</div>
                  <div className="text-base text-gray-text">Availability</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-8">
              <h3 className="mb-6">Cost Benefits</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-text">Fuel Costs</span>
                  <span className="font-semibold text-green-600">Eliminated</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-text">Maintenance</span>
                  <span className="font-semibold text-green-600">Minimal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-text">Carbon Credits</span>
                  <span className="font-semibold text-green-600">Available</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-text">Grid Stability</span>
                  <span className="font-semibold text-green-600">Enhanced</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Placeholder */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="mb-4">Performance Analytics</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Interactive charts and analytics showing KPP performance data over time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-light rounded-lg p-8 text-center">
              <div className="w-full h-64 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <svg className="w-4 h-4 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-lg font-semibold">Efficiency Trends</p>
                  <p className="text-base opacity-90">Coming Soon</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-light rounded-lg p-8 text-center">
              <div className="w-full h-64 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <svg className="w-4 h-4 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <p className="text-lg font-semibold">Power Output</p>
                  <p className="text-base opacity-90">Coming Soon</p>
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
            <h2 className="mb-4">Explore Technology</h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Learn more about how KPP technology works and explore its components.
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
              href="/technology/components"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200"
            >
              View Components
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 