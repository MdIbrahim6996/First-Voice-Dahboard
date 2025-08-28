import { Router } from "express";
import {
  createEmployeeAttendance,
  getUserAllAttendance,
} from "../../controllers/attendance.controller";
import { createUserAttendance } from "../../controllers/user/attendance.controller";

const router = Router();

router.post("/", createUserAttendance);
router.post("/:id", createEmployeeAttendance);
router.get("/:id", getUserAllAttendance);

export default router;
