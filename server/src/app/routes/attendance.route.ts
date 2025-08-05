import { Router } from "express";
import {
    createAttendance,
    createEmployeeAttendance,
    deleteAttendance,
    getAllAttendance,
    getUserAllAttendance,
    getEmployeeMonthlyAttendance,
    getEmployeePeriodwiseAttendance,
    getSingleAttendance,
    updateAttendance,
} from "../controllers/attendance.controller";

const router = Router();

router.get("/monthly", getEmployeeMonthlyAttendance);
router.post("/:id", createEmployeeAttendance);
router.get("/:id", getEmployeePeriodwiseAttendance);
router.get("/employee/:id", getUserAllAttendance);
router.post("/", createAttendance);
router.get("/", getAllAttendance);
// router.get("/:id", getSingleAttendance);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

export default router;
