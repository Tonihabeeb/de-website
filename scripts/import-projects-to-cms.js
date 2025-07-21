const { db } = require('../database/connection');
const { v4: uuidv4 } = require('uuid');

// Project data extracted from documents and sample data
const projectsData = [
  {
    name: 'Zakho 100MW KPP Project',
    slug: 'zakho-100mw-kpp-project',
    description:
      'A major 100MW KPP power plant project in Zakho, designed to provide reliable baseload power to the Duhok region and support regional development initiatives.',
    status: 'in-progress',
    capacity_mw: 100,
    location: 'Zakho, Duhok Governorate, Iraq',
    start_date: '2024-03-15',
    end_date: '2026-06-30',
    budget: 120000000, // €120M
    budget_currency: 'EUR',
    content: {
      type: 'regional-power',
      partners: [
        'Ministry of Electricity',
        'Duhok Governorate',
        'Local Power Distribution Company',
      ],
      timeline: '2024-2026',
      constructionTimeline: {
        startDate: '2024-03-15',
        expectedCompletion: '2026-06-30',
        currentPhase: 'Foundation and Site Preparation',
        progressPercentage: 25,
      },
      siteDetails: {
        coordinates: '37.1445°N, 42.6871°E',
        landArea: 15.5,
        gridConnection: 'Zakho 132kV Substation',
        accessibility:
          'Located 5km from Zakho city center with direct access via Highway 80. Site is accessible year-round with good road infrastructure.',
      },
      ppaInformation: {
        status: 'signed',
        counterparty: 'Ministry of Electricity - Iraq',
        duration: 20,
        tariff: 45,
      },
      governmentEndorsements: [
        {
          ministry: 'Ministry of Electricity',
          endorsementType: 'Project Approval',
          date: '2024-01-15',
          description:
            'Full project approval and grid connection agreement signed',
        },
        {
          ministry: 'Ministry of Planning',
          endorsementType: 'Development Plan Integration',
          date: '2024-02-20',
          description: 'Project integrated into national development plan',
        },
      ],
      localImpact: {
        jobsCreated: 150,
        localProcurement: 65,
        communityBenefits: [
          'Improved electricity reliability',
          'Local employment opportunities',
          'Infrastructure development',
          'Reduced power outages',
        ],
        environmentalImpact:
          'Zero emissions operation with minimal water consumption. Project will reduce CO2 emissions by approximately 400,000 tons annually compared to diesel generation.',
      },
      progressUpdates: [
        {
          date: '2024-03-15',
          title: 'Project Groundbreaking Ceremony',
          description:
            'Official groundbreaking ceremony held with local officials and project partners. Site preparation work has begun.',
        },
        {
          date: '2024-04-20',
          title: 'Foundation Work Commences',
          description:
            'Foundation excavation and preparation work has started. Site is being prepared for KPP unit installation.',
        },
      ],
    },
  },
  {
    name: 'Soran 100MW KPP Project',
    slug: 'soran-100mw-kpp-project',
    description:
      'Strategic 100MW KPP installation in Soran to enhance power reliability in the Erbil region and support the growing energy demands of northern Iraq.',
    status: 'planning',
    capacity_mw: 100,
    location: 'Soran, Erbil Governorate, Iraq',
    start_date: '2025-01-15',
    end_date: '2027-03-30',
    budget: 120000000, // €120M
    budget_currency: 'EUR',
    content: {
      type: 'regional-power',
      partners: [
        'Ministry of Electricity',
        'Erbil Governorate',
        'Kurdistan Regional Government',
      ],
      timeline: '2025-2027',
      constructionTimeline: {
        startDate: '2025-01-15',
        expectedCompletion: '2027-03-30',
        currentPhase: 'Planning and Permitting',
        progressPercentage: 10,
      },
      siteDetails: {
        coordinates: '36.6534°N, 44.5444°E',
        landArea: 18.2,
        gridConnection: 'Soran 132kV Substation',
        accessibility:
          'Site located 8km from Soran city center with access via Highway 2. Mountainous terrain requires specialized construction approach.',
      },
      ppaInformation: {
        status: 'under-negotiation',
        counterparty: 'Kurdistan Regional Government',
        duration: 25,
        tariff: 48,
      },
      governmentEndorsements: [
        {
          ministry: 'Kurdistan Regional Government',
          endorsementType: 'Project Endorsement',
          date: '2024-06-10',
          description:
            'Regional government endorsement for project development',
        },
      ],
      localImpact: {
        jobsCreated: 180,
        localProcurement: 70,
        communityBenefits: [
          'Enhanced regional power stability',
          'Tourism sector support',
          'Local business development',
          'Improved quality of life',
        ],
        environmentalImpact:
          "Zero-emission power generation supporting the region's commitment to sustainable development. Will reduce annual CO2 emissions by 420,000 tons.",
      },
      progressUpdates: [
        {
          date: '2024-06-10',
          title: 'Project Endorsement Received',
          description:
            'Kurdistan Regional Government has officially endorsed the Soran KPP project, marking a significant milestone in project development.',
        },
      ],
    },
  },
  {
    name: 'Raparin 50MW KPP Project',
    slug: 'raparin-50mw-kpp-project',
    description:
      '50MW KPP power plant in Raparin designed to provide reliable electricity to the Sulaymaniyah region and support agricultural development initiatives.',
    status: 'in-progress',
    capacity_mw: 50,
    location: 'Raparin, Sulaymaniyah Governorate, Iraq',
    start_date: '2024-08-01',
    end_date: '2026-02-28',
    budget: 60000000, // €60M
    budget_currency: 'EUR',
    content: {
      type: 'agricultural-support',
      partners: [
        'Ministry of Electricity',
        'Sulaymaniyah Governorate',
        'Agricultural Development Authority',
      ],
      timeline: '2024-2026',
      constructionTimeline: {
        startDate: '2024-08-01',
        expectedCompletion: '2026-02-28',
        currentPhase: 'Environmental Assessment',
        progressPercentage: 15,
      },
      siteDetails: {
        coordinates: '35.5606°N, 45.4321°E',
        landArea: 12.8,
        gridConnection: 'Raparin 66kV Substation',
        accessibility:
          'Located in agricultural area with good road access. Site selected to minimize impact on farming activities.',
      },
      ppaInformation: {
        status: 'pending',
        counterparty: 'Ministry of Electricity',
        duration: 15,
        tariff: 46,
      },
      governmentEndorsements: [
        {
          ministry: 'Ministry of Agriculture',
          endorsementType: 'Agricultural Support Project',
          date: '2024-05-20',
          description: 'Project recognized as agricultural support initiative',
        },
      ],
      localImpact: {
        jobsCreated: 80,
        localProcurement: 75,
        communityBenefits: [
          'Agricultural sector support',
          'Rural electrification',
          'Local employment',
          'Reduced diesel costs for farmers',
        ],
        environmentalImpact:
          'Supports sustainable agriculture with clean energy. Will reduce agricultural sector emissions by 200,000 tons annually.',
      },
      progressUpdates: [
        {
          date: '2024-05-20',
          title: 'Environmental Assessment Initiated',
          description:
            'Environmental impact assessment has begun for the Raparin project site. Local community consultations scheduled.',
        },
      ],
    },
  },
  {
    name: 'Garmian 50MW KPP Project',
    slug: 'garmian-50mw-kpp-project',
    description:
      '50MW KPP installation in Garmian region to support local development and provide reliable power to underserved communities.',
    status: 'planning',
    capacity_mw: 50,
    location: 'Garmian, Sulaymaniyah Governorate, Iraq',
    start_date: '2025-03-01',
    end_date: '2027-01-31',
    budget: 60000000, // €60M
    budget_currency: 'EUR',
    content: {
      type: 'regional-development',
      partners: [
        'Ministry of Electricity',
        'Sulaymaniyah Governorate',
        'Garmian Development Authority',
      ],
      timeline: '2025-2027',
      constructionTimeline: {
        startDate: '2025-03-01',
        expectedCompletion: '2027-01-31',
        currentPhase: 'Site Selection',
        progressPercentage: 5,
      },
      siteDetails: {
        coordinates: '35.1234°N, 45.8765°E',
        landArea: 14.5,
        gridConnection: 'Garmian 66kV Substation',
        accessibility:
          'Site located in Garmian administrative region with access via regional roads. Infrastructure development planned.',
      },
      ppaInformation: {
        status: 'pending',
        counterparty: 'Ministry of Electricity',
        duration: 20,
        tariff: 47,
      },
      governmentEndorsements: [
        {
          ministry: 'Ministry of Planning',
          endorsementType: 'Regional Development Project',
          date: '2024-07-15',
          description: 'Project included in regional development planning',
        },
      ],
      localImpact: {
        jobsCreated: 90,
        localProcurement: 80,
        communityBenefits: [
          'Regional development support',
          'Improved electricity access',
          'Local business opportunities',
          'Community infrastructure',
        ],
        environmentalImpact:
          'Clean energy solution for regional development. Will contribute to reducing regional carbon footprint by 210,000 tons annually.',
      },
      progressUpdates: [
        {
          date: '2024-07-15',
          title: 'Project Planning Phase',
          description:
            'Project planning phase has begun with site selection and preliminary engineering studies underway.',
        },
      ],
    },
  },
];

async function importProjects() {
  console.log('🚀 Starting project import...');

  try {
    // Check if projects table exists
    const tableExists = db
      .prepare(
        `
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='projects'
    `
      )
      .get();

    if (!tableExists) {
      console.log(
        '❌ Projects table does not exist. Please run database migrations first.'
      );
      return;
    }

    let importedCount = 0;
    let skippedCount = 0;

    for (const projectData of projectsData) {
      // Check if project already exists
      const existingProject = db
        .prepare('SELECT id FROM projects WHERE slug = ?')
        .get(projectData.slug);

      if (existingProject) {
        console.log(`⏭️  Skipping ${projectData.name} - already exists`);
        skippedCount++;
        continue;
      }

      // Insert new project
      const projectId = uuidv4();
      const now = new Date().toISOString();

      const stmt = db.prepare(`
        INSERT INTO projects (
          id, name, slug, description, content, status, capacity_mw, location,
          start_date, end_date, budget, budget_currency, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run(
        projectId,
        projectData.name,
        projectData.slug,
        projectData.description,
        JSON.stringify(projectData.content),
        projectData.status,
        projectData.capacity_mw,
        projectData.location,
        projectData.start_date,
        projectData.end_date,
        projectData.budget,
        projectData.budget_currency,
        now,
        now
      );

      console.log(`✅ Imported: ${projectData.name}`);
      importedCount++;
    }

    console.log('\n📊 Import Summary:');
    console.log(`✅ Successfully imported: ${importedCount} projects`);
    console.log(`⏭️  Skipped (already exist): ${skippedCount} projects`);
    console.log(
      `📁 Total projects in database: ${importedCount + skippedCount}`
    );

    // Display imported projects
    if (importedCount > 0) {
      console.log('\n📋 Imported Projects:');
      const importedProjects = db
        .prepare(
          'SELECT name, slug, status, capacity_mw FROM projects ORDER BY created_at DESC LIMIT ?'
        )
        .all(importedCount);
      importedProjects.forEach((project, index) => {
        console.log(
          `  ${index + 1}. ${project.name} (${project.capacity_mw}MW) - ${project.status}`
        );
      });
    }

    console.log('\n🎉 Project import completed successfully!');
    console.log('\n📝 Next steps:');
    console.log(
      '1. Access the admin panel at /admin/projects to manage projects'
    );
    console.log('2. Add project images and additional details');
    console.log('3. Update project statuses and progress information');
    console.log('4. Configure project-specific settings and permissions');
  } catch (error) {
    console.error('❌ Error during import:', error);
    process.exit(1);
  }
}

// Run the import
importProjects();
