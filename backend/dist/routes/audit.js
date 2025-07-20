"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auditController_1 = require("../controllers/auditController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', auth_1.requireAuth, (0, auth_1.requireRole)('admin'), auditController_1.getAuditLogs);
exports.default = router;
