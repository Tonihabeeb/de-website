import { Fragment } from 'react';
import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { apiFetch, ApiException } from '@/utils/api';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import ReloadButton from '@/components/ui/ReloadButton';

export const metadata: Metadata = {
  title: 'Our Team | Deep Engineering',
  description:
    "Meet the talented professionals behind Deep Engineering's innovative solutions.",
  keywords: 'team, professionals, deep engineering, leadership',
};

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface TeamResponse {
  documents: TeamMember[];
}

// Server-side data fetching
async function getTeamData(): Promise<{
  teamMembers: TeamMember[];
  error: string | null;
}> {
  try {
    // Fetch all admin users as team members (adjust role as needed)
    const response = await apiFetch<{ users: TeamMember[] }>(
      '/api/admin/users?role=admin'
    );
    return {
      teamMembers: response.users || [],
      error: null,
    };
  } catch (err: any) {
    console.error('Error fetching team members:', err);
    return {
      teamMembers: [],
      error: err.message || 'Failed to load team members.',
    };
  }
}

export default async function TeamPage() {
  const { teamMembers, error } = await getTeamData();

  return (
    <Fragment>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Deep Engineering',
          description:
            'Innovative engineering solutions and renewable energy projects',
          employee: teamMembers.map(member => ({
            '@type': 'Person',
            name: member.name,
            jobTitle: member.role,
            description: member.role, // Use role as description since bio doesn't exist
            knowsAbout: member.role, // Use role as expertise since bio doesn't exist
          })),
        }}
      />

      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold text-primary mb-4'>Our Team</h1>
            <p className="text-xl text-white">
              Meet the talented professionals who drive innovation and
              excellence in every project we undertake.
            </p>
          </div>

          {error ? (
            <div className='text-center py-12'>
              <div className='text-red-600 mb-4'>
                <svg
                  className='w-12 h-12 mx-auto'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">
                Error Loading Team
              </h3>
              <p className="text-white">{error}</p>
              <ReloadButton>Try Again</ReloadButton>
            </div>
          ) : teamMembers.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {teamMembers.map(member => (
                <div
                  key={member.id}
                  className='bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow'
                >
                  {/* Profile Image (not available in new API, so skip or add placeholder) */}
                  <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    <div className='text-white text-center'>
                      <svg
                        className='w-8 h-8 mx-auto mb-2'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                        />
                      </svg>
                      <p className='text-sm opacity-90'>Photo</p>
                    </div>
                  </div>
                  <h3 className='text-xl font-semibold text-primary mb-2'>
                    {member.name}
                  </h3>
                  <p className='text-accent-warm font-medium mb-3'>
                    {member.role}
                  </p>
                  <div className="text-xs text-white">
                    <p>
                      Last updated:{' '}
                      {new Date(member.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-12'>
              <div className="text-white">
                <svg
                  className='w-12 h-12 mx-auto'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">
                No Team Members Found
              </h3>
              <p className="text-white">
                Team members will appear here once they are added to the system.
              </p>
            </div>
          )}
        </div>
      </section>
    </Fragment>
  );
}
