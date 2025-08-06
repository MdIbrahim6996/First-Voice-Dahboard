"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const superadmin_notification_controller_1 = require("../../controllers/superadmin/superadmin.notification.controller");
const router = (0, express_1.Router)();
router.get("/:userId", superadmin_notification_controller_1.getAllNotificationOfUser);
router.delete("/:userId/:id", superadmin_notification_controller_1.deleteNotification);
exports.default = router;
