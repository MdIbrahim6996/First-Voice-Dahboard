"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = void 0;
var arrayGouping_1 = require("../../utils/arrayGouping");
var lodash_1 = require("lodash");
var prismaClient_1 = require("../../lib/prismaClient");
var cache_1 = require("../../lib/cache");
var getProfileCardInfo = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var currentStartDay, nextStartDay, currentStartMonth, nextStartMonth, todayLead, totalLead, totalSuccessLead, totalAttendance, spd;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
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
                return [4 /*yield*/, prismaClient_1.prisma.lead.count({
                        where: {
                            leadByUserId: userId,
                            saleDate: { gte: currentStartDay, lte: nextStartDay },
                        },
                    })];
            case 1:
                todayLead = _a.sent();
                return [4 /*yield*/, prismaClient_1.prisma.lead.count({
                        where: {
                            leadByUserId: userId,
                            saleDate: { gte: currentStartMonth, lte: nextStartMonth },
                        },
                    })];
            case 2:
                totalLead = _a.sent();
                return [4 /*yield*/, prismaClient_1.prisma.lead.count({
                        where: {
                            leadByUserId: userId,
                            status: { name: "success" },
                            saleDate: { gte: currentStartMonth, lte: nextStartMonth },
                        },
                    })];
            case 3:
                totalSuccessLead = _a.sent();
                return [4 /*yield*/, prismaClient_1.prisma.attendance.count({
                        where: {
                            userId: userId,
                            dateTime: { gte: currentStartMonth, lte: nextStartMonth },
                        },
                    })];
            case 4:
                totalAttendance = _a.sent();
                if (totalAttendance > 0)
                    spd = totalSuccessLead / totalAttendance;
                return [2 /*return*/, {
                        todayLead: todayLead > 9 ? todayLead : "0" + todayLead,
                        totalSuccessLead: totalSuccessLead > 9 ? totalSuccessLead : "0" + totalSuccessLead,
                        totalLead: totalLead > 9 ? totalLead : "0" + totalLead,
                        spd: spd ? spd === null || spd === void 0 ? void 0 : spd.toFixed(2) : 0,
                        totalAttendance: totalAttendance > 9 ? totalAttendance : "0" + totalAttendance,
                    }];
        }
    });
}); };
var getPieChartInfo = function (userId_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([userId_1], args_1, true), void 0, function (userId, time) {
        var filterDate, currentDate, startDay, nextDay, startMonth, endMonth, startYear, endYear, status, result;
        if (time === void 0) { time = "thisMonth"; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filterDate = {
                        startDate: new Date(),
                        endDate: new Date(),
                    };
                    currentDate = new Date();
                    if (time === "today") {
                        startDay = currentDate.setUTCHours(0, 0, 0, 0);
                        nextDay = new Date(currentDate.setDate(currentDate.getDate() + 1)).setUTCHours(0, 0, 0, 0);
                        console.log(new Date(nextDay));
                        filterDate.startDate = new Date(startDay);
                        filterDate.endDate = new Date(nextDay);
                    }
                    if (time === "thisMonth") {
                        startMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2).setUTCHours(0, 0, 0);
                        endMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 2).setUTCHours(0, 0, 0);
                        filterDate.startDate = new Date(startMonth);
                        filterDate.endDate = new Date(endMonth);
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
                        filterDate.startDate = new Date(startYear);
                        filterDate.endDate = new Date(endYear);
                    }
                    return [4 /*yield*/, prismaClient_1.prisma.status.findMany({})];
                case 1:
                    status = _a.sent();
                    result = status.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                        var data, count;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0: return [4 /*yield*/, prismaClient_1.prisma.lead.groupBy({
                                        by: ["statusId"],
                                        where: {
                                            leadByUserId: userId,
                                            statusId: item === null || item === void 0 ? void 0 : item.id,
                                            saleDate: {
                                                gte: filterDate.startDate,
                                                lte: filterDate.endDate,
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
                case 2: 
                // const user = await prisma.lead.groupBy({
                //     by: ["statusId"],
                //     where: { closerId: parseInt(userId), statusId: 1 },
                //     _count: { _all: true },
                // });
                return [2 /*return*/, _a.sent()];
            }
        });
    });
};
var getUserInfo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, cacheKey, profileData, userAttendance, grouped, _a, _b, _c, _d, _e, _f, error_1;
    var _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                userId = req.user.id;
                _j.label = 1;
            case 1:
                _j.trys.push([1, 8, , 9]);
                return [4 /*yield*/, prismaClient_1.prisma.user.findFirst({
                        where: { id: userId },
                    })];
            case 2:
                user = _j.sent();
                if (!user)
                    throw new Error("User doesn't exist.");
                cacheKey = "userprofile_".concat(userId);
                if (cache_1.cache.has(cacheKey)) {
                    profileData = cache_1.cache.get(cacheKey);
                    return [2 /*return*/, res.render("pages/profile", __assign({ currentPath: "/user/profile" }, profileData))];
                }
                return [4 /*yield*/, prismaClient_1.prisma.attendance.findMany({
                        where: { userId: userId },
                        orderBy: { dateTime: "desc" },
                    })];
            case 3:
                userAttendance = _j.sent();
                grouped = (0, lodash_1.groupBy)(userAttendance, function (record) {
                    return record.dateTime.toISOString().slice(5, 7);
                });
                _b = (_a = cache_1.cache).set;
                _c = [cacheKey];
                _g = {
                    data: grouped,
                    graphData: (0, arrayGouping_1.graphData)(grouped)
                };
                return [4 /*yield*/, getProfileCardInfo(userId)];
            case 4:
                _g.cardInfo = _j.sent();
                return [4 /*yield*/, getPieChartInfo(userId)];
            case 5:
                _b.apply(_a, _c.concat([(_g.pieChart = _j.sent(),
                        _g), 1000 * 60 * 60]));
                _e = (_d = res).render;
                _f = ["pages/profile"];
                _h = {
                    currentPath: "/user/profile",
                    data: grouped,
                    graphData: (0, arrayGouping_1.graphData)(grouped)
                };
                return [4 /*yield*/, getProfileCardInfo(userId)];
            case 6:
                _h.cardInfo = _j.sent();
                return [4 /*yield*/, getPieChartInfo(userId)];
            case 7:
                _e.apply(_d, _f.concat([(_h.pieChart = _j.sent(),
                        _h)]));
                return [3 /*break*/, 9];
            case 8:
                error_1 = _j.sent();
                console.log(error_1);
                next(error_1);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.getUserInfo = getUserInfo;
