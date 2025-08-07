import { Router } from "express";
import attendanceRouter from "./attendance.route";
import notificationRouter from "./notification.route";
import holidayRouter from "./holiday.route";
import profileRouter from "./profile.route";
import leadRouter from "./lead.route";
import processRouter from "./process.route";
import planRouter from "./plan.route";
import dashboardRouter from "./dashboard.route";

const router = Router();

router.use("/dashboard", dashboardRouter);
router.use("/attendance", attendanceRouter);
router.use("/notification", notificationRouter);
router.use("/holiday", holidayRouter);
router.use("/profile", profileRouter);
router.use("/lead", leadRouter);
router.use("/process", processRouter);
router.use("/plan", planRouter);

export default router;
