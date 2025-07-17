import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Wind, Settings, Zap, Shield, TrendingUp, Cog, Layers, BarChart3, Wrench, ClipboardCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'KPP Pneumatic System - Air Management Technology',
  description: 'Explore the advanced pneumatic system that manages air flow and pressure in KPP technology. Learn about efficiency, control, and sustainable air management.',
  keywords: 'KPP pneumatic system, air management, pressure control, renewable energy pneumatic, sustainable air technology',
  openGraph: {
    title: 'KPP Pneumatic System - Air Management Technology',
    description: 'Explore the advanced pneumatic system that manages air flow and pressure in KPP technology. Learn about efficiency, control, and sustainable air management.',
    url: 'https://deepengineering.co/technology/pneumatic-system',
    images: [
      {
        url: '/pneumatic-system-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KPP Pneumatic System Technology',
      },
    ],
  },
  twitter: {
    title: 'KPP Pneumatic System - Air Management Technology',
    description: 'Explore the advanced pneumatic system that manages air flow and pressure in KPP technology. Learn about efficiency, control, and sustainable air management.',
  },
  alternates: {
    canonical: '/technology/pneumatic-system',
  },
};

const pneumaticFeatures = [
  {
    title: 'Precision Control',
    description: 'Advanced air flow and pressure control systems ensure optimal operation of the KPP system.',
    icon: <Settings className="w-8 h-8" />
  },
  {
    title: 'High Efficiency',
    description: 'Optimized air management minimizes energy losses and maximizes system performance.',
    icon: <TrendingUp className="w-8 h-8" />
  },
  {
    title: 'Automatic Operation',
    description: 'Intelligent control systems automatically adjust air flow based on system requirements.',
    icon: <Zap className="w-8 h-8" />
  },
  {
    title: 'Reliable Performance',
    description: 'Robust design ensures consistent operation under various environmental conditions.',
    icon: <Shield className="w-8 h-8" />
  },
  {
    title: 'Modular Design',
    description: 'Scalable architecture allows for easy maintenance and system expansion.',
    icon: <Cog className="w-8 h-8" />
  },
  {
    title: 'Low Maintenance',
    description: 'Simple mechanical design with minimal moving parts ensures reliable long-term operation.',
    icon: <Wind className="w-8 h-8" />
  }
];

const technicalSpecs = [
  {
    category: 'Air Management',
    specs: [
      { name: 'Operating Pressure', value: '2-10 bar', description: 'Configurable pressure range' },
      { name: 'Air Flow Rate', value: '100-500 L/min', description: 'Variable flow control' },
      { name: 'Temperature Range', value: '-10°C to +50°C', description: 'Wide operating temperature' },
      { name: 'Humidity Tolerance', value: '0-95% RH', description: 'Non-condensing environment' }
    ]
  },
  {
    category: 'Performance Parameters',
    specs: [
      { name: 'System Efficiency', value: '85-92%', description: 'Air management efficiency' },
      { name: 'Response Time', value: '< 5 seconds', description: 'Rapid pressure adjustment' },
      { name: 'Pressure Stability', value: '±2%', description: 'Consistent pressure control' },
      { name: 'Lifespan', value: '15+ years', description: 'Extended operational life' }
    ]
  },
  {
    category: 'Operational',
    specs: [
      { name: 'Maintenance Interval', value: '12 months', description: 'Annual maintenance schedule' },
      { name: 'Power Consumption', value: '5-20 kW', description: 'Low power requirements' },
      { name: 'Environmental Protection', value: 'IP54', description: 'Dust and water protection' },
      { name: 'Noise Level', value: '< 60 dB', description: 'Quiet operation' }
    ]
  }
];

export default function PneumaticSystemPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-white font-bold text-4xl md:text-5xl">
              KPP Pneumatic System
            </h1>
            <p className="text-xl text-white font-semibold leading-relaxed">
              Advanced air management technology that ensures optimal operation of KPP systems 
              through precise pressure control and efficient air flow management.
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
              <h2 className="mb-6">Precision Air Management</h2>
              <p className="text-lg text-gray-text mb-6">
                The KPP pneumatic system plays a crucial role in maintaining optimal operating 
                conditions throughout the power generation process, ensuring efficient energy 
                conversion and system reliability.
              </p>
              <p className="text-gray-text mb-6">
                Our advanced air management technology provides precise control over pressure 
                and flow rates, enabling the KPP system to operate at peak efficiency while 
                maintaining safety and reliability standards.
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
                <Wind className="w-24 h-24 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-primary mb-4">Pneumatic Overview</h3>
                <div className="space-y-4 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-text">Operating Pressure:</span>
                    <span className="font-semibold">2-10 bar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-text">Efficiency:</span>
                    <span className="font-semibold">85-92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-text">Response Time:</span>
                    <span className="font-semibold">&lt; 5 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-text">Lifespan:</span>
                    <span className="font-semibold">15+ years</span>
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
              The KPP pneumatic system incorporates advanced technology to ensure reliable, 
              efficient, and precise air management throughout the power generation process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pneumaticFeatures.map((feature, index) => (
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
              Detailed technical specifications and performance parameters of the KPP pneumatic system.
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
                <li>Oil-lubricated piston-type air compressor with high-efficiency IE3 electric motor.</li>
                <li>Working pressure: 10 bar (adjustable); Max air flow: 1.2–1.5 m³/min.</li>
                <li>Receiver tank: 300 L horizontal steel air tank; floor-mounted on anti-vibration feet.</li>
                <li>Auto start/stop with pressure switch; direct-on-line (DOL) startup.</li>
                <li>Thermal cutout and pressure relief valve for safety.</li>
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
                <li>Power input: 3.5–5.5 kW (depending on mode); 400 V / 50 Hz.</li>
                <li>Max air flow: 1.2–1.5 m³/min; working pressure: 10 bar.</li>
                <li>Cycle mode: auto start/stop with pressure switch.</li>
                <li>Consumes ~1% of net KPP power output.</li>
                <li>Rapid response and stable pressure for continuous KPP operation.</li>
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
                <li>Automatic pressure relief on overpressure; moisture drain valve on receiver.</li>
                <li>Periodic service: oil change, filter replacement, and inspection for leaks.</li>
                <li>Annual maintenance schedule recommended for optimal performance.</li>
                <li>Low maintenance due to robust design and quality components.</li>
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
                <li>Supplies compressed air to KPP modules for buoyancy control.</li>
                <li>Located next to each module for efficient pipe routing.</li>
                <li>Auto start/stop and pressure regulation integrated with PLC-based control system.</li>
                <li>Consumes only a small portion of net KPP power output (~1%).</li>
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