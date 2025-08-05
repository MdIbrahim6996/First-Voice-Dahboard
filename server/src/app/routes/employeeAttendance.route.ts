import { Router } from "express";

import {
    getEmployeeYearlyAttendance,
    createEmployeeAttendance,
    getEmployeeAllAttendance,
} from "../controllers/employeeAttendance.controller";

const router = Router();

router.post("/attendance/:id", createEmployeeAttendance);
router.get("/attendance/:id", getEmployeeAllAttendance);
router.get("/attendance/:id/yearly", getEmployeeYearlyAttendance);

export default router;
