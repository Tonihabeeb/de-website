import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import {
  Building2,
  Users,
  Target,
  Award,
  CheckCircle2,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Clock,
  BarChart3,
  FileText,
  Eye,
  Heart,
  Brain,
  Activity,
  Settings,
  Wrench,
  Truck,
  HardHat,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'EPC Services | Deep Engineering',
  description:
    'Comprehensive Engineering, Procurement, and Construction (EPC) services for renewable energy projects. Expert project delivery with proven track record and quality assurance.',
  keywords:
    'EPC services, engineering procurement construction, renewable energy EPC, project delivery, Deep Engineering, KPP construction',
  openGraph: {
    title: 'EPC Services - Deep Engineering',
    description:
      'Comprehensive Engineering, Procurement, and Construction services for renewable energy projects.',
    url: 'https://deepengineering.co/services/epc',
  },
};

const epcCapabilities = [
  {
    category: 'Engineering',
    capabilities: [
      {
        name: 'Detailed Design Engineering',
        description: 'Comprehensive technical design and engineering solutions',
        icon: <Settings className='w-6 h-6' />,
      },
      {
        name: 'System Integration',
        description: 'Seamless integration of KPP components and systems',
        icon: <Zap className='w-6 h-6' />,
      },
      {
        name: 'Civil & Structural Engineering',
        description: 'Foundation design and structural analysis',
        icon: <Building2 className='w-6 h-6' />,
      },
      {
        name: 'Electrical & Control Systems',
        description: 'Power distribution and automation systems',
        icon: <Brain className='w-6 h-6' />,
      },
    ],
  },
  {
    category: 'Procurement',
    capabilities: [
      {
        name: 'Strategic Sourcing',
        description: 'Global supply chain management and vendor selection',
        icon: <Globe className='w-6 h-6' />,
      },
      {
        name: 'Quality Assurance',
        description: 'Rigorous quality control and testing protocols',
        icon: <Award className='w-6 h-6' />,
      },
      {
        name: 'Logistics Management',
        description: 'Efficient transportation and delivery coordination',
        icon: <Truck className='w-6 h-6' />,
      },
      {
        name: 'Inventory Management',
        description: 'Optimized material tracking and storage',
        icon: <Eye className='w-6 h-6' />,
      },
    ],
  },
  {
    category: 'Construction',
    capabilities: [
      {
        name: 'Site Preparation',
        description: 'Comprehensive site development and infrastructure',
        icon: <HardHat className='w-6 h-6' />,
      },
      {
        name: 'Equipment Installation',
        description: 'Precision installation of KPP components',
        icon: <Wrench className='w-6 h-6' />,
      },
      {
        name: 'Commissioning & Testing',
        description: 'System validation and performance testing',
        icon: <CheckCircle2 className='w-6 h-6' />,
      },
      {
        name: 'Safety Management',
        description: 'Zero-harm construction practices and protocols',
        icon: <Shield className='w-6 h-6' />,
      },
    ],
  },
];

const contractorProfiles = [
  {
    name: 'Deep Engineering Core Team',
    specialization: 'KPP Technology & Integration',
    experience: '15+ years',
    projects: '50+ KPP installations',
    strengths: [
      'Technology Expertise',
      'System Integration',
      'Quality Assurance',
    ],
    icon: <Users className='w-8 h-8' />,
  },
  {
    name: 'International Engineering Partners',
    specialization: 'Civil & Structural Engineering',
    experience: '25+ years',
    projects: '200+ infrastructure projects',
    strengths: [
      'Structural Design',
      'Foundation Engineering',
      'International Standards',
    ],
    icon: <Building2 className='w-8 h-8' />,
  },
  {
    name: 'Local Construction Partners',
    specialization: 'Site Development & Construction',
    experience: '20+ years',
    projects: '150+ construction projects',
    strengths: [
      'Local Expertise',
      'Workforce Development',
      'Community Relations',
    ],
    icon: <HardHat className='w-8 h-8' />,
  },
  {
    name: 'Quality Assurance Partners',
    specialization: 'Testing & Certification',
    experience: '30+ years',
    projects: '1000+ certifications',
    strengths: [
      'International Standards',
      'Testing Protocols',
      'Regulatory Compliance',
    ],
    icon: <Award className='w-8 h-8' />,
  },
];

const projectDeliveryMethodology = [
  {
    phase: 'Project Initiation',
    description: 'Comprehensive project planning and stakeholder alignment',
    activities: [
      'Project scope definition and planning',
      'Stakeholder engagement and alignment',
      'Risk assessment and mitigation planning',
      'Resource allocation and team formation',
    ],
    duration: '2-4 weeks',
  },
  {
    phase: 'Engineering & Design',
    description: 'Detailed technical design and engineering solutions',
    activities: [
      'Detailed engineering design',
      'Technical specifications development',
      'Equipment selection and procurement planning',
      'Quality assurance framework establishment',
    ],
    duration: '8-12 weeks',
  },
  {
    phase: 'Procurement & Logistics',
    description: 'Strategic sourcing and supply chain management',
    activities: [
      'Vendor selection and contract negotiation',
      'Equipment procurement and quality control',
      'Logistics planning and coordination',
      'Inventory management and tracking',
    ],
    duration: '12-16 weeks',
  },
  {
    phase: 'Construction & Installation',
    description: 'Site development and equipment installation',
    activities: [
      'Site preparation and infrastructure development',
      'Equipment installation and system integration',
      'Safety management and quality control',
      'Progress monitoring and reporting',
    ],
    duration: '16-24 weeks',
  },
  {
    phase: 'Commissioning & Handover',
    description: 'System validation and project completion',
    activities: [
      'System testing and commissioning',
      'Performance validation and optimization',
      'Training and documentation',
      'Project handover and warranty support',
    ],
    duration: '4-6 weeks',
  },
];

const qualityAssuranceProcesses = [
  {
    category: 'Design Quality',
    processes: [
      'Comprehensive design reviews and validation',
      'International standards compliance verification',
      'Peer review and expert consultation',
      'Design optimization and value engineering',
    ],
  },
  {
    category: 'Procurement Quality',
    processes: [
      'Vendor qualification and assessment',
      'Material testing and certification',
      'Quality control inspections',
      'Supply chain traceability',
    ],
  },
  {
    category: 'Construction Quality',
    processes: [
      'Quality control inspections and testing',
      'Safety audits and compliance monitoring',
      'Progress tracking and milestone validation',
      'Defect prevention and correction',
    ],
  },
  {
    category: 'Commissioning Quality',
    processes: [
      'System performance testing and validation',
      'Operational readiness assessment',
      'Documentation and training verification',
      'Warranty and support establishment',
    ],
  },
];

const performanceMetrics = [
  {
    category: 'Project Delivery',
    metrics: [
      {
        label: 'On-Time Delivery',
        value: '95%',
        description: 'Projects completed within schedule',
      },
      {
        label: 'On-Budget Delivery',
        value: '98%',
        description: 'Projects completed within budget',
      },
      {
        label: 'Quality Score',
        value: '99%',
        description: 'Quality compliance rate',
      },
      {
        label: 'Safety Performance',
        value: '100%',
        description: 'Zero safety incidents',
      },
    ],
  },
  {
    category: 'Client Satisfaction',
    metrics: [
      {
        label: 'Client Satisfaction',
        value: '98%',
        description: 'Client satisfaction rate',
      },
      {
        label: 'Repeat Business',
        value: '85%',
        description: 'Repeat client rate',
      },
      {
        label: 'Referral Rate',
        value: '90%',
        description: 'Client referral rate',
      },
      {
        label: 'Warranty Claims',
        value: '<1%',
        description: 'Warranty claim rate',
      },
    ],
  },
];

export default function EPCServicesPage() {
  return (
    <div>
      <HeroSection
        title='EPC Services'
        subtitle='Comprehensive Engineering, Procurement, and Construction services for renewable energy projects. Expert project delivery with proven track record and quality assurance.'
      />

      {/* EPC Overview */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='mb-6'>Comprehensive EPC Solutions</h2>
              <p className="text-lg text-white">
                Deep Engineering provides end-to-end Engineering, Procurement,
                and Construction (EPC) services for renewable energy projects,
                with specialized expertise in Kinetic Power Plant (KPP)
                technology.
              </p>
              <p className="text-white">
                Our integrated approach ensures seamless project delivery from
                concept to commissioning, with rigorous quality assurance and
                proven performance track record.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Link
                  href='/technology'
                  className="bg-gradient-to-b from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 active:from-blue-900 active:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none transition-colors duration-200 text-center text-white"
                >
                  Learn About KPP Technology
                </Link>
                <Link
                  href='/contact'
                  className='border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors duration-200 text-center'
                >
                  Request EPC Quote
                </Link>
              </div>
            </div>
            <div className='bg-gray-light p-8 rounded-lg'>
              <h3 className='text-xl font-semibold mb-6'>
                EPC Service Highlights
              </h3>
              <div className='space-y-4'>
                <div className='flex items-center'>
                  <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4'>
                    <div className='text-white'>
                      <Target className='w-6 h-6' />
                    </div>
                  </div>
                  <div>
                    <h4 className='font-semibold'>Turnkey Solutions</h4>
                    <p className="text-sm text-white">
                      Complete project delivery from design to operation
                    </p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4'>
                    <div className='text-white'>
                      <Award className='w-6 h-6' />
                    </div>
                  </div>
                  <div>
                    <h4 className='font-semibold'>Quality Assurance</h4>
                    <p className="text-sm text-white">
                      Rigorous quality control and international standards
                    </p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4'>
                    <div className='text-white'>
                      <Clock className='w-6 h-6' />
                    </div>
                  </div>
                  <div>
                    <h4 className='font-semibold'>Timely Delivery</h4>
                    <p className="text-sm text-white">
                      95% on-time project completion rate
                    </p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4'>
                    <div className='text-white'>
                      <Shield className='w-6 h-6' />
                    </div>
                  </div>
                  <div>
                    <h4 className='font-semibold'>Safety First</h4>
                    <p className="text-sm text-white">
                      Zero-harm safety culture and protocols
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EPC Capabilities */}
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>EPC Capabilities</h2>
            <p className="text-lg text-white">
              Comprehensive capabilities across Engineering, Procurement, and
              Construction phases, ensuring successful project delivery and
              optimal performance.
            </p>
          </div>

          <div className='space-y-8'>
            {epcCapabilities.map((category, index) => (
              <div key={index} className='bg-white p-8 rounded-lg shadow-sm'>
                <h3 className='text-xl font-semibold mb-6 text-center'>
                  {category.category}
                </h3>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                  {category.capabilities.map((capability, capabilityIndex) => (
                    <div
                      key={capabilityIndex}
                      className='text-center p-4 bg-gray-light rounded-lg'
                    >
                      <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3'>
                        <div className='text-white'>{capability.icon}</div>
                      </div>
                      <h4 className='font-semibold text-sm mb-2'>
                        {capability.name}
                      </h4>
                      <p className="text-xs text-white">
                        {capability.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contractor Profiles */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Contractor Profiles & Capabilities</h2>
            <p className="text-lg text-white">
              Our network of specialized contractors brings decades of combined
              experience in renewable energy projects and international best
              practices.
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {contractorProfiles.map((contractor, index) => (
              <div key={index} className='bg-gray-light p-6 rounded-lg'>
                <div className='flex items-start mb-4'>
                  <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0'>
                    <div className='text-white'>{contractor.icon}</div>
                  </div>
                  <div>
                    <h3 className='font-semibold text-lg'>{contractor.name}</h3>
                    <p className="text-sm text-white">
                      {contractor.specialization}
                    </p>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4 mb-4'>
                  <div>
                    <h4 className='font-semibold text-sm'>Experience</h4>
                    <p className="text-sm text-white">
                      {contractor.experience}
                    </p>
                  </div>
                  <div>
                    <h4 className='font-semibold text-sm'>Projects</h4>
                    <p className="text-sm text-white">
                      {contractor.projects}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className='font-semibold text-sm mb-2'>Key Strengths</h4>
                  <div className='flex flex-wrap gap-2'>
                    {contractor.strengths.map((strength, strengthIndex) => (
                      <span
                        key={strengthIndex}
                        className='px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium'
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Delivery Methodology */}
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Project Delivery Methodology</h2>
            <p className="text-lg text-white">
              Our proven project delivery methodology ensures successful
              execution through structured phases and comprehensive quality
              control.
            </p>
          </div>

          <div className='max-w-4xl mx-auto'>
            <div className='relative'>
              {/* Timeline Line */}
              <div className='absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30'></div>

              <div className='space-y-8'>
                {projectDeliveryMethodology.map((phase, index) => (
                  <div key={index} className='relative flex items-start'>
                    {/* Timeline Dot */}
                    <div className='absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-white'></div>

                    <div className='ml-16 flex-1'>
                      <div className='bg-white p-6 rounded-lg shadow-sm'>
                        <div className='flex items-center justify-between mb-3'>
                          <div className='flex items-center'>
                            <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3'>
                              <div className='text-white font-bold text-sm'>
                                {index + 1}
                              </div>
                            </div>
                            <div>
                              <h3 className='font-semibold text-lg'>
                                {phase.phase}
                              </h3>
                              <p className="text-sm text-white">
                                {phase.description}
                              </p>
                            </div>
                          </div>
                          <div className='text-right'>
                            <span className='px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold'>
                              {phase.duration}
                            </span>
                          </div>
                        </div>
                        <ul className='space-y-2'>
                          {phase.activities.map((activity, activityIndex) => (
                            <li
                              key={activityIndex}
                              className='flex items-start'
                            >
                              <div className='w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0'></div>
                              <span className="text-sm text-white">
                                {activity}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance Processes */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Quality Assurance Processes</h2>
            <p className="text-lg text-white">
              Comprehensive quality assurance processes ensure consistent
              delivery of high-quality solutions that meet international
              standards and client expectations.
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {qualityAssuranceProcesses.map((category, index) => (
              <div key={index} className='bg-gray-light p-6 rounded-lg'>
                <h3 className='text-xl font-semibold mb-4'>
                  {category.category}
                </h3>
                <ul className='space-y-3'>
                  {category.processes.map((process, processIndex) => (
                    <li key={processIndex} className='flex items-start'>
                      <div className='w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0'></div>
                      <span className="text-white">{process}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Track Record */}
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Performance Track Record</h2>
            <p className="text-lg text-white">
              Proven performance metrics demonstrate our commitment to
              excellence and successful project delivery across all EPC
              services.
            </p>
          </div>

          <div className='space-y-8'>
            {performanceMetrics.map((category, index) => (
              <div key={index} className='bg-white p-8 rounded-lg shadow-sm'>
                <h3 className='text-xl font-semibold mb-6 text-center'>
                  {category.category}
                </h3>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                  {category.metrics.map((metric, metricIndex) => (
                    <div
                      key={metricIndex}
                      className='text-center p-4 bg-gray-light rounded-lg'
                    >
                      <div className='text-2xl font-bold text-primary mb-2'>
                        {metric.value}
                      </div>
                      <h4 className='font-semibold text-sm mb-2'>
                        {metric.label}
                      </h4>
                      <p className="text-xs text-white">
                        {metric.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='section-padding bg-primary text-white'>
        <div className='container text-center'>
          <h2 className='mb-4'>Ready to Start Your EPC Project?</h2>
          <p className='text-lg mb-8 max-w-3xl mx-auto'>
            Deep Engineering's EPC services provide comprehensive project
            delivery with proven track record, quality assurance, and expert
            execution. Let's discuss your project requirements.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/contact'
              className='bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200'
            >
              Get EPC Quote
            </Link>
            <Link
              href='/projects/kpp-project'
              className='border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-200'
            >
              View KPP Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
