import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  Award, 
  Users, 
  Globe,
  CheckCircle2,
  Clock,
  MapPin,
  Zap,
  Building2,
  BarChart3
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'KPP Project Showcase - Deep Engineering',
  description: 'Explore the revolutionary Kinetic Power Plant (KPP) project - Iraq\'s flagship renewable energy initiative. Discover progress, achievements, and the path to sustainable energy independence.',
  keywords: 'KPP project, kinetic power plant Iraq, renewable energy project, sustainable energy Iraq, project showcase, energy independence',
  openGraph: {
    title: 'KPP Project Showcase - Revolutionary Renewable Energy in Iraq',
    description: 'Explore the revolutionary Kinetic Power Plant (KPP) project - Iraq\'s flagship renewable energy initiative.',
    url: 'https://deepengineering.co/projects/kpp-project',
    images: [
      {
        url: '/kpp-project-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KPP Project Showcase',
      },
    ],
  },
  twitter: {
    title: 'KPP Project Showcase - Revolutionary Renewable Energy in Iraq',
    description: 'Explore the revolutionary Kinetic Power Plant (KPP) project - Iraq\'s flagship renewable energy initiative.',
  },
  alternates: {
    canonical: '/projects/kpp-project',
  },
};

const projectMilestones = [
  {
    date: '2023 Q1',
    title: 'Project Initiation',
    description: 'Project conceptualization and initial feasibility studies completed',
    status: 'completed',
    icon: <CheckCircle2 className="w-6 h-6" />
  },
  {
    date: '2023 Q2',
    title: 'Technical Validation',
    description: 'KPP technology validated by international certification bodies (TÜV/SGS/DEKRA)',
    status: 'completed',
    icon: <Award className="w-6 h-6" />
  },
  {
    date: '2023 Q3',
    title: 'Government Approval',
    description: 'Received official government approval and regulatory clearances',
    status: 'completed',
    icon: <CheckCircle2 className="w-6 h-6" />
  },
  {
    date: '2023 Q4',
    title: 'Site Selection',
    description: 'Strategic site identification and environmental impact assessment',
    status: 'completed',
    icon: <MapPin className="w-6 h-6" />
  },
  {
    date: '2024 Q1',
    title: 'Engineering Design',
    description: 'Detailed engineering design and component specification',
    status: 'in-progress',
    icon: <Building2 className="w-6 h-6" />
  },
  {
    date: '2024 Q2',
    title: 'Manufacturing Phase',
    description: 'Component manufacturing and quality assurance processes',
    status: 'pending',
    icon: <Zap className="w-6 h-6" />
  },
  {
    date: '2024 Q3',
    title: 'Installation & Testing',
    description: 'System installation, commissioning, and performance testing',
    status: 'pending',
    icon: <BarChart3 className="w-6 h-6" />
  },
  {
    date: '2024 Q4',
    title: 'Commercial Operation',
    description: 'Full commercial operation and grid integration',
    status: 'pending',
    icon: <TrendingUp className="w-6 h-6" />
  }
];

const keyAchievements = [
  {
    title: 'International Certification',
    description: 'KPP technology validated by TÜV, SGS, and DEKRA - world-leading certification bodies',
    icon: <Award className="w-8 h-8" />,
    metric: '3 Certifications'
  },
  {
    title: 'Government Support',
    description: 'Full government approval and regulatory clearance for project implementation',
    icon: <CheckCircle2 className="w-8 h-8" />,
    metric: '100% Approved'
  },
  {
    title: 'Environmental Compliance',
    description: 'Zero-emission technology with comprehensive environmental impact assessment',
    icon: <Globe className="w-8 h-8" />,
    metric: 'Zero Emissions'
  },
  {
    title: 'Economic Impact',
    description: 'Projected to create 500+ direct jobs and 2000+ indirect employment opportunities',
    icon: <Users className="w-8 h-8" />,
    metric: '2500+ Jobs'
  }
];

const projectMetrics = [
  {
    label: 'Project Value',
    value: '$150M',
    description: 'Total project investment',
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    label: 'Power Output',
    value: '500 MW',
    description: 'Total installed capacity',
    icon: <Zap className="w-6 h-6" />
  },
  {
    label: 'Timeline',
    value: '18 Months',
    description: 'From construction to operation',
    icon: <Clock className="w-6 h-6" />
  },
  {
    label: 'CO₂ Reduction',
    value: '2.5M Tons',
    description: 'Annual CO₂ emissions avoided',
    icon: <Globe className="w-6 h-6" />
  }
];

export default function KPPProjectPage() {
  return (
    <div>
      <HeroSection
        title="KPP Project Showcase"
        subtitle="Iraq's Revolutionary Renewable Energy Initiative - Transforming the Future of Power Generation"
      />

      {/* Executive Summary */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Executive Summary</h2>
              <p className="text-lg text-gray-text mb-6">
                The Kinetic Power Plant (KPP) project represents Iraq's most ambitious renewable energy initiative, 
                designed to deliver 500 MW of continuous, zero-emission power generation. This flagship project 
                demonstrates Iraq's commitment to energy independence and environmental sustainability.
              </p>
              <p className="text-gray-text mb-6">
                With international technology validation, government approval, and comprehensive environmental 
                compliance, the KPP project is positioned to transform Iraq's energy landscape while creating 
                significant economic opportunities and reducing carbon emissions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/technology"
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 text-center"
                >
                  Learn About Technology
                </Link>
                <Link 
                  href="/dashboard/project-progress"
                  className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors duration-200 text-center"
                >
                  View Progress Dashboard
                </Link>
              </div>
            </div>
            <div className="bg-gray-light p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6">Project Overview</h3>
              <div className="space-y-4">
                {projectMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                        <div className="text-white">
                          {metric.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold">{metric.label}</h4>
                        <p className="text-sm text-gray-text">{metric.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{metric.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Timeline */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Project Timeline</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              The KPP project follows a structured timeline from concept to commercial operation, 
              ensuring quality, compliance, and successful delivery.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30"></div>
              
              <div className="space-y-8">
                {projectMilestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start">
                    {/* Timeline Dot */}
                    <div className={`absolute left-6 w-4 h-4 rounded-full border-4 border-white ${
                      milestone.status === 'completed' ? 'bg-green-500' : 
                      milestone.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}></div>
                    
                    <div className="ml-16 flex-1">
                      <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                              <div className="text-white">
                                {milestone.icon}
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{milestone.title}</h3>
                              <p className="text-sm text-gray-text">{milestone.date}</p>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            milestone.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            milestone.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {milestone.status.replace('-', ' ').toUpperCase()}
                          </div>
                        </div>
                        <p className="text-gray-text">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Key Achievements</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              The KPP project has achieved significant milestones that demonstrate its viability, 
              compliance, and potential impact on Iraq's energy future.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyAchievements.map((achievement, index) => (
              <div key={index} className="text-center bg-gray-light p-6 rounded-lg">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">
                    {achievement.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                <p className="text-gray-text mb-4">{achievement.description}</p>
                <div className="text-2xl font-bold text-primary">{achievement.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Tracking */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Project Progress</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Real-time tracking of project milestones, deliverables, and key performance indicators.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Overall Progress */}
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6">Overall Progress</h3>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Project Completion</span>
                  <span className="text-primary font-bold">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-primary h-3 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Planning Phase</span>
                  <span className="text-green-600 font-semibold">100%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Design Phase</span>
                  <span className="text-yellow-600 font-semibold">75%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Construction Phase</span>
                  <span className="text-gray-600 font-semibold">0%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Commissioning</span>
                  <span className="text-gray-600 font-semibold">0%</span>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6">Key Performance Indicators</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Budget Utilization</span>
                    <span className="text-primary font-bold">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Schedule Adherence</span>
                    <span className="text-green-600 font-bold">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Quality Score</span>
                    <span className="text-blue-600 font-bold">98%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Safety Performance</span>
                    <span className="text-green-600 font-bold">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
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
          <h2 className="mb-4">Join the Energy Revolution</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            The KPP project represents the future of sustainable energy in Iraq and beyond. 
            Stay updated on our progress and learn how you can be part of this transformative initiative.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Get Involved
            </Link>
            <Link 
              href="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-200"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 