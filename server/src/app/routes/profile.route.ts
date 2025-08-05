import { Router } from "express";
import { getUserInfo } from "../controllers/profile.controller";

const router = Router();

router.get("/:userId", getUserInfo);

export default router;
