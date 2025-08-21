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
exports.deletePlan = exports.getPlanInfo = exports.getAllPlan = exports.createPlan = void 0;
var prismaClient_1 = require("../lib/prismaClient");
var lodash_1 = require("lodash");
var createPlan = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, process_1, plan, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, process_1 = _a.process;
                return [4 /*yield*/, prismaClient_1.prisma.plan.create({
                        data: { name: name_1, processId: parseInt(process_1) },
                    })];
            case 1:
                plan = _b.sent();
                res.send(plan);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.log(error_1);
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createPlan = createPlan;
var getAllPlan = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var plan, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prismaClient_1.prisma.plan.findMany({
                        include: { process: { select: { id: true, name: true } } },
                    })];
            case 1:
                plan = _a.sent();
                res.send(plan);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllPlan = getAllPlan;
var getPlanInfo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, time, date, results, status_1, startMonth_1, endMonth_1, counts, startYear_1, endYear_1, counts, process_2, grouped, planData, graphData_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                time = req.query.time;
                date = new Date();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                results = void 0;
                return [4 /*yield*/, prismaClient_1.prisma.status.findMany({
                        select: { id: true, name: true },
                    })];
            case 2:
                status_1 = _a.sent();
                if (!(time === "thisMonth")) return [3 /*break*/, 4];
                startMonth_1 = new Date(date.getFullYear(), date.getMonth(), 2).setUTCHours(0, 0, 0);
                endMonth_1 = new Date(date.getFullYear(), date.getMonth() + 1, 2).setUTCHours(0, 0, 0);
                counts = status_1 === null || status_1 === void 0 ? void 0 : status_1.map(function (item, i) { return __awaiter(void 0, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, prismaClient_1.prisma.lead.count({
                                    where: {
                                        statusId: item === null || item === void 0 ? void 0 : item.id,
                                        planId: parseInt(id),
                                        saleDate: {
                                            gte: new Date(startMonth_1),
                                            lte: new Date(endMonth_1),
                                        },
                                    },
                                })];
                            case 1:
                                data = _a.sent();
                                return [2 /*return*/, { name: item === null || item === void 0 ? void 0 : item.name, count: data }];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(counts)];
            case 3:
                results = _a.sent();
                _a.label = 4;
            case 4:
                if (!(time === "thisYear")) return [3 /*break*/, 6];
                startYear_1 = new Date();
                startYear_1.setMonth(0);
                startYear_1.setDate(1);
                startYear_1.setUTCHours(0, 0, 0, 0);
                endYear_1 = new Date();
                endYear_1.setFullYear(endYear_1.getFullYear() + 1);
                endYear_1.setMonth(0);
                endYear_1.setDate(1);
                endYear_1.setUTCHours(0, 0, 0, 0);
                counts = status_1 === null || status_1 === void 0 ? void 0 : status_1.map(function (item, i) { return __awaiter(void 0, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, prismaClient_1.prisma.lead.count({
                                    where: {
                                        statusId: item === null || item === void 0 ? void 0 : item.id,
                                        planId: parseInt(id),
                                        saleDate: {
                                            gte: new Date(startYear_1),
                                            lte: new Date(endYear_1),
                                        },
                                    },
                                })];
                            case 1:
                                data = _a.sent();
                                return [2 /*return*/, { name: item === null || item === void 0 ? void 0 : item.name, count: data }];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(counts)];
            case 5:
                results = _a.sent();
                _a.label = 6;
            case 6:
                if (!(time == "monthly")) return [3 /*break*/, 8];
                return [4 /*yield*/, prismaClient_1.prisma.lead.findMany({
                        select: { status: true, saleDate: true },
                        where: { planId: parseInt(id) },
                    })];
            case 7:
                process_2 = _a.sent();
                grouped = (0, lodash_1.groupBy)(process_2, function (record) {
                    return record.saleDate.toISOString().slice(5, 7);
                });
                planData = Object === null || Object === void 0 ? void 0 : Object.entries(grouped);
                graphData_1 = [];
                planData === null || planData === void 0 ? void 0 : planData.map(function (item) {
                    var success = 0;
                    var pending = 0;
                    var cancelled = 0;
                    var rework = 0;
                    var index = parseInt(item[0]);
                    var internalArray = item[1];
                    internalArray.forEach(function (element) {
                        var _a, _b, _c, _d;
                        if (((_a = element === null || element === void 0 ? void 0 : element.status) === null || _a === void 0 ? void 0 : _a.name) === "pending")
                            pending++;
                        if (((_b = element === null || element === void 0 ? void 0 : element.status) === null || _b === void 0 ? void 0 : _b.name) === "success")
                            success++;
                        if (((_c = element === null || element === void 0 ? void 0 : element.status) === null || _c === void 0 ? void 0 : _c.name) === "cancelled")
                            cancelled++;
                        if (((_d = element === null || element === void 0 ? void 0 : element.status) === null || _d === void 0 ? void 0 : _d.name) === "rework/warmup")
                            rework++;
                        graphData_1[index - 1] = {
                            pending: pending,
                            success: success,
                            cancelled: cancelled,
                            rework: rework,
                        };
                    });
                });
                results = graphData_1;
                _a.label = 8;
            case 8:
                res.send(results);
                return [3 /*break*/, 10];
            case 9:
                error_3 = _a.sent();
                console.log(error_3);
                next(error_3);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.getPlanInfo = getPlanInfo;
var deletePlan = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, leadIds, deletedPlan, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                console.log("dfsdf");
                return [4 /*yield*/, prismaClient_1.prisma.lead.findMany({
                        where: { planId: parseInt(id) },
                        select: {
                            id: true,
                        },
                    })];
            case 1:
                leadIds = _a.sent();
                console.log(leadIds);
                return [4 /*yield*/, prismaClient_1.prisma.plan.delete({
                        where: { id: parseInt(id) },
                    })];
            case 2:
                deletedPlan = _a.sent();
                // const plan = await prisma.plan.delete({
                //     where: { id: parseInt(id) },
                // });
                res.send(deletedPlan);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                next(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletePlan = deletePlan;
