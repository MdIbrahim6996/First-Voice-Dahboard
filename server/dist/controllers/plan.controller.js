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
exports.deletePlan = exports.getPlanInfo = exports.getAllPlan = exports.createPlan = void 0;
const prismaClient_1 = require("../lib/prismaClient");
const lodash_1 = require("lodash");
const createPlan = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, process } = req.body;
        const plan = yield prismaClient_1.prisma.plan.create({
            data: { name, processId: parseInt(process) },
        });
        res.send(plan);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createPlan = createPlan;
const getAllPlan = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plan = yield prismaClient_1.prisma.plan.findMany({
            include: { process: { select: { id: true, name: true } } },
        });
        res.send(plan);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getAllPlan = getAllPlan;
const getPlanInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { time } = req.query;
    const date = new Date();
    try {
        let results;
        const status = yield prismaClient_1.prisma.status.findMany({
            select: { id: true, name: true },
        });
        if (time === "thisMonth") {
            const startMonth = new Date(date.getFullYear(), date.getMonth(), 2).setUTCHours(0, 0, 0);
            const endMonth = new Date(date.getFullYear(), date.getMonth() + 1, 2).setUTCHours(0, 0, 0);
            const counts = status === null || status === void 0 ? void 0 : status.map((item, i) => __awaiter(void 0, void 0, void 0, function* () {
                const data = yield prismaClient_1.prisma.lead.count({
                    where: {
                        statusId: item === null || item === void 0 ? void 0 : item.id,
                        planId: parseInt(id),
                        saleDate: {
                            gte: new Date(startMonth),
                            lte: new Date(endMonth),
                        },
                    },
                });
                return { name: item === null || item === void 0 ? void 0 : item.name, count: data };
            }));
            results = yield Promise.all(counts);
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
            const counts = status === null || status === void 0 ? void 0 : status.map((item, i) => __awaiter(void 0, void 0, void 0, function* () {
                const data = yield prismaClient_1.prisma.lead.count({
                    where: {
                        statusId: item === null || item === void 0 ? void 0 : item.id,
                        planId: parseInt(id),
                        saleDate: {
                            gte: new Date(startYear),
                            lte: new Date(endYear),
                        },
                    },
                });
                return { name: item === null || item === void 0 ? void 0 : item.name, count: data };
            }));
            results = yield Promise.all(counts);
        }
        if (time == "monthly") {
            const process = yield prismaClient_1.prisma.lead.findMany({
                select: { status: true, saleDate: true },
                where: { planId: parseInt(id) },
            });
            const grouped = (0, lodash_1.groupBy)(process, (record) => record.saleDate.toISOString().slice(5, 7));
            const planData = Object === null || Object === void 0 ? void 0 : Object.entries(grouped);
            let graphData = [];
            planData === null || planData === void 0 ? void 0 : planData.map((item) => {
                let success = 0;
                let pending = 0;
                let cancelled = 0;
                let rework = 0;
                const index = parseInt(item[0]);
                const internalArray = item[1];
                internalArray.forEach((element) => {
                    var _a, _b, _c, _d;
                    if (((_a = element === null || element === void 0 ? void 0 : element.status) === null || _a === void 0 ? void 0 : _a.name) === "pending")
                        pending++;
                    if (((_b = element === null || element === void 0 ? void 0 : element.status) === null || _b === void 0 ? void 0 : _b.name) === "success")
                        success++;
                    if (((_c = element === null || element === void 0 ? void 0 : element.status) === null || _c === void 0 ? void 0 : _c.name) === "cancelled")
                        cancelled++;
                    if (((_d = element === null || element === void 0 ? void 0 : element.status) === null || _d === void 0 ? void 0 : _d.name) === "rework/warmup")
                        rework++;
                    graphData[index - 1] = {
                        pending,
                        success,
                        cancelled,
                        rework,
                    };
                });
            });
            results = graphData;
        }
        res.send(results);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getPlanInfo = getPlanInfo;
const deletePlan = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log("dfsdf");
        const leadIds = yield prismaClient_1.prisma.lead.findMany({
            where: { planId: parseInt(id) },
            select: {
                id: true,
            },
        });
        console.log(leadIds);
        const deletedPlan = yield prismaClient_1.prisma.plan.delete({
            where: { id: parseInt(id) },
        });
        // const plan = await prisma.plan.delete({
        //     where: { id: parseInt(id) },
        // });
        res.send(deletedPlan);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.deletePlan = deletePlan;
