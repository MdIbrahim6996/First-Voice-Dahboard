import { Router } from "express";
import NotificationRoute from "./notification.route";
import holidayRoute from "./holiday.route";
import attendanceRoute from "./attendance.route";
import planRoute from "./plan.route";
import processRoute from "./process.route";
import leadRoute from "./lead.route";
import mainDashboardRoute from "./mainDashboard.route";
import userRoute from "./user.route";
import statusRoute from "./status.route";

const router = Router();

// router.use("/dashboard", dashboardRouter);
// router.use("/main-dashboard", mainDashboardRouter);
// router.use("/lead", leadRouter);
// router.use("/user", userRouter);
// router.use("/employee", employeeAttendance);
// router.use("/status", statusRoute);
router.use("/main-dashboard", mainDashboardRoute);
router.use("/notification", NotificationRoute);
router.use("/holiday", holidayRoute);
router.use("/attendance", attendanceRoute);
router.use("/plan", planRoute);
router.use("/process", processRoute);
router.use("/lead", leadRoute);
router.use("/user", userRoute);
router.use("/status", statusRoute);
// router.use("/profile", profileRoute);

export default router;
