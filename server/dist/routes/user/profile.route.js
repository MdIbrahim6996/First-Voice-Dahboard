"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var profile_controller_1 = require("../../controllers/profile.controller");
var router = (0, express_1.Router)();
router.get("/:userId", profile_controller_1.getUserInfo);
router.get("/:userId/yearly", profile_controller_1.getUserMonthWiseAttendance);
router.get("/card/:userId", profile_controller_1.getProfileCardInfo);
exports.default = router;
