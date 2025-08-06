import { Request, Response } from 'express';
import mongoose from 'mongoose';

// Project interface
interface IProject {
  id: string;
  name: string;
  description: string;
  location: string;
  status: string;
  capacity_mw?: number;
  og_image?: string;
  meta_keywords?: string;
  created_at: string;
  updated_at: string;
}

// Sample projects data
const sampleProjects: IProject[] = [
  {
    id: '1',
    name: 'KPP Solar Farm - Phase 1',
    description: 'Large-scale solar farm implementation using KPP technology for continuous energy generation.',
    location: 'Arizona, USA',
    status: 'In Progress',
    capacity_mw: 50,
    og_image: '/images/projects/solar-farm-1.jpg',
    meta_keywords: 'solar, renewable, KPP, continuous energy',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Wind Energy Complex',
    description: 'Integrated wind and KPP hybrid system for optimal energy production.',
    location: 'Texas, USA',
    status: 'Completed',
    capacity_mw: 75,
    og_image: '/images/projects/wind-complex.jpg',
    meta_keywords: 'wind, hybrid, KPP, renewable',
    created_at: '2023-11-20T14:30:00Z',
    updated_at: '2024-01-10T09:15:00Z'
  },
  {
    id: '3',
    name: 'Urban Microgrid Network',
    description: 'City-wide microgrid implementation using KPP technology for sustainable urban development.',
    location: 'California, USA',
    status: 'Planning',
    capacity_mw: 25,
    og_image: '/images/projects/urban-grid.jpg',
    meta_keywords: 'microgrid, urban, KPP, sustainable',
    created_at: '2024-02-01T08:45:00Z',
    updated_at: '2024-02-01T08:45:00Z'
  }
];

// Get all projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    // For now, return sample data
    // In a real implementation, this would fetch from database
    res.json({ 
      projects: sampleProjects,
      total: sampleProjects.length,
      message: 'Projects retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ 
      error: 'Failed to fetch projects',
      message: 'Internal server error'
    });
  }
};

// Get project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = sampleProjects.find(p => p.id === id);
    
    if (!project) {
      return res.status(404).json({ 
        error: 'Project not found',
        message: 'The requested project could not be found'
      });
    }
    
    res.json({ 
      project,
      message: 'Project retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ 
      error: 'Failed to fetch project',
      message: 'Internal server error'
    });
  }
};

// Create new project
export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description, location, status, capacity_mw, og_image, meta_keywords } = req.body;
    
    // Validate required fields
    if (!name || !description || !location || !status) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Name, description, location, and status are required'
      });
    }
    
    const newProject: IProject = {
      id: (sampleProjects.length + 1).toString(),
      name,
      description,
      location,
      status,
      capacity_mw,
      og_image,
      meta_keywords,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // In a real implementation, save to database
    sampleProjects.push(newProject);
    
    res.status(201).json({
      project: newProject,
      message: 'Project created successfully'
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      error: 'Failed to create project',
      message: 'Internal server error'
    });
  }
};

// Update project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const projectIndex = sampleProjects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return res.status(404).json({
        error: 'Project not found',
        message: 'The requested project could not be found'
      });
    }
    
    const updatedProject = {
      ...sampleProjects[projectIndex],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    sampleProjects[projectIndex] = updatedProject;
    
    res.json({
      project: updatedProject,
      message: 'Project updated successfully'
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      error: 'Failed to update project',
      message: 'Internal server error'
    });
  }
};

// Delete project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const projectIndex = sampleProjects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return res.status(404).json({
        error: 'Project not found',
        message: 'The requested project could not be found'
      });
    }
    
    const deletedProject = sampleProjects.splice(projectIndex, 1)[0];
    
    res.json({
      project: deletedProject,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      error: 'Failed to delete project',
      message: 'Internal server error'
    });
  }
}; 