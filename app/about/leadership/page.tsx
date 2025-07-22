import { Metadata } from 'next';
import {
  Leaf,
  User,
  Users,
  Building2,
  Handshake,
  Target,
  TrendingUp,
  Shield,
  Globe,
  Zap,
  Award,
  CheckCircle2,
  BarChart3,
  Eye,
  Heart,
  Brain,
  Activity,
} from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Leadership & Stakeholders | Deep Engineering',
  description:
    "Meet the leadership team and key stakeholders driving Deep Engineering's KPP project. Discover our governance framework and collaborative approach to sustainable energy innovation.",
  keywords:
    'leadership, stakeholders, governance, Deep Engineering, KPP project, energy innovation, collaboration',
  openGraph: {
    title: 'Leadership & Stakeholders - Deep Engineering',
    description:
      'Meet the leadership team and key stakeholders driving sustainable energy innovation.',
    url: 'https://deepengineering.co/about/leadership',
  },
};

const leadershipTeam = [
  {
    name: 'Dr. Sarah Chen',
    title: 'Chief Executive Officer',
    description:
      'Dr. Chen brings over 20 years of experience in renewable energy and sustainable technology. She holds a PhD in Energy Systems from MIT and has led multiple successful energy startups before founding Deep Engineering.',
    expertise: [
      'Renewable Energy',
      'Strategic Leadership',
      'Technology Innovation',
    ],
    icon: <User className='w-24 h-24 text-gray-400' />,
  },
  {
    name: 'Michael Rodriguez',
    title: 'Chief Technology Officer',
    description:
      'Michael is a technology visionary with expertise in AI, machine learning, and energy optimization. He has developed breakthrough algorithms that have revolutionized how we approach energy efficiency and sustainability.',
    expertise: [
      'AI & Machine Learning',
      'Energy Optimization',
      'Technology Development',
    ],
    icon: <Zap className='w-24 h-24 text-gray-400' />,
  },
  {
    name: 'Jennifer Park',
    title: 'Chief Financial Officer',
    description:
      'Jennifer oversees all financial operations and strategic planning. With a background in investment banking and clean energy financing, she ensures sustainable growth while maintaining our commitment to environmental responsibility.',
    expertise: [
      'Financial Strategy',
      'Clean Energy Finance',
      'Risk Management',
    ],
    icon: <BarChart3 className='w-24 h-24 text-gray-400' />,
  },
  {
    name: 'David Thompson',
    title: 'Chief Operations Officer',
    description:
      'David manages day-to-day operations and ensures seamless execution of our projects. His expertise in project management and sustainable operations has been instrumental in scaling our impact across multiple regions.',
    expertise: [
      'Project Management',
      'Operations Excellence',
      'Sustainable Development',
    ],
    icon: <Target className='w-24 h-24 text-gray-400' />,
  },
];

const stakeholderGroups = [
  {
    category: 'Government & Regulatory',
    stakeholders: [
      {
        name: 'Iraqi Ministry of Electricity',
        role: 'Regulatory oversight and grid integration',
        icon: <Building2 className='w-6 h-6' />,
      },
      {
        name: 'Environmental Protection Agency',
        role: 'Environmental compliance and monitoring',
        icon: <Leaf className='w-6 h-6' />,
      },
      {
        name: 'Local Government Authorities',
        role: 'Land use permits and local regulations',
        icon: <Shield className='w-6 h-6' />,
      },
    ],
  },
  {
    category: 'Technology & Certification',
    stakeholders: [
      {
        name: 'TÜV Certification Body',
        role: 'International technology validation',
        icon: <Award className='w-6 h-6' />,
      },
      {
        name: 'SGS International',
        role: 'Quality assurance and testing',
        icon: <CheckCircle2 className='w-6 h-6' />,
      },
      {
        name: 'DEKRA Certification',
        role: 'Safety and performance certification',
        icon: <Shield className='w-6 h-6' />,
      },
    ],
  },
  {
    category: 'Community & Social',
    stakeholders: [
      {
        name: 'Local Communities',
        role: 'Project beneficiaries and social impact',
        icon: <Users className='w-6 h-6' />,
      },
      {
        name: 'Educational Institutions',
        role: 'Skills development and knowledge transfer',
        icon: <Brain className='w-6 h-6' />,
      },
      {
        name: 'Employment Agencies',
        role: 'Workforce development and job creation',
        icon: <Activity className='w-6 h-6' />,
      },
    ],
  },
  {
    category: 'Financial & Investment',
    stakeholders: [
      {
        name: 'International Investors',
        role: 'Project financing and capital investment',
        icon: <TrendingUp className='w-6 h-6' />,
      },
      {
        name: 'Development Banks',
        role: 'Sustainable development financing',
        icon: <Globe className='w-6 h-6' />,
      },
      {
        name: 'Local Banks',
        role: 'Regional financial services and support',
        icon: <Handshake className='w-6 h-6' />,
      },
    ],
  },
];

const governanceFramework = [
  {
    level: 'Board of Directors',
    responsibilities: [
      'Strategic direction and oversight',
      'Financial performance monitoring',
      'Risk management and compliance',
      'Stakeholder value creation',
    ],
    members: [
      'Independent Directors',
      'Executive Directors',
      'Industry Experts',
    ],
  },
  {
    level: 'Executive Committee',
    responsibilities: [
      'Day-to-day operational decisions',
      'Project execution and delivery',
      'Resource allocation and management',
      'Performance optimization',
    ],
    members: ['CEO', 'CTO', 'CFO', 'COO'],
  },
  {
    level: 'Project Steering Committee',
    responsibilities: [
      'KPP project oversight and direction',
      'Technical decision-making',
      'Stakeholder coordination',
      'Progress monitoring and reporting',
    ],
    members: [
      'Project Director',
      'Technical Lead',
      'Stakeholder Representatives',
    ],
  },
  {
    level: 'Advisory Board',
    responsibilities: [
      'Expert guidance and consultation',
      'Industry best practices',
      'Innovation and technology trends',
      'Strategic recommendations',
    ],
    members: [
      'Energy Experts',
      'Environmental Specialists',
      'Financial Advisors',
    ],
  },
];

const decisionMakingProcess = [
  {
    phase: 'Information Gathering',
    description: 'Comprehensive data collection and stakeholder input',
    activities: [
      'Technical feasibility studies',
      'Environmental impact assessments',
      'Stakeholder consultations',
      'Market and financial analysis',
    ],
  },
  {
    phase: 'Analysis & Evaluation',
    description: 'Multi-criteria analysis and risk assessment',
    activities: [
      'Cost-benefit analysis',
      'Risk identification and mitigation',
      'Stakeholder impact assessment',
      'Alternative evaluation',
    ],
  },
  {
    phase: 'Stakeholder Consultation',
    description: 'Transparent consultation with all stakeholders',
    activities: [
      'Public consultation meetings',
      'Expert panel reviews',
      'Regulatory consultations',
      'Community feedback integration',
    ],
  },
  {
    phase: 'Decision & Implementation',
    description: 'Informed decision-making and execution',
    activities: [
      'Executive committee approval',
      'Board ratification',
      'Implementation planning',
      'Progress monitoring',
    ],
  },
];

export default function LeadershipPage() {
  return (
    <div>
      <HeroSection
        title='Leadership & Stakeholders'
        subtitle="Meet the visionary leaders and key stakeholders driving Deep Engineering's KPP project. Our collaborative approach ensures sustainable success through transparent governance and inclusive decision-making."
      />

      {/* Executive Leadership Team */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Executive Leadership Team</h2>
            <p className='text-lg text-gray-text max-w-3xl mx-auto'>
              Our experienced leadership team brings decades of combined
              expertise in energy, technology, and sustainability, guiding Deep
              Engineering toward a cleaner, more efficient future.
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-12'>
            {leadershipTeam.map((leader, index) => (
              <div key={index} className='text-center'>
                <div className='w-48 h-48 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center'>
                  {leader.icon}
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  {leader.name}
                </h3>
                <p className='text-primary font-medium mb-3'>{leader.title}</p>
                <p className='text-gray-600 text-sm leading-relaxed mb-4'>
                  {leader.description}
                </p>
                <div className='flex flex-wrap justify-center gap-2'>
                  {leader.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className='px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stakeholder Structure */}
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Project Stakeholder Structure</h2>
            <p className='text-lg text-gray-text max-w-3xl mx-auto'>
              The KPP project involves a diverse network of stakeholders, each
              playing a crucial role in ensuring project success and sustainable
              impact.
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {stakeholderGroups.map((group, index) => (
              <div key={index} className='bg-white p-6 rounded-lg shadow-sm'>
                <h3 className='text-xl font-semibold mb-4'>{group.category}</h3>
                <div className='space-y-4'>
                  {group.stakeholders.map((stakeholder, stakeholderIndex) => (
                    <div key={stakeholderIndex} className='flex items-start'>
                      <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3 flex-shrink-0'>
                        <div className='text-white'>{stakeholder.icon}</div>
                      </div>
                      <div>
                        <h4 className='font-semibold text-sm'>
                          {stakeholder.name}
                        </h4>
                        <p className='text-xs text-gray-text'>
                          {stakeholder.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Framework */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Governance Framework</h2>
            <p className='text-lg text-gray-text max-w-3xl mx-auto'>
              Our multi-level governance structure ensures transparent
              decision-making, effective oversight, and stakeholder
              accountability.
            </p>
          </div>

          <div className='grid lg:grid-cols-2 gap-8'>
            {governanceFramework.map((level, index) => (
              <div key={index} className='bg-gray-light p-6 rounded-lg'>
                <h3 className='text-xl font-semibold mb-4'>{level.level}</h3>
                <div className='mb-4'>
                  <h4 className='font-semibold mb-2'>Responsibilities:</h4>
                  <ul className='space-y-2'>
                    {level.responsibilities.map((responsibility, respIndex) => (
                      <li key={respIndex} className='flex items-start'>
                        <div className='w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0'></div>
                        <span className='text-sm text-gray-text'>
                          {responsibility}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className='font-semibold mb-2'>Members:</h4>
                  <div className='flex flex-wrap gap-2'>
                    {level.members.map((member, memberIndex) => (
                      <span
                        key={memberIndex}
                        className='px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium'
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decision-Making Process */}
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Decision-Making Process</h2>
            <p className='text-lg text-gray-text max-w-3xl mx-auto'>
              Our transparent and inclusive decision-making process ensures all
              stakeholders are heard and informed decisions are made for the
              benefit of all parties.
            </p>
          </div>

          <div className='max-w-4xl mx-auto'>
            <div className='relative'>
              {/* Process Line */}
              <div className='absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30'></div>

              <div className='space-y-8'>
                {decisionMakingProcess.map((phase, index) => (
                  <div key={index} className='relative flex items-start'>
                    {/* Process Dot */}
                    <div className='absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-white'></div>

                    <div className='ml-16 flex-1'>
                      <div className='bg-white p-6 rounded-lg shadow-sm'>
                        <div className='flex items-center mb-3'>
                          <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3'>
                            <div className='text-white font-bold text-sm'>
                              {index + 1}
                            </div>
                          </div>
                          <div>
                            <h3 className='font-semibold text-lg'>
                              {phase.phase}
                            </h3>
                            <p className='text-sm text-gray-text'>
                              {phase.description}
                            </p>
                          </div>
                        </div>
                        <ul className='space-y-2'>
                          {phase.activities.map((activity, activityIndex) => (
                            <li
                              key={activityIndex}
                              className='flex items-start'
                            >
                              <div className='w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0'></div>
                              <span className='text-sm text-gray-text'>
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

      {/* Leadership Philosophy */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Our Leadership Philosophy</h2>
            <p className='text-lg text-gray-text max-w-3xl mx-auto'>
              At Deep Engineering, we believe in leading by example. Our
              leadership team is committed to transparency, innovation, and
              sustainability in everything we do.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6'>
                <Target className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Vision-Driven</h3>
              <p className='text-gray-text'>
                We lead with a clear vision of a sustainable future and inspire
                others to join us on this journey.
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6'>
                <Users className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Collaborative</h3>
              <p className='text-gray-text'>
                We believe in the power of teamwork and diverse perspectives to
                solve complex challenges.
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6'>
                <Leaf className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Sustainable</h3>
              <p className='text-gray-text'>
                Every decision we make considers the long-term impact on our
                planet and future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='section-padding bg-primary text-white'>
        <div className='container text-center'>
          <h2 className='mb-4'>Join Our Leadership Journey</h2>
          <p className='text-lg mb-8 max-w-3xl mx-auto'>
            Deep Engineering is committed to leading the transition to
            sustainable energy through innovative technology, transparent
            governance, and collaborative stakeholder engagement.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/projects/kpp-project'
              className='bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200'
            >
              KPP Project
            </Link>
            <a
              href='/contact'
              className='border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-200'
            >
              Get Involved
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
