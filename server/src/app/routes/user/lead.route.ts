import { Router } from "express";
import {
    createLead,
    getAllLeadOfUser,
} from "../../controllers/lead.controller";

const router = Router();

router.post("/", createLead);
router.get("/:userId", getAllLeadOfUser);

export default router;
