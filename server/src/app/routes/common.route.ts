import { Router } from "express";
import { getUserDetails } from "../controllers/common.controller";

const router = Router();

router.get("/user-detail", getUserDetails);

export default router;
