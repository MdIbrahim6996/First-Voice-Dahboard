"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.loginController = exports.registerController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prismaClient_1 = require("../lib/prismaClient");
const token_1 = require("../utils/token");
const registerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, role, name } = req.body;
        const existingUser = yield prismaClient_1.prisma.user.findFirst({ where: { email } });
        if (existingUser) {
            throw new Error("User Already Exist.");
        }
        const hanshedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prismaClient_1.prisma.user.create({
            data: { email, password: hanshedPassword, role, name },
        });
        res.send(user);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.registerController = registerController;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield prismaClient_1.prisma.user.findFirst({
            where: { email },
        });
        if (!existingUser) {
            throw new Error("User Does not Exist.");
        }
        const matchedPassword = yield bcrypt_1.default.compare(password, existingUser.password);
        if (matchedPassword) {
            const token = (0, token_1.generateAuthToken)(String(existingUser === null || existingUser === void 0 ? void 0 : existingUser.id), existingUser.role);
            const { password } = existingUser, userData = __rest(existingUser, ["password"]);
            return res
                .cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 12 * 60 * 60 * 1000,
            })
                .send({ user: userData });
        }
        else {
            throw new Error("Invalid Credentials.");
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.loginController = loginController;
const logoutController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.send({ msg: "logout success" });
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.logoutController = logoutController;
