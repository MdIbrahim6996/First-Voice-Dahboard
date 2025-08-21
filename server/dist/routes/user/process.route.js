"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var process_controller_1 = require("../../controllers/process.controller");
var router = (0, express_1.Router)();
router.get("/", process_controller_1.getAllProcess);
exports.default = router;
