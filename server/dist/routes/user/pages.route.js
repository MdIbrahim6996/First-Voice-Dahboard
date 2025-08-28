"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dashboard_controller_1 = require("../../controllers/user/dashboard.controller");
var attendance_controller_1 = require("../../controllers/user/attendance.controller");
var profile_controller_1 = require("../../controllers/user/profile.controller");
var router = (0, express_1.Router)();
router.get("", function (_, res) { return res.redirect("/user/dashboard"); });
router.get("/dashboard", dashboard_controller_1.getDailyLeadCount);
router.get("/attendance", attendance_controller_1.getUserAllAttendance);
router.get("/holiday", function (_, res) {
    return res.render("pages/holiday", { currentPath: "/user/holiday" });
});
router.get("/notification", function (_, res) {
    return res.render("pages/notification", { currentPath: "/user/notification" });
});
router.get("/profile", profile_controller_1.getUserInfo);
exports.default = router;
