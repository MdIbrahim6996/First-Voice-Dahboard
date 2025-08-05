import { Router } from "express";
import attendanceRouter from "./attendance.route";
import notificationRouter from "./notification.route";
import holidayRouter from "./holiday.route";
import { isAuth } from "../../middlewares/authMiddleware";

const router = Router();

router.use("/attendance", isAuth, attendanceRouter);
router.use("/notification", isAuth, notificationRouter);
router.use("/holiday", isAuth, holidayRouter);

// router.use("/dashboard", dashboardRouter);
// router.use("/main-dashboard", mainDashboardRouter);
// router.use("/holiday", holidayRouter);
// router.use("/lead", leadRouter);
// router.use("/process", processRouter);
// router.use("/user", userRouter);
// router.use("/plan", planRouter);
// router.use("/employee", employeeAttendance);
// router.use("/status", statusRoute);
// router.use("/profile", profileRoute);

export default router;
