import { Metadata } from 'next';
import {
  Zap,
  Wrench,
  Settings,
  Battery,
  Package,
  Truck,
  CheckCircle,
} from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';

export const metadata: Metadata = {
  title: 'Supply Services | Deep Engineering',
  description:
    'Complete supply of KPP components and systems - from individual parts to fully integrated power generation units.',
  keywords:
    'supply, KPP components, power generation units, Deep Engineering, energy equipment, sustainable energy supply',
};

export default function SupplyPage() {
  return (
    <div className='min-h-screen'>
      <HeroSection
        title='Supply Services'
        subtitle='Complete supply of KPP components and systems. From individual components to fully integrated power generation units, we provide comprehensive supply solutions for sustainable energy projects.'
      />

      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto'>
            <h2 className='text-3xl font-bold text-gray-900 mb-12 text-center'>
              Supply Portfolio
            </h2>

            <div className='grid lg:grid-cols-2 gap-12'>
              {/* Complete KPP Units */}
              <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg'>
                <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6'>
                  <Zap className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  Complete KPP Units
                </h3>
                <p className='text-gray-600 mb-6'>
                  Fully integrated power generation units ready for installation
                  and operation, including all necessary components and control
                  systems.
                </p>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                    <span className='text-gray-700'>
                      25 MW power generation units
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                    <span className='text-gray-700'>
                      Pre-assembled and tested
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                    <span className='text-gray-700'>
                      Plug-and-play installation
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                    <span className='text-gray-700'>
                      Comprehensive documentation
                    </span>
                  </div>
                </div>
              </div>

              {/* Individual Components */}
              <div className='bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg'>
                <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6'>
                  <Wrench className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  Individual Components
                </h3>
                <p className='text-gray-600 mb-6'>
                  High-quality individual components and spare parts for
                  maintenance, upgrades, and custom system configurations.
                </p>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='text-gray-700'>
                      Kinetic energy converters
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='text-gray-700'>
                      Motion amplification systems
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='text-gray-700'>
                      Energy storage modules
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='text-gray-700'>
                      Control and monitoring systems
                    </span>
                  </div>
                </div>
              </div>

              {/* Control Systems */}
              <div className='bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg'>
                <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6'>
                  <Settings className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  Control & Monitoring
                </h3>
                <p className='text-gray-600 mb-6'>
                  Advanced control and monitoring systems for optimal
                  performance, safety, and remote operation capabilities.
                </p>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                    <span className='text-gray-700'>SCADA control systems</span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                    <span className='text-gray-700'>
                      Real-time monitoring platforms
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                    <span className='text-gray-700'>
                      AI-powered optimization
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                    <span className='text-gray-700'>
                      Remote access capabilities
                    </span>
                  </div>
                </div>
              </div>

              {/* Energy Storage */}
              <div className='bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg'>
                <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6'>
                  <Battery className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  Energy Storage Solutions
                </h3>
                <p className='text-gray-600 mb-6'>
                  High-capacity energy storage systems for grid stability, peak
                  shaving, and renewable energy integration.
                </p>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                    <span className='text-gray-700'>
                      Lithium-ion battery systems
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                    <span className='text-gray-700'>
                      Grid-scale storage solutions
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                    <span className='text-gray-700'>
                      Energy management systems
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                    <span className='text-gray-700'>
                      Thermal management controls
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
            <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
              Supply Capabilities
            </h2>

            <div className='grid md:grid-cols-2 gap-8'>
              <div className='bg-white p-6 rounded-lg shadow-sm'>
                <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                  Production Capacity
                </h3>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Annual Production</span>
                    <span className='font-semibold text-blue-600'>
                      100+ Units
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Lead Time</span>
                    <span className='font-semibold text-blue-600'>
                      6-12 months
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Quality Control</span>
                    <span className='font-semibold text-blue-600'>
                      100% Testing
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Warranty</span>
                    <span className='font-semibold text-blue-600'>
                      10 Years
                    </span>
                  </div>
                </div>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-sm'>
                <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                  Logistics & Support
                </h3>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Global Shipping</span>
                    <span className='font-semibold text-green-600'>
                      Worldwide
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Installation Support</span>
                    <span className='font-semibold text-green-600'>
                      Included
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Training Programs</span>
                    <span className='font-semibold text-green-600'>
                      Comprehensive
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Technical Support</span>
                    <span className='font-semibold text-green-600'>
                      24/7 Available
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
            <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
              Supply Process
            </h2>

            <div className='grid md:grid-cols-4 gap-8'>
              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center'>
                  <span className='text-white text-2xl'>1</span>
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Consultation
                </h3>
                <p className='text-gray-600'>
                  Initial consultation to understand your requirements and
                  project specifications.
                </p>
              </div>

              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center'>
                  <span className='text-white text-2xl'>2</span>
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Design
                </h3>
                <p className='text-gray-600'>
                  Custom design and engineering to meet your specific project
                  needs.
                </p>
              </div>

              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center'>
                  <span className='text-white text-2xl'>3</span>
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Production
                </h3>
                <p className='text-gray-600'>
                  Manufacturing and quality control testing in our
                  state-of-the-art facilities.
                </p>
              </div>

              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center'>
                  <span className='text-white text-2xl'>4</span>
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Delivery
                </h3>
                <p className='text-gray-600'>
                  Secure shipping and delivery with installation support and
                  training.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-primary text-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-3xl font-bold mb-8'>Ready to Order?</h2>
            <p className='text-xl leading-relaxed mb-8'>
              Contact our supply team to discuss your requirements and get a
              detailed quote for your KPP components and systems.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a
                href='/contact'
                className='bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200'
              >
                Request Quote
              </a>
              <a
                href='/services'
                className='border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200'
              >
                View All Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
