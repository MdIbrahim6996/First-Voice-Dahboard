import { Router } from "express";

import { getTopSellers } from "../../controllers/mainDashboard.controller";

const router = Router();

router.get("/seller", getTopSellers);

export default router;
