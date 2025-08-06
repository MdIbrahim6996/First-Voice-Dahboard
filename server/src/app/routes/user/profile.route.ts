import { Router } from "express";
import {
    getUserInfo,
    getUserMonthWiseAttendance,
} from "../../controllers/profile.controller";

const router = Router();

router.get("/:userId", getUserInfo);
router.get("/:userId/yearly", getUserMonthWiseAttendance);

export default router;
