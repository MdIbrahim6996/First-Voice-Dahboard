import { Router } from "express";
import attendanceRouter from "./attendance.route";
import notificationRouter from "./notification.route";
import holidayRouter from "./holiday.route";
import profileRouter from "./profile.route";
import leadRouter from "./lead.route";

const router = Router();

router.use("/attendance", attendanceRouter);
router.use("/notification", notificationRouter);
router.use("/holiday", holidayRouter);
router.use("/profile", profileRouter);
router.use("/lead", leadRouter);

export default router;
