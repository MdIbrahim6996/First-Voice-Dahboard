"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var status_controller_1 = require("../../controllers/status.controller");
var router = (0, express_1.Router)();
router.get("/", status_controller_1.getAllStatus);
exports.default = router;
