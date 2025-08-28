import { Router, Response } from "express";
import { getDailyLeadCount } from "../../controllers/user/dashboard.controller";
import { getUserAllAttendance } from "../../controllers/user/attendance.controller";
import { getUserInfo } from "../../controllers/user/profile.controller";
const router = Router();

router.get("", (_, res: Response) => res.redirect("/user/dashboard"));
router.get("/dashboard", getDailyLeadCount);
router.get("/attendance", getUserAllAttendance);
router.get("/holiday", (_, res: Response) =>
  res.render("pages/holiday", { currentPath: "/user/holiday" })
);
router.get("/notification", (_, res: Response) =>
  res.render("pages/notification", { currentPath: "/user/notification" })
);
router.get("/profile", getUserInfo);

export default router;
