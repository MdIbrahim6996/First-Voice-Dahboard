"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const process_controller_1 = require("../../controllers/process.controller");
const router = (0, express_1.Router)();
router.get("/", process_controller_1.getAllProcess);
exports.default = router;
