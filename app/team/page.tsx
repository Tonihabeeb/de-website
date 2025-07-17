import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getTeamMembers } from '@/utils/sanity-data';
import { urlForImage } from '@/lib/sanity';
import { Fragment } from 'react';
import StructuredData from '@/components/StructuredData';
import HeroSection from '@/components/sections/HeroSection';

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the Deep Engineering team - 35+ professionals across mechanical, electrical, SCADA, and finance disciplines. Discover the experts driving Iraq\'s renewable energy future.',
  keywords: 'Deep Engineering team, Iraq renewable energy experts, KPP specialists, clean energy professionals, sustainable power team Iraq',
  openGraph: {
    title: 'Deep Engineering Team - Renewable Energy Experts in Iraq',
    description: 'Meet the Deep Engineering team - 35+ professionals across mechanical, electrical, SCADA, and finance disciplines. Discover the experts driving Iraq\'s renewable energy future.',
    url: 'https://deepengineering.co/team',
    images: [
      {
        url: '/team-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Deep Engineering Team Members',
      },
    ],
  },
  twitter: {
    title: 'Deep Engineering Team - Renewable Energy Experts in Iraq',
    description: 'Meet the Deep Engineering team - 35+ professionals across mechanical, electrical, SCADA, and finance disciplines. Discover the experts driving Iraq\'s renewable energy future.',
  },
  alternates: {
    canonical: '/team',
  },
};

const teamStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'John Doe',
    jobTitle: 'CEO',
    worksFor: {
      '@type': 'Organization',
      name: 'Deep Engineering',
    },
    image: 'https://deepengineering.co/team/john-doe.jpg',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jane Smith',
    jobTitle: 'CTO',
    worksFor: {
      '@type': 'Organization',
      name: 'Deep Engineering',
    },
    image: 'https://deepengineering.co/team/jane-smith.jpg',
  },
  // Add more team members as needed
];

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();
  return (
    <Fragment>
      <StructuredData data={teamStructuredData} />
      {/* Hero Section */}
      <HeroSection
        title="Meet Our Team"
        subtitle="Our diverse team of engineers, innovators, and energy experts is dedicated to bringing KPP technology to Iraq and building a sustainable energy future."
      />

      {/* Team Grid */}
      <section className="section-padding bg-white" aria-label="Team members">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Leadership & Experts</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Meet the passionate professionals driving Deep Engineering's mission to revolutionize 
              Iraq's energy landscape with innovative KPP technology.
            </p>
          </div>

          {teamMembers && teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member: any) => (
                <div key={member._id} className="bg-gray-light rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  {/* Profile Image */}
                  {member.image ? (
                    <div className="w-32 h-32 mx-auto mb-4">
                      <Image 
                        src={member.image} 
                        alt={`Photo of ${member.name}, ${member.role}`}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover rounded-full"
                        priority={false}
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-white text-center">
                        <svg className="w-1.5 h-1.5 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="text-base opacity-90">Photo</p>
                      </div>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-semibold text-primary mb-2">{member.name}</h3>
                  <p className="text-accent-warm font-medium mb-3">{member.role}</p>
                  <p className="text-gray-text text-base mb-4">{member.bio}</p>
                  
                  {member.expertise && (
                    <div className="text-xs text-gray-text">
                      <span className="font-medium">Expertise:</span> {member.expertise}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-600 mb-4">
                <svg className="w-1.5 h-1.5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-text mb-2">No Team Members Found</h3>
              <p className="text-gray-text">Team members will appear here once they are added to the CMS.</p>
            </div>
          )}
        </div>
      </section>

      {/* Company Culture */}
      <section className="section-padding bg-gray-light" aria-label="Company culture">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-6">Our Culture</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              At Deep Engineering, we foster a culture of innovation, collaboration, and 
              sustainability. Our values guide everything we do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="mb-6">Our Values</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-1">Innovation</h4>
                  <p className="text-gray-text text-sm">
                    We constantly push the boundaries of what's possible in energy technology.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Collaboration</h4>
                  <p className="text-gray-text text-sm">
                    We believe in the power of teamwork and diverse perspectives.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Sustainability</h4>
                  <p className="text-gray-text text-sm">
                    Every decision we make considers environmental and social impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-white" aria-label="Join our team">
        <div className="container text-center">
          <h2 className="mb-4">Join Our Mission</h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Be part of the team revolutionizing Iraq's energy landscape with innovative KPP technology. 
            Help us build a sustainable future for generations to come.
          </p>
          <Link 
            href="/team/careers"
            className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
          >
            View Careers
          </Link>
        </div>
      </section>
    </Fragment>
  );
} 