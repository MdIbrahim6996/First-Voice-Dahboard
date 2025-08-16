"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const status_controller_1 = require("../../controllers/status.controller");
const router = (0, express_1.Router)();
router.get("/", status_controller_1.getAllStatus);
exports.default = router;
