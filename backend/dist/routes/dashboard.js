"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardController_1 = require("../controllers/dashboardController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/:type(project|financial|environmental|stakeholder)', auth_1.requireAuth, dashboardController_1.getDashboard);
router.put('/:type(project|financial|environmental|stakeholder)', auth_1.requireAuth, dashboardController_1.updateDashboard);
exports.default = router;
