"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mainDashboard_controller_1 = require("../../controllers/mainDashboard.controller");
var router = (0, express_1.Router)();
router.get("/seller", mainDashboard_controller_1.getTopSellers);
router.get("/process-lead-count", mainDashboard_controller_1.getProcessLeadCount);
exports.default = router;
