import { Router } from "express";
import { getAllPlan } from "../../controllers/plan.controller";

const router = Router();

router.get("/", getAllPlan);

export default router;
