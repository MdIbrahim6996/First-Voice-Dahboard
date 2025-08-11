import { Router } from "express";
import NotificationRoute from "./superadmin.notification.route";
import holidayRoute from "./holiday.route";
import attendanceRoute from "./attendance.route";

const router = Router();

// router.use("/attendance", attendanceRouter);
// router.use("/dashboard", dashboardRouter);
// router.use("/main-dashboard", mainDashboardRouter);
// router.use("/holiday", holidayRouter);
// router.use("/lead", leadRouter);
// router.use("/process", processRouter);
// router.use("/user", userRouter);
// router.use("/plan", planRouter);
// router.use("/employee", employeeAttendance);
// router.use("/status", statusRoute);
router.use("/notification", NotificationRoute);
router.use("/holiday", holidayRoute);
router.use("/attendance", attendanceRoute);
// router.use("/profile", profileRoute);

export default router;
