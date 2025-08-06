"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const holiday_controller_1 = require("../../controllers/holiday.controller");
const router = (0, express_1.Router)();
router.get("/", holiday_controller_1.getAllHoliday);
exports.default = router;
