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

// Get all technical specifications
export async function getTechnicalSpecs() {
  return await sanity.fetch(queries.getAllTechnicalSpecs);
}

// Get technical specifications by category
export async function getTechnicalSpecsByCategory(category: string) {
  return await sanity.fetch(queries.getTechnicalSpecsByCategory(category));
}

// Get all economic analysis
export async function getEconomicAnalysis() {
  return await sanity.fetch(queries.getAllEconomicAnalysis);
}

// Get economic analysis by slug
export async function getEconomicAnalysisBySlug(slug: string) {
  return await sanity.fetch(queries.getEconomicAnalysisBySlug(slug));
}

// Get project by slug
export async function getProjectBySlug(slug: string) {
  return await sanity.fetch(queries.getProjectBySlug(slug));
} 