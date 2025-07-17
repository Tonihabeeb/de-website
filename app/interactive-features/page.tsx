import Link from 'next/link';
import type { Metadata } from 'next';
import EnergyCostCalculator from '@/components/calculators/EnergyCostCalculator';
import ProjectTracker from '@/components/projects/ProjectTracker';
import EnhancedContactForms from '@/components/forms/EnhancedContactForms';
import HeroSection from '@/components/sections/HeroSection';

export const metadata: Metadata = {
  title: 'Interactive Features - Deep Engineering',
  description: 'Explore our interactive tools including energy cost calculator, project tracker, and enhanced contact forms.',
  keywords: 'interactive features, energy calculator, project tracker, contact forms, KPP tools',
};

export default function InteractiveFeaturesPage() {
  return (
    <div>
      <HeroSection
        title="Interactive Features"
        subtitle="Explore our interactive tools and calculators designed to help you understand KPP technology, track project progress, and connect with our team."
      />

      {/* Energy Cost Calculator */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Energy Cost Calculator</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Compare the costs of KPP technology with traditional energy sources and see your potential savings. 
              Input your energy needs and get instant calculations.
            </p>
          </div>
          <EnergyCostCalculator />
        </div>
      </section>

      {/* Project Status Tracker */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Project Status Tracker</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Track the real-time progress of our KPP projects across Iraq with detailed timelines, 
              milestones, and updates.
            </p>
          </div>
          <ProjectTracker />
        </div>
      </section>

      {/* Enhanced Contact Forms */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Enhanced Contact Forms</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Get in touch with our team using specialized forms for different types of inquiries. 
              Choose the form that best matches your needs.
            </p>
          </div>
          <EnhancedContactForms />
        </div>
      </section>

      {/* Feature Overview */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Interactive Tools Overview</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Our interactive features are designed to provide you with valuable insights and easy ways 
              to engage with Deep Engineering.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Energy Cost Calculator</h3>
                <p className="text-gray-600 text-base mb-4">
                  Compare KPP technology costs with diesel, solar, and natural gas. Calculate potential savings 
                  and payback periods based on your energy needs.
                </p>
                <ul className="text-base text-gray-500 space-y-1">
                  <li>• Real-time cost comparisons</li>
                  <li>• Savings calculations</li>
                  <li>• Payback period analysis</li>
                  <li>• Visual cost breakdown</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Project Status Tracker</h3>
                <p className="text-gray-600 text-base mb-4">
                  Monitor the progress of our KPP projects with detailed timelines, milestones, 
                  and real-time updates from across Iraq.
                </p>
                <ul className="text-base text-gray-500 space-y-1">
                  <li>• Real-time project progress</li>
                  <li>• Milestone tracking</li>
                  <li>• Project updates</li>
                  <li>• Interactive timelines</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Enhanced Contact Forms</h3>
                <p className="text-gray-600 text-base mb-4">
                  Specialized contact forms for different inquiry types with smart validation 
                  and user-friendly interfaces.
                </p>
                <ul className="text-base text-gray-500 space-y-1">
                  <li>• Multiple form types</li>
                  <li>• Smart validation</li>
                  <li>• Real-time feedback</li>
                  <li>• Success confirmations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-white">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Explore More?</h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Discover our technology, track project progress, and connect with our team 
            to learn more about KPP solutions for Iraq.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/technology"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 min-w-[44px] min-h-[44px] inline-block text-center"
            >
              Explore Technology
            </Link>
            <Link 
              href="/projects"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200 min-w-[44px] min-h-[44px] inline-block text-center"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 