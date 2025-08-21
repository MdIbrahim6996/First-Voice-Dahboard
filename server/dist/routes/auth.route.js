"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controllers_1 = require("../controllers/auth.controllers");
var router = (0, express_1.Router)();
// router.post("/register", registerController);
router.post("/login", auth_controllers_1.loginController);
router.post("/logout", auth_controllers_1.logoutController);
exports.default = router;
