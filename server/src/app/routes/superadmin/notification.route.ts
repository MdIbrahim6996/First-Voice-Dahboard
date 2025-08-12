import { Router } from "express";
import {
    deleteNotification,
    getAllNotificationOfUser,
} from "../../controllers/superadmin/superadmin.notification.controller";

const router = Router();

router.get("/:userId", getAllNotificationOfUser);
router.delete("/:userId/:id", deleteNotification);

export default router;
