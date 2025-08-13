import { Router } from "express";
import {
    getProfileCardInfo,
    getUserInfo,
} from "../controllers/profile.controller";

const router = Router();

router.get("/:userId", getUserInfo);
router.get("/card/:userId", getProfileCardInfo);

export default router;
