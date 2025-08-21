"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dashboard_controller_1 = require("../controllers/dashboard.controller");
var router = (0, express_1.Router)();
router.get("/", dashboard_controller_1.getDailyLeadCount);
exports.default = router;
