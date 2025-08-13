"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mainDashboard_controller_1 = require("../../controllers/mainDashboard.controller");
const router = (0, express_1.Router)();
router.get("/seller", mainDashboard_controller_1.getTopSellers);
exports.default = router;
