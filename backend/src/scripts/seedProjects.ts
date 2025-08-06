import { ProjectModel } from '../models/Project';

const demoProjects = [
  {
    name: 'Zakho 100MW KPP Project',
    description: 'A major 100MW KPP power plant project in Zakho, designed to provide reliable baseload power to the Duhok region and support regional development initiatives. This strategic installation will serve the growing energy demands of northern Iraq with clean, sustainable power.',
    location: 'Zakho, Duhok Governorate, Iraq',
    status: 'in-progress' as const,
    capacity_mw: 100,
    og_image: '/projects/zakho-project.jpg.svg',
    meta_keywords: 'KPP, renewable energy, Zakho, Duhok, 100MW, clean power, Iraq',
    created_by: 'admin',
  },
  {
    name: 'Soran 100MW KPP Project',
    description: 'Strategic 100MW KPP installation in Soran to enhance power reliability in the Erbil region and support the growing energy demands of northern Iraq. This project will provide baseload clean power for Northern Iraq with advanced KPP technology.',
    location: 'Soran, Erbil Governorate, Iraq',
    status: 'planned' as const,
    capacity_mw: 100,
    og_image: '/projects/soran-project.jpg.svg',
    meta_keywords: 'KPP, Soran, Erbil, 100MW, renewable energy, Kurdistan, clean power',
    created_by: 'admin',
  },
  {
    name: 'Raparin 50MW KPP Project',
    description: '50MW KPP power plant in Raparin designed to provide reliable electricity to the Sulaymaniyah region and support agricultural development initiatives. This project focuses on expanding reliable energy access in Raparin while supporting sustainable agriculture.',
    location: 'Raparin, Sulaymaniyah Governorate, Iraq',
    status: 'planned' as const,
    capacity_mw: 50,
    og_image: '/projects/raparin-project.jpg.svg',
    meta_keywords: 'KPP, Raparin, Sulaymaniyah, 50MW, agricultural support, renewable energy',
    created_by: 'admin',
  },
];

export async function seedProjects() {
  try {
    // Check if projects already exist
    const existingProjects = await ProjectModel.find({ created_by: 'admin' });
    
    if (existingProjects.length === 0) {
      // Insert demo projects
      const createdProjects = await ProjectModel.insertMany(demoProjects);
      console.log(`✅ Seeded ${createdProjects.length} demo projects:`);
      
      createdProjects.forEach((project, index) => {
        console.log(`  ${index + 1}. ${project.name} (${project.capacity_mw}MW) - ${project.status}`);
      });
    } else {
      console.log(`ℹ️  Demo projects already exist (${existingProjects.length} found)`);
    }
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
  }
} 