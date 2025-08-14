import { Router } from "express";

import { getAllStatus } from "../../controllers/status.controller";

const router = Router();

router.get("/", getAllStatus);

export default router;
