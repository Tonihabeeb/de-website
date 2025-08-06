import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import {
  DollarSign,
  TrendingUp,
  Lightbulb,
  Scale,
  Heart,
  Handshake,
  Check,
  ArrowRight,
  MapPin,
  Briefcase,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import HeroSection from '@/components/sections/HeroSection';

export const metadata: Metadata = {
  title: 'Careers at Deep Engineering - Join Our Team',
  description:
    "Join Deep Engineering's mission to revolutionize Iraq's energy landscape. Explore career opportunities in renewable energy, engineering, and project management.",
  keywords:
    'careers, jobs, renewable energy careers, engineering jobs Iraq, KPP technology careers, Deep Engineering jobs',
  openGraph: {
    title: 'Careers at Deep Engineering - Join Our Team',
    description:
      "Join Deep Engineering's mission to revolutionize Iraq's energy landscape with innovative KPP technology.",
    type: 'website',
    url: 'https://deepengineering.co/team/careers',
    images: [
      {
        url: '/og-careers.jpg',
        width: 1200,
        height: 630,
        alt: 'Careers at Deep Engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers at Deep Engineering - Join Our Team',
    description: "Join our mission to revolutionize Iraq's energy landscape.",
    images: ['/og-careers.jpg'],
  },
  alternates: {
    canonical: '/team/careers',
  },
};

const jobOpenings = [
  {
    id: 1,
    title: 'Senior Mechanical Engineer',
    department: 'Engineering',
    location: 'Erbil, Iraq',
    type: 'Full-time',
    experience: '5+ years',
    description:
      'Lead mechanical design and implementation of KPP systems, ensuring optimal performance and reliability.',
    requirements: [
      "Bachelor's degree in Mechanical Engineering",
      '5+ years experience in power generation or renewable energy',
      'Experience with fluid dynamics and thermal systems',
      'Strong project management skills',
      'Fluent in English and Arabic',
    ],
    responsibilities: [
      'Design and optimize KPP mechanical systems',
      'Lead technical reviews and quality assurance',
      'Collaborate with cross-functional teams',
      'Mentor junior engineers',
      'Ensure compliance with international standards',
    ],
  },
  {
    id: 2,
    title: 'Project Manager',
    department: 'Project Management',
    location: 'Baghdad, Iraq',
    type: 'Full-time',
    experience: '7+ years',
    description:
      'Manage large-scale KPP project implementations, coordinating teams and ensuring successful delivery.',
    requirements: [
      "Bachelor's degree in Engineering or Business",
      '7+ years project management experience',
      'PMP certification preferred',
      'Experience in energy sector projects',
      'Strong leadership and communication skills',
    ],
    responsibilities: [
      'Lead project planning and execution',
      'Manage stakeholder relationships',
      'Monitor project progress and budgets',
      'Ensure quality and safety standards',
      'Report to senior management',
    ],
  },
  {
    id: 3,
    title: 'Electrical Engineer',
    department: 'Engineering',
    location: 'Basra, Iraq',
    type: 'Full-time',
    experience: '3+ years',
    description:
      'Design and implement electrical systems for KPP installations, focusing on grid integration and power distribution.',
    requirements: [
      "Bachelor's degree in Electrical Engineering",
      '3+ years experience in power systems',
      'Knowledge of grid integration standards',
      'Experience with SCADA systems',
      'Understanding of renewable energy technologies',
    ],
    responsibilities: [
      'Design electrical systems for KPP projects',
      'Ensure grid compatibility and stability',
      'Implement monitoring and control systems',
      'Conduct electrical safety assessments',
      'Support commissioning and testing',
    ],
  },
  {
    id: 4,
    title: 'Business Development Manager',
    department: 'Business Development',
    location: 'Erbil, Iraq',
    type: 'Full-time',
    experience: '5+ years',
    description:
      'Drive business growth through strategic partnerships, market analysis, and client relationship management.',
    requirements: [
      "Bachelor's degree in Business or Engineering",
      '5+ years business development experience',
      'Experience in energy sector',
      'Strong networking and negotiation skills',
      'Market analysis and strategic planning expertise',
    ],
    responsibilities: [
      'Identify and pursue new business opportunities',
      'Develop strategic partnerships',
      'Conduct market research and analysis',
      'Lead client presentations and negotiations',
      'Support proposal development',
    ],
  },
];

const benefits = [
  {
    title: 'Competitive Compensation',
    description:
      'Attractive salary packages with performance-based bonuses and comprehensive benefits.',
    icon: <DollarSign className='w-8 h-8' />,
  },
  {
    title: 'Professional Growth',
    description:
      'Continuous learning opportunities, training programs, and career advancement paths.',
    icon: <TrendingUp className='w-8 h-8' />,
  },
  {
    title: 'Innovation Culture',
    description:
      "Work on cutting-edge renewable energy technology that's transforming Iraq's energy landscape.",
    icon: <Lightbulb className='w-8 h-8' />,
  },
  {
    title: 'Work-Life Balance',
    description:
      'Flexible working arrangements and generous leave policies to support your well-being.',
    icon: <Scale className='w-8 h-8' />,
  },
  {
    title: 'Health & Wellness',
    description:
      'Comprehensive health insurance and wellness programs for you and your family.',
    icon: <Heart className='w-8 h-8' />,
  },
  {
    title: 'Team Environment',
    description:
      'Collaborative, supportive work environment with passionate professionals.',
    icon: <Handshake className='w-8 h-8' />,
  },
];

export default function CareersPage() {
  return (
    <div>
      <HeroSection
        title='Join Our Mission'
        subtitle="Be part of the team revolutionizing Iraq's energy landscape with innovative KPP technology. Help us build a sustainable future for generations to come."
      />

      <div className='container'>
        <Breadcrumbs />
      </div>

      {/* Company Culture */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='mb-4'>Why Work With Us?</h2>
              <p className="text-lg text-white">
                At Deep Engineering, we're not just building power plants –
                we're building the future. Join a team that's passionate about
                innovation, sustainability, and making a real impact.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className='bg-gray-50 rounded-lg p-6 text-center'
                >
                  <div className='mb-4'>{benefit.icon}</div>
                  <h3 className='text-xl font-semibold text-primary mb-3'>
                    {benefit.title}
                  </h3>
                  <p className="text-white">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Current Openings</h2>
            <p className="text-lg text-white">
              Explore our current job opportunities and find the perfect role to
              advance your career in renewable energy and engineering.
            </p>
          </div>

          <div className='max-w-6xl mx-auto space-y-6'>
            {jobOpenings.map(job => (
              <div
                key={job.id}
                className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'
              >
                <div className='p-6'>
                  <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4'>
                    <div>
                      <h3 className='text-xl font-semibold text-primary mb-2'>
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-white">
                        <span className='flex items-center'>
                          <Briefcase className='w-4 h-4 mr-1' />
                          {job.department}
                        </span>
                        <span className='flex items-center'>
                          <MapPin className='w-4 h-4 mr-1' />
                          {job.location}
                        </span>
                        <span className='flex items-center'>
                          <Clock className='w-4 h-4 mr-1' />
                          {job.type}
                        </span>
                        <span className='flex items-center'>
                          <TrendingUp className='w-4 h-4 mr-1' />
                          {job.experience}
                        </span>
                      </div>
                    </div>
                    <button className="mt-4 lg:mt-0 bg-gradient-to-b from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 active:from-blue-900 active:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none transition-colors min-w-[44px] min-h-[44px] text-white">
                      Apply Now
                    </button>
                  </div>

                  <p className="text-white">{job.description}</p>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <h4 className="font-semibold text-white">
                        Requirements
                      </h4>
                      <ul className='space-y-2'>
                        {job.requirements.map((req, index) => (
                          <li key={index} className='flex items-start'>
                            <Check className='w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0' />
                            <span className="text-sm text-white">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white">
                        Responsibilities
                      </h4>
                      <ul className='space-y-2'>
                        {job.responsibilities.map((resp, index) => (
                          <li key={index} className='flex items-start'>
                            <ArrowRight className='w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0' />
                            <span className="text-sm text-white">
                              {resp}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='mb-8'>How to Apply</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center'>
                <div className='w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4'>
                  1
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Submit Application
                </h3>
                <p className="text-white">
                  Send your resume and cover letter to
                  careers@deepengineering.co
                </p>
              </div>

              <div className='text-center'>
                <div className='w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4'>
                  2
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Interview Process
                </h3>
                <p className="text-white">
                  Initial screening followed by technical and cultural
                  interviews
                </p>
              </div>

              <div className='text-center'>
                <div className='w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4'>
                  3
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Join Our Team
                </h3>
                <p className="text-white">
                  Welcome aboard! Start your journey with Deep Engineering
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='section-padding bg-primary text-white'>
        <div className='container text-center'>
          <h2 className='mb-4'>Ready to Make a Difference?</h2>
          <p className='text-xl text-white mb-8 max-w-3xl mx-auto'>
            Join our team and help us build a sustainable energy future for
            Iraq. Your expertise and passion can drive real change.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href='mailto:careers@deepengineering.co'
              className='bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200'
            >
              Send Your Application
            </a>
            <a
              href='/team'
              className='border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200'
            >
              Meet Our Team
            </a>
          </div>
        </div>
      </section>

      {/* Related Links Section */}
      <section className='section-padding bg-gray-100 border-t border-gray-200'>
        <div className='container'>
          <div className='text-center mb-6'>
            <h2 className='text-xl font-semibold text-primary mb-2'>
              Related Links
            </h2>
            <p className="text-base text-white">
              Explore more about Deep Engineering and our team:
            </p>
          </div>
          <div className='flex flex-wrap justify-center gap-4'>
            <Link
              href='/team'
              className="bg-gradient-to-b from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 active:from-blue-900 active:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none transition-colors text-white"
            >
              Meet the Team
            </Link>
            <Link
              href='/about'
              className='bg-white text-primary border border-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors'
            >
              About Deep Engineering
            </Link>
            <Link
              href='/projects'
              className='bg-white text-primary border border-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors'
            >
              Our Projects
            </Link>
            <Link
              href='/contact'
              className='bg-white text-primary border border-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors'
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'JobPosting',
            title: 'Careers at Deep Engineering',
            description:
              "Join Deep Engineering's mission to revolutionize Iraq's energy landscape with innovative KPP technology.",
            hiringOrganization: {
              '@type': 'Organization',
              name: 'Deep Engineering',
              url: 'https://deepengineering.co',
            },
            jobLocation: {
              '@type': 'Place',
              addressCountry: 'IQ',
              addressRegion: 'Kurdistan Region',
            },
            employmentType: 'FULL_TIME',
            industry: 'Renewable Energy',
            datePosted: new Date().toISOString().split('T')[0],
          }),
        }}
      />
    </div>
  );
}
