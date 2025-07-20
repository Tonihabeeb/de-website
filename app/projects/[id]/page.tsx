import { Fragment } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import StructuredData from '@/components/StructuredData';
import { serverApiFetch, ServerApiException } from '@/utils/server-api';

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

interface ProjectResponse {
  document: Project;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const response = await serverApiFetch<ProjectResponse>(`/api/documents/${id}`);
    const project = response.document;

    return {
      title: `${project.title} | Deep Engineering`,
      description: project.description,
      keywords: `project, ${project.category}, ${project.location}, deep engineering`,
      openGraph: {
        title: project.title,
        description: project.description,
        images: project.image ? [project.image] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Project Not Found | Deep Engineering',
      description: 'The requested project could not be found.',
    };
  }
}

// Server-side data fetching
async function getProjectData(id: string): Promise<{ project: Project | null; error: string | null }> {
  try {
    const response = await serverApiFetch<ProjectResponse>(`/api/documents/${id}`);
    return {
      project: response.document,
      error: null
    };
  } catch (err: any) {
    console.error('Error fetching project:', err);
    
    if (err instanceof ServerApiException) {
      if (err.status === 404) {
        return { project: null, error: 'Project not found.' };
      } else if (err.status === 401) {
        return { project: null, error: 'Authentication required to view this project.' };
      } else if (err.status === 403) {
        return { project: null, error: 'You do not have permission to view this project.' };
      } else if (err.status >= 500) {
        return { project: null, error: 'Server error. Please try again later.' };
      } else {
        return { project: null, error: err.message || 'Failed to load project.' };
      }
    } else {
      return { project: null, error: 'Failed to load project. Please try again later.' };
    }
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const { project, error } = await getProjectData(id);

  // Return 404 if project not found
  if (!project || error) {
    notFound();
  }

  return (
    <Fragment>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": project.title,
          "description": project.description,
          "location": {
            "@type": "Place",
            "name": project.location
          },
          "dateCreated": project.createdAt,
          "dateModified": project.updatedAt,
          "category": project.category
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <nav className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/projects" className="hover:text-primary transition-colors">
                Projects
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{project.title}</span>
            </div>
          </div>
        </nav>

        {/* Project Header */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-primary mb-4">{project.title}</h1>
                <p className="text-xl text-gray-text leading-relaxed">{project.description}</p>
              </div>

              {/* Project Image */}
              {project.image && (
                <div className="mb-8">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-text">{project.location}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Status</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {project.status}
                    </span>
                  </div>

                  {project.type && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Type</h3>
                      <p className="text-gray-text">{project.type}</p>
                    </div>
                  )}

                  {project.timeline && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Timeline</h3>
                      <p className="text-gray-text">{project.timeline}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {project.capacityMW && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Capacity</h3>
                      <p className="text-2xl font-bold text-primary">{project.capacityMW} MW</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Category</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {project.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Last Updated</h3>
                    <p className="text-gray-text">
                      {new Date(project.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  {project.partners && project.partners.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Partners</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.partners.map((partner, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                          >
                            {partner}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Back to Projects Button */}
              <div className="text-center">
                <Link
                  href="/projects"
                  className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Projects
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
} 