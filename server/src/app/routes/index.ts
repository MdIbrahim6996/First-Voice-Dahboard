import { Router } from "express";

import authRouter from "./auth.route";
// import attendanceRouter from "./attendance.route";
// import dashboardRouter from "./dashboard.route";
import mainDashboardRouter from "./mainDashboard.route";
// import holidayRouter from "./holiday.route";
// import leadRouter from "./lead.route";
import processRouter from "./process.route";
// import userRouter from "./user.route";
import planRouter from "./plan.route";
// import employeeAttendance from "./employeeAttendance.route";
// import statusRoute from "./status.route";
// import notificationRoute from "./notification.route";
import commonRouter from "./common.route";

import superAdminRoute from "./superadmin";
import userRoute from "./user";
import { isAuth } from "../middlewares/authMiddleware";
import { isSuperAdmin } from "../middlewares/roleMiddleware";

const router = Router();

router.use("/superadmin", isAuth, isSuperAdmin, superAdminRoute);
router.use("/user", isAuth, userRoute);
router.use("/common", isAuth, commonRouter);

router.use("/auth", authRouter);
// router.use("/dashboard", dashboardRouter);
router.use("/main-dashboard", mainDashboardRouter);
// router.use("/holiday", holidayRouter);
// router.use("/lead", leadRouter);
router.use("/process", processRouter);
// router.use("/user", userRouter);
router.use("/plan", planRouter);
// router.use("/employee", employeeAttendance);
// router.use("/status", statusRoute);
// router.use("/notification", notificationRoute);
// router.use("/profile", profileRoute);

export default router;
