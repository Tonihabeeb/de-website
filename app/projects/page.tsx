'use client';

import { Fragment, useEffect, useState } from 'react';
import StructuredData from '@/components/StructuredData';
import { apiFetch, ApiException } from '@/utils/api';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import ReloadButton from '@/components/ui/ReloadButton';
import { useAuth } from '@/contexts/AuthContext';
import AuthGuard from '@/components/auth/AuthGuard';

interface Project {
  id: string;
  name: string;
  slug: string;
  description?: string;
  content: any;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  status: 'planning' | 'in-progress' | 'completed' | 'cancelled';
  capacity_mw?: number;
  location?: string;
  start_date?: Date;
  end_date?: Date;
  budget?: number;
  budget_currency?: string;
  publish_at?: Date | null;
  unpublish_at?: Date | null;
  created_by?: string;
  created_at: Date;
  updated_at: Date;
}

// Sample projects for unauthenticated users
const sampleProjects: Project[] = [
  {
    id: 'sample-1',
    name: 'KPP Power Plant - Erbil',
    slug: 'kpp-power-plant-erbil',
    description:
      'Our flagship Kinetic Power Plant project in Erbil, demonstrating 24/7 renewable energy generation with zero emissions.',
    content: {},
    status: 'in-progress',
    capacity_mw: 50,
    location: 'Erbil, Iraq',
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    id: 'sample-2',
    name: 'Green Energy Initiative',
    slug: 'green-energy-initiative',
    description:
      'Comprehensive renewable energy solution providing sustainable power to industrial facilities.',
    content: {},
    status: 'planning',
    capacity_mw: 25,
    location: 'Baghdad, Iraq',
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    id: 'sample-3',
    name: 'Community Power Project',
    slug: 'community-power-project',
    description:
      'Local community power generation using KPP technology to provide reliable electricity.',
    content: {},
    status: 'completed',
    capacity_mw: 10,
    location: 'Basra, Iraq',
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
];

export default function ProjectsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        if (isAuthenticated) {
          const response = await apiFetch<{ projects: Project[] }>(
            '/api/admin/projects'
          );
          setProjects(response.projects || []);
          setIsAuthenticatedUser(true);
        } else {
          setProjects(sampleProjects);
          setIsAuthenticatedUser(false);
        }
      } catch (err: any) {
        console.error('Error fetching projects:', err);
        setError(err.message || 'Failed to load projects.');
        setProjects(sampleProjects);
        setIsAuthenticatedUser(false);
      } finally {
        setIsLoading(false);
      }
    };
    if (!authLoading) {
      fetchProjects();
    }
  }, [isAuthenticated, authLoading]);

  // Show loading while auth is being determined
  if (authLoading || isLoading) {
    return <PageLoader />;
  }

  return (
    <AuthGuard>
      <Fragment>
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Deep Engineering Projects',
            description: 'Portfolio of engineering projects and solutions',
            numberOfItems: projects.length,
            itemListElement: projects.map((project, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'CreativeWork',
                name: project.name,
                description: project.description,
                location: {
                  '@type': 'Place',
                  name: project.location,
                },
              },
            })),
          }}
        />

        <section className='py-16 bg-gray-50'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12'>
              <h1 className='text-4xl font-bold text-primary mb-4'>
                Our Projects
              </h1>
              <p className="text-xl text-white">
                Discover our portfolio of innovative engineering solutions and
                successful project implementations.
              </p>
              {!isAuthenticatedUser && (
                <p className="text-sm text-white">
                  Showing sample projects.{' '}
                  <a
                    href='/login'
                    className='text-primary hover:text-primary-dark'
                  >
                    Login
                  </a>{' '}
                  to view detailed project information.
                </p>
              )}
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
                  Error Loading Projects
                </h3>
                <p className="text-white">{error}</p>
                <ReloadButton>Try Again</ReloadButton>
              </div>
            ) : projects.length > 0 ? (
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {projects.map(project => (
                  <div
                    key={project.id}
                    className='border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white'
                  >
                    <div className='flex justify-between items-start mb-4'>
                      <h3 className='text-2xl font-semibold text-primary'>
                        {project.name}
                      </h3>
                      {project.capacity_mw && (
                        <span className='text-base bg-primary text-white px-3 py-1 rounded'>
                          {project.capacity_mw} MW
                        </span>
                      )}
                    </div>

                    <div className='space-y-3 mb-4'>
                      <p className="text-base text-white">
                        <span className='font-medium'>Location:</span>{' '}
                        {project.location}
                      </p>
                      <p className="text-base text-white">
                        <span className='font-medium'>Status:</span>
                        <span className='text-accent-warm ml-1'>
                          {project.status}
                        </span>
                      </p>
                    </div>

                    <p className="text-white">{project.description}</p>

                    <div className="text-xs text-white">
                      <p>Category: {project.meta_keywords}</p>
                      <p>
                        Last updated:{' '}
                        {new Date(project.updated_at).toLocaleDateString()}
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
                      d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  No Projects Found
                </h3>
                <p className="text-white">
                  Projects will appear here once they are added to the system.
                </p>
              </div>
            )}
          </div>
        </section>
      </Fragment>
    </AuthGuard>
  );
}
