"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var employeeAttendance_controller_1 = require("../controllers/employeeAttendance.controller");
var router = (0, express_1.Router)();
router.post("/attendance/:id", employeeAttendance_controller_1.createEmployeeAttendance);
router.get("/attendance/:id", employeeAttendance_controller_1.getEmployeeAllAttendance);
router.get("/attendance/:id/yearly", employeeAttendance_controller_1.getEmployeeYearlyAttendance);
exports.default = router;
