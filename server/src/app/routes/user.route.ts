import { Router } from "express";
import {
    createUser,
    deleteUser,
    getAllUser,
    getSingleUser,
} from "../controllers/user.controller";

const router = Router();

router.post("/", createUser);
router.get("/", getAllUser);
router.get("/:id", getSingleUser);
// router.put("/:id");
router.delete("/:id", deleteUser);

export default router;
