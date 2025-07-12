import Link from 'next/link';
import { getProjects } from '@/utils/sanity-data';
import { urlForImage } from '@/lib/sanity';

export default async function ProjectsPage() {
  // Fetch projects from Sanity CMS
  const projects = await getProjects();

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">Our Projects</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Deep Engineering is currently developing 390 MW of KPP projects across Iraq 
              to deliver clean energy where it's needed most.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Overview */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Project Portfolio</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              Our projects range from large utility-scale plants to regional power solutions, 
              all designed to provide reliable, clean energy for Iraq's growing needs.
            </p>
          </div>

          {projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project: any) => (
                <div key={project._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  {project.image && (
                    <div className="mb-4">
                      <img 
                        src={urlForImage(project.image).url()} 
                        alt={project.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-semibold text-primary">{project.name}</h3>
                    <span className="text-sm bg-primary text-white px-3 py-1 rounded">
                      {project.capacityMW} MW
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <p className="text-sm text-gray-text">
                      <span className="font-medium">Location:</span> {project.location}
                    </p>
                    <p className="text-sm text-gray-text">
                      <span className="font-medium">Status:</span> 
                      <span className="text-accent-warm ml-1">{project.status}</span>
                    </p>
                    {project.type && (
                      <p className="text-sm text-gray-text">
                        <span className="font-medium">Type:</span> {project.type}
                      </p>
                    )}
                    {project.timeline && (
                      <p className="text-sm text-gray-text">
                        <span className="font-medium">Timeline:</span> {project.timeline}
                      </p>
                    )}
                  </div>
                  
                  <p className="text-gray-text mb-4">{project.description}</p>
                  
                  {project.partners && project.partners.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-text mb-2">Partners:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.partners.map((partner: string, pIndex: number) => (
                          <span key={pIndex} className="text-xs bg-gray-light text-gray-text px-2 py-1 rounded">
                            {partner}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-1.5 h-1.5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-text mb-2">No Projects Found</h3>
              <p className="text-gray-text">Projects will appear here once they are added to the CMS.</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Map Placeholder */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="mb-4">Project Locations</h2>
            <p className="text-lg text-gray-text">
              Our projects are strategically located across Iraq to maximize impact and accessibility.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="w-full h-64 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <svg className="w-1.5 h-1.5 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                </svg>
                <p className="text-lg font-semibold">Interactive Project Map</p>
                <p className="text-sm opacity-90">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-white">
        <div className="container text-center">
          <h2 className="mb-4">Interested in Our Projects?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Whether you're looking to partner with us, invest in clean energy, or learn more 
            about our technology, we'd love to hear from you.
          </p>
          <Link 
            href="/contact"
            className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
} 