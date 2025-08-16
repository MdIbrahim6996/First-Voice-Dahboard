"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendance_controller_1 = require("../../controllers/attendance.controller");
const router = (0, express_1.Router)();
router.post("/:id", attendance_controller_1.createEmployeeAttendance);
router.get("/:id", attendance_controller_1.getUserAllAttendance);
exports.default = router;
