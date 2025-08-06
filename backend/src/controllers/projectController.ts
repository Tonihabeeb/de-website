import { Request, Response } from 'express';
import { ProjectModel } from '../models/Project';

// GET /api/admin/projects - Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { status, location, created_by, limit, offset } = req.query;

    const query: any = {};
    if (status) query.status = status;
    if (location) query.location = location;
    if (created_by) query.created_by = created_by;

    let queryBuilder = ProjectModel.find(query).sort({ created_at: -1 });
    
    if (limit) {
      queryBuilder = queryBuilder.limit(parseInt(limit as string));
    }
    
    if (offset) {
      queryBuilder = queryBuilder.skip(parseInt(offset as string));
    }

    const projects = await queryBuilder.exec();

    res.json({
      success: true,
      projects,
      total: projects.length,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch projects' 
    });
  }
};

// GET /api/admin/projects/:id - Get project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await ProjectModel.findById(id);
    
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        error: 'Project not found' 
      });
    }

    res.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch project' 
    });
  }
};

// POST /api/admin/projects - Create new project
export const createProject = async (req: Request, res: Response) => {
  try {
    const projectData = req.body;
    const project = new ProjectModel(projectData);
    await project.save();

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create project' 
    });
  }
};

// PUT /api/admin/projects/:id - Update project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const project = await ProjectModel.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ 
        success: false, 
        error: 'Project not found' 
      });
    }

    res.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update project' 
    });
  }
};

// DELETE /api/admin/projects/:id - Delete project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await ProjectModel.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ 
        success: false, 
        error: 'Project not found' 
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete project' 
    });
  }
}; 