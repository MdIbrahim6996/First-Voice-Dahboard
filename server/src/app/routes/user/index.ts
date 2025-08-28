import { Router, Response } from "express";
import attendanceRouter from "./attendance.route";
import notificationRouter from "./notification.route";
import holidayRouter from "./holiday.route";
import profileRouter from "./profile.route";
import leadRouter from "./lead.route";
import processRouter from "./process.route";
import planRouter from "./plan.route";
import dashboardRouter from "./dashboard.route";
import userRouter from "./user.route";
import statusRouter from "./status.route";
import pagesRouter from "./pages.route";

const router = Router();

router.use("/", pagesRouter);
router.use("/dashboard", dashboardRouter);
router.use("/attendance", attendanceRouter);
router.use("/notification", notificationRouter);
router.use("/holiday", holidayRouter);
router.use("/profile", profileRouter);
router.use("/lead", leadRouter);
router.use("/process", processRouter);
router.use("/plan", planRouter);
router.use("/user", userRouter);
router.use("/status", statusRouter);

export default router;
