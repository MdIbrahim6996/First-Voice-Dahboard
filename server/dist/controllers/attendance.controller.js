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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAttendance = exports.getEmployeeMonthlyAttendance = exports.getEmployeePeriodwiseAttendance = exports.getUserAllAttendance = exports.getEmployeeAttendance = exports.createEmployeeAttendance = void 0;
var prismaClient_1 = require("../lib/prismaClient");
var groupBy_1 = __importDefault(require("lodash/groupBy"));
var client_1 = require("@prisma/client");
var createEmployeeAttendance = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, date, currentDate, existingAttendance, currentUTCTime, timeToCompare, isLate, attendance, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                return [4 /*yield*/, prismaClient_1.prisma.user.findFirst({
                        where: { id: parseInt(id) },
                    })];
            case 2:
                user = _c.sent();
                if (!user)
                    throw new Error("User doesn't exist.");
                date = new Date();
                currentDate = date.getDate();
                return [4 /*yield*/, prismaClient_1.prisma.attendance.findMany({
                        where: { userId: parseInt(id) },
                        orderBy: { dateTime: "desc" },
                    })];
            case 3:
                existingAttendance = _c.sent();
                if (currentDate === ((_b = (_a = existingAttendance[0]) === null || _a === void 0 ? void 0 : _a.dateTime) === null || _b === void 0 ? void 0 : _b.getDate())) {
                    throw new Error("Your Attendance has already been marked.");
                }
                currentUTCTime = new Date();
                timeToCompare = new Date();
                isLate = currentUTCTime > new Date(timeToCompare.setUTCHours(9, 15, 0, 0))
                    ? true
                    : false;
                return [4 /*yield*/, prismaClient_1.prisma.attendance.create({
                        data: { userId: parseInt(id), isLate: isLate },
                    })];
            case 4:
                attendance = _c.sent();
                res.send({ message: "Attendance Marked Successfully" });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _c.sent();
                console.log(error_1);
                next(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createEmployeeAttendance = createEmployeeAttendance;
var getEmployeeAttendance = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, date, currentDate, existingAttendance, attendance, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, prismaClient_1.prisma.user.findFirst({
                        where: { id: parseInt(id) },
                    })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new Error("User doesn't exist.");
                date = new Date();
                currentDate = date.getDate();
                return [4 /*yield*/, prismaClient_1.prisma.attendance.findMany({
                        where: { userId: parseInt(id) },
                        orderBy: { dateTime: "desc" },
                    })];
            case 3:
                existingAttendance = _a.sent();
                if (currentDate === existingAttendance[0].dateTime.getDate()) {
                    throw new Error("Your Attendance has already been marked.");
                }
                return [4 /*yield*/, prismaClient_1.prisma.attendance.create({
                        data: { userId: parseInt(id) },
                    })];
            case 4:
                attendance = _a.sent();
                res.send({ message: "Attendance Marked Successfully" });
                return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.log(error_2);
                next(error_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getEmployeeAttendance = getEmployeeAttendance;
var getUserAllAttendance = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, attendance, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("attenance");
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prismaClient_1.prisma.user.findFirst({
                        where: { id: parseInt(id) },
                    })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new Error("User doesn't exist.");
                return [4 /*yield*/, prismaClient_1.prisma.attendance.findMany({
                        where: { userId: parseInt(id) },
                        orderBy: { dateTime: "desc" },
                    })];
            case 3:
                attendance = _a.sent();
                res.send(attendance);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.log(error_3);
                next(error_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getUserAllAttendance = getUserAllAttendance;
var getEmployeePeriodwiseAttendance = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, period, user, userAttendance, grouped, attendanceData, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                period = req.query.period;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prismaClient_1.prisma.user.findFirst({
                        where: { id: parseInt(id) },
                    })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new Error("User doesn't exist.");
                return [4 /*yield*/, prismaClient_1.prisma.attendance.findMany({
                        where: { userId: parseInt(id) },
                        orderBy: { dateTime: "desc" },
                    })];
            case 3:
                userAttendance = _a.sent();
                grouped = (0, groupBy_1.default)(userAttendance, function (record) {
                    return record.dateTime.toISOString().slice(5, 7);
                });
                attendanceData = Object === null || Object === void 0 ? void 0 : Object.values(grouped);
                res.send(attendanceData[0]);
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.log(error_4);
                next(error_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getEmployeePeriodwiseAttendance = getEmployeePeriodwiseAttendance;
var getEmployeeMonthlyAttendance = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var currentMonth, currentYear, _a, _b, year, _c, month, _d, name_1, attendance, isLateCount, onTimeCount, userData, error_5;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 5, , 6]);
                currentMonth = new Date().getMonth();
                currentYear = new Date().getFullYear();
                _a = req.query, _b = _a.year, year = _b === void 0 ? currentYear : _b, _c = _a.month, month = _c === void 0 ? currentMonth : _c, _d = _a.name, name_1 = _d === void 0 ? undefined : _d;
                return [4 /*yield*/, prismaClient_1.prisma.attendance.groupBy({
                        by: ["userId"],
                        _count: { _all: true },
                        where: {
                            userId: { not: null },
                            dateTime: {
                                gte: new Date("".concat(year, "-").concat(parseInt(month) + 1, "-01")),
                                lt: new Date("".concat(year, "-").concat(parseInt(month) + 2, "-01")),
                            },
                            user: { name: name_1 ? String(name_1) : client_1.Prisma.skip },
                        },
                    })];
            case 1:
                attendance = _e.sent();
                return [4 /*yield*/, prismaClient_1.prisma.attendance.groupBy({
                        by: ["userId"],
                        _count: { _all: true },
                        where: {
                            userId: { not: null },
                            isLate: true,
                            dateTime: {
                                gte: new Date("".concat(year, "-").concat(parseInt(month) + 1, "-01")),
                                lt: new Date("".concat(year, "-").concat(parseInt(month) + 2, "-01")),
                            },
                            user: { name: name_1 ? String(name_1) : client_1.Prisma.skip },
                        },
                    })];
            case 2:
                isLateCount = _e.sent();
                return [4 /*yield*/, prismaClient_1.prisma.attendance.groupBy({
                        by: ["userId"],
                        _count: { _all: true },
                        where: {
                            userId: { not: null },
                            isLate: false,
                            dateTime: {
                                gte: new Date("".concat(year, "-").concat(parseInt(month) + 1, "-01")),
                                lt: new Date("".concat(year, "-").concat(parseInt(month) + 2, "-01")),
                            },
                            user: { name: name_1 ? String(name_1) : client_1.Prisma.skip },
                        },
                    })];
            case 3:
                onTimeCount = _e.sent();
                return [4 /*yield*/, prismaClient_1.prisma.user.findMany({
                        where: {
                            id: {
                                in: attendance.map(function (item) { return (item.userId ? item === null || item === void 0 ? void 0 : item.userId : 0); }),
                            },
                        },
                        select: { id: true, name: true },
                    })];
            case 4:
                userData = _e.sent();
                res.send({ attendance: attendance, isLateCount: isLateCount, onTimeCount: onTimeCount, userData: userData });
                return [3 /*break*/, 6];
            case 5:
                error_5 = _e.sent();
                console.log(error_5);
                next(error_5);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getEmployeeMonthlyAttendance = getEmployeeMonthlyAttendance;
var getAllAttendance = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, startDate, endDate, attendances, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, name = _a.name, startDate = _a.startDate, endDate = _a.endDate;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prismaClient_1.prisma.attendance.findMany({
                        orderBy: { dateTime: "desc" },
                        include: { user: { select: { name: true } } },
                        where: {
                            user: { name: name ? name : client_1.Prisma.skip },
                            userId: { not: null },
                            dateTime: {
                                gte: startDate ? new Date(startDate) : client_1.Prisma.skip,
                                lte: endDate ? new Date(endDate) : client_1.Prisma.skip,
                            },
                        },
                    })];
            case 2:
                attendances = _b.sent();
                res.send(attendances);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _b.sent();
                console.log(error_6);
                next(error_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllAttendance = getAllAttendance;
