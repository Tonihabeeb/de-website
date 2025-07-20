'use client';

import { Fragment, useEffect, useState } from 'react';
import StructuredData from '@/components/StructuredData';
import { apiFetch, ApiException } from '@/utils/api';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import ReloadButton from '@/components/ui/ReloadButton';
import { useAuth } from '@/contexts/AuthContext';
import AuthGuard from '@/components/auth/AuthGuard';

interface Project {
  _id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  type?: string;
  timeline?: string;
  capacityMW?: number;
  partners?: string[];
  image?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsResponse {
  documents: Project[];
}

// Sample projects for unauthenticated users
const sampleProjects = [
  {
    _id: 'sample-1',
    title: 'KPP Power Plant - Erbil',
    description: 'Our flagship Kinetic Power Plant project in Erbil, demonstrating 24/7 renewable energy generation with zero emissions.',
    location: 'Erbil, Iraq',
    status: 'In Progress',
    capacityMW: 50,
    image: '/hero-static.svg',
    category: 'renewable-energy',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    _id: 'sample-2',
    title: 'Green Energy Initiative',
    description: 'Comprehensive renewable energy solution providing sustainable power to industrial facilities.',
    location: 'Baghdad, Iraq',
    status: 'Planning',
    capacityMW: 25,
    image: '/hero-static.svg',
    category: 'industrial',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    _id: 'sample-3',
    title: 'Community Power Project',
    description: 'Local community power generation using KPP technology to provide reliable electricity.',
    location: 'Basra, Iraq',
    status: 'Completed',
    capacityMW: 10,
    image: '/hero-static.svg',
    category: 'community',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
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
        
        // Only try to fetch real projects if user is authenticated
        if (isAuthenticated) {
          const response = await apiFetch<ProjectsResponse>('/api/documents?type=project');
          setProjects(response.documents || []);
          setIsAuthenticatedUser(true);
        } else {
          // Show sample projects for unauthenticated users
          setProjects(sampleProjects);
          setIsAuthenticatedUser(false);
        }
      } catch (err: any) {
        console.error('Error fetching projects:', err);
        
        // Handle different types of errors
        if (err instanceof ApiException) {
          if (err.status === 401) {
            setProjects(sampleProjects);
            setIsAuthenticatedUser(false);
          } else if (err.status === 403) {
            setError('You do not have permission to view projects.');
            setProjects(sampleProjects);
            setIsAuthenticatedUser(false);
          } else if (err.status === 404) {
            setError('Projects not found.');
            setProjects(sampleProjects);
            setIsAuthenticatedUser(false);
          } else if (err.status >= 500) {
            setError('Server error. Please try again later.');
            setProjects(sampleProjects);
            setIsAuthenticatedUser(false);
          } else {
            setError(err.message || 'Failed to load projects.');
            setProjects(sampleProjects);
            setIsAuthenticatedUser(false);
          }
        } else {
          setError('Failed to load projects. Please try again later.');
          setProjects(sampleProjects);
          setIsAuthenticatedUser(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch when auth state is determined
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
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Deep Engineering Projects",
            "description": "Portfolio of engineering projects and solutions",
            "numberOfItems": projects.length,
            "itemListElement": projects.map((project, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "CreativeWork",
                "name": project.title,
                "description": project.description,
                "location": {
                  "@type": "Place",
                  "name": project.location
                }
              }
            }))
          }}
        />

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-primary mb-4">Our Projects</h1>
              <p className="text-xl text-gray-text max-w-3xl mx-auto">
                Discover our portfolio of innovative engineering solutions and successful project implementations.
              </p>
              {!isAuthenticatedUser && (
                <p className="text-sm text-gray-500 mt-2">
                  Showing sample projects. <a href="/login" className="text-primary hover:text-primary-dark">Login</a> to view detailed project information.
                </p>
              )}
            </div>

            {error ? (
              <div className="text-center py-12">
                <div className="text-red-600 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Projects</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <ReloadButton>Try Again</ReloadButton>
              </div>
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {projects.map((project) => (
                  <div key={project._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
                    {project.image && (
                      <div className="mb-4">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-semibold text-primary">{project.title}</h3>
                      {project.capacityMW && (
                        <span className="text-base bg-primary text-white px-3 py-1 rounded">
                          {project.capacityMW} MW
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <p className="text-base text-gray-text">
                        <span className="font-medium">Location:</span> {project.location}
                      </p>
                      <p className="text-base text-gray-text">
                        <span className="font-medium">Status:</span> 
                        <span className="text-accent-warm ml-1">{project.status}</span>
                      </p>
                      {project.type && (
                        <p className="text-base text-gray-text">
                          <span className="font-medium">Type:</span> {project.type}
                        </p>
                      )}
                      {project.timeline && (
                        <p className="text-base text-gray-text">
                          <span className="font-medium">Timeline:</span> {project.timeline}
                        </p>
                      )}
                    </div>
                    
                    <p className="text-gray-text mb-4">{project.description}</p>
                    
                    {project.partners && project.partners.length > 0 && (
                      <div className="mb-4">
                        <p className="text-base font-medium text-gray-text mb-2">Partners:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.partners.map((partner, pIndex) => (
                            <span key={pIndex} className="text-base bg-gray-light text-gray-text px-2 py-1 rounded">
                              {partner}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-gray-500 mt-4">
                      <p>Category: {project.category}</p>
                      <p>Last updated: {new Date(project.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-600 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Found</h3>
                <p className="text-gray-text">Projects will appear here once they are added to the system.</p>
              </div>
            )}
          </div>
        </section>
      </Fragment>
    </AuthGuard>
  );
} 