import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';

export const metadata: Metadata = {
  title: 'EPC Services | Deep Engineering',
  description: 'Engineering, Procurement, and Construction services for complete turnkey power plant development and installation.',
  keywords: 'EPC, engineering, procurement, construction, turnkey, power plant, Deep Engineering, project delivery',
};

export default function EPCPage() {
  return (
    <div className="min-h-screen">
      <HeroSection
        title="EPC Services"
        subtitle="Engineering, Procurement, and Construction services for complete turnkey power plant development and installation. From initial design to final commissioning and handover."
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              EPC Service Portfolio
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Engineering */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                  <span className="text-white text-2xl">📐</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Engineering</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive engineering services including detailed design, 
                  technical specifications, and project planning.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Feasibility studies and site assessment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Detailed engineering design</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Technical specifications and drawings</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Regulatory compliance and permitting</span>
                  </div>
                </div>
              </div>

              {/* Procurement */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                  <span className="text-white text-2xl">📦</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Procurement</h3>
                <p className="text-gray-600 mb-6">
                  Strategic procurement and supply chain management to ensure 
                  timely delivery of high-quality equipment and materials.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Equipment sourcing and selection</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Supplier qualification and management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Quality control and inspection</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Logistics and transportation</span>
                  </div>
                </div>
              </div>

              {/* Construction */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6">
                  <span className="text-white text-2xl">🏗️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Construction</h3>
                <p className="text-gray-600 mb-6">
                  Professional construction and installation services with 
                  experienced teams and strict quality control measures.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Site preparation and civil works</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Equipment installation and assembly</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Electrical and control systems</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Testing and commissioning</span>
                  </div>
                </div>
              </div>

              {/* Project Management */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                  <span className="text-white text-2xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Project Management</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive project management ensuring on-time, on-budget 
                  delivery with the highest quality standards.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Schedule and cost management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Risk assessment and mitigation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Stakeholder communication</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Quality assurance and control</span>
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
              EPC Capabilities
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Scale</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Project Capacity</span>
                    <span className="font-semibold text-blue-600">1-500 MW</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Project Duration</span>
                    <span className="font-semibold text-blue-600">12-36 months</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Team Size</span>
                    <span className="font-semibold text-blue-600">50-200+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Geographic Reach</span>
                    <span className="font-semibold text-blue-600">Global</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">On-Time Delivery</span>
                    <span className="font-semibold text-green-600">95%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">On-Budget Completion</span>
                    <span className="font-semibold text-green-600">98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Safety Record</span>
                    <span className="font-semibold text-green-600">Zero incidents</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Client Satisfaction</span>
                    <span className="font-semibold text-green-600">99%</span>
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
              EPC Process
            </h2>
            
            <div className="grid md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Discovery</h3>
                <p className="text-gray-600 text-sm">
                  Initial consultation and project requirements analysis.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Design</h3>
                <p className="text-gray-600 text-sm">
                  Detailed engineering and technical specifications.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Procure</h3>
                <p className="text-gray-600 text-sm">
                  Equipment sourcing and supply chain management.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Construct</h3>
                <p className="text-gray-600 text-sm">
                  Site construction and equipment installation.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">5</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Commission</h3>
                <p className="text-gray-600 text-sm">
                  Testing, commissioning, and project handover.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Start Your EPC Project
            </h2>
            <p className="text-xl leading-relaxed mb-8">
              Contact our EPC team to discuss your power plant project requirements 
              and get a comprehensive proposal for turnkey project delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Get Proposal
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