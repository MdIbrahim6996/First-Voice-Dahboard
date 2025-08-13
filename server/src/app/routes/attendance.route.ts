import { Router } from "express";
import {
    createEmployeeAttendance,
    getAllAttendance,
    getUserAllAttendance,
    getEmployeeMonthlyAttendance,
    getEmployeePeriodwiseAttendance,
} from "../controllers/attendance.controller";

const router = Router();

router.get("/monthly", getEmployeeMonthlyAttendance);
router.post("/:id", createEmployeeAttendance);
router.get("/:id", getEmployeePeriodwiseAttendance);
router.get("/employee/:id", getUserAllAttendance);
router.get("/", getAllAttendance);
// router.get("/:id", getSingleAttendance);

export default router;
