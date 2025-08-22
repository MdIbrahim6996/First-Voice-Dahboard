import { Router } from "express";
import {
    createEmployeeAttendance,
    getAllAttendance,
    getEmployeeMonthlyAttendance,
    getUserAllAttendance,
} from "../../controllers/attendance.controller";

const router = Router();

// router.get("/monthly", getEmployeeMonthlyAttendance);
// router.get("/:id", getEmployeePeriodwiseAttendance);

router.post("/:id", createEmployeeAttendance);
router.get("/monthly", getEmployeeMonthlyAttendance);
router.get("/:id", getUserAllAttendance);
router.get("/", getAllAttendance);

// router.post("/", createAttendance);
// router.get("/", getAllAttendance);
// router.get("/:id", getSingleAttendance);
// router.put("/:id", updateAttendance);
// router.delete("/:id", deleteAttendance);

export default router;
