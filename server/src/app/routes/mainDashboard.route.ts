import { Router } from "express";
import { getTopSellers } from "../controllers/mainDashboard.controller";

const router = Router();

// router.post("/", createMainDashboard);
router.get("/", getTopSellers);
// router.get("/:id");
// router.put("/:id");
// router.delete("/:id");

export default router;
