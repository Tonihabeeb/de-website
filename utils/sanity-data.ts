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