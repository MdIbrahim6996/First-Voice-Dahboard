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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = exports.isAdmin = exports.isSuperAdmin = void 0;
const isSuperAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if ((user === null || user === void 0 ? void 0 : user.role) !== "superadmin")
            throw new Error("Access Denied. Super Admin Route!");
        else
            next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.isSuperAdmin = isSuperAdmin;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if ((user === null || user === void 0 ? void 0 : user.role) !== "admin" || "superadmin")
            throw new Error("Access Denied. Admin Route!");
        else
            next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.isAdmin = isAdmin;
const isUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("isUser");
    next();
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.isUser = isUser;
