import { Metadata } from 'next';
import { 
  Globe, 
  Handshake, 
  Scale,
  Award,
  TrendingUp,
  Users,
  Shield,
  Leaf,
  Target,
  BarChart3,
  CheckCircle2,
  FileText,
  Eye,
  Zap
} from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';

export const metadata: Metadata = {
  title: 'ESG Excellence | Deep Engineering',
  description: 'Deep Engineering\'s comprehensive Environmental, Social, and Governance framework - driving sustainable impact through KPP technology and responsible business practices.',
  keywords: 'ESG, environmental, social, governance, sustainability, Deep Engineering, KPP, renewable energy, carbon neutrality',
  openGraph: {
    title: 'ESG Excellence - Deep Engineering',
    description: 'Comprehensive Environmental, Social, and Governance framework driving sustainable impact.',
    url: 'https://deepengineering.co/about/esg',
  },
};

const esgMetrics = [
  {
    category: 'Environmental',
    metrics: [
      { label: 'CO₂ Emissions Avoided', value: '2.5M Tons/Year', icon: <Leaf className="w-5 h-5" /> },
      { label: 'Renewable Energy Generation', value: '500 MW', icon: <Zap className="w-5 h-5" /> },
      { label: 'Water Conservation', value: 'Zero Consumption', icon: <Globe className="w-5 h-5" /> },
      { label: 'Land Footprint', value: '300 m²/MW', icon: <Target className="w-5 h-5" /> }
    ]
  },
  {
    category: 'Social',
    metrics: [
      { label: 'Direct Jobs Created', value: '500+', icon: <Users className="w-5 h-5" /> },
      { label: 'Indirect Employment', value: '2000+', icon: <Handshake className="w-5 h-5" /> },
      { label: 'Local Community Projects', value: '15+', icon: <Award className="w-5 h-5" /> },
      { label: 'Skills Development Programs', value: '1000+', icon: <TrendingUp className="w-5 h-5" /> }
    ]
  },
  {
    category: 'Governance',
    metrics: [
      { label: 'International Certifications', value: '3 (TÜV/SGS/DEKRA)', icon: <Shield className="w-5 h-5" /> },
      { label: 'Government Approvals', value: '100%', icon: <CheckCircle2 className="w-5 h-5" /> },
      { label: 'Compliance Score', value: '98%', icon: <BarChart3 className="w-5 h-5" /> },
      { label: 'Transparency Index', value: '95%', icon: <Eye className="w-5 h-5" /> }
    ]
  }
];

const eiaFindings = [
  {
    category: 'Air Quality Impact',
    findings: [
      'Zero air emissions from KPP operation',
      'No combustion processes involved',
      'Eliminates 2.5 million tons of CO₂ annually',
      'No NOx, SOx, or particulate matter emissions'
    ]
  },
  {
    category: 'Water Resources',
    findings: [
      'Closed-loop water system with zero consumption',
      'No water pollution or discharge',
      'Minimal evaporation through underground siting',
      'No impact on local water resources'
    ]
  },
  {
    category: 'Land Use & Biodiversity',
    findings: [
      'Compact footprint: 300 m² per MW vs 10,000+ m² for alternatives',
      'Minimal land disturbance during construction',
      'No habitat destruction or biodiversity impact',
      'Compatible with agricultural land use'
    ]
  },
  {
    category: 'Noise & Visual Impact',
    findings: [
      'Low noise operation (below 45 dB at 100m)',
      'Minimal visual impact with underground option',
      'No light pollution or visual disturbance',
      'Compatible with urban and rural settings'
    ]
  }
];

const complianceReports = [
  {
    title: 'Environmental Impact Assessment',
    description: 'Comprehensive EIA report demonstrating zero environmental impact',
    status: 'Approved',
    date: '2023 Q3',
    icon: <FileText className="w-6 h-6" />
  },
  {
    title: 'International Technology Validation',
    description: 'TÜV, SGS, and DEKRA certification of KPP technology',
    status: 'Certified',
    date: '2023 Q2',
    icon: <Award className="w-6 h-6" />
  },
  {
    title: 'Government Regulatory Compliance',
    description: 'Full compliance with Iraqi energy and environmental regulations',
    status: 'Compliant',
    date: '2023 Q3',
    icon: <CheckCircle2 className="w-6 h-6" />
  },
  {
    title: 'Safety & Health Assessment',
    description: 'Comprehensive HSE assessment and safety protocols',
    status: 'Approved',
    date: '2023 Q4',
    icon: <Shield className="w-6 h-6" />
  }
];

export default function ESGPage() {
  return (
    <div>
      <HeroSection
        title="ESG Excellence"
        subtitle="Comprehensive Environmental, Social, and Governance framework driving sustainable impact through revolutionary KPP technology and responsible business practices."
      />
      
      {/* ESG Framework Overview */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our ESG Framework</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Deep Engineering integrates Environmental, Social, and Governance principles into every aspect of our operations, 
              with the KPP project serving as our flagship initiative for sustainable development.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Environmental */}
            <div className="bg-green-50 p-8 rounded-lg border border-green-200">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Environmental</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Zero Emissions Technology</h4>
                  <p className="text-gray-600 text-sm">
                    KPP technology operates with zero emissions, no fuel consumption, and no environmental pollution.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Carbon Neutrality</h4>
                  <p className="text-gray-600 text-sm">
                    Each KPP module prevents 2.5 million tons of CO₂ emissions annually, contributing to Iraq's climate goals.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Sustainable Innovation</h4>
                  <p className="text-gray-600 text-sm">
                    Revolutionary technology that transforms renewable energy generation while protecting natural resources.
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
                  <h4 className="font-semibold text-gray-900 mb-2">Economic Development</h4>
                  <p className="text-gray-600 text-sm">
                    Creating 2,500+ direct and indirect jobs, supporting local communities and economic growth.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Energy Independence</h4>
                  <p className="text-gray-600 text-sm">
                    Providing reliable, affordable energy to Iraqi communities, reducing energy poverty.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Skills Development</h4>
                  <p className="text-gray-600 text-sm">
                    Comprehensive training programs for local workforce in renewable energy technology.
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
                  <h4 className="font-semibold text-gray-900 mb-2">International Standards</h4>
                  <p className="text-gray-600 text-sm">
                    Compliance with international certification standards (TÜV, SGS, DEKRA) and best practices.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Transparency</h4>
                  <p className="text-gray-600 text-sm">
                    Open communication and regular reporting on ESG performance, progress, and impact.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Ethical Leadership</h4>
                  <p className="text-gray-600 text-sm">
                    Upholding highest ethical standards in all business operations and stakeholder relationships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESG Performance Metrics */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">ESG Performance Metrics</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Quantified impact of our ESG initiatives through the KPP project and corporate operations.
            </p>
          </div>
          
          <div className="space-y-8">
            {esgMetrics.map((category, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-6 text-center">{category.category} Impact</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-center p-4 bg-gray-light rounded-lg">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                        <div className="text-white">
                          {metric.icon}
                        </div>
                      </div>
                      <h4 className="font-semibold text-sm mb-2">{metric.label}</h4>
                      <div className="text-xl font-bold text-primary">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Impact Assessment */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Environmental Impact Assessment</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Comprehensive EIA findings demonstrate the KPP project's minimal environmental footprint 
              and positive contribution to sustainability goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {eiaFindings.map((category, index) => (
              <div key={index} className="bg-gray-light p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                <ul className="space-y-3">
                  {category.findings.map((finding, findingIndex) => (
                    <li key={findingIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-text">{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Reporting */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Compliance & Reporting</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Our commitment to transparency and regulatory compliance is demonstrated through comprehensive 
              reporting and third-party validations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {complianceReports.map((report, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <div className="text-white">
                      {report.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{report.title}</h3>
                    <p className="text-sm text-gray-text mb-3">{report.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-text">{report.date}</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        {report.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG Commitments & Goals */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">ESG Commitments & Goals</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Our roadmap for continuous improvement and sustainable development through 2030.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-light p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6">Short-term Goals (2024-2025)</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">KPP Project Implementation</h4>
                    <p className="text-sm text-gray-text">Complete 500 MW KPP installation and commissioning</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Workforce Development</h4>
                    <p className="text-sm text-gray-text">Train 1000+ local workers in renewable energy technology</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Community Programs</h4>
                    <p className="text-sm text-gray-text">Launch 15+ community development and education initiatives</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">ESG Reporting Framework</h4>
                    <p className="text-sm text-gray-text">Establish comprehensive ESG monitoring and reporting system</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-light p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6">Long-term Vision (2030)</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">National Energy Transformation</h4>
                    <p className="text-sm text-gray-text">Deploy 5 GW of KPP capacity across Iraq</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Carbon Neutrality Leadership</h4>
                    <p className="text-sm text-gray-text">Achieve net-zero carbon emissions for all operations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Regional Expansion</h4>
                    <p className="text-sm text-gray-text">Export KPP technology to neighboring countries</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Industry Standards</h4>
                    <p className="text-sm text-gray-text">Set new industry standards for renewable energy ESG practices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary text-white">
        <div className="container text-center">
          <h2 className="mb-4">Join Our Sustainable Future</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Deep Engineering is committed to leading the transition to sustainable energy through 
            innovative technology and responsible business practices. Learn more about our ESG initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/about/hse"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Health & Safety
            </a>
            <a 
              href="/projects/kpp-project"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-200"
            >
              KPP Project
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 