import { Fragment } from 'react';
import type { Metadata } from 'next';
import { AlertTriangle, Users, User } from 'lucide-react';
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
  bio?: string;
  expertise?: string;
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
    const response = await apiFetch<{ data: TeamMember[] }>(
      '/api/admin/users?role=admin'
    );
    return {
      teamMembers: response.data || [],
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
            description: member.bio,
            knowsAbout: member.expertise,
          })),
        }}
      />

      <section className='section-padding bg-gray-50'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold text-primary mb-4'>Our Team</h1>
            <p className='text-xl text-gray-text max-w-3xl mx-auto'>
              Meet the talented professionals who drive innovation and
              excellence in every project we undertake.
            </p>
          </div>



          {error ? (
            <div className='text-center py-12'>
              <div className='text-red-600 mb-4'>
                <AlertTriangle className='w-12 h-12 mx-auto' />
              </div>
              <h3 className='text-lg font-semibold text-primary mb-2'>
                Error Loading Team
              </h3>
              <p className='text-gray-text mb-4'>{error}</p>
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
                  <div className='w-32 h-32 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-4'>
                    <div className='text-white text-center'>
                      <User className='w-8 h-8 mx-auto mb-2' />
                      <p className='text-sm opacity-90'>Photo</p>
                    </div>
                  </div>
                  <h3 className='text-xl font-semibold text-primary mb-2'>
                    {member.name}
                  </h3>
                  <p className='text-accent-warm font-medium mb-3'>
                    {member.role}
                  </p>
                  <div className='text-xs text-gray-500 mt-4'>
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
              <div className='text-gray-text mb-4'>
                <Users className='w-12 h-12 mx-auto' />
              </div>
              <h3 className='text-lg font-semibold text-primary mb-2'>
                No Team Members Found
              </h3>
              <p className='text-gray-text'>
                Team members will appear here once they are added to the system.
              </p>
            </div>
          )}
        </div>
      </section>
    </Fragment>
  );
}
