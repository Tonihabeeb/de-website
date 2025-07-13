import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KPP Technical Specifications - Deep Engineering',
  description: 'Detailed technical specifications for KPP technology including generator specs, air compressor details, water consumption data, and performance metrics.',
  keywords: 'KPP specifications, generator specs, air compressor, water consumption, performance metrics, technical data',
};

const technicalSpecs = [
  {
    category: 'Generator Specifications',
    specs: [
      { name: 'Power Output', value: '500 kW', description: 'Rated electrical power output' },
      { name: 'Rotor Speed', value: '375 RPM', description: 'Operating rotational speed' },
      { name: 'Efficiency', value: '95.2%', description: 'Electrical conversion efficiency' },
      { name: 'Voltage', value: '400V/690V', description: 'Output voltage options' },
      { name: 'Frequency', value: '50 Hz', description: 'Grid frequency compatibility' },
      { name: 'Power Factor', value: '0.95', description: 'Electrical power factor' }
    ]
  },
  {
    category: 'Air Compressor System',
    specs: [
      { name: 'Operating Pressure', value: '10 bar', description: 'Maximum working pressure' },
      { name: 'Air Flow Rate', value: '1.2-1.5 m³/min', description: 'Compressed air delivery' },
      { name: 'Motor Power', value: '75 kW', description: 'Compressor motor rating' },
      { name: 'Cooling System', value: 'Water-cooled', description: 'Heat dissipation method' },
      { name: 'Control System', value: 'PLC-based', description: 'Automated operation control' }
    ]
  },
  {
    category: 'Water System',
    specs: [
      { name: 'Initial Fill', value: '30 m³', description: 'Tank initial water volume' },
      { name: 'Annual Loss', value: '<5%', description: 'Water evaporation/loss rate' },
      { name: 'Water Quality', value: 'Standard', description: 'No special treatment required' },
      { name: 'Make-up Water', value: 'Minimal', description: 'Low maintenance requirements' }
    ]
  },
  {
    category: 'Physical Dimensions',
    specs: [
      { name: 'Tank Diameter', value: '800 mm', description: 'Main tank outer diameter' },
      { name: 'System Height', value: '4.2 m', description: 'Total installation height' },
      { name: 'Footprint', value: '2.5 x 2.5 m', description: 'Base area requirement' },
      { name: 'Total Weight', value: '4,700 kg', description: 'Complete system weight' }
    ]
  },
  {
    category: 'Performance & Environmental',
    specs: [
      { name: 'Operating Temperature', value: '90-130°C', description: 'System temperature range' },
      { name: 'Protection Class', value: 'IP54', description: 'Environmental protection rating' },
      { name: 'Noise Level', value: '<65 dB', description: 'Operating noise at 1m distance' },
      { name: 'Emissions', value: 'Zero', description: 'No harmful emissions' },
      { name: 'Maintenance', value: 'Low', description: 'Minimal maintenance requirements' }
    ]
  }
];

const performanceData = [
  { parameter: 'Start-up Time', value: '<30 seconds', unit: '' },
  { parameter: 'Ramp-up Rate', value: '100%', unit: 'in 2 minutes' },
  { parameter: 'Load Response', value: '<5 seconds', unit: '' },
  { parameter: 'Grid Synchronization', value: 'Automatic', unit: '' },
  { parameter: 'Black Start Capability', value: 'Yes', unit: '' },
  { parameter: 'Frequency Regulation', value: '±0.1 Hz', unit: '' },
  { parameter: 'Voltage Regulation', value: '±2%', unit: '' },
  { parameter: 'Power Factor Control', value: '0.95 lag to 0.95 lead', unit: '' }
];

export default function TechnicalSpecificationsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-white drop-shadow-md">KPP Technical Specifications</h1>
            <p className="text-xl text-white leading-relaxed">
              Comprehensive technical data and performance specifications for the Kinetic Power Plant (KPP) 
              technology, providing detailed insights into system capabilities and operational parameters.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">System Specifications</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Detailed technical specifications for all major KPP components, including generator, 
              air compressor, water system, and performance metrics.
            </p>
          </div>

          <div className="space-y-8">
            {technicalSpecs.map((category, index) => (
              <div key={index} className="bg-gray-light rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary mb-4">{category.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.specs.map((spec, specIndex) => (
                    <div key={specIndex} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-gray-600">{spec.name}</span>
                        <span className="text-lg font-bold text-primary">{spec.value}</span>
                      </div>
                      <p className="text-xs text-gray-500">{spec.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Data */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Performance Characteristics</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Key performance parameters that demonstrate KPP technology's operational excellence 
              and grid integration capabilities.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-primary text-white p-6">
                <h3 className="text-xl font-semibold">Operational Performance Metrics</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {performanceData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-700">{item.parameter}</span>
                      <div className="text-right">
                        <span className="text-lg font-bold text-primary">{item.value}</span>
                        {item.unit && <span className="text-sm text-gray-500 ml-1">{item.unit}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Diagram */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">System Architecture</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Visual representation of KPP system components and their interconnections, 
              showing the complete power generation process.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-light rounded-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Air Injection System */}
                <div className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Air Injection</h3>
                    <p className="text-sm text-gray-600">Compressed air system provides buoyancy force</p>
                  </div>
                </div>

                {/* Energy Conversion */}
                <div className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Energy Conversion</h3>
                    <p className="text-sm text-gray-600">Kinetic energy converted to electrical power</p>
                  </div>
                </div>

                {/* Power Output */}
                <div className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Power Output</h3>
                    <p className="text-sm text-gray-600">Clean electricity delivered to the grid</p>
                  </div>
                </div>
              </div>

              {/* Connection arrows */}
              <div className="hidden lg:block">
                <div className="flex justify-center items-center space-x-8 mt-8">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Technical Documentation</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Download comprehensive technical documentation, datasheets, and specifications 
              for detailed engineering analysis and project planning.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Technical Datasheet</h3>
                    <p className="text-sm text-gray-600">Complete KPP specifications and performance data</p>
                  </div>
                </div>
                <button className="w-full mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">
                  Download PDF
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Installation Manual</h3>
                    <p className="text-sm text-gray-600">Step-by-step installation and commissioning guide</p>
                  </div>
                </div>
                <button className="w-full mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-white">
        <div className="container text-center">
          <h2 className="mb-4">Need More Technical Information?</h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Our engineering team is available to provide detailed technical support, 
            custom specifications, and project-specific solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Contact Engineering Team
            </Link>
            <Link 
              href="/technology"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200"
            >
              Back to Technology
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 