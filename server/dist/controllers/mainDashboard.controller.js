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
exports.getProcessLeadCount = exports.getTopSellers = void 0;
const prismaClient_1 = require("../lib/prismaClient");
const getTopSellers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDay = new Date();
    currentDay.setUTCHours(0, 0, 0, 0);
    const nextDay = new Date();
    nextDay.setUTCHours(0, 0, 0, 0);
    nextDay.setUTCDate(nextDay.getUTCDate() + 1);
    try {
        const seller = yield prismaClient_1.prisma.leadCount.findMany({
            where: { updatedAt: { gte: currentDay, lte: nextDay } },
            orderBy: [{ count: "desc" }, { updatedAt: "desc" }],
            include: { user: { select: { name: true, alias: true } } },
        });
        res.send(seller);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getTopSellers = getTopSellers;
const getProcessLeadCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leadCount = yield prismaClient_1.prisma.process.findMany({});
        res.send(leadCount);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getProcessLeadCount = getProcessLeadCount;
