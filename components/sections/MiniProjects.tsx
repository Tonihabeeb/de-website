import Link from 'next/link';

const projects = [
  {
    name: 'Zakho 100MW',
    location: 'Kurdistan, Iraq',
    status: 'Planned – 2025',
    description: 'Four 25MW KPP units to provide regional power.',
    capacity: '100 MW'
  },
  {
    name: 'Soran 100MW',
    location: 'Kurdistan, Iraq',
    status: 'Planned – 2025',
    description: 'Baseload clean power for Northern Iraq.',
    capacity: '100 MW'
  },
  {
    name: 'Samawah 90MW',
    location: 'Al-Muthana, Iraq',
    status: 'In Development',
    description: 'Flagship KPP project with Board of Investment.',
    capacity: '90 MW'
  }
];

export default function MiniProjects() {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-primary">{project.name}</h3>
                <span className="text-sm bg-primary text-white px-2 py-1 rounded">
                  {project.capacity}
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
      </div>
    </section>
  );
} 