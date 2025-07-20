import { Metadata } from 'next';
import { 
  Shield, 
  Leaf, 
  TrendingUp,
  Users,
  CheckCircle,
  AlertTriangle,
  FileText,
  Award,
  BarChart3,
  Globe,
  Zap,
  Target,
  Eye,
  Clock,
  MapPin,
  Heart,
  Brain,
  Activity
} from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';

export const metadata: Metadata = {
  title: 'Health, Safety & Environment | Deep Engineering',
  description: 'Comprehensive Health, Safety, and Environment framework ensuring zero harm to people and planet through KPP technology and responsible practices.',
  keywords: 'HSE, health, safety, environment, workplace safety, Deep Engineering, KPP, zero emissions, occupational health',
  openGraph: {
    title: 'Health, Safety & Environment - Deep Engineering',
    description: 'Comprehensive HSE framework ensuring zero harm to people and planet.',
    url: 'https://deepengineering.co/about/hse',
  },
};

const hseMetrics = [
  {
    category: 'Health',
    metrics: [
      { label: 'Occupational Health Score', value: '98%', icon: <Heart className="w-5 h-5" /> },
      { label: 'Mental Health Support', value: '100%', icon: <Brain className="w-5 h-5" /> },
      { label: 'Preventive Care Programs', value: '15+', icon: <Activity className="w-5 h-5" /> },
      { label: 'Health Screenings', value: 'Quarterly', icon: <Eye className="w-5 h-5" /> }
    ]
  },
  {
    category: 'Safety',
    metrics: [
      { label: 'Lost Time Injury Rate', value: '0.0', icon: <Shield className="w-5 h-5" /> },
      { label: 'Safety Training Hours', value: '5000+', icon: <Users className="w-5 h-5" /> },
      { label: 'Safety Audits Completed', value: '200+', icon: <CheckCircle className="w-5 h-5" /> },
      { label: 'Emergency Drills', value: 'Monthly', icon: <AlertTriangle className="w-5 h-5" /> }
    ]
  },
  {
    category: 'Environment',
    metrics: [
      { label: 'CO₂ Emissions Avoided', value: '2.5M Tons/Year', icon: <Leaf className="w-5 h-5" /> },
      { label: 'Zero Environmental Impact', value: '100%', icon: <Globe className="w-5 h-5" /> },
      { label: 'Water Conservation', value: 'Zero Consumption', icon: <Target className="w-5 h-5" /> },
      { label: 'Land Footprint', value: '300 m²/MW', icon: <MapPin className="w-5 h-5" /> }
    ]
  }
];

const safetyProtocols = [
  {
    category: 'KPP Operation Safety',
    protocols: [
      'Automated safety interlocks and emergency shutdown systems',
      'Real-time monitoring of all critical parameters',
      'Redundant safety systems for fail-safe operation',
      'Comprehensive emergency response procedures'
    ]
  },
  {
    category: 'Construction Safety',
    protocols: [
      'Pre-construction safety planning and risk assessment',
      'Daily safety briefings and toolbox talks',
      'Personal protective equipment (PPE) requirements',
      'Fall protection and confined space entry procedures'
    ]
  },
  {
    category: 'Environmental Safety',
    protocols: [
      'Zero-emission technology eliminates air pollution risks',
      'Closed-loop water system prevents contamination',
      'Spill prevention and response procedures',
      'Environmental monitoring and reporting systems'
    ]
  },
  {
    category: 'Emergency Response',
    protocols: [
      '24/7 emergency response team availability',
      'Automated alarm systems and communication protocols',
      'Evacuation procedures and assembly point management',
      'Coordination with local emergency services'
    ]
  }
];

const complianceDocuments = [
  {
    title: 'Environmental Impact Assessment',
    description: 'Comprehensive EIA demonstrating zero environmental impact of KPP operations',
    status: 'Approved',
    date: '2023 Q3',
    icon: <FileText className="w-6 h-6" />
  },
  {
    title: 'Safety Management System',
    description: 'ISO 45001 certified occupational health and safety management system',
    status: 'Certified',
    date: '2023 Q2',
    icon: <Shield className="w-6 h-6" />
  },
  {
    title: 'Environmental Management System',
    description: 'ISO 14001 certified environmental management system',
    status: 'Certified',
    date: '2023 Q2',
    icon: <Leaf className="w-6 h-6" />
  },
  {
    title: 'Quality Management System',
    description: 'ISO 9001 certified quality management system',
    status: 'Certified',
    date: '2023 Q2',
    icon: <Award className="w-6 h-6" />
  }
];

const environmentalImpact = [
  {
    category: 'Air Quality',
    impacts: [
      'Zero air emissions from KPP operation',
      'No combustion processes or fuel burning',
      'Eliminates 2.5 million tons of CO₂ annually',
      'No NOx, SOx, or particulate matter emissions'
    ]
  },
  {
    category: 'Water Resources',
    impacts: [
      'Closed-loop water system with zero consumption',
      'No water pollution or discharge to environment',
      'Minimal evaporation through underground siting',
      'No impact on local water resources or aquifers'
    ]
  },
  {
    category: 'Land & Biodiversity',
    impacts: [
      'Ultra-compact footprint: 300 m² per MW',
      'Minimal land disturbance during construction',
      'No habitat destruction or biodiversity impact',
      'Compatible with agricultural and urban land use'
    ]
  },
  {
    category: 'Noise & Visual',
    impacts: [
      'Low noise operation (below 45 dB at 100m)',
      'Minimal visual impact with underground option',
      'No light pollution or visual disturbance',
      'Compatible with residential and commercial areas'
    ]
  }
];

export default function HSEPage() {
  return (
    <div>
      <HeroSection
        title="Health, Safety & Environment"
        subtitle="Comprehensive HSE framework ensuring zero harm to people and planet through revolutionary KPP technology and responsible practices."
      />
      
      {/* HSE Framework Overview */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our HSE Framework</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Deep Engineering's comprehensive Health, Safety, and Environment framework ensures the wellbeing 
              of our people and protection of our planet through innovative technology and responsible practices.
            </p>
          </div>
          
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
                    Comprehensive health monitoring, ergonomic assessments, and wellness programs 
                    ensuring optimal employee health and wellbeing.
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
                  <h4 className="font-semibold text-gray-900 mb-2">Zero Harm Culture</h4>
                  <p className="text-gray-600 text-sm">
                    Comprehensive safety protocols, continuous training, and monitoring to achieve zero workplace incidents.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Emergency Response</h4>
                  <p className="text-gray-600 text-sm">
                    Well-trained emergency response teams and clear evacuation procedures for all facilities and operations.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Safety Innovation</h4>
                  <p className="text-gray-600 text-sm">
                    KPP technology eliminates traditional energy generation safety risks through zero-emission operation.
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
                  <h4 className="font-semibold text-gray-900 mb-2">Zero Environmental Impact</h4>
                  <p className="text-gray-600 text-sm">
                    KPP technology operates with zero emissions, zero water consumption, and minimal land footprint.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Climate Action</h4>
                  <p className="text-gray-600 text-sm">
                    Each KPP module prevents 2.5 million tons of CO₂ emissions annually, contributing to climate goals.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Sustainable Innovation</h4>
                  <p className="text-gray-600 text-sm">
                    Revolutionary technology that transforms energy generation while protecting natural resources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HSE Performance Metrics */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">HSE Performance Metrics</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Quantified performance across health, safety, and environmental dimensions, demonstrating our commitment to excellence.
            </p>
          </div>
          
          <div className="space-y-8">
            {hseMetrics.map((category, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-6 text-center">{category.category} Performance</h3>
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

      {/* Safety Protocols & Procedures */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Safety Protocols & Procedures</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Comprehensive safety protocols ensuring zero harm to personnel, communities, and the environment 
              throughout all phases of KPP project implementation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {safetyProtocols.map((category, index) => (
              <div key={index} className="bg-gray-light p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                <ul className="space-y-3">
                  {category.protocols.map((protocol, protocolIndex) => (
                    <li key={protocolIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-text">{protocol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Impact Analysis */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Environmental Impact Analysis</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Comprehensive analysis demonstrating the KPP project's minimal environmental footprint 
              and positive contribution to sustainability goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {environmentalImpact.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                <ul className="space-y-3">
                  {category.impacts.map((impact, impactIndex) => (
                    <li key={impactIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-text">{impact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Documentation */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Compliance & Documentation</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Our commitment to regulatory compliance and international standards is demonstrated through 
              comprehensive documentation and third-party certifications.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {complianceDocuments.map((document, index) => (
              <div key={index} className="bg-gray-light p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <div className="text-white">
                      {document.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{document.title}</h3>
                    <p className="text-sm text-gray-text mb-3">{document.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-text">{document.date}</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        {document.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HSE Programs & Initiatives */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">HSE Programs & Initiatives</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Comprehensive programs ensuring continuous improvement in health, safety, and environmental performance.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6">Training & Education</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Comprehensive Safety Training</h4>
                    <p className="text-sm text-gray-text">Mandatory safety training for all employees and contractors</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">HSE Awareness Programs</h4>
                    <p className="text-sm text-gray-text">Regular awareness campaigns and best practice sharing</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Specialized Training</h4>
                    <p className="text-sm text-gray-text">KPP-specific safety and operational training</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Emergency Response Drills</h4>
                    <p className="text-sm text-gray-text">Monthly emergency response simulations and training</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6">Monitoring & Compliance</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Real-time Monitoring</h4>
                    <p className="text-sm text-gray-text">24/7 monitoring of all critical safety and environmental parameters</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Regular Audits</h4>
                    <p className="text-sm text-gray-text">Quarterly safety and environmental compliance audits</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Health Surveillance</h4>
                    <p className="text-sm text-gray-text">Regular health monitoring and medical surveillance programs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Performance Reporting</h4>
                    <p className="text-sm text-gray-text">Monthly HSE performance metrics and trend analysis</p>
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
          <h2 className="mb-4">Our HSE Commitment</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            We are committed to maintaining the highest standards of health, safety, and environmental protection. 
            Our goal is zero harm to people and planet through innovative technology and responsible practices.
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
      </section>
    </div>
  );
} 