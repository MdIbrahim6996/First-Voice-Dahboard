import { Router } from "express";
import { getDailyLeadCount } from "../../controllers/dashboard.controller";

const router = Router();

router.get("/:userId", getDailyLeadCount);

export default router;
