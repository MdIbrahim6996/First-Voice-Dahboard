import { Router } from "express";
import {
    getProfileCardInfo,
    getUserInfo,
    getUserMonthWiseAttendance,
} from "../../controllers/profile.controller";

const router = Router();

router.get("/:userId", getUserInfo);
router.get("/:userId/yearly", getUserMonthWiseAttendance);
router.get("/card/:userId", getProfileCardInfo);

export default router;
