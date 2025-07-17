import { Metadata } from 'next';
import { 
  Shield, 
  Leaf, 
  TrendingUp,
  Users,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';

export const metadata: Metadata = {
  title: 'HSE | Deep Engineering',
  description: 'Deep Engineering\'s Health, Safety, and Environment commitment - ensuring the wellbeing of our people and protecting our planet.',
  keywords: 'HSE, health, safety, environment, workplace safety, Deep Engineering, occupational health',
};

export default function HSEPage() {
  return (
    <div className="min-h-screen">
      <HeroSection
        title="Health, Safety & Environment"
        subtitle="Protecting our people and planet through comprehensive HSE practices."
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Our HSE Framework
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Health */}
              <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Health</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Occupational Health</h4>
                    <p className="text-gray-600 text-sm">
                      Regular health screenings, ergonomic assessments, and comprehensive wellness programs 
                      to ensure employee wellbeing.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Mental Health Support</h4>
                    <p className="text-gray-600 text-sm">
                      Access to counseling services, stress management programs, and work-life balance initiatives.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Preventive Care</h4>
                    <p className="text-gray-600 text-sm">
                      Proactive health monitoring and early intervention programs to prevent workplace-related health issues.
                    </p>
                  </div>
                </div>
              </div>

              {/* Safety */}
              <div className="bg-orange-50 p-8 rounded-lg border border-orange-200">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Safety</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Workplace Safety</h4>
                    <p className="text-gray-600 text-sm">
                      Comprehensive safety protocols, regular training, and continuous monitoring to prevent accidents.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Emergency Response</h4>
                    <p className="text-gray-600 text-sm">
                      Well-trained emergency response teams and clear evacuation procedures for all facilities.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Safety Culture</h4>
                    <p className="text-gray-600 text-sm">
                      Fostering a culture where safety is everyone's responsibility and continuous improvement is encouraged.
                    </p>
                  </div>
                </div>
              </div>

              {/* Environment */}
              <div className="bg-green-50 p-8 rounded-lg border border-green-200">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Environment</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Environmental Protection</h4>
                    <p className="text-gray-600 text-sm">
                      Minimizing environmental impact through sustainable practices and pollution prevention measures.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Waste Management</h4>
                    <p className="text-gray-600 text-sm">
                      Comprehensive waste reduction, recycling, and proper disposal programs across all operations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Resource Conservation</h4>
                    <p className="text-gray-600 text-sm">
                      Efficient use of energy, water, and materials to reduce our environmental footprint.
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
              HSE Performance & Standards
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Lost Time Injury Rate</span>
                    <span className="font-semibold text-green-600">0.2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Safety Training Hours</span>
                    <span className="font-semibold text-blue-600">2,400</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Safety Audits Completed</span>
                    <span className="font-semibold text-blue-600">156</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Environmental Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Carbon Emissions Reduced</span>
                    <span className="font-semibold text-green-600">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Waste Diverted from Landfill</span>
                    <span className="font-semibold text-green-600">89%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Water Usage Reduction</span>
                    <span className="font-semibold text-green-600">28%</span>
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
              HSE Programs & Initiatives
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Training & Education</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Comprehensive safety training for all employees</li>
                  <li>• Regular HSE awareness programs</li>
                  <li>• Specialized training for high-risk operations</li>
                  <li>• Emergency response drills and simulations</li>
                  <li>• Environmental compliance training</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Monitoring & Compliance</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Regular safety inspections and audits</li>
                  <li>• Environmental impact assessments</li>
                  <li>• Health monitoring and medical surveillance</li>
                  <li>• Regulatory compliance tracking</li>
                  <li>• Performance metrics and reporting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Our HSE Commitment
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              We are committed to maintaining the highest standards of health, safety, and environmental protection. 
              Our goal is to create a workplace where everyone goes home safely every day while minimizing our 
              impact on the environment.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Zero Harm</h3>
                <p className="text-white/80">
                  Our ultimate goal is zero workplace injuries and environmental incidents.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Continuous Improvement</h3>
                <p className="text-white/80">
                  We continuously improve our HSE performance through innovation and best practices.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Stakeholder Engagement</h3>
                <p className="text-white/80">
                  We engage with employees, communities, and regulators to ensure transparency and collaboration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 