import { Request, Response } from 'express';
import { DocumentModel } from '../models/Document';
import { User } from '../models/User';
import path from 'path';
import fs from 'fs';
import { logAudit } from '../utils/audit';

export async function createDocument(req: Request, res: Response) {
  try {
    // @ts-ignore
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    if (!req.file) return res.status(400).json({ error: 'File is required.' });
    const { title, description, type, category, permissions, metadata } = req.body;
    if (!title || !type || !category) {
      return res.status(400).json({ error: 'Title, type, and category are required.' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    const doc = new DocumentModel({
      title,
      description,
      type,
      category,
      fileUrl,
      metadata: metadata ? JSON.parse(metadata) : undefined,
      createdBy: userId,
      permissions: permissions ? permissions.split(',') : ['admin', 'editor', 'viewer'],
    });
    await doc.save();
    await logAudit({ userId, action: 'create', targetId: doc._id, targetType: 'Document', details: { title, type, category } });
    return res.status(201).json({ document: doc });
  } catch (err) {
    console.error('Document upload error:', err);
    return res.status(500).json({ error: 'Failed to create document.' });
  }
}

export async function listDocuments(req: Request, res: Response) {
  try {
    // @ts-ignore
    const userRole = req.user?.role || 'viewer';
    const docs = await DocumentModel.find({ permissions: userRole }).sort({ createdAt: -1 });
    return res.json({ documents: docs });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch documents.' });
  }
}

export async function getDocumentById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    // @ts-ignore
    const userRole = req.user?.role || 'viewer';
    const doc = await DocumentModel.findOne({ _id: id, permissions: userRole });
    if (!doc) return res.status(404).json({ error: 'Document not found or access denied.' });
    return res.json({ document: doc });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch document.' });
  }
}

export async function updateDocument(req: Request, res: Response) {
  try {
    const { id } = req.params;
    // @ts-ignore
    const userId = req.user?.userId;
    // @ts-ignore
    const userRole = req.user?.role;
    if (!['admin', 'editor'].includes(userRole)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const update: any = { ...req.body, updatedAt: new Date() };
    if (req.file) {
      update.fileUrl = `/uploads/${req.file.filename}`;
      update.version = (parseInt(req.body.version, 10) || 1) + 1;
    }
    if (update.metadata) {
      update.metadata = JSON.parse(update.metadata);
    }
    const doc = await DocumentModel.findByIdAndUpdate(id, update, { new: true });
    if (!doc) return res.status(404).json({ error: 'Document not found.' });
    await logAudit({ userId, action: 'update', targetId: id, targetType: 'Document', details: { update } });
    return res.json({ document: doc });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update document.' });
  }
}

export async function deleteDocument(req: Request, res: Response) {
  try {
    const { id } = req.params;
    // @ts-ignore
    const userId = req.user?.userId;
    // @ts-ignore
    const userRole = req.user?.role;
    if (userRole !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const doc = await DocumentModel.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ error: 'Document not found.' });
    // Optionally delete file from disk
    if (doc.fileUrl) {
      const filePath = path.join(__dirname, '../../', doc.fileUrl);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await logAudit({ userId, action: 'delete', targetId: id, targetType: 'Document', details: { title: doc.title } });
    return res.json({ message: 'Document deleted.' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete document.' });
  }
}

export async function downloadDocument(req: Request, res: Response) {
  try {
    const { id } = req.params;
    // @ts-ignore
    const userId = req.user?.userId;
    // @ts-ignore
    const userRole = req.user?.role || 'viewer';
    const doc = await DocumentModel.findOne({ _id: id, permissions: userRole });
    if (!doc) return res.status(404).json({ error: 'Document not found or access denied.' });
    const filePath = path.join(__dirname, '../../', doc.fileUrl);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found.' });
    await logAudit({ userId, action: 'download', targetId: id, targetType: 'Document', details: { title: doc.title } });
    res.download(filePath, path.basename(filePath));
  } catch (err) {
    return res.status(500).json({ error: 'Failed to download document.' });
  }
} 