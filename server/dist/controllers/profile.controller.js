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
exports.getUserMonthWiseAttendance = exports.getUserInfo = void 0;
const prismaClient_1 = require("../lib/prismaClient");
const lodash_1 = require("lodash");
const arrayGouping_1 = require("../utils/arrayGouping");
const getUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { time = "thisMonth" } = req.query;
    try {
        const filterDate = {
            startDate: new Date(),
            endDate: new Date(),
        };
        const currentDate = new Date();
        if (time === "today") {
            const startDay = currentDate.setUTCHours(0, 0, 0, 0);
            const nextDay = new Date(currentDate.setDate(currentDate.getDate() + 1)).setUTCHours(0, 0, 0, 0);
            console.log(new Date(nextDay));
            filterDate.startDate = new Date(startDay);
            filterDate.endDate = new Date(nextDay);
        }
        if (time === "thisMonth") {
            const startMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2).setUTCHours(0, 0, 0);
            const endMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 2).setUTCHours(0, 0, 0);
            filterDate.startDate = new Date(startMonth);
            filterDate.endDate = new Date(endMonth);
        }
        if (time === "thisYear") {
            const startYear = new Date();
            startYear.setMonth(0);
            startYear.setDate(1);
            startYear.setUTCHours(0, 0, 0, 0);
            const endYear = new Date();
            endYear.setFullYear(endYear.getFullYear() + 1);
            endYear.setMonth(0);
            endYear.setDate(1);
            endYear.setUTCHours(0, 0, 0, 0);
            filterDate.startDate = new Date(startYear);
            filterDate.endDate = new Date(endYear);
        }
        const status = yield prismaClient_1.prisma.status.findMany({});
        const result = status.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            const data = yield prismaClient_1.prisma.lead.groupBy({
                by: ["statusId"],
                where: {
                    closerId: parseInt(userId),
                    statusId: item === null || item === void 0 ? void 0 : item.id,
                    saleDate: {
                        gte: filterDate.startDate,
                        lte: filterDate.endDate,
                    },
                },
                _count: { _all: true },
            });
            const count = (_b = (_a = data[0]) === null || _a === void 0 ? void 0 : _a._count) === null || _b === void 0 ? void 0 : _b._all;
            return {
                status: item === null || item === void 0 ? void 0 : item.name,
                count: count ? count : 0,
            };
        }));
        // const user = await prisma.lead.groupBy({
        //     by: ["statusId"],
        //     where: { closerId: parseInt(userId), statusId: 1 },
        //     _count: { _all: true },
        // });
        const data = yield Promise.all(result);
        res.send(data);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUserInfo = getUserInfo;
const getUserMonthWiseAttendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield prismaClient_1.prisma.user.findFirst({
            where: { id: parseInt(userId) },
        });
        if (!user)
            throw new Error("User doesn't exist.");
        const userAttendance = yield prismaClient_1.prisma.attendance.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { dateTime: "desc" },
        });
        const grouped = (0, lodash_1.groupBy)(userAttendance, (record) => record.dateTime.toISOString().slice(5, 7));
        res.send({ data: grouped, graphData: (0, arrayGouping_1.graphData)(grouped) });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getUserMonthWiseAttendance = getUserMonthWiseAttendance;
