import { Router } from "express";
import {
    deleteNotification,
    getAllNotificationOfUser,
} from "../../controllers/notification.controller";

const router = Router();

router.get("/:userId", getAllNotificationOfUser);
router.delete("/:userId/:id", deleteNotification);

export default router;
