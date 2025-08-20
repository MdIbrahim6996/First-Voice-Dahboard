import { Router } from "express";
import {
    getProcessLeadCount,
    getTopSellers,
} from "../controllers/mainDashboard.controller";

const router = Router();

// router.post("/", createMainDashboard);
router.get("/", getTopSellers);
router.get("/process-lead-count", getProcessLeadCount);
// router.get("/:id");
// router.put("/:id");
// router.delete("/:id");

export default router;
