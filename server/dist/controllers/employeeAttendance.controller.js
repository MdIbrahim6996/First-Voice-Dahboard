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
exports.getEmployeeYearlyAttendance = exports.getEmployeeAllAttendance = exports.markEmployeeAttendance = exports.createEmployeeAttendance = void 0;
var prismaClient_1 = require("../lib/prismaClient");
var lodash_1 = require("lodash");
var graphData = function (data) {
    var lateArray = [];
    var ontimeArray = [];
    for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var late = 0;
        var ontime = 0;
        var absent = 0;
        var date = new Date();
        var totalDays = new Date(date.getFullYear(), parseInt(key), 0).getDate();
        //@ts-ignore
        for (var _c = 0, value_1 = value; _c < value_1.length; _c++) {
            var entry = value_1[_c];
            if (entry.isLate) {
                late++;
            }
            else {
                ontime++;
            }
        }
        lateArray[parseInt(key) - 1] = late;
        ontimeArray[parseInt(key) - 1] = ontime;
        absent = totalDays - (late + ontime);
        console.log(key, absent);
    }
    return { lateArray: lateArray, ontimeArray: ontimeArray };
};
var createEmployeeAttendance = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, date, currentDate, existingAttendance, timeA, isLate, attendance, error_1;
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
                timeA = new Date();
                isLate = timeA.getUTCHours() > 12 ? true : false;
                return [4 /*yield*/, prismaClient_1.prisma.attendance.create({
                        data: { userId: parseInt(id), isLate: isLate },
                    })];
            case 4:
                attendance = _a.sent();
                res.send({ message: "Attendance Marked Successfully." });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log(error_1);
                next(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createEmployeeAttendance = createEmployeeAttendance;
var markEmployeeAttendance = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
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
                res.send({ message: "Attendance Marked Successfully." });
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
exports.markEmployeeAttendance = markEmployeeAttendance;
var getEmployeeAllAttendance = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, attendance, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
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
exports.getEmployeeAllAttendance = getEmployeeAllAttendance;
var getEmployeeYearlyAttendance = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, userAttendance, grouped, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
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
                userAttendance = _a.sent();
                grouped = (0, lodash_1.groupBy)(userAttendance, function (record) {
                    return record.dateTime.toISOString().slice(5, 7);
                });
                res.send({ data: grouped, graphData: graphData(grouped) });
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
exports.getEmployeeYearlyAttendance = getEmployeeYearlyAttendance;
