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
exports.deleteNotification = exports.getAllNotificationOfUser = exports.createNotification = void 0;
const prismaClient_1 = require("../lib/prismaClient");
const createNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const notif = await prisma.notification.create({
        //     data:{}
        // })
        res.send("create");
    }
    catch (error) {
        console.log(error);
    }
});
exports.createNotification = createNotification;
//USER CONTROLLERS
const getAllNotificationOfUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const notif = yield prismaClient_1.prisma.notification.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: "desc" },
        });
        res.cookie("notif", "notif", {
            sameSite: "none",
            secure: true,
            maxAge: 10 * 1000,
        }).send(notif);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllNotificationOfUser = getAllNotificationOfUser;
const deleteNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, id } = req.params;
    try {
        const existingNotif = yield prismaClient_1.prisma.notification.findFirst({
            where: { id: parseInt(id) },
        });
        if ((existingNotif === null || existingNotif === void 0 ? void 0 : existingNotif.userId) !== parseInt(userId)) {
            throw new Error("You are not allowed to perform this operation");
        }
        const notif = yield prismaClient_1.prisma.notification.delete({
            where: { id: parseInt(id), userId: parseInt(userId) },
        });
        res.send(notif);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteNotification = deleteNotification;
