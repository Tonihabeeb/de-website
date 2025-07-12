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