"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var lead_controller_1 = require("../../controllers/lead.controller");
var router = (0, express_1.Router)();
router.post("/", lead_controller_1.createLead);
router.get("/:userId", lead_controller_1.getAllLeadOfUser);
exports.default = router;
