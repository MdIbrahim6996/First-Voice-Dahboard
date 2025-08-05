import { Router } from "express";

import {
    createPlan,
    deletePlan,
    getAllPlan,
    getPlanInfo,
} from "../controllers/plan.controller";

const router = Router();

router.post("/", createPlan);
router.get("/", getAllPlan);
router.get("/:id", getPlanInfo);
// router.put("/:id");
router.delete("/:id", deletePlan);

export default router;
