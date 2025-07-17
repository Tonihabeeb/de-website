import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Link as LinkIcon, Settings, Zap, Shield, TrendingUp, Cog, Layers, BarChart3, Wrench, ClipboardCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'KPP Conveyor Chain - Kinetic Energy Transfer System',
  description: 'Explore the innovative conveyor chain technology that transfers kinetic energy in KPP systems. Learn about design, efficiency, and reliable energy transmission.',
  keywords: 'KPP conveyor chain, kinetic energy transfer, energy transmission system, renewable energy chain, sustainable power transmission',
  openGraph: {
    title: 'KPP Conveyor Chain - Kinetic Energy Transfer System',
    description: 'Explore the innovative conveyor chain technology that transfers kinetic energy in KPP systems. Learn about design, efficiency, and reliable energy transmission.',
    url: 'https://deepengineering.co/technology/conveyor-chain',
    images: [
      {
        url: '/conveyor-chain-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KPP Conveyor Chain Technology',
      },
    ],
  },
  twitter: {
    title: 'KPP Conveyor Chain - Kinetic Energy Transfer System',
    description: 'Explore the innovative conveyor chain technology that transfers kinetic energy in KPP systems. Learn about design, efficiency, and reliable energy transmission.',
  },
  alternates: {
    canonical: '/technology/conveyor-chain',
  },
};

const chainFeatures = [
  {
    title: 'High Strength',
    description: 'Advanced materials and engineering ensure maximum load capacity and durability under continuous operation.',
    icon: <Shield className="w-8 h-8" />
  },
  {
    title: 'Low Friction',
    description: 'Precision-engineered components minimize energy losses during kinetic energy transmission.',
    icon: <TrendingUp className="w-8 h-8" />
  },
  {
    title: 'Continuous Operation',
    description: '24/7 operation capability with automatic tensioning and alignment systems.',
    icon: <Zap className="w-8 h-8" />
  },
  {
    title: 'Modular Design',
    description: 'Scalable architecture allows for easy maintenance and capacity expansion.',
    icon: <Settings className="w-8 h-8" />
  },
  {
    title: 'Precision Control',
    description: 'Advanced control systems ensure optimal speed and tension for maximum efficiency.',
    icon: <Cog className="w-8 h-8" />
  },
  {
    title: 'Long Lifespan',
    description: 'Corrosion-resistant materials and protective coatings ensure extended operational life.',
    icon: <LinkIcon className="w-8 h-8" />
  }
];

const technicalSpecs = [
  {
    category: 'Physical Specifications',
    specs: [
      { name: 'Material', value: 'High-Grade Steel', description: 'Corrosion-resistant, high-strength alloy' },
      { name: 'Chain Pitch', value: '50-100 mm', description: 'Configurable based on power requirements' },
      { name: 'Breaking Load', value: '500-2000 kN', description: 'High safety factor for reliability' },
      { name: 'Weight', value: '10-50 kg/m', description: 'Optimized for strength-to-weight ratio' }
    ]
  },
  {
    category: 'Performance Parameters',
    specs: [
      { name: 'Transmission Efficiency', value: '92-96%', description: 'Kinetic energy transfer efficiency' },
      { name: 'Operating Speed', value: '0.5-2.0 m/s', description: 'Variable speed control capability' },
      { name: 'Tension Force', value: '100-500 kN', description: 'Automatic tensioning system' },
      { name: 'Lifespan', value: '20+ years', description: 'Extended operational life expectancy' }
    ]
  },
  {
    category: 'Operational',
    specs: [
      { name: 'Maintenance Interval', value: '6-12 months', description: 'Minimal maintenance requirements' },
      { name: 'Temperature Range', value: '-20°C to +60°C', description: 'Wide operating temperature range' },
      { name: 'Environmental Protection', value: 'IP65', description: 'Dust and water protection' },
      { name: 'Noise Level', value: '< 45 dB', description: 'Quiet operation for various environments' }
    ]
  }
];

export default function ConveyorChainPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-white font-bold text-4xl md:text-5xl">
              KPP Conveyor Chain Technology
            </h1>
            <p className="text-xl text-white font-semibold leading-relaxed">
              Advanced kinetic energy transfer system that efficiently transmits power 
              from buoyancy forces to electrical generation with minimal energy losses.
            </p>
          </div>
        </div>
      </section>

      <div className="container"><Breadcrumbs /></div>

      {/* Overview Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Efficient Energy Transmission</h2>
              <p className="text-lg text-gray-text mb-6">
                The KPP conveyor chain serves as the critical link between buoyancy forces 
                and electrical generation, efficiently transferring kinetic energy with 
                minimal losses through innovative engineering and precision manufacturing.
              </p>
              <p className="text-gray-text mb-6">
                Our chain system is designed to handle the continuous motion requirements 
                of KPP technology while maintaining optimal efficiency and reliability 
                throughout its extended operational life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/technology/how-it-works"
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 text-center"
                >
                  Learn How It Works
                </Link>
                <Link 
                  href="/technology/components"
                  className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors duration-200 text-center"
                >
                  View All Components
                </Link>
              </div>
            </div>
            <div className="bg-gray-light p-8 rounded-lg">
              <div className="text-center">
                <LinkIcon className="w-24 h-24 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-primary mb-4">Chain Overview</h3>
                <div className="space-y-4 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-text">Breaking Load:</span>
                    <span className="font-semibold">500-2000 kN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-text">Efficiency:</span>
                    <span className="font-semibold">92-96%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-text">Operating Speed:</span>
                    <span className="font-semibold">0.5-2.0 m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-text">Lifespan:</span>
                    <span className="font-semibold">20+ years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Key Features & Capabilities</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              The KPP conveyor chain incorporates advanced engineering to ensure reliable, 
              efficient, and long-lasting kinetic energy transmission.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chainFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">{feature.title}</h3>
                <p className="text-gray-text">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Technical Specifications</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Detailed technical specifications and performance parameters of the KPP conveyor chain system.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {technicalSpecs.map((category, index) => (
              <div key={index} className="bg-gray-light p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-6">{category.category}</h3>
                <div className="space-y-4">
                  {category.specs.map((spec, sIndex) => (
                    <div key={sIndex} className="border-b border-gray-300 pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-text">{spec.name}</span>
                        <span className="font-bold text-primary text-lg">{spec.value}</span>
                      </div>
                      <p className="text-sm text-gray-text">{spec.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Enhancement Sections --- */}
      <section className="section-padding bg-gray-light border-t">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Detailed Engineering Data */}
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <Layers className="w-6 h-6 text-blue-600" />
              Detailed Engineering Data
            </h2>
            <div className="bg-white border rounded p-4 text-gray-700">
              <ul className="list-disc pl-6 space-y-2">
                <li>Two parallel high-grade steel chains run over upper and lower sprocket wheels (idler gears).</li>
                <li>Chains are engineered for high load capacity and minimal stretch.</li>
                <li>Transfers the combined force of buoyant and heavy floaters in a continuous loop.</li>
                <li>Optimized for strength-to-weight ratio and corrosion resistance.</li>
                <li>Modular design allows for easy replacement and maintenance.</li>
              </ul>
            </div>
          </div>
          {/* Performance Benchmarks */}
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <BarChart3 className="w-6 h-6 text-orange-600" />
              Performance Benchmarks
            </h2>
            <div className="bg-white border rounded p-4 text-gray-700">
              <ul className="list-disc pl-6 space-y-2">
                <li>Load capacity: 500–2000 kN breaking load.</li>
                <li>Transmission efficiency: 92–96% kinetic energy transfer.</li>
                <li>Operating speed: 0.5–2.0 m/s, variable by design.</li>
                <li>Durability for 20+ years of continuous operation.</li>
                <li>Minimal wear due to robust construction and water lubrication.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {/* Maintenance Requirements */}
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <Wrench className="w-6 h-6 text-green-600" />
              Maintenance Requirements
            </h2>
            <div className="bg-white border rounded p-4 text-gray-700">
              <ul className="list-disc pl-6 space-y-2">
                <li>Routine lubrication and tension adjustment of chains.</li>
                <li>Periodic inspection for wear, corrosion, or misalignment.</li>
                <li>Replacement of chain segments as needed (modular design).</li>
                <li>Minimal maintenance required due to robust materials and design.</li>
              </ul>
            </div>
          </div>
          {/* Integration Specifications */}
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <ClipboardCheck className="w-6 h-6 text-purple-600" />
              Integration Specifications
            </h2>
            <div className="bg-white border rounded p-4 text-gray-700">
              <ul className="list-disc pl-6 space-y-2">
                <li>Compatible with various shaft heights and KPP module sizes.</li>
                <li>Designed for seamless integration with floaters and drive shaft.</li>
                <li>Modular and easily replaceable for rapid maintenance.</li>
                <li>Synchronized with PLC-based control system for optimal performance.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container mt-8 text-sm text-gray-500">
          <span>Source: <a href="https://kinetic-power-plant-kpp--kqhcbor.gamma.site/" target="_blank" rel="noopener noreferrer" className="underline">KPP Technical Overview presentation</a></span>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Learn More?</h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Explore other KPP components and understand how they work together to create 
            a complete renewable energy solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/technology/components"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              View All Components
            </Link>
            <Link 
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 