import { Router } from "express";

import {
    createStatus,
    deleteStatus,
    getAllStatus,
    updateStatus,
} from "../../controllers/status.controller";

const router = Router();

router.post("/", createStatus);
router.get("/", getAllStatus);
router.put("/:id", updateStatus);
router.delete("/:id", deleteStatus);

export default router;
