import { Metadata } from 'next';
import { 
  Zap, 
  Wrench, 
  TrendingUp,
  Settings,
  Shield,
  Clock,
  CheckCircle
} from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';

export const metadata: Metadata = {
  title: 'O&M Services | Deep Engineering',
  description: 'Operations and Maintenance services to ensure optimal performance, reliability, and longevity of your power generation assets.',
  keywords: 'O&M, operations, maintenance, power plant, Deep Engineering, asset management, performance optimization',
};

export default function OMPage() {
  return (
    <div className="min-h-screen">
      <HeroSection
        title="O&M Services"
        subtitle="Comprehensive operations and maintenance services to ensure optimal performance, reliability, and longevity of your power generation assets."
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              O&M Service Portfolio
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Operations */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Operations</h3>
                <p className="text-gray-600 mb-6">
                  Professional operations management ensuring continuous, efficient, 
                  and safe power generation with maximum uptime.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">24/7 operations monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Performance optimization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Grid synchronization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Load management</span>
                  </div>
                </div>
              </div>

              {/* Maintenance */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Maintenance</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive maintenance programs including preventive, predictive, 
                  and corrective maintenance to maximize equipment reliability.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Preventive maintenance schedules</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Predictive maintenance using IoT</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Emergency repair services</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Spare parts management</span>
                  </div>
                </div>
              </div>

              {/* Monitoring & Control */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Monitoring & Control</h3>
                <p className="text-gray-600 mb-6">
                  Advanced monitoring and control systems providing real-time data, 
                  analytics, and remote operation capabilities.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Real-time performance monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Predictive analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Remote control capabilities</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Automated reporting</span>
                  </div>
                </div>
              </div>

              {/* Asset Management */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Asset Management</h3>
                <p className="text-gray-600 mb-6">
                  Strategic asset management to optimize performance, extend equipment 
                  life, and maximize return on investment.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Lifecycle management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Performance optimization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Upgrade planning</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Cost optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              O&M Performance Metrics
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Reliability & Uptime</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">System Availability</span>
                    <span className="font-semibold text-blue-600">99.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mean Time Between Failures</span>
                    <span className="font-semibold text-blue-600">8,760 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mean Time to Repair</span>
                    <span className="font-semibold text-blue-600">&lt; 4 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Planned Maintenance</span>
                    <span className="font-semibold text-blue-600">98% on schedule</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance & Efficiency</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Energy Efficiency</span>
                    <span className="font-semibold text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-semibold text-green-600">&lt; 100ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Grid Stability</span>
                    <span className="font-semibold text-green-600">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Safety Record</span>
                    <span className="font-semibold text-green-600">Zero incidents</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              O&M Service Levels
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic O&M</h3>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Scheduled maintenance</li>
                  <li>• Basic monitoring</li>
                  <li>• Emergency response</li>
                  <li>• Performance reporting</li>
                </ul>
                <p className="text-sm text-gray-500">Ideal for smaller installations</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium O&M</h3>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• 24/7 monitoring</li>
                  <li>• Predictive maintenance</li>
                  <li>• Performance optimization</li>
                  <li>• Remote operation</li>
                  <li>• Advanced analytics</li>
                </ul>
                <p className="text-sm text-gray-500">Most popular choice</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Enterprise O&M</h3>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Full asset management</li>
                  <li>• Custom optimization</li>
                  <li>• Dedicated team</li>
                  <li>• Strategic planning</li>
                  <li>• ROI optimization</li>
                </ul>
                <p className="text-sm text-gray-500">For large-scale operations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Optimize Your Operations
            </h2>
            <p className="text-xl leading-relaxed mb-8">
              Contact our O&M team to discuss how we can optimize your power generation 
              operations and maximize the performance and reliability of your assets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Get O&M Quote
              </a>
              <a 
                href="/services"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200"
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