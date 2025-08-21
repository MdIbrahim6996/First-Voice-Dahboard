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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileCardInfo = exports.getUserMonthWiseAttendance = exports.getUserInfo = void 0;
var prismaClient_1 = require("../lib/prismaClient");
var lodash_1 = require("lodash");
var arrayGouping_1 = require("../utils/arrayGouping");
var getUserInfo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, time, filterDate_1, currentDate, startDay, nextDay, startMonth, endMonth, startYear, endYear, status_1, result, data, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.params.userId;
                _a = req.query.time, time = _a === void 0 ? "thisMonth" : _a;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                filterDate_1 = {
                    startDate: new Date(),
                    endDate: new Date(),
                };
                currentDate = new Date();
                if (time === "today") {
                    startDay = currentDate.setUTCHours(0, 0, 0, 0);
                    nextDay = new Date(currentDate.setDate(currentDate.getDate() + 1)).setUTCHours(0, 0, 0, 0);
                    console.log(new Date(nextDay));
                    filterDate_1.startDate = new Date(startDay);
                    filterDate_1.endDate = new Date(nextDay);
                }
                if (time === "thisMonth") {
                    startMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2).setUTCHours(0, 0, 0);
                    endMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 2).setUTCHours(0, 0, 0);
                    filterDate_1.startDate = new Date(startMonth);
                    filterDate_1.endDate = new Date(endMonth);
                }
                if (time === "thisYear") {
                    startYear = new Date();
                    startYear.setMonth(0);
                    startYear.setDate(1);
                    startYear.setUTCHours(0, 0, 0, 0);
                    endYear = new Date();
                    endYear.setFullYear(endYear.getFullYear() + 1);
                    endYear.setMonth(0);
                    endYear.setDate(1);
                    endYear.setUTCHours(0, 0, 0, 0);
                    filterDate_1.startDate = new Date(startYear);
                    filterDate_1.endDate = new Date(endYear);
                }
                return [4 /*yield*/, prismaClient_1.prisma.status.findMany({})];
            case 2:
                status_1 = _b.sent();
                result = status_1.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                    var data, count;
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, prismaClient_1.prisma.lead.groupBy({
                                    by: ["statusId"],
                                    where: {
                                        leadByUserId: parseInt(userId),
                                        statusId: item === null || item === void 0 ? void 0 : item.id,
                                        saleDate: {
                                            gte: filterDate_1.startDate,
                                            lte: filterDate_1.endDate,
                                        },
                                    },
                                    _count: { _all: true },
                                })];
                            case 1:
                                data = _c.sent();
                                count = (_b = (_a = data[0]) === null || _a === void 0 ? void 0 : _a._count) === null || _b === void 0 ? void 0 : _b._all;
                                return [2 /*return*/, {
                                        status: item === null || item === void 0 ? void 0 : item.name,
                                        count: count ? count : 0,
                                    }];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(result)];
            case 3:
                data = _b.sent();
                res.send(data);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getUserInfo = getUserInfo;
var getUserMonthWiseAttendance = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, userAttendance, grouped, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prismaClient_1.prisma.user.findFirst({
                        where: { id: parseInt(userId) },
                    })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new Error("User doesn't exist.");
                return [4 /*yield*/, prismaClient_1.prisma.attendance.findMany({
                        where: { userId: parseInt(userId) },
                        orderBy: { dateTime: "desc" },
                    })];
            case 3:
                userAttendance = _a.sent();
                grouped = (0, lodash_1.groupBy)(userAttendance, function (record) {
                    return record.dateTime.toISOString().slice(5, 7);
                });
                res.send({ data: grouped, graphData: (0, arrayGouping_1.graphData)(grouped) });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.log(error_2);
                next(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getUserMonthWiseAttendance = getUserMonthWiseAttendance;
var getProfileCardInfo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, currentStartDay, nextStartDay, currentStartMonth, nextStartMonth, todayLead, totalLead, totalSuccessLead, totalAttendance, spd, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                currentStartDay = new Date();
                currentStartDay.setUTCHours(0, 0, 0, 0);
                nextStartDay = new Date();
                nextStartDay.setDate(nextStartDay.getDate() + 1);
                nextStartDay.setUTCHours(0, 0, 0, 0);
                currentStartMonth = new Date();
                currentStartMonth.setDate(1);
                currentStartMonth.setUTCHours(0, 0, 0, 0);
                nextStartMonth = new Date();
                nextStartMonth.setMonth(nextStartMonth.getMonth() + 1);
                nextStartMonth.setDate(1);
                nextStartMonth.setUTCHours(0, 0, 0, 0);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, prismaClient_1.prisma.lead.count({
                        where: {
                            leadByUserId: parseInt(userId),
                            saleDate: { gte: currentStartDay, lte: nextStartDay },
                        },
                    })];
            case 2:
                todayLead = _a.sent();
                return [4 /*yield*/, prismaClient_1.prisma.lead.count({
                        where: {
                            leadByUserId: parseInt(userId),
                            saleDate: { gte: currentStartMonth, lte: nextStartMonth },
                        },
                    })];
            case 3:
                totalLead = _a.sent();
                return [4 /*yield*/, prismaClient_1.prisma.lead.count({
                        where: {
                            leadByUserId: parseInt(userId),
                            status: { name: "success" },
                            saleDate: { gte: currentStartMonth, lte: nextStartMonth },
                        },
                    })];
            case 4:
                totalSuccessLead = _a.sent();
                return [4 /*yield*/, prismaClient_1.prisma.attendance.count({
                        where: {
                            userId: parseInt(userId),
                            dateTime: { gte: currentStartMonth, lte: nextStartMonth },
                        },
                    })];
            case 5:
                totalAttendance = _a.sent();
                spd = void 0;
                if (totalAttendance > 0)
                    spd = totalSuccessLead / totalAttendance;
                res.send({
                    todayLead: todayLead,
                    totalSuccessLead: totalSuccessLead,
                    totalLead: totalLead,
                    spd: spd ? spd === null || spd === void 0 ? void 0 : spd.toFixed(2) : 0,
                    totalAttendance: totalAttendance,
                });
                return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                console.log(error_3);
                next(error_3);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getProfileCardInfo = getProfileCardInfo;
