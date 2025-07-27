import { Request, Response } from 'express';
import { NavigationMenuModel } from '../models/NavigationMenu';

export async function listNavigationMenus(req: Request, res: Response) {
  try {
    const menus = NavigationMenuModel.findAll();
    res.json({ success: true, navigation: menus });
  } catch (err) {
    res.status(500).json({ error: 'Failed to list navigation menus' });
  }
}

export async function getNavigationMenu(req: Request, res: Response) {
  try {
    const menu = NavigationMenuModel.findById(req.params.id);
    if (!menu) return res.status(404).json({ error: 'Navigation menu not found' });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get navigation menu' });
  }
}

export async function createNavigationMenu(req: Request, res: Response) {
  try {
    const { name, items_json } = req.body;
    if (!name || !items_json) {
      return res.status(400).json({ error: 'Name and items_json are required' });
    }
    const menu = NavigationMenuModel.create({ name, items_json });
    res.status(201).json(menu);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create navigation menu' });
  }
}

export async function updateNavigationMenu(req: Request, res: Response) {
  try {
    const { name, items_json } = req.body;
    if (!name && !items_json) {
      return res.status(400).json({ error: 'At least one of name or items_json is required' });
    }
    const menu = NavigationMenuModel.update(req.params.id, { name, items_json });
    if (!menu) return res.status(404).json({ error: 'Navigation menu not found' });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update navigation menu' });
  }
}

export async function deleteNavigationMenu(req: Request, res: Response) {
  try {
    const ok = NavigationMenuModel.deleteById(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Navigation menu not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete navigation menu' });
  }
} 