import { Fragment } from 'react';
import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { apiFetch, ApiException } from '@/utils/api';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import ReloadButton from '@/components/ui/ReloadButton';

export const metadata: Metadata = {
  title: 'Our Team | Deep Engineering',
  description: 'Meet the talented professionals behind Deep Engineering\'s innovative solutions.',
  keywords: 'team, professionals, deep engineering, leadership',
};

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  expertise?: string;
  image?: string;
  email?: string;
  linkedin?: string;
  createdAt: string;
  updatedAt: string;
}

interface TeamResponse {
  documents: TeamMember[];
}

// Server-side data fetching
async function getTeamData(): Promise<{ teamMembers: TeamMember[]; error: string | null }> {
  try {
    const response = await apiFetch<TeamResponse>('/api/documents?type=team');
    return {
      teamMembers: response.documents || [],
      error: null
    };
  } catch (err: any) {
    console.error('Error fetching team members:', err);
    
    // Handle different types of errors
    if (err instanceof ApiException) {
      if (err.status === 401) {
        return { teamMembers: [], error: 'Authentication required to view team members.' };
      } else if (err.status === 403) {
        return { teamMembers: [], error: 'You do not have permission to view team members.' };
      } else if (err.status === 404) {
        return { teamMembers: [], error: 'Team members not found.' };
      } else if (err.status >= 500) {
        return { teamMembers: [], error: 'Server error. Please try again later.' };
      } else {
        return { teamMembers: [], error: err.message || 'Failed to load team members.' };
      }
    } else {
      return { teamMembers: [], error: 'Failed to load team members. Please try again later.' };
    }
  }
}

export default async function TeamPage() {
  const { teamMembers, error } = await getTeamData();

  return (
    <Fragment>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Deep Engineering",
          "description": "Innovative engineering solutions and renewable energy projects",
          "employee": teamMembers.map(member => ({
            "@type": "Person",
            "name": member.name,
            "jobTitle": member.role,
            "description": member.bio,
            "knowsAbout": member.expertise
          }))
        }}
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Our Team</h1>
            <p className="text-xl text-gray-text max-w-3xl mx-auto">
              Meet the talented professionals who drive innovation and excellence in every project we undertake.
            </p>
          </div>

          {error ? (
            <div className="text-center py-12">
              <div className="text-red-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Team</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <ReloadButton>Try Again</ReloadButton>
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member._id} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  {/* Profile Image */}
                  {member.image ? (
                    <div className="w-32 h-32 mx-auto mb-4">
                      <img 
                        src={member.image} 
                        alt={`Photo of ${member.name}, ${member.role}`}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-white text-center">
                        <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="text-sm opacity-90">Photo</p>
                      </div>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-semibold text-primary mb-2">{member.name}</h3>
                  <p className="text-accent-warm font-medium mb-3">{member.role}</p>
                  <p className="text-gray-text text-base mb-4">{member.bio}</p>
                  
                  {member.expertise && (
                    <div className="text-xs text-gray-text mb-4">
                      <span className="font-medium">Expertise:</span> {member.expertise}
                    </div>
                  )}

                  {/* Contact Links */}
                  <div className="flex justify-center space-x-3">
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`}
                        className="text-primary hover:text-primary-dark"
                        aria-label={`Email ${member.name}`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </a>
                    )}
                    {member.linkedin && (
                      <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark"
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 mt-4">
                    <p>Last updated: {new Date(member.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Team Members Found</h3>
              <p className="text-gray-text">Team members will appear here once they are added to the system.</p>
            </div>
          )}
        </div>
      </section>
    </Fragment>
  );
} 