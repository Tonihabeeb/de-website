"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocument = createDocument;
exports.listDocuments = listDocuments;
exports.getDocumentById = getDocumentById;
exports.updateDocument = updateDocument;
exports.deleteDocument = deleteDocument;
exports.downloadDocument = downloadDocument;
const Document_1 = require("../models/Document");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const audit_1 = require("../utils/audit");
async function createDocument(req, res) {
    try {
        // @ts-ignore
        const userId = req.user?.userId;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        if (!req.file)
            return res.status(400).json({ error: 'File is required.' });
        const { title, description, type, category, permissions, metadata } = req.body;
        if (!title || !type || !category) {
            return res.status(400).json({ error: 'Title, type, and category are required.' });
        }
        const fileUrl = `/uploads/${req.file.filename}`;
        const doc = new Document_1.DocumentModel({
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
        await (0, audit_1.logAudit)({ userId, action: 'create', targetId: doc._id, targetType: 'Document', details: { title, type, category } });
        return res.status(201).json({ document: doc });
    }
    catch (err) {
        console.error('Document upload error:', err);
        return res.status(500).json({ error: 'Failed to create document.' });
    }
}
async function listDocuments(req, res) {
    try {
        // @ts-ignore
        const userRole = req.user?.role || 'viewer';
        const docs = await Document_1.DocumentModel.find({ permissions: userRole }).sort({ createdAt: -1 });
        return res.json({ documents: docs });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to fetch documents.' });
    }
}
async function getDocumentById(req, res) {
    try {
        const { id } = req.params;
        // @ts-ignore
        const userRole = req.user?.role || 'viewer';
        const doc = await Document_1.DocumentModel.findOne({ _id: id, permissions: userRole });
        if (!doc)
            return res.status(404).json({ error: 'Document not found or access denied.' });
        return res.json({ document: doc });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to fetch document.' });
    }
}
async function updateDocument(req, res) {
    try {
        const { id } = req.params;
        // @ts-ignore
        const userId = req.user?.userId;
        // @ts-ignore
        const userRole = req.user?.role;
        if (!['admin', 'editor'].includes(userRole)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const update = { ...req.body, updatedAt: new Date() };
        if (req.file) {
            update.fileUrl = `/uploads/${req.file.filename}`;
            update.version = (parseInt(req.body.version, 10) || 1) + 1;
        }
        if (update.metadata) {
            update.metadata = JSON.parse(update.metadata);
        }
        const doc = await Document_1.DocumentModel.findByIdAndUpdate(id, update, { new: true });
        if (!doc)
            return res.status(404).json({ error: 'Document not found.' });
        await (0, audit_1.logAudit)({ userId, action: 'update', targetId: id, targetType: 'Document', details: { update } });
        return res.json({ document: doc });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to update document.' });
    }
}
async function deleteDocument(req, res) {
    try {
        const { id } = req.params;
        // @ts-ignore
        const userId = req.user?.userId;
        // @ts-ignore
        const userRole = req.user?.role;
        if (userRole !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const doc = await Document_1.DocumentModel.findByIdAndDelete(id);
        if (!doc)
            return res.status(404).json({ error: 'Document not found.' });
        // Optionally delete file from disk
        if (doc.fileUrl) {
            const filePath = path_1.default.join(__dirname, '../../', doc.fileUrl);
            if (fs_1.default.existsSync(filePath))
                fs_1.default.unlinkSync(filePath);
        }
        await (0, audit_1.logAudit)({ userId, action: 'delete', targetId: id, targetType: 'Document', details: { title: doc.title } });
        return res.json({ message: 'Document deleted.' });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to delete document.' });
    }
}
async function downloadDocument(req, res) {
    try {
        const { id } = req.params;
        // @ts-ignore
        const userId = req.user?.userId;
        // @ts-ignore
        const userRole = req.user?.role || 'viewer';
        const doc = await Document_1.DocumentModel.findOne({ _id: id, permissions: userRole });
        if (!doc)
            return res.status(404).json({ error: 'Document not found or access denied.' });
        const filePath = path_1.default.join(__dirname, '../../', doc.fileUrl);
        if (!fs_1.default.existsSync(filePath))
            return res.status(404).json({ error: 'File not found.' });
        await (0, audit_1.logAudit)({ userId, action: 'download', targetId: id, targetType: 'Document', details: { title: doc.title } });
        res.download(filePath, path_1.default.basename(filePath));
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to download document.' });
    }
}
