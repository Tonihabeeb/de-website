'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/utils/api';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  status: string;
  capacity_mw?: number;
  og_image?: string;
  meta_keywords?: string;
  created_at: string;
  updated_at: string;
}

interface ProjectsResponse {
  projects: Project[];
}

// Sample projects for unauthenticated users
const sampleProjects = [
  {
    id: 'sample-1',
    name: 'KPP Power Plant - Erbil',
    description:
      'Our flagship Kinetic Power Plant project in Erbil, demonstrating 24/7 renewable energy generation with zero emissions.',
    location: 'Erbil, Iraq',
    status: 'In Progress',
    capacity_mw: 50,
    og_image: '/hero-static.svg',
    meta_keywords: 'renewable-energy',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: 'sample-2',
    name: 'Green Energy Initiative',
    description:
      'Comprehensive renewable energy solution providing sustainable power to industrial facilities.',
    location: 'Baghdad, Iraq',
    status: 'Planning',
    capacity_mw: 25,
    og_image: '/hero-static.svg',
    meta_keywords: 'industrial',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: 'sample-3',
    name: 'Community Power Project',
    description:
      'Local community power generation using KPP technology to provide reliable electricity.',
    location: 'Basra, Iraq',
    status: 'Completed',
    capacity_mw: 10,
    og_image: '/hero-static.svg',
    meta_keywords: 'community',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
];

export default function MiniProjects() {
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
          const allProjects = response.projects || [];
          setProjects(allProjects.slice(0, 3));
          setIsAuthenticatedUser(true);
        } else {
          setProjects(sampleProjects);
          setIsAuthenticatedUser(false);
        }
      } catch (err: any) {
        console.error('Error fetching projects:', err);
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
    return (
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-primary mb-4'>
              Featured Projects
            </h2>
            <p className='text-lg text-gray-text max-w-3xl mx-auto'>
              Discover some of our most innovative engineering solutions and
              successful project implementations.
            </p>
          </div>
          <div className='text-center py-8'>
            <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
            <p className='text-gray-600 mt-4'>Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-primary mb-4'>
            Featured Projects
          </h2>
          <p className='text-lg text-gray-text max-w-3xl mx-auto'>
            Discover some of our most innovative engineering solutions and
            successful project implementations.
          </p>
          {!isAuthenticatedUser && (
            <p className='text-sm text-gray-500 mt-2'>
              Showing sample projects.{' '}
              <Link
                href='/login'
                className='text-primary hover:text-primary-dark'
              >
                Login
              </Link>{' '}
              to view detailed project information.
            </p>
          )}
        </div>

        {error ? (
          <div className='text-center py-8'>
            <p className='text-gray-600'>{error}</p>
          </div>
        ) : projects.length > 0 ? (
          <>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
              {projects.map(project => (
                <div
                  key={project.id}
                  className='border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white'
                >
                  {project.og_image && (
                    <Image
                      src={project.og_image}
                      alt={`${project.name} project image`}
                      width={400}
                      height={200}
                      className='w-full h-48 object-cover rounded-t-lg'
                    />
                  )}

                  <div className='flex justify-between items-start mb-4'>
                    <h3 className='text-xl font-semibold text-primary'>
                      {project.name}
                    </h3>
                    {project.capacity_mw && (
                      <span className='text-sm bg-primary text-white px-2 py-1 rounded'>
                        {project.capacity_mw} MW
                      </span>
                    )}
                  </div>

                  <div className='space-y-2 mb-4'>
                    <p className='text-sm text-gray-text'>
                      <span className='font-medium'>Location:</span>{' '}
                      {project.location}
                    </p>
                    <p className='text-sm text-gray-text'>
                      <span className='font-medium'>Status:</span>
                      <span className='text-accent-warm ml-1'>
                        {project.status}
                      </span>
                    </p>
                  </div>

                  <p className='text-gray-text text-sm mb-4 line-clamp-3'>
                    {project.description}
                  </p>
                </div>
              ))}
            </div>

            <div className='text-center'>
              <Link
                href='/projects'
                className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200'
              >
                View All Projects
                <svg
                  className='ml-2 -mr-1 w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className='text-center py-8'>
            <div className='text-gray-600 mb-4'>
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
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              No Projects Available
            </h3>
            <p className='text-gray-text'>
              Featured projects will appear here once they are added to the
              system.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
