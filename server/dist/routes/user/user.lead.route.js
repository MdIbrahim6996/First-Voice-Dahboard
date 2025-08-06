"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lead_controller_1 = require("../../controllers/lead.controller");
const router = (0, express_1.Router)();
router.get("/:userId", lead_controller_1.getAllLeadOfUser);
exports.default = router;
