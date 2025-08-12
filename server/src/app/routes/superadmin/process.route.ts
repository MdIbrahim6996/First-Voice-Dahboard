import { Router } from "express";

import {
    createProcess,
    deleteProcess,
    getAllProcess,
    getProcessInfo,
    queryProcess,
} from "../../controllers/process.controller";

const router = Router();

router.post("/", createProcess);
router.get("/", getAllProcess);
router.get("/:id", getProcessInfo);
router.put("/:id", queryProcess);
router.delete("/:id", deleteProcess);

export default router;
