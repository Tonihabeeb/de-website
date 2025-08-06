import { Metadata } from 'next';
import { Wrench, TrendingUp, Leaf, Settings, Zap, Shield } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services | Deep Engineering',
  description:
    'Comprehensive energy services from Deep Engineering - Supply, EPC, and O&M solutions for sustainable power generation.',
  keywords:
    'services, supply, EPC, O&M, Deep Engineering, energy services, power generation, maintenance',
};

export default function ServicesPage() {
  return (
    <div className='min-h-screen'>
      <HeroSection
        title='Our Services'
        subtitle='Comprehensive energy solutions for a sustainable future. From equipment supply to turnkey project delivery and ongoing operations, we provide end-to-end services to support your sustainable energy goals.'
      />

      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto'>
            <h2 className="text-3xl font-bold text-white">
              Service Portfolio
            </h2>

            <div className='grid lg:grid-cols-3 gap-8'>
              {/* Supply */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg text-white">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6 text-white">
                  <Wrench className='w-8 h-8 text-white' />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Supply
                </h3>
                <p className="text-white">
                  Complete supply of KPP components and systems, from individual
                  parts to fully integrated power generation units.
                </p>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <div className="w-2 h-2 bg-blue-500 rounded-full text-white"></div>
                    <span className="text-white">
                      KPP power generation units
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className="w-2 h-2 bg-blue-500 rounded-full text-white"></div>
                    <span className="text-white">
                      Individual components and spare parts
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className="w-2 h-2 bg-blue-500 rounded-full text-white"></div>
                    <span className="text-white">
                      Control and monitoring systems
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className="w-2 h-2 bg-blue-500 rounded-full text-white"></div>
                    <span className="text-white">
                      Energy storage solutions
                    </span>
                  </div>
                </div>
                <div className='mt-6'>
                  <Link
                    href='/services/supply'
                    className='text-blue-600 font-semibold hover:text-blue-800 transition-colors'
                  >
                    Learn More →
                  </Link>
                </div>
              </div>

              {/* EPC */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg text-white">
                <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6'>
                  <TrendingUp className='w-8 h-8 text-white' />
                </div>
                <h3 className="text-2xl font-bold text-white">EPC</h3>
                <p className="text-white">
                  Engineering, Procurement, and Construction services for
                  complete turnkey power plant development and installation.
                </p>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className="text-white">
                      Project design and engineering
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className="text-white">
                      Equipment procurement and logistics
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className="text-white">
                      Construction and installation
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className="text-white">
                      Commissioning and handover
                    </span>
                  </div>
                </div>
                <div className='mt-6'>
                  <Link
                    href='/services/epc'
                    className='text-green-600 font-semibold hover:text-green-800 transition-colors'
                  >
                    Learn More →
                  </Link>
                </div>
              </div>

              {/* O&M */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg text-white">
                <div className='w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6'>
                  <Leaf className='w-8 h-8 text-white' />
                </div>
                <h3 className="text-2xl font-bold text-white">O&M</h3>
                <p className="text-white">
                  Operations and Maintenance services to ensure optimal
                  performance, reliability, and longevity of your power
                  generation assets.
                </p>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                    <span className="text-white">
                      24/7 operations monitoring
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                    <span className="text-white">
                      Preventive maintenance programs
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                    <span className="text-white">
                      Performance optimization
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                    <span className="text-white">
                      Emergency response services
                    </span>
                  </div>
                </div>
                <div className='mt-6'>
                  <Link
                    href='/services/om'
                    className='text-purple-600 font-semibold hover:text-purple-800 transition-colors'
                  >
                    Learn More →
                  </Link>
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
              Why Choose Our Services?
            </h2>

            <div className='grid md:grid-cols-2 gap-8'>
              <div className='bg-white p-6 rounded-lg shadow-sm'>
                <h3 className="text-xl font-semibold text-white">
                  Expertise & Experience
                </h3>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className="text-white">Years of Experience</span>
                    <span className='font-semibold text-blue-600'>15+</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className="text-white">Projects Completed</span>
                    <span className='font-semibold text-blue-600'>50+</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className="text-white">Countries Served</span>
                    <span className='font-semibold text-blue-600'>25+</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className="text-white">Team Members</span>
                    <span className='font-semibold text-blue-600'>200+</span>
                  </div>
                </div>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-sm'>
                <h3 className="text-xl font-semibold text-white">
                  Quality & Reliability
                </h3>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className="text-white">Uptime Guarantee</span>
                    <span className='font-semibold text-green-600'>99.8%</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className="text-white">Response Time</span>
                    <span className='font-semibold text-green-600'>
                      &lt; 4 hours
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className="text-white">Customer Satisfaction</span>
                    <span className='font-semibold text-green-600'>98%</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className="text-white">Safety Record</span>
                    <span className='font-semibold text-green-600'>
                      Zero incidents
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
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className="text-3xl font-bold text-white">
              Our Service Approach
            </h2>
            <p className="text-lg text-white">
              We take a comprehensive approach to energy services, ensuring
              seamless integration between supply, construction, and operations
              for optimal project success.
            </p>

            <div className='grid md:grid-cols-3 gap-8'>
              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center'>
                  <Settings className='w-8 h-8 text-white' />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Partnership
                </h3>
                <p className="text-white">
                  We work closely with clients to understand their needs and
                  deliver customized solutions that exceed expectations.
                </p>
              </div>

              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center'>
                  <Zap className='w-8 h-8 text-white' />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Innovation
                </h3>
                <p className="text-white">
                  Continuous improvement and adoption of cutting-edge
                  technologies to deliver superior performance and efficiency.
                </p>
              </div>

              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center'>
                  <Shield className='w-8 h-8 text-white' />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Sustainability
                </h3>
                <p className="text-white">
                  All services are designed with environmental responsibility in
                  mind, supporting the transition to clean energy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-primary text-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-3xl font-bold mb-8'>Ready to Get Started?</h2>
            <p className='text-xl leading-relaxed mb-8'>
              Contact our team to discuss your energy project requirements and
              discover how our comprehensive services can support your
              sustainable energy goals.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href='/contact'
                className='bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200'
              >
                Contact Us
              </Link>
              <Link
                href='/projects'
                className='border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200'
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
