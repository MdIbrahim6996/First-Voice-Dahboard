import { Router } from "express";

import { getAllProcess } from "../../controllers/process.controller";

const router = Router();

router.get("/", getAllProcess);

export default router;
