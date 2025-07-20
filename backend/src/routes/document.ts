import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import {
  createDocument,
  listDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  downloadDocument
} from '../controllers/documentController';
import { requireAuth } from '../middleware/auth';

const uploadDir = path.join(__dirname, '../../uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});
const upload = multer({ storage });

const router = Router();

router.post('/', requireAuth, upload.single('file'), createDocument);
router.get('/', requireAuth, listDocuments);
router.get('/:id', requireAuth, getDocumentById);
router.put('/:id', requireAuth, upload.single('file'), updateDocument);
router.delete('/:id', requireAuth, deleteDocument);
router.get('/:id/download', requireAuth, downloadDocument);

export default router; 