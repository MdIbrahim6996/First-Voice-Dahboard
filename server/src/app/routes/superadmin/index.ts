import { Router } from "express";
import superAdminNitificationRoute from "./superadmin.notification.route";

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
router.use("/notification", superAdminNitificationRoute);
// router.use("/profile", profileRoute);

export default router;
