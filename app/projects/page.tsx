import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getProjects } from '@/utils/sanity-data';
import { urlForImage } from '@/lib/sanity';
import { Fragment } from 'react';
import StructuredData from '@/components/StructuredData';
import ProjectMap from '@/components/maps/ProjectMap';
import { FolderOpen } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';

export const metadata: Metadata = {
  title: 'Our Projects',
  description: 'Explore Deep Engineering\'s renewable energy projects across Iraq. From the 90 MW Samawah project to 300 MW in Kurdistan Region, discover our commitment to sustainable power development.',
  keywords: 'Deep Engineering projects, Iraq renewable energy projects, KPP power plants, Samawah project, Kurdistan energy projects, clean energy development Iraq',
  openGraph: {
    title: 'Deep Engineering Projects - Renewable Energy Development in Iraq',
    description: 'Explore Deep Engineering\'s renewable energy projects across Iraq. From the 90 MW Samawah project to 300 MW in Kurdistan Region, discover our commitment to sustainable power development.',
    url: 'https://deepengineering.co/projects',
    images: [
      {
        url: '/projects-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Deep Engineering Renewable Energy Projects',
      },
    ],
  },
  twitter: {
    title: 'Deep Engineering Projects - Renewable Energy Development in Iraq',
    description: 'Explore Deep Engineering\'s renewable energy projects across Iraq. From the 90 MW Samawah project to 300 MW in Kurdistan Region, discover our commitment to sustainable power development.',
  },
  alternates: {
    canonical: '/projects',
  },
};

const projectsStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name: 'Samawah KPP Project',
    description: '90 MW kinetic power plant project in Samawah, Iraq, in partnership with the Ministry of Electricity.',
    location: {
      '@type': 'Place',
      name: 'Samawah, Iraq',
    },
    sponsor: {
      '@type': 'Organization',
      name: 'Deep Engineering',
    },
    status: 'In progress',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name: 'Kurdistan Region KPP Projects',
    description: '300 MW of kinetic power plant projects planned in the Kurdistan Region (Zakho, Soran, Raparin, Garmian).',
    location: {
      '@type': 'Place',
      name: 'Kurdistan Region, Iraq',
    },
    sponsor: {
      '@type': 'Organization',
      name: 'Deep Engineering',
    },
    status: 'Planned',
  },
];

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <Fragment>
      <StructuredData data={projectsStructuredData} />
      {/* Hero Section */}
      <HeroSection
        title="Our Projects"
        subtitle="Deep Engineering is currently developing 390 MW of KPP projects across Iraq to deliver clean energy where it's needed most."
      />

      {/* Projects Overview */}
      <section className="section-padding bg-white" aria-label="Project portfolio">
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
                      <Image 
                        src={project.image} 
                        alt={project.name}
                        width={600}
                        height={192}
                        className="w-full h-48 object-cover rounded-lg"
                        priority={false}
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-semibold text-primary">{project.name}</h3>
                    <span className="text-base bg-primary text-white px-3 py-1 rounded">
                      {project.capacityMW} MW
                    </span>
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
                        {project.partners.map((partner: string, pIndex: number) => (
                          <span key={pIndex} className="text-base bg-gray-light text-gray-text px-2 py-1 rounded">
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
              <div className="text-gray-600 mb-4">
                <FolderOpen className="w-10 h-10 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-text mb-2">No Projects Found</h3>
              <p className="text-gray-text">Projects will appear here once they are added to the CMS.</p>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Project Map */}
      <section className="section-padding bg-gray-light" aria-label="Project locations">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="mb-4">Project Locations</h2>
            <p className="text-lg text-gray-text">
              Our projects are strategically located across Iraq to maximize impact and accessibility. 
              Click on any project marker to view detailed information.
            </p>
          </div>
          
          <ProjectMap />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-white" aria-label="Contact call to action">
        <div className="container text-center">
          <h2 className="mb-4">Interested in Our Projects?</h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
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
    </Fragment>
  );
} 