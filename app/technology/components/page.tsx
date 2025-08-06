import { Metadata } from 'next';
import {
  Zap,
  RotateCcw,
  Battery,
  Settings,
  Wrench,
  Gauge,
  Shield,
  Leaf,
  Lightbulb,
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Components | Deep Engineering',
  description:
    "Explore the key components of Deep Engineering's Kinetic Power Plant (KPP) technology - the building blocks of sustainable energy generation.",
  keywords:
    'components, KPP, kinetic power plant, energy components, Deep Engineering, sustainable energy, technology',
};

export default function ComponentsPage() {
  return (
    <div className='min-h-screen'>
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary-dark to-primary text-white text-white">
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl font-bold mb-6 text-white'>
              KPP Components
            </h1>
            <p className='text-xl md:text-2xl mb-4 text-white font-semibold'>
              The building blocks of sustainable energy generation
            </p>
            <p className='text-lg text-white mb-8'>
              Explore the key components that make up our revolutionary Kinetic
              Power Plant (KPP) technology, each designed for maximum efficiency
              and reliability.
            </p>
            <Link
              href='/technology/components/full'
              className='inline-block mt-4 px-6 py-3 bg-white text-primary font-semibold rounded-lg shadow hover:bg-primary hover:text-white transition-colors duration-200'
            >
              View Full Components Page
            </Link>
          </div>
        </div>
      </section>

      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto'>
            <h2 className="text-3xl font-bold text-white">
              Core System Components
            </h2>

            <div className='grid lg:grid-cols-2 gap-12'>
              {/* Kinetic Energy Converter */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg text-white">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6 text-white">
                  <Zap className='w-8 h-8 text-white' />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Kinetic Energy Converter
                </h3>
                <p className="text-white">
                  The heart of the KPP system, converting mechanical motion into
                  electrical energy through advanced electromagnetic induction
                  technology.
                </p>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <div className="w-2 h-2 bg-blue-500 rounded-full text-white"></div>
                    <span className="text-white">
                      High-efficiency electromagnetic coils
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className="w-2 h-2 bg-blue-500 rounded-full text-white"></div>
                    <span className="text-white">
                      Precision-engineered rotor assembly
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className="w-2 h-2 bg-blue-500 rounded-full text-white"></div>
                    <span className="text-white">
                      Advanced magnetic field optimization
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className="w-2 h-2 bg-blue-500 rounded-full text-white"></div>
                    <span className="text-white">
                      Real-time efficiency monitoring
                    </span>
                  </div>
                </div>
              </div>

              {/* Motion Amplification System */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg text-white">
                <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6'>
                  <RotateCcw className='w-8 h-8 text-white' />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Motion Amplification System
                </h3>
                <p className="text-white">
                  Multi-stage mechanical system that amplifies and sustains
                  kinetic energy through innovative gear and lever mechanisms.
                </p>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className="text-white">
                      Multi-stage gear reduction system
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className="text-white">
                      Precision-balanced flywheels
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className="text-white">
                      Low-friction bearing assemblies
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className="text-white">
                      Automated lubrication system
                    </span>
                  </div>
                </div>
              </div>

              {/* Energy Storage Module */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg text-white">
                <div className='w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6'>
                  <Battery className='w-8 h-8 text-white' />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Energy Storage Module
                </h3>
                <p className="text-white">
                  Advanced energy storage system that captures and stores excess
                  energy for consistent power delivery during peak demand
                  periods.
                </p>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                    <span className="text-white">
                      High-capacity lithium-ion batteries
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                    <span className="text-white">
                      Smart energy management system
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                    <span className="text-white">
                      Thermal management controls
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                    <span className="text-white">
                      Predictive maintenance monitoring
                    </span>
                  </div>
                </div>
              </div>

              {/* Control & Monitoring System */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg text-white">
                <div className='w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6'>
                  <Settings className='w-8 h-8 text-white' />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Control & Monitoring System
                </h3>
                <p className="text-white">
                  Intelligent control system that manages all KPP operations,
                  ensuring optimal performance and safety through real-time
                  monitoring and automation.
                </p>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                    <span className="text-white">
                      AI-powered performance optimization
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                    <span className="text-white">
                      Real-time data analytics
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                    <span className="text-white">
                      Remote monitoring capabilities
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                    <span className="text-white">
                      Predictive failure detection
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <h2 className="text-3xl font-bold text-white">
              Component Specifications
            </h2>

            <div className='grid md:grid-cols-2 gap-8'>
              <div className='bg-white p-6 rounded-lg shadow-sm'>
                <h3 className="text-xl font-semibold text-white">
                  Performance Metrics
                </h3>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className="text-white">Conversion Efficiency</span>
                    <span className='font-semibold text-green-600'>94.2%</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className="text-white">Power Output Range</span>
                    <span className='font-semibold text-blue-600'>1-50 MW</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className="text-white">Response Time</span>
                    <span className='font-semibold text-blue-600'>
                      &lt; 100ms
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className="text-white">Uptime Reliability</span>
                    <span className='font-semibold text-green-600'>99.8%</span>
                  </div>
                </div>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-sm'>
                <h3 className="text-xl font-semibold text-white">
                  Material Specifications
                </h3>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className="text-white">Rotor Material</span>
                    <span className="font-semibold text-white">
                      Titanium Alloy
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className="text-white">Coil Insulation</span>
                    <span className="font-semibold text-white">
                      Ceramic Composite
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className="text-white">Bearing Type</span>
                    <span className="font-semibold text-white">
                      Magnetic Levitation
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className="text-white">Operating Temperature</span>
                    <span className="font-semibold text-white">
                      -40°C to +85°C
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <h2 className="text-3xl font-bold text-white">
              Integration & Assembly
            </h2>

            <div className='grid md:grid-cols-3 gap-8'>
              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center'>
                  <Wrench className='w-8 h-8 text-white' />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Modular Design
                </h3>
                <p className="text-white">
                  Components are designed for easy assembly, maintenance, and
                  replacement, minimizing downtime and operational costs.
                </p>
              </div>

              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center'>
                  <Gauge className='w-8 h-8 text-white' />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Precision Engineering
                </h3>
                <p className="text-white">
                  Each component is manufactured to exacting tolerances using
                  advanced manufacturing techniques and quality control
                  processes.
                </p>
              </div>

              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center'>
                  <Shield className='w-8 h-8 text-white' />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Quality Assurance
                </h3>
                <p className="text-white">
                  Rigorous testing and quality control ensure each component
                  meets our high standards for reliability and performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-primary text-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-3xl font-bold mb-8'>Component Innovation</h2>
            <p className='text-xl leading-relaxed mb-8'>
              Our components represent the cutting edge of sustainable energy
              technology, combining decades of engineering expertise with
              breakthrough innovations in materials science and control systems.
            </p>
            <div className='grid md:grid-cols-3 gap-8 mt-12'>
              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center'>
                  <Lightbulb className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>Innovation</h3>
                <p className='text-white/80'>
                  Breakthrough technologies that push the boundaries of what's
                  possible in energy generation.
                </p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center'>
                  <Leaf className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>
                  Environmental Impact
                </h3>
                <p className='text-white/80'>
                  Zero emissions technology that contributes to a sustainable
                  future while meeting energy demands efficiently.
                </p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center'>
                  <Zap className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>
                  Energy Efficiency
                </h3>
                <p className='text-white/80'>
                  High-efficiency energy conversion with minimal losses,
                  maximizing power output while minimizing resource consumption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
