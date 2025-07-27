import { Request, Response } from 'express';
import { SiteSettingModel } from '../models/SiteSetting';

export async function listSiteSettings(req: Request, res: Response) {
  try {
    const settings = SiteSettingModel.findAll();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list site settings' });
  }
}

export async function getSiteSetting(req: Request, res: Response) {
  try {
    const setting = SiteSettingModel.findByKey(req.params.key);
    if (!setting) return res.status(404).json({ error: 'Setting not found' });
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get site setting' });
  }
}

export async function createSiteSetting(req: Request, res: Response) {
  try {
    const { key, value } = req.body;
    if (!key || !value) {
      return res.status(400).json({ error: 'Key and value are required' });
    }
    const existing = SiteSettingModel.findByKey(key);
    if (existing) {
      return res.status(409).json({ error: 'Setting already exists' });
    }
    const setting = SiteSettingModel.create({ key, value });
    res.status(201).json(setting);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create site setting' });
  }
}

export async function updateSiteSetting(req: Request, res: Response) {
  try {
    const { value } = req.body;
    if (!value) {
      return res.status(400).json({ error: 'Value is required' });
    }
    const setting = SiteSettingModel.update(req.params.key, { value });
    if (!setting) return res.status(404).json({ error: 'Setting not found' });
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update site setting' });
  }
}

export async function deleteSiteSetting(req: Request, res: Response) {
  try {
    const ok = SiteSettingModel.deleteByKey(req.params.key);
    if (!ok) return res.status(404).json({ error: 'Setting not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete site setting' });
  }
} 