import { Request, Response } from 'express';
import { MediaModel, CreateMediaSchema } from '../models/Media';
import type { Multer } from 'multer';

export async function listMedia(req: Request, res: Response) {
  try {
    const { mime_type, uploaded_by, project_id, page_id, limit, offset } = req.query;
    const media = MediaModel.findAll({
      mime_type: mime_type as string,
      uploaded_by: uploaded_by as string,
      project_id: project_id as string,
      page_id: page_id as string,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list media' });
  }
}

export async function getMedia(req: Request, res: Response) {
  try {
    const media = MediaModel.findById(req.params.id);
    if (!media) return res.status(404).json({ error: 'Media not found' });
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get media' });
  }
}

export async function uploadMedia(req: Request, res: Response) {
  try {
    // Placeholder: req.file should be set by Multer middleware
    const file = req.file as Express.Multer.File | undefined;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const { originalname, filename, mimetype, path: filePath } = file;
    // Assume file is served at /uploads/:filename
    const url = `/uploads/${filename}`;
    const data = CreateMediaSchema.parse({
      filename: originalname,
      url,
      mime_type: mimetype,
      uploaded_by: req.body.uploaded_by,
      project_id: req.body.project_id,
      page_id: req.body.page_id,
    });
    const media = MediaModel.create(data);
    res.status(201).json(media);
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Failed to upload media' });
  }
}

export async function deleteMedia(req: Request, res: Response) {
  try {
    const ok = MediaModel.deleteById(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Media not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete media' });
  }
} 