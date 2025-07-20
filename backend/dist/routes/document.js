"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const documentController_1 = require("../controllers/documentController");
const auth_1 = require("../middleware/auth");
const uploadDir = path_1.default.join(__dirname, '../../uploads');
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + '-' + file.originalname.replace(/\s+/g, '_'));
    }
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.post('/', auth_1.requireAuth, upload.single('file'), documentController_1.createDocument);
router.get('/', auth_1.requireAuth, documentController_1.listDocuments);
router.get('/:id', auth_1.requireAuth, documentController_1.getDocumentById);
router.put('/:id', auth_1.requireAuth, upload.single('file'), documentController_1.updateDocument);
router.delete('/:id', auth_1.requireAuth, documentController_1.deleteDocument);
router.get('/:id/download', auth_1.requireAuth, documentController_1.downloadDocument);
exports.default = router;
