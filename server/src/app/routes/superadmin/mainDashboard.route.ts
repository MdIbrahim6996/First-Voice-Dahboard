import { Router } from "express";

import {
    getProcessLeadCount,
    getTopSellers,
} from "../../controllers/mainDashboard.controller";

const router = Router();

router.get("/seller", getTopSellers);
router.get("/process-lead-count", getProcessLeadCount);

export default router;
