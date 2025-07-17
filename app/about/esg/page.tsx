import { Metadata } from 'next';
import { 
  Globe, 
  Handshake, 
  Scale
} from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';

export const metadata: Metadata = {
  title: 'ESG | Deep Engineering',
  description: 'Deep Engineering\'s commitment to Environmental, Social, and Governance excellence - driving sustainable impact through responsible business practices.',
  keywords: 'ESG, environmental, social, governance, sustainability, Deep Engineering, corporate responsibility',
};

export default function ESGPage() {
  return (
    <div className="min-h-screen">
      <HeroSection
        title="ESG Excellence"
        subtitle="Environmental, Social, and Governance commitment at Deep Engineering. We integrate ESG principles into every aspect of our business, ensuring sustainable growth while creating positive impact for our planet and communities."
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Our ESG Framework
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Environmental */}
              <div className="bg-green-50 p-8 rounded-lg border border-green-200">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Environmental</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Carbon Neutrality</h4>
                    <p className="text-gray-600 text-sm">
                      Committed to achieving net-zero carbon emissions by 2030 through renewable energy adoption 
                      and carbon offset programs.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Resource Efficiency</h4>
                    <p className="text-gray-600 text-sm">
                      Implementing circular economy principles and minimizing waste across all operations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Sustainable Innovation</h4>
                    <p className="text-gray-600 text-sm">
                      Developing technologies that reduce environmental impact and promote renewable energy adoption.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Social</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Diversity & Inclusion</h4>
                    <p className="text-gray-600 text-sm">
                      Fostering an inclusive workplace that celebrates diversity and provides equal opportunities 
                      for all employees.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Community Impact</h4>
                    <p className="text-gray-600 text-sm">
                      Supporting local communities through education programs, skill development, and 
                      sustainable development initiatives.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Employee Wellbeing</h4>
                    <p className="text-gray-600 text-sm">
                      Prioritizing mental health, work-life balance, and professional development for all team members.
                    </p>
                  </div>
                </div>
              </div>

              {/* Governance */}
              <div className="bg-purple-50 p-8 rounded-lg border border-purple-200">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Governance</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Transparency</h4>
                    <p className="text-gray-600 text-sm">
                      Maintaining open communication and regular reporting on our ESG performance and initiatives.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Ethical Practices</h4>
                    <p className="text-gray-600 text-sm">
                      Upholding the highest ethical standards in all business operations and stakeholder relationships.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Risk Management</h4>
                    <p className="text-gray-600 text-sm">
                      Implementing robust risk management frameworks that address ESG-related challenges and opportunities.
                    </p>
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
              ESG Performance Metrics
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Environmental Impact</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Carbon Footprint Reduction</span>
                    <span className="font-semibold text-green-600">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Renewable Energy Usage</span>
                    <span className="font-semibold text-green-600">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Waste Recycling Rate</span>
                    <span className="font-semibold text-green-600">92%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Impact</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Gender Diversity</span>
                    <span className="font-semibold text-blue-600">52%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Community Projects</span>
                    <span className="font-semibold text-blue-600">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Employee Satisfaction</span>
                    <span className="font-semibold text-blue-600">94%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Our ESG Commitments
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              We are committed to continuous improvement in our ESG performance and regularly review our 
              strategies to ensure we're making meaningful progress toward our sustainability goals.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Short-term Goals (2024-2025)</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Achieve 100% renewable energy usage</li>
                  <li>• Implement comprehensive diversity training</li>
                  <li>• Launch community education programs</li>
                  <li>• Establish ESG reporting framework</li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Long-term Vision (2030)</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Net-zero carbon emissions</li>
                  <li>• 50% leadership positions held by women</li>
                  <li>• Circular economy implementation</li>
                  <li>• Industry-leading ESG standards</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 