"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var attendance_controller_1 = require("../../controllers/attendance.controller");
var router = (0, express_1.Router)();
router.post("/:id", attendance_controller_1.createEmployeeAttendance);
router.get("/:id", attendance_controller_1.getUserAllAttendance);
exports.default = router;
