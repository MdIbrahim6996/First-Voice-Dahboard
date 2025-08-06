import { Router } from "express";
import { getAllLeadOfUser } from "../../controllers/lead.controller";

const router = Router();

router.get("/:userId", getAllLeadOfUser);

export default router;
