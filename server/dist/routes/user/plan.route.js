"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var plan_controller_1 = require("../../controllers/plan.controller");
var router = (0, express_1.Router)();
router.get("/", plan_controller_1.getAllPlan);
exports.default = router;
