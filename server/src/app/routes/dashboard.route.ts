import { Router } from "express";
import {
    createDailyLeadCount,
    deleteDashboard,
    getDailyLeadCount,
    getSingleDashboard,
    updateDashboard,
} from "../controllers/dashboard.controller";

const router = Router();

router.post("/", createDailyLeadCount);
router.get("/", getDailyLeadCount);
router.get("/:id", getSingleDashboard);
router.put("/:id", updateDashboard);
router.delete("/:id", deleteDashboard);

export default router;
