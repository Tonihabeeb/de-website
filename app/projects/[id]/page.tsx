import { Fragment } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import StructuredData from '@/components/StructuredData';
import { serverApiFetch, ServerApiException } from '@/utils/server-api';
import Image from 'next/image';

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

interface ProjectResponse {
  document: Project;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const response = await serverApiFetch<ProjectResponse>(
      `/api/documents/${id}`
    );
    const project = response.document;

    return {
      title: `${project.name} | Deep Engineering`,
      description: project.description,
      keywords: `project, ${project.meta_keywords}, ${project.location}, deep engineering`,
      openGraph: {
        title: project.name,
        description: project.description,
        images: project.og_image ? [project.og_image] : [],
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
async function getProjectData(
  id: string
): Promise<{ project: Project | null; error: string | null }> {
  try {
    const response = await serverApiFetch<{ project: Project }>(
      `/api/admin/projects/${id}`
    );
    return {
      project: response.project,
      error: null,
    };
  } catch (err: any) {
    console.error('Error fetching project:', err);
    return {
      project: null,
      error: err.message || 'Failed to load project.',
    };
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
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.name,
          description: project.description,
          location: {
            '@type': 'Place',
            name: project.location,
          },
          dateCreated: project.created_at,
          dateModified: project.updated_at,
          category: project.meta_keywords,
        }}
      />

      <div className='min-h-screen bg-gray-50'>
        {/* Breadcrumb */}
        <nav className='bg-white border-b border-gray-200'>
          <div className='container mx-auto px-4 py-4'>
            <div className="flex items-center space-x-2 text-sm text-white">
              <Link href='/' className='hover:text-primary transition-colors'>
                Home
              </Link>
              <span>/</span>
              <Link
                href='/projects'
                className='hover:text-primary transition-colors'
              >
                Projects
              </Link>
              <span>/</span>
              <span className="text-white">{project.name}</span>
            </div>
          </div>
        </nav>

        {/* Project Header */}
        <section className='py-12 bg-white'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto'>
              <div className='mb-8'>
                <h1 className='text-4xl font-bold text-primary mb-4'>
                  {project.name}
                </h1>
                <p className="text-xl text-white">
                  {project.description}
                </p>
              </div>

              {/* Project Image */}
              {project.og_image && (
                <div className='mb-6'>
                  <Image
                    src={project.og_image}
                    alt={`${project.name} project image`}
                    width={800}
                    height={400}
                    className='w-full h-64 object-cover rounded-lg'
                  />
                </div>
              )}

              {/* Project Details Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
                <div className='space-y-4'>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Location
                    </h3>
                    <p className="text-white">{project.location}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Status
                    </h3>
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800'>
                      {project.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Last Updated
                    </h3>
                    <p className="text-white">
                      {new Date(project.updated_at).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </p>
                  </div>
                </div>

                <div className='space-y-4'>
                  {project.capacity_mw && (
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Capacity
                      </h3>
                      <p className='text-2xl font-bold text-primary'>
                        {project.capacity_mw} MW
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Category
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 text-white">
                      {project.meta_keywords}
                    </span>
                  </div>
                </div>
              </div>

              {/* Back to Projects Button */}
              <div className='text-center'>
                <Link
                  href='/projects'
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-b from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 active:from-blue-900 active:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none transition-colors text-white"
                >
                  <svg
                    className='mr-2 w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M10 19l-7-7m0 0l7-7m-7 7h18'
                    />
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
