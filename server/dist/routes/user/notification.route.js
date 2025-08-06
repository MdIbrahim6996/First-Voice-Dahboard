"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("../../controllers/notification.controller");
const router = (0, express_1.Router)();
router.get("/:userId", notification_controller_1.getAllNotificationOfUser);
router.delete("/:userId/:id", notification_controller_1.deleteNotification);
exports.default = router;
