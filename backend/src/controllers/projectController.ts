import { Request, Response } from 'express';
import { ProjectModel, CreateProjectSchema, UpdateProjectSchema } from '../models/Project';

export async function listProjects(req: Request, res: Response) {
  try {
    const { status, owner_id, limit, offset } = req.query;
    const projects = await ProjectModel.findAll({
      status: status as any,
      owner_id: owner_id as string,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list projects' });
  }
}

export async function getProject(req: Request, res: Response) {
  try {
    const project = await ProjectModel.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get project' });
  }
}

export async function createProject(req: Request, res: Response) {
  try {
    const data = CreateProjectSchema.parse(req.body);
    // TODO: Enforce only authenticated users can create
    const project = await ProjectModel.create(data);
    res.status(201).json(project);
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Failed to create project' });
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const data = UpdateProjectSchema.parse(req.body);
    // TODO: Enforce only owner or admin can update
    const project = await ProjectModel.update(req.params.id, data);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Failed to update project' });
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    // TODO: Enforce only owner or admin can delete
    const ok = await ProjectModel.delete(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Project not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
} 