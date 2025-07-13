import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
});

// Image URL builder
const builder = imageUrlBuilder(sanity);

export function urlForImage(source: any) {
  return builder.image(source);
}

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
    type,
    partners,
    timeline,
    constructionTimeline,
    siteDetails,
    ppaInformation,
    governmentEndorsements,
    localImpact,
    progressUpdates,
    "image": image.asset->url,
    "gallery": gallery[].asset->url,
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
  }`,

  // Get all technical specifications
  getAllTechnicalSpecs: `*[_type == "technicalSpecs" && isActive == true] | order(order asc) {
    _id,
    title,
    category,
    specifications,
    description,
    features,
    benefits,
    "image": image.asset->url,
    "diagram": diagram.asset->url,
    order
  }`,

  // Get technical specifications by category
  getTechnicalSpecsByCategory: (category: string) => `*[_type == "technicalSpecs" && category == "${category}" && isActive == true] | order(order asc) {
    _id,
    title,
    category,
    specifications,
    description,
    features,
    benefits,
    "image": image.asset->url,
    "diagram": diagram.asset->url,
    order
  }`,

  // Get all economic analysis
  getAllEconomicAnalysis: `*[_type == "economicAnalysis"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    summary,
    lcoeComparison,
    fuelSavings,
    omCosts,
    roiProjections,
    investmentOpportunities,
    regionalAnalysis,
    content,
    publishedAt
  }`,

  // Get economic analysis by slug
  getEconomicAnalysisBySlug: (slug: string) => `*[_type == "economicAnalysis" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    summary,
    lcoeComparison,
    fuelSavings,
    omCosts,
    roiProjections,
    investmentOpportunities,
    regionalAnalysis,
    content,
    publishedAt
  }`,

  // Get project by slug
  getProjectBySlug: (slug: string) => `*[_type == "project" && slug.current == "${slug}"][0] {
    _id,
    name,
    slug,
    status,
    capacityMW,
    location,
    description,
    type,
    partners,
    timeline,
    constructionTimeline,
    siteDetails,
    ppaInformation,
    governmentEndorsements,
    localImpact,
    progressUpdates,
    "image": image.asset->url,
    "gallery": gallery[].asset->url,
    publishedAt
  }`
}; 