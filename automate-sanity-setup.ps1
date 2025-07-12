# Comprehensive Sanity CMS Automation Script for Deep Engineering Website
# This script automates the entire Sanity setup process

param(
    [string]$ProjectId = "cgt1kxzl",
    [string]$Dataset = "production"
)

Write-Host "🚀 Starting comprehensive Sanity CMS automation..." -ForegroundColor Green

# Step 1: Install Sanity client
Write-Host "`n📦 Installing @sanity/client..." -ForegroundColor Yellow
npm install @sanity/client

# Step 2: Initialize Sanity Studio
Write-Host "`n🏗️ Initializing Sanity Studio..." -ForegroundColor Yellow
npx sanity@latest init --project $ProjectId --dataset $Dataset --output-path studio --yes

# Step 3: Create environment variables
Write-Host "`n🔧 Setting up environment variables..." -ForegroundColor Yellow
$envFile = ".env.local"
if (-Not (Test-Path $envFile)) {
    New-Item -Path $envFile -ItemType File -Force
}

# Clear existing Sanity variables and add new ones
$envContent = Get-Content $envFile -ErrorAction SilentlyContinue | Where-Object { $_ -notmatch "^SANITY_" -and $_ -notmatch "^NEXT_PUBLIC_VERCEL_ENV" }
$envContent | Set-Content $envFile
Add-Content $envFile "SANITY_PROJECT_ID=$ProjectId"
Add-Content $envFile "SANITY_DATASET=$Dataset"
Add-Content $envFile "SANITY_API_TOKEN=your_token_with_read_rights"
Add-Content $envFile "NEXT_PUBLIC_VERCEL_ENV=development"

# Step 4: Create Sanity client utility
Write-Host "`n🔌 Creating Sanity client utility..." -ForegroundColor Yellow
$libDir = "lib"
if (-Not (Test-Path $libDir)) {
    New-Item -Path $libDir -ItemType Directory -Force
}

$sanityClientContent = @'
import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
});

// Helper functions for common queries
export const queries = {
  // Get all projects
  getAllProjects: `*[_type == "project"] | order(publishedAt desc) {
    _id,
    name,
    slug,
    status,
    capacityMW,
    location,
    description,
    "image": image.asset->url,
    publishedAt
  }`,
  
  // Get all team members
  getAllTeamMembers: `*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    expertise,
    "image": image.asset->url,
    socials
  }`,
  
  // Get page by slug
  getPageBySlug: (slug: string) => `*[_type == "page" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    hero,
    sections[]->
  }`,
  
  // Get technology sections
  getTechSections: `*[_type == "techSection"] | order(order asc) {
    _id,
    category,
    title,
    body,
    "images": images[].asset->url
  }`
};
'@

$sanityClientContent | Out-File -FilePath "$libDir/sanity.ts" -Encoding UTF8

# Step 5: Create schema files
Write-Host "`n📋 Creating schema files..." -ForegroundColor Yellow
$schemasDir = "studio/schemas"
if (-Not (Test-Path $schemasDir)) {
    New-Item -Path $schemasDir -ItemType Directory -Force
}

# Project schema
$projectSchema = @'
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Planning', value: 'planning'},
          {title: 'In Progress', value: 'in-progress'},
          {title: 'Completed', value: 'completed'},
          {title: 'On Hold', value: 'on-hold'}
        ]
      }
    },
    {
      name: 'capacityMW',
      title: 'Capacity (MW)',
      type: 'number'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'image'
    }
  }
}
'@

$projectSchema | Out-File -FilePath "$schemasDir/project.ts" -Encoding UTF8

# Team Member schema
$teamMemberSchema = @'
export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text'
    },
    {
      name: 'expertise',
      title: 'Expertise',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number'
    },
    {
      name: 'socials',
      title: 'Social Links',
      type: 'object',
      fields: [
        {name: 'linkedin', title: 'LinkedIn', type: 'url'},
        {name: 'twitter', title: 'Twitter', type: 'url'},
        {name: 'email', title: 'Email', type: 'email'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image'
    }
  }
}
'@

$teamMemberSchema | Out-File -FilePath "$schemasDir/teamMember.ts" -Encoding UTF8

# Page schema
$pageSchema = @'
export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Heading', type: 'string'},
        {name: 'subheading', title: 'Subheading', type: 'text'},
        {name: 'image', title: 'Hero Image', type: 'image'}
      ]
    },
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'contentBlock'}]}]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current'
    }
  }
}
'@

$pageSchema | Out-File -FilePath "$schemasDir/page.ts" -Encoding UTF8

# Tech Section schema
$techSectionSchema = @'
export default {
  name: 'techSection',
  title: 'Technology Section',
  type: 'document',
  fields: [
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Overview', value: 'overview'},
          {title: 'How It Works', value: 'how-it-works'},
          {title: 'Components', value: 'components'},
          {title: 'Performance', value: 'performance'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'body',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}}
      ]
    },
    {
      name: 'images',
      title: 'Additional Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}]
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category'
    }
  }
}
'@

$techSectionSchema | Out-File -FilePath "$schemasDir/techSection.ts" -Encoding UTF8

# Content Block schema
$contentBlockSchema = @'
export default {
  name: 'contentBlock',
  title: 'Content Block',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}}
      ]
    },
    {
      name: 'blockType',
      title: 'Block Type',
      type: 'string',
      options: {
        list: [
          {title: 'Text', value: 'text'},
          {title: 'Image Gallery', value: 'gallery'},
          {title: 'CTA', value: 'cta'},
          {title: 'Stats', value: 'stats'}
        ]
      }
    }
  ]
}
'@

$contentBlockSchema | Out-File -FilePath "$schemasDir/contentBlock.ts" -Encoding UTF8

# Step 6: Update schema index
Write-Host "`n📝 Updating schema index..." -ForegroundColor Yellow
$schemaIndexContent = @'
import project from './project'
import teamMember from './teamMember'
import page from './page'
import techSection from './techSection'
import contentBlock from './contentBlock'

export const schemaTypes = [project, teamMember, page, techSection, contentBlock]
'@

$schemaIndexContent | Out-File -FilePath "$schemasDir/index.ts" -Encoding UTF8

# Step 7: Create Next.js utility for data fetching
Write-Host "`n🔧 Creating Next.js data fetching utilities..." -ForegroundColor Yellow
$utilsDir = "utils"
if (-Not (Test-Path $utilsDir)) {
    New-Item -Path $utilsDir -ItemType Directory -Force
}

$dataUtilsContent = @'
import { sanity, queries } from '@/lib/sanity';

// Get all projects for the projects page
export async function getProjects() {
  return await sanity.fetch(queries.getAllProjects);
}

// Get all team members for the team page
export async function getTeamMembers() {
  return await sanity.fetch(queries.getAllTeamMembers);
}

// Get page content by slug
export async function getPageBySlug(slug: string) {
  return await sanity.fetch(queries.getPageBySlug(slug));
}

// Get technology sections
export async function getTechSections() {
  return await sanity.fetch(queries.getTechSections);
}

// Get technology section by category
export async function getTechSectionByCategory(category: string) {
  return await sanity.fetch(`*[_type == "techSection" && category == "${category}"][0]`);
}
'@

$dataUtilsContent | Out-File -FilePath "$utilsDir/sanity-data.ts" -Encoding UTF8

# Step 8: Create sample content
Write-Host "`n📄 Creating sample content..." -ForegroundColor Yellow
$sampleContentDir = "sample-content"
if (-Not (Test-Path $sampleContentDir)) {
    New-Item -Path $sampleContentDir -ItemType Directory -Force
}

$sampleProjects = @'
[
  {
    "_type": "project",
    "name": "Erbil KPP Power Plant",
    "slug": {
      "_type": "slug",
      "current": "erbil-kpp-power-plant"
    },
    "status": "in-progress",
    "capacityMW": 50,
    "location": "Erbil, Kurdistan Region",
    "description": "A 50MW KPP power plant serving the Erbil metropolitan area with clean, sustainable energy.",
    "publishedAt": "2024-01-15T00:00:00.000Z"
  },
  {
    "_type": "project",
    "name": "Basra Industrial Complex",
    "slug": {
      "_type": "slug",
      "current": "basra-industrial-complex"
    },
    "status": "planning",
    "capacityMW": 100,
    "location": "Basra, Iraq",
    "description": "Large-scale KPP installation for industrial energy needs in the Basra region.",
    "publishedAt": "2024-01-10T00:00:00.000Z"
  }
]
'@

$sampleProjects | Out-File -FilePath "$sampleContentDir/sample-projects.json" -Encoding UTF8

# Step 9: Create README for CMS setup
Write-Host "`n📖 Creating CMS documentation..." -ForegroundColor Yellow
$cmsReadme = @"
# Sanity CMS Setup for Deep Engineering Website

## Quick Start

1. **Get your API token:**
   - Go to [sanity.io/manage](https://www.sanity.io/manage)
   - Select your project (ID: $ProjectId)
   - Go to API > Tokens
   - Create a new token with 'read' permissions
   - Copy the token and replace \`your_token_with_read_rights\` in \`.env.local\`

2. **Start Sanity Studio:**
   \`\`\`bash
   cd studio
   npm run dev
   \`\`\`
   This opens the Studio at http://localhost:3333

3. **Add content:**
   - Use the Studio to add projects, team members, and technology content
   - Sample content is available in \`sample-content/\` folder

4. **Use in Next.js:**
   \`\`\`typescript
   import { getProjects } from '@/utils/sanity-data';
   
   // In your page component
   const projects = await getProjects();
   \`\`\`

## Schema Overview

- **Project**: Power plant projects with status, capacity, location
- **TeamMember**: Team profiles with roles, expertise, social links
- **Page**: Dynamic page content with hero sections
- **TechSection**: Technology documentation by category
- **ContentBlock**: Reusable content blocks for pages

## Environment Variables

Required in \`.env.local\`:
- \`SANITY_PROJECT_ID\`: Your Sanity project ID
- \`SANITY_DATASET\`: Dataset name (usually 'production')
- \`SANITY_API_TOKEN\`: API token with read permissions

## Deployment

- Sanity Studio can be deployed to [sanity.studio](https://www.sanity.io/docs/deployment)
- Next.js app uses the Sanity client to fetch content at build time
- Enable ISR (Incremental Static Regeneration) for dynamic content updates
"@

$cmsReadme | Out-File -FilePath "CMS-SETUP.md" -Encoding UTF8

Write-Host "`n✅ Sanity CMS automation complete!" -ForegroundColor Green
Write-Host "`n📋 What was created:" -ForegroundColor Cyan
Write-Host "  • Sanity Studio in 'studio/' folder" -ForegroundColor White
Write-Host "  • Schema files for Project, TeamMember, Page, TechSection, ContentBlock" -ForegroundColor White
Write-Host "  • Sanity client utility in 'lib/sanity.ts'" -ForegroundColor White
Write-Host "  • Data fetching utilities in 'utils/sanity-data.ts'" -ForegroundColor White
Write-Host "  • Environment variables in '.env.local'" -ForegroundColor White
Write-Host "  • Sample content in 'sample-content/'" -ForegroundColor White
Write-Host "  • Documentation in 'CMS-SETUP.md'" -ForegroundColor White

Write-Host "`n🚀 Next steps:" -ForegroundColor Yellow
Write-Host "1. Get your API token from sanity.io/manage" -ForegroundColor White
Write-Host "2. Update .env.local with your token" -ForegroundColor White
Write-Host "3. Run 'cd studio && npm run dev' to start Sanity Studio" -ForegroundColor White
Write-Host "4. Add your content through the Studio interface" -ForegroundColor White
Write-Host "5. Use the data fetching utilities in your Next.js pages" -ForegroundColor White

Write-Host "`n📚 See CMS-SETUP.md for detailed instructions" -ForegroundColor Cyan 