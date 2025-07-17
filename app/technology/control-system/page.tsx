import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Brain, Settings, Zap, Shield, TrendingUp, Monitor, Layers, BarChart3, Wrench, ClipboardCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'KPP Control System - Intelligent Power Management',
  description: 'Explore the advanced control system that manages and optimizes KPP technology operations. Learn about automation, monitoring, and intelligent power management.',
  keywords: 'KPP control system, intelligent power management, automation, monitoring, renewable energy control, sustainable power management',
  openGraph: {
    title: 'KPP Control System - Intelligent Power Management',
    description: 'Explore the advanced control system that manages and optimizes KPP technology operations. Learn about automation, monitoring, and intelligent power management.',
    url: 'https://deepengineering.co/technology/control-system',
    images: [
      {
        url: '/control-system-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KPP Control System Technology',
      },
    ],
  },
  twitter: {
    title: 'KPP Control System - Intelligent Power Management',
    description: 'Explore the advanced control system that manages and optimizes KPP technology operations. Learn about automation, monitoring, and intelligent power management.',
  },
  alternates: {
    canonical: '/technology/control-system',
  },
};

const controlFeatures = [
  {
    title: 'Intelligent Automation',
    description: 'Advanced AI algorithms automatically optimize system performance and efficiency in real-time.',
    icon: <Brain className="w-8 h-8" />
  },
  {
    title: 'Real-Time Monitoring',
    description: 'Comprehensive monitoring systems track all system parameters and performance metrics.',
    icon: <Monitor className="w-8 h-8" />
  },
  {
    title: 'Predictive Maintenance',
    description: 'AI-powered analytics predict maintenance needs and prevent system downtime.',
    icon: <TrendingUp className="w-8 h-8" />
  },
  {
    title: 'Grid Integration',
    description: 'Seamless integration with power grids ensures optimal energy distribution and stability.',
    icon: <Zap className="w-8 h-8" />
  },
  {
    title: 'Safety Systems',
    description: 'Multiple safety protocols and emergency shutdown systems ensure operational safety.',
    icon: <Shield className="w-8 h-8" />
  },
  {
    title: 'Remote Control',
    description: 'Advanced remote monitoring and control capabilities for unmanned operation.',
    icon: <Settings className="w-8 h-8" />
  }
];

const technicalSpecs = [
  {
    category: 'System Architecture',
    specs: [
      { name: 'Processing Power', value: 'Multi-Core CPU', description: 'High-performance computing platform' },
      { name: 'Memory', value: '16-64 GB RAM', description: 'Expandable memory for complex operations' },
      { name: 'Storage', value: '1-10 TB SSD', description: 'High-speed data storage and logging' },
      { name: 'Network', value: 'Gigabit Ethernet', description: 'High-speed communication network' }
    ]
  },
  {
    category: 'Performance Parameters',
    specs: [
      { name: 'Response Time', value: '< 100ms', description: 'Rapid system response capability' },
      { name: 'Uptime', value: '99.9%', description: 'High system availability' },
      { name: 'Data Accuracy', value: '99.99%', description: 'Precise measurement and control' },
      { name: 'Scalability', value: 'Unlimited', description: 'Modular expansion capability' }
    ]
  },
  {
    category: 'Operational',
    specs: [
      { name: 'Operating System', value: 'Linux/Windows', description: 'Robust operating system platform' },
      { name: 'Temperature Range', value: '0°C to +50°C', description: 'Wide operating temperature' },
      { name: 'Environmental Protection', value: 'IP65', description: 'Dust and water protection' },
      { name: 'Power Consumption', value: '500W-2kW', description: 'Low power consumption' }
    ]
  }
];

const controlFunctions = [
  {
    title: 'System Optimization',
    description: 'Continuously monitors and adjusts system parameters for maximum efficiency and performance.',
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    title: 'Load Management',
    description: 'Intelligently manages power output based on demand and grid requirements.',
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: 'Fault Detection',
    description: 'Advanced diagnostic systems identify and report potential issues before they cause problems.',
    icon: <Shield className="w-6 h-6" />
  },
  {
    title: 'Data Analytics',
    description: 'Comprehensive data collection and analysis for performance optimization and reporting.',
    icon: <Brain className="w-6 h-6" />
  }
];

export default function ControlSystemPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-white font-bold text-4xl md:text-5xl">
              KPP Control System
            </h1>
            <p className="text-xl text-white font-semibold leading-relaxed">
              Intelligent power management technology that optimizes KPP operations through 
              advanced automation, real-time monitoring, and predictive analytics.
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
              <h2 className="mb-6">Intelligent Power Management</h2>
              <p className="text-lg text-gray-text mb-6">
                The KPP control system serves as the brain of our power generation technology, 
                providing intelligent automation, real-time monitoring, and predictive analytics 
                to ensure optimal performance and reliability.
              </p>
              <p className="text-gray-text mb-6">
                Our advanced control technology enables unmanned operation while maintaining 
                peak efficiency, making KPP systems truly autonomous and cost-effective 
                power generation solutions.
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
                <Brain className="w-24 h-24 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-primary mb-4">Control Overview</h3>
                <div className="space-y-4 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-text">Response Time:</span>
                    <span className="font-semibold">&lt; 100ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-text">Uptime:</span>
                    <span className="font-semibold">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-text">Data Accuracy:</span>
                    <span className="font-semibold">99.99%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-text">Scalability:</span>
                    <span className="font-semibold">Unlimited</span>
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
              The KPP control system incorporates cutting-edge technology to ensure intelligent, 
              reliable, and efficient power management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {controlFeatures.map((feature, index) => (
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

      {/* Control Functions */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Control Functions</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Comprehensive control functions that ensure optimal operation and performance 
              of the KPP power generation system.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {controlFunctions.map((function_, index) => (
              <div key={index} className="bg-gray-light p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                    <div className="text-white">{function_.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-primary">{function_.title}</h3>
                </div>
                <p className="text-gray-text">{function_.description}</p>
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
              Detailed technical specifications and performance parameters of the KPP control system.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {technicalSpecs.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg">
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
      <section className="section-padding bg-white border-t">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Detailed Engineering Data */}
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <Layers className="w-6 h-6 text-blue-600" />
              Detailed Engineering Data
            </h2>
            <div className="bg-gray-50 border rounded p-4 text-gray-700">
              <ul className="list-disc pl-6 space-y-2">
                <li>PLC-based control system coordinates compressor, valves, and generator load.</li>
                <li>Multi-core CPU, 16-64 GB RAM, 1-10 TB SSD, Gigabit Ethernet networking.</li>
                <li>Real-time data acquisition and processing for all KPP modules.</li>
                <li>Redundant power supply and fail-safe design for high reliability.</li>
                <li>Modular and scalable architecture for future expansion.</li>
              </ul>
            </div>
          </div>
          {/* Performance Benchmarks */}
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <BarChart3 className="w-6 h-6 text-orange-600" />
              Performance Benchmarks
            </h2>
            <div className="bg-gray-50 border rounded p-4 text-gray-700">
              <ul className="list-disc pl-6 space-y-2">
                <li>Response time: &lt; 100 ms for system adjustments.</li>
                <li>System uptime: 99.9% with high availability.</li>
                <li>Data accuracy: 99.99% for all monitored parameters.</li>
                <li>Unlimited scalability for large KPP installations.</li>
                <li>Comprehensive monitoring and analytics for predictive maintenance.</li>
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
            <div className="bg-gray-50 border rounded p-4 text-gray-700">
              <ul className="list-disc pl-6 space-y-2">
                <li>Software updates and security patches as per schedule.</li>
                <li>Sensor calibration and diagnostics at regular intervals.</li>
                <li>Periodic inspection of PLC hardware and network components.</li>
                <li>Redundant systems reduce maintenance-related downtime.</li>
              </ul>
            </div>
          </div>
          {/* Integration Specifications */}
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <ClipboardCheck className="w-6 h-6 text-purple-600" />
              Integration Specifications
            </h2>
            <div className="bg-gray-50 border rounded p-4 text-gray-700">
              <ul className="list-disc pl-6 space-y-2">
                <li>Integrates with all KPP modules for coordinated operation.</li>
                <li>Remote monitoring and control via secure network connection.</li>
                <li>Supports grid integration and demand response protocols.</li>
                <li>Safety interlocks and emergency shutdown for operational safety.</li>
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