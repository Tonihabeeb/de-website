import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import {
  Leaf,
  Globe,
  TrendingUp,
  FileText,
  Download,
  Search,
  Filter,
  Calendar,
  Award,
  Shield,
  Target,
  BarChart3,
  Eye,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Info,
  Users,
  Activity,
  MapPin,
  Clock,
  Star,
  Database,
  BookOpen,
  ExternalLink,
  Recycle,
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Environmental & ESG | Deep Engineering',
  description:
    'Comprehensive environmental impact assessments, ESG policies, and sustainability reports for Deep Engineering projects. Access detailed environmental compliance and ESG framework documentation.',
  keywords:
    'environmental impact assessment, ESG policy, sustainability reports, environmental compliance, KPP technology, clean energy, carbon reduction',
  openGraph: {
    title: 'Environmental & ESG Documentation | Deep Engineering',
    description:
      'Access comprehensive environmental impact assessments, ESG policies, and sustainability reports for Deep Engineering projects.',
    url: 'https://deepengineering.co/resources/environmental-esg',
    images: [
      {
        url: '/environmental-esg-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Environmental and ESG Documentation',
      },
    ],
  },
  twitter: {
    title: 'Environmental & ESG Documentation | Deep Engineering',
    description:
      'Access comprehensive environmental impact assessments, ESG policies, and sustainability reports for Deep Engineering projects.',
  },
  alternates: {
    canonical: '/resources/environmental-esg',
  },
};

export default function EnvironmentalESGDocumentsPage() {
  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <HeroSection
        title='Environmental & ESG'
        subtitle='Comprehensive environmental impact assessments, ESG policies, and sustainability reports for Deep Engineering projects.'
      >
        <div className='flex flex-wrap justify-center gap-4 mt-8'>
          <Link
            href='#documents'
            className='bg-white text-primary px-6 py-3 rounded-lg font-semibold hover-effect flex items-center gap-2 transition-all duration-200'
          >
            View Documents
            <FileText className='w-4 h-4' />
          </Link>
          <Link
            href='#impact'
            className='border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-300 transition-all duration-200 flex items-center gap-2'
          >
            Environmental Impact
            <Leaf className='w-4 h-4' />
          </Link>
        </div>
      </HeroSection>

      {/* Environmental Impact Overview */}
      <section id='impact' className='section-padding bg-white'>
        <div className='container'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-primary mb-4'>Environmental Impact Overview</h2>
              <div className='w-24 h-1 bg-primary mx-auto mb-8'></div>
              <p className='text-lg text-gray-text max-w-3xl mx-auto'>
                Our KPP technology delivers unprecedented environmental benefits through zero-emission power generation and comprehensive sustainability practices.
              </p>
            </div>

            {/* Impact Statistics */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-12'>
              <div className='text-center'>
                <div className='w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <Leaf className='w-8 h-8 text-white' />
                </div>
                <div className='text-3xl font-bold text-primary mb-2'>0</div>
                <div className='text-gray-text text-sm'>CO₂ Emissions</div>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <Globe className='w-8 h-8 text-white' />
                </div>
                <div className='text-3xl font-bold text-primary mb-2'>2.5M</div>
                <div className='text-gray-text text-sm'>Tons CO₂ Avoided/Year</div>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <Zap className='w-8 h-8 text-white' />
                </div>
                <div className='text-3xl font-bold text-primary mb-2'>390 MW</div>
                <div className='text-gray-text text-sm'>Clean Power Capacity</div>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <Target className='w-8 h-8 text-white' />
                </div>
                <div className='text-3xl font-bold text-primary mb-2'>100%</div>
                <div className='text-gray-text text-sm'>Renewable Energy</div>
              </div>
            </div>

            {/* Environmental Benefits */}
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              <div className='bg-gray-light p-6 rounded-xl hover-effect'>
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <Leaf className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-xl font-semibold text-primary'>Zero Emissions</h3>
                </div>
                <p className='text-gray-text text-sm leading-relaxed'>
                  KPP technology generates power without any fuel combustion, eliminating CO₂, NOₓ, SOₓ, and particulate emissions completely.
                </p>
              </div>
              <div className='bg-gray-light p-6 rounded-xl hover-effect'>
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <Globe className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-xl font-semibold text-primary'>Zero Water Use</h3>
                </div>
                <p className='text-gray-text text-sm leading-relaxed'>
                  Unlike traditional power plants, KPP technology requires no water for cooling or steam generation, preserving precious water resources.
                </p>
              </div>
              <div className='bg-gray-light p-6 rounded-xl hover-effect'>
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <MapPin className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-xl font-semibold text-primary'>Minimal Land Footprint</h3>
                </div>
                <p className='text-gray-text text-sm leading-relaxed'>
                  Compact design requires significantly less land compared to solar or wind farms, minimizing habitat disruption.
                </p>
              </div>
              <div className='bg-gray-light p-6 rounded-xl hover-effect'>
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <Activity className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-xl font-semibold text-primary'>Continuous Operation</h3>
                </div>
                <p className='text-gray-text text-sm leading-relaxed'>
                  24/7 power generation without weather dependency, providing reliable clean energy when needed most.
                </p>
              </div>
              <div className='bg-gray-light p-6 rounded-xl hover-effect'>
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <Recycle className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-xl font-semibold text-primary'>Circular Economy</h3>
                </div>
                <p className='text-gray-text text-sm leading-relaxed'>
                  Sustainable materials and end-of-life recycling ensure minimal environmental impact throughout the lifecycle.
                </p>
              </div>
              <div className='bg-gray-light p-6 rounded-xl hover-effect'>
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <Shield className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-xl font-semibold text-primary'>Environmental Protection</h3>
                </div>
                <p className='text-gray-text text-sm leading-relaxed'>
                  Comprehensive environmental monitoring and protection measures ensure ecosystem preservation and biodiversity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESG Framework */}
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-primary mb-4'>ESG Framework</h2>
              <div className='w-24 h-1 bg-primary mx-auto mb-8'></div>
              <p className='text-lg text-gray-text max-w-3xl mx-auto'>
                Our comprehensive Environmental, Social, and Governance framework drives sustainable impact through innovative technology and responsible business practices.
              </p>
            </div>

            <div className='grid lg:grid-cols-3 gap-8'>
              <div className='bg-white p-8 rounded-xl hover-effect'>
                <div className='flex items-center mb-6'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <Leaf className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-2xl font-bold text-primary'>Environmental</h3>
                </div>
                <ul className='text-gray-text text-sm space-y-3'>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span>Zero emissions technology implementation</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span>Carbon footprint reduction and offset programs</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span>Resource efficiency and waste minimization</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span>Biodiversity conservation and habitat protection</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span>Environmental monitoring and reporting</span>
                  </li>
                </ul>
              </div>

              <div className='bg-white p-8 rounded-xl hover-effect'>
                <div className='flex items-center mb-6'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <Users className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-2xl font-bold text-primary'>Social</h3>
                </div>
                <ul className='text-gray-text text-sm space-y-3'>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span>Community development and engagement</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span>Workforce development and training programs</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span>Health, safety, and wellbeing initiatives</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span>Diversity, equity, and inclusion programs</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span>Stakeholder engagement and transparency</span>
                  </li>
                </ul>
              </div>

              <div className='bg-white p-8 rounded-xl hover-effect'>
                <div className='flex items-center mb-6'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <Shield className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-2xl font-bold text-primary'>Governance</h3>
                </div>
                <ul className='text-gray-text text-sm space-y-3'>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span>Ethical business practices and compliance</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span>Board diversity and independent oversight</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span>Risk management and cybersecurity</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span>Transparent reporting and disclosure</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span>Stakeholder value creation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Certifications */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-primary mb-4'>Compliance & Certifications</h2>
              <div className='w-24 h-1 bg-primary mx-auto mb-8'></div>
              <p className='text-lg text-gray-text max-w-3xl mx-auto'>
                Our commitment to environmental excellence is validated through international certifications and regulatory compliance.
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              <div className='text-center'>
                <div className='w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <Award className='w-10 h-10 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-primary mb-2'>ISO 14001</h3>
                <p className='text-gray-text text-sm'>Environmental Management System</p>
              </div>
              <div className='text-center'>
                <div className='w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <Shield className='w-10 h-10 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-primary mb-2'>TÜV Certification</h3>
                <p className='text-gray-text text-sm'>German Technical Inspection Association</p>
              </div>
              <div className='text-center'>
                <div className='w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <CheckCircle className='w-10 h-10 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-primary mb-2'>SGS Certification</h3>
                <p className='text-gray-text text-sm'>Société Générale de Surveillance</p>
              </div>
              <div className='text-center'>
                <div className='w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <Star className='w-10 h-10 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-primary mb-2'>DEKRA Certification</h3>
                <p className='text-gray-text text-sm'>German Expert Committee</p>
              </div>
            </div>

            <div className='mt-12 bg-gray-light p-8 rounded-xl'>
              <h3 className='text-xl font-semibold text-primary mb-4'>Regulatory Compliance</h3>
              <div className='grid md:grid-cols-2 gap-6'>
                <div>
                  <h4 className='font-semibold text-primary mb-2'>Environmental Regulations</h4>
                  <ul className='text-gray-text text-sm space-y-2'>
                    <li className='flex items-start gap-2'>
                      <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                      <span>Iraq Environmental Protection Law compliance</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                      <span>International environmental standards adherence</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                      <span>Regular environmental impact assessments</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className='font-semibold text-primary mb-2'>Safety Standards</h4>
                  <ul className='text-gray-text text-sm space-y-2'>
                    <li className='flex items-start gap-2'>
                      <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                      <span>ISO 45001 Occupational Health & Safety</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                      <span>Comprehensive safety protocols and training</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                      <span>Emergency response and crisis management</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section id='documents' className='section-padding bg-gray-light'>
        <div className='container'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-primary mb-4'>Environmental & ESG Documents</h2>
              <div className='w-24 h-1 bg-primary mx-auto mb-8'></div>
              <p className='text-lg text-gray-text max-w-3xl mx-auto'>
                Access comprehensive environmental impact assessments, ESG policies, compliance reports, and sustainability documentation.
              </p>
            </div>



            {/* Document Categories */}
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {/* Environmental Impact Assessments */}
              <div className='bg-white p-6 rounded-xl hover-effect'>
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <FileText className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold text-primary'>Environmental Impact Assessments</h3>
                </div>
                <ul className='text-gray-text text-sm space-y-2 mb-4'>
                  <li className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span>KPP Project EIA Report (2024)</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span>Site-specific Environmental Studies</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span>Biodiversity Impact Assessment</span>
                  </li>
                </ul>
                <a 
                  href='/documents/environmental-impact-assessment-2024.html'
                  target='_blank'
                  className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary transition-all duration-200'
                >
                  <ArrowRight className='w-4 h-4' />
                  View EIA Reports
                </a>
              </div>

              {/* ESG Policies */}
              <div className='bg-white p-6 rounded-xl hover-effect'>
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <Shield className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold text-primary'>ESG Policies</h3>
                </div>
                <ul className='text-gray-text text-sm space-y-2 mb-4'>
                  <li className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span>Environmental Policy Framework</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span>Social Responsibility Guidelines</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span>Corporate Governance Standards</span>
                  </li>
                </ul>
                <a 
                  href='/documents/esg-policies-framework-2024.html'
                  target='_blank'
                  className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary transition-all duration-200'
                >
                  <ArrowRight className='w-4 h-4' />
                  View ESG Policies
                </a>
              </div>

              {/* Sustainability Reports */}
              <div className='bg-white p-6 rounded-xl hover-effect'>
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <BarChart3 className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold text-primary'>Sustainability Reports</h3>
                </div>
                <ul className='text-gray-text text-sm space-y-2 mb-4'>
                  <li className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span>Annual Sustainability Report 2024</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span>Carbon Footprint Analysis</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span>Environmental Performance Metrics</span>
                  </li>
                </ul>
                <a 
                  href='/documents/sustainability-report-2024.html'
                  target='_blank'
                  className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary transition-all duration-200'
                >
                  <ArrowRight className='w-4 h-4' />
                  View Reports
                </a>
              </div>

              {/* Compliance Documents */}
              <div className='bg-white p-6 rounded-xl hover-effect'>
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <CheckCircle className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold text-primary'>Compliance Documents</h3>
                </div>
                <ul className='text-gray-text text-sm space-y-2 mb-4'>
                  <li className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span>Regulatory Compliance Certificates</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span>Environmental Permits</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span>Safety Compliance Reports</span>
                  </li>
                </ul>
                <a 
                  href='/documents/compliance-documents-2024.html'
                  target='_blank'
                  className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary transition-all duration-200'
                >
                  <ArrowRight className='w-4 h-4' />
                  View Compliance
                </a>
              </div>

              {/* Monitoring Data */}
              <div className='bg-white p-6 rounded-xl hover-effect'>
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <Activity className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold text-primary'>Monitoring Data</h3>
                </div>
                <ul className='text-gray-text text-sm space-y-2 mb-4'>
                  <li className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span>Real-time Environmental Monitoring</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span>Air Quality Measurements</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span>Noise Level Assessments</span>
                  </li>
                </ul>
                <a 
                  href='/documents/environmental-monitoring-data-2024.html'
                  target='_blank'
                  className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary transition-all duration-200'
                >
                  <ArrowRight className='w-4 h-4' />
                  View Data
                </a>
              </div>

              {/* Research & Studies */}
              <div className='bg-white p-6 rounded-xl hover-effect'>
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <BookOpen className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold text-primary'>Research & Studies</h3>
                </div>
                <ul className='text-gray-text text-sm space-y-2 mb-4'>
                  <li className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span>Environmental Technology Studies</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span>Climate Impact Research</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span>Sustainability Best Practices</span>
                  </li>
                </ul>
                <a 
                  href='/documents/research-studies-2024.html'
                  target='_blank'
                  className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary transition-all duration-200'
                >
                  <ArrowRight className='w-4 h-4' />
                  View Research
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='section-padding bg-primary text-white'>
        <div className='container text-center'>
          <h2 className='text-3xl font-bold mb-4'>Need More Information?</h2>
          <div className='w-24 h-1 bg-white mx-auto mb-8'></div>
          <p className='text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed'>
            Contact our environmental team for detailed information about our ESG practices, compliance procedures, or to request specific documentation.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <Link
              href='/contact'
              className='bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover-effect transition-all duration-200 flex items-center gap-2'
            >
              Contact Environmental Team
              <ArrowRight className='w-5 h-5' />
            </Link>
            <Link
              href='/about/learn-more'
              className='border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-300 transition-all duration-200 flex items-center gap-2'
            >
              Learn More About ESG
              <ArrowRight className='w-5 h-5' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 