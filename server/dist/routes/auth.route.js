"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var router = (0, express_1.Router)();
// router.post("/register", registerController);
router.post("/login", auth_controller_1.loginController);
router.post("/logout", auth_controller_1.logoutController);
exports.default = router;
