"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var holiday_controller_1 = require("../../controllers/holiday.controller");
var router = (0, express_1.Router)();
router.get("/", holiday_controller_1.getAllUserHoliday);
exports.default = router;
