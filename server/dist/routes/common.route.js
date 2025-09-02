"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var common_controller_1 = require("../controllers/common.controller");
var router = (0, express_1.Router)();
router.get("/user-detail", common_controller_1.getUserDetails);
exports.default = router;
