"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../../controllers/user.controller");
var router = (0, express_1.Router)();
router.get("/", user_controller_1.getAllUser);
exports.default = router;
