"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var superadmin_notification_controller_1 = require("../../controllers/superadmin/superadmin.notification.controller");
var router = (0, express_1.Router)();
router.get("/:userId", superadmin_notification_controller_1.getAllNotificationOfUser);
router.delete("/:userId/:id", superadmin_notification_controller_1.deleteNotification);
exports.default = router;
