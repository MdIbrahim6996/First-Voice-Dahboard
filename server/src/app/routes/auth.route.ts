import { Router } from "express";
import {
    loginController,
    logoutController,
    registerController,
} from "../controllers/auth.controllers";

const router = Router();

// router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);

export default router;
