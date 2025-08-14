import { Router } from "express";
import {
    createEmployeeAttendance,
    getUserAllAttendance,
} from "../../controllers/attendance.controller";

const router = Router();

router.post("/:id", createEmployeeAttendance);
router.get("/:id", getUserAllAttendance);



export default router;
