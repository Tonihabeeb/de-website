import { Request, Response } from 'express';
import { PageModel, CreatePageSchema, UpdatePageSchema } from '../models/Page';

export async function listPages(req: Request, res: Response) {
  try {
    const { published, author_id, limit, offset } = req.query;
    const pages = await PageModel.findAll({
      published: published !== undefined ? published === 'true' : undefined,
      author_id: author_id as string,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list pages' });
  }
}

export async function getPage(req: Request, res: Response) {
  try {
    const page = await PageModel.findById(req.params.id);
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get page' });
  }
}

export async function getPageBySlug(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    
    // Handle empty slug case (home page)
    const pageSlug = slug || '';
    
    const page = await PageModel.findBySlug(pageSlug);
    
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    console.error('Error in getPageBySlug:', err);
    res.status(500).json({ error: 'Failed to get page' });
  }
}

export async function createPage(req: Request, res: Response) {
  try {
    const data = CreatePageSchema.parse(req.body);
    // TODO: Enforce only authenticated users can create
    const page = await PageModel.create(data);
    res.status(201).json(page);
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Failed to create page' });
  }
}

export async function updatePage(req: Request, res: Response) {
  try {
    const data = UpdatePageSchema.parse(req.body);
    // TODO: Enforce only author or admin can update
    const page = await PageModel.update(req.params.id, data);
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Failed to update page' });
  }
}

export async function deletePage(req: Request, res: Response) {
  try {
    // TODO: Enforce only author or admin can delete
    const ok = await PageModel.delete(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Page not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete page' });
  }
}

export async function publishPage(req: Request, res: Response) {
  try {
    // Set published to true and published_at to now
    const page = await PageModel.update(req.params.id, { published: true, published_at: new Date() });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: 'Failed to publish page' });
  }
}

export async function unpublishPage(req: Request, res: Response) {
  try {
    // Set published to false and published_at to null
    const page = await PageModel.update(req.params.id, { published: false, published_at: null });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: 'Failed to unpublish page' });
  }
} 