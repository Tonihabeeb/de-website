import Link from 'next/link';
import { getProjects } from '@/utils/sanity-data';

export default async function MiniProjects() {
  // Fetch projects from Sanity CMS (limit to 3 for mini display)
  const allProjects = await getProjects();
  const projects = allProjects ? allProjects.slice(0, 3) : [];

  return (
    <section className="section-padding bg-gray-light">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="mb-4">Our Projects</h2>
          <p className="text-lg text-gray-text max-w-3xl mx-auto">
            Deep Engineering is currently developing 390 MW of KPP projects across Iraq 
            to deliver clean energy where it's needed most.
          </p>
        </div>
        
        {projects && projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {projects.map((project: any) => (
                <div key={project._id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-primary">{project.name}</h3>
                    <span className="text-sm bg-primary text-white px-2 py-1 rounded">
                      {project.capacityMW} MW
                    </span>
                  </div>
                  <p className="text-sm text-gray-text mb-2">{project.location}</p>
                  <p className="text-sm font-medium text-accent-warm mb-3">{project.status}</p>
                  <p className="text-gray-text mb-4">{project.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link 
                href="/projects"
                className="btn-secondary"
              >
                View All Projects
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-text mb-2">No Projects Found</h3>
            <p className="text-gray-text">Projects will appear here once they are added to the CMS.</p>
          </div>
        )}
      </div>
    </section>
  );
} 