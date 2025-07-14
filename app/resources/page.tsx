import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources & Downloads - Deep Engineering',
  description: 'Download technical specifications, project brochures, environmental impact reports, and investment prospectuses for KPP technology.',
  keywords: 'resources, downloads, technical specifications, brochures, environmental reports, investment prospectus, KPP documentation',
};

const resourceCategories = [
  {
    title: 'Technical Documentation',
    description: 'Comprehensive technical specifications, installation guides, and engineering data',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    resources: [
      { name: 'KPP Technical Datasheet', format: 'PDF', size: '2.4 MB', description: 'Complete technical specifications and performance data' },
      { name: 'Installation Manual', format: 'PDF', size: '5.1 MB', description: 'Step-by-step installation and commissioning guide' },
      { name: 'Maintenance Procedures', format: 'PDF', size: '3.2 MB', description: 'Routine maintenance and troubleshooting guide' },
      { name: 'Safety Guidelines', format: 'PDF', size: '1.8 MB', description: 'Safety protocols and operational procedures' }
    ]
  },
  {
    title: 'Project Brochures',
    description: 'Detailed project information, case studies, and success stories',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    resources: [
      { name: 'Zakho 100MW Project Brochure', format: 'PDF', size: '4.2 MB', description: 'Comprehensive project overview and specifications' },
      { name: 'Soran 100MW Project Brochure', format: 'PDF', size: '3.8 MB', description: 'Project details and implementation timeline' },
      { name: 'Raparin 50MW Project Brochure', format: 'PDF', size: '2.9 MB', description: 'Project specifications and progress updates' },
      { name: 'Garmian 50MW Project Brochure', format: 'PDF', size: '3.1 MB', description: 'Project overview and investment details' }
    ]
  },
  {
    title: 'Environmental Reports',
    description: 'Environmental impact assessments and sustainability documentation',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    resources: [
      { name: 'Environmental Impact Assessment', format: 'PDF', size: '8.5 MB', description: 'Comprehensive environmental impact analysis' },
      { name: 'Carbon Footprint Analysis', format: 'PDF', size: '2.1 MB', description: 'Detailed carbon emissions reduction calculations' },
      { name: 'Sustainability Report 2024', format: 'PDF', size: '6.3 MB', description: 'Annual sustainability and environmental performance' },
      { name: 'Water Usage Analysis', format: 'PDF', size: '1.7 MB', description: 'Water consumption and efficiency study' }
    ]
  },
  {
    title: 'Investment Materials',
    description: 'Investment prospectuses, financial models, and business plans',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    resources: [
      { name: 'Investment Prospectus 2024', format: 'PDF', size: '12.4 MB', description: 'Comprehensive investment opportunity overview' },
      { name: 'Financial Projections Model', format: 'XLSX', size: '2.8 MB', description: 'Interactive financial modeling spreadsheet' },
      { name: 'ROI Analysis Report', format: 'PDF', size: '4.7 MB', description: 'Detailed return on investment calculations' },
      { name: 'Business Plan Summary', format: 'PDF', size: '3.9 MB', description: 'Executive summary of business strategy' }
    ]
  }
];

const featuredResources = [
  {
    title: 'KPP Technology Overview',
    description: 'Complete guide to Kinetic Power Plant technology, applications, and benefits',
    format: 'PDF',
    size: '5.2 MB',
    downloads: 1247,
    featured: true
  },
  {
    title: 'Iraq Energy Market Analysis',
    description: 'Comprehensive analysis of Iraq\'s energy market and KPP opportunities',
    format: 'PDF',
    size: '8.9 MB',
    downloads: 892,
    featured: true
  },
  {
    title: 'Environmental Benefits Report',
    description: 'Detailed analysis of KPP environmental benefits and carbon reduction',
    format: 'PDF',
    size: '3.6 MB',
    downloads: 567,
    featured: true
  }
];

export default function ResourcesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-white drop-shadow-md">Resources & Downloads</h1>
            <p className="text-xl text-white leading-relaxed">
              Access comprehensive technical documentation, project materials, environmental reports, 
              and investment resources for KPP technology and Deep Engineering projects.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Featured Resources</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Most popular downloads and essential resources for understanding KPP technology 
              and Deep Engineering's projects in Iraq.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredResources.map((resource, index) => (
                <div key={index} className="bg-gray-light rounded-lg p-6 border-2 border-primary/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="text-base bg-primary text-white px-2 py-1 rounded">Featured</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-primary mb-2">{resource.title}</h3>
                  <p className="text-base text-gray-600 mb-4">{resource.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-base text-gray-600">{resource.format} • {resource.size}</span>
                    <span className="text-base text-gray-600">{resource.downloads} downloads</span>
                  </div>
                  
                  <button className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors min-w-[44px] min-h-[44px]">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Resource Categories</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Browse our comprehensive collection of resources organized by category. 
              All documents are available for immediate download.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="space-y-8">
              {resourceCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-primary">{category.title}</h3>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.resources.map((resource, resourceIndex) => (
                        <div key={resourceIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 mb-1">{resource.name}</h4>
                            <p className="text-base text-gray-600 mb-2">{resource.description}</p>
                            <span className="text-base text-gray-600">{resource.format} • {resource.size}</span>
                          </div>
                          <button className="ml-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm min-w-[44px] min-h-[44px]">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-4">Stay Updated</h2>
            <p className="text-lg text-gray-text mb-8">
              Subscribe to our newsletter to receive the latest resources, project updates, 
              and industry insights directly to your inbox.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors min-w-[44px] min-h-[44px]">
                  Subscribe
                </button>
              </div>
              <p className="text-base text-gray-600 mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-4">Need Custom Resources?</h2>
            <p className="text-lg text-gray-text mb-8">
              Looking for specific technical information, custom reports, or detailed project data? 
              Our team is here to help you find exactly what you need.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors duration-200"
              >
                Request Custom Resources
              </Link>
              <Link 
                href="/contact"
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-white transition-colors duration-200"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-white">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Learn More?</h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Explore our technology, review project details, and discover investment opportunities 
            in Iraq's renewable energy future.
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