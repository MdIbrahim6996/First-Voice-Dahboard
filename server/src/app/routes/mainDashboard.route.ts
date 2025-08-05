import { Router } from "express";
import {
    createMainDashboard,
    getAllMainDashboard,
} from "../controllers/mainDashboard.controller";

const router = Router();

router.post("/", createMainDashboard);
router.get("/", getAllMainDashboard);
// router.get("/:id");
// router.put("/:id");
// router.delete("/:id");

export default router;
