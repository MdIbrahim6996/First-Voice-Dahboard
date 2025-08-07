import { Router } from "express";
import { getDailyLeadCount } from "../controllers/dashboard.controller";

const router = Router();

router.get("/", getDailyLeadCount);

export default router;
