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
exports.queryProcess = exports.deleteProcess = exports.getProcessInfo = exports.getAllProcess = exports.createProcess = void 0;
const prismaClient_1 = require("../lib/prismaClient");
const lodash_1 = require("lodash");
const date_1 = require("../utils/date");
const createProcess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const process = yield prismaClient_1.prisma.process.create({ data: { name } });
        res.send(process);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createProcess = createProcess;
const getAllProcess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield prismaClient_1.prisma.status.findMany({ select: { name: true } });
        const process = yield prismaClient_1.prisma.process.findMany({
            include: {
                plans: true,
                _count: {
                    select: {
                        Lead: { where: { status: { name: "success" } } },
                    },
                },
            },
        });
        res.send(process);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getAllProcess = getAllProcess;
const getProcessInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
                        processId: parseInt(id),
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
                        processId: parseInt(id),
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
                where: { processId: parseInt(id) },
            });
            const grouped = (0, lodash_1.groupBy)(process, (record) => record.saleDate.toISOString().slice(5, 7));
            const processData = Object === null || Object === void 0 ? void 0 : Object.entries(grouped);
            let graphData = [];
            processData === null || processData === void 0 ? void 0 : processData.map((item) => {
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
exports.getProcessInfo = getProcessInfo;
const deleteProcess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const process = yield prismaClient_1.prisma.process.delete({
            where: { id: parseInt(id) },
        });
        res.send(process);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.deleteProcess = deleteProcess;
const queryProcess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const process = yield prismaClient_1.prisma.lead.findMany({
            select: { status: true, saleDate: true },
        });
        const status = yield prismaClient_1.prisma.status.findMany({
            orderBy: { createdAt: "desc" },
        });
        const grouped = (0, lodash_1.groupBy)(process, (record) => record.saleDate.toISOString().slice(5, 7));
        const processData = Object === null || Object === void 0 ? void 0 : Object.entries(grouped);
        res.send(processData);
        let result;
        // const datad = timeArr?.map((item) => {
        //     result = status?.map(async (item) => {
        //         const count = await prisma.lead.count({
        //             where: { statusId: item?.id },
        //         });
        //         return { name: item?.name, count };
        //     });
        // });
        result = date_1.timeArr === null || date_1.timeArr === void 0 ? void 0 : date_1.timeArr.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            // const count = await prisma.lead.groupBy({
            //     by: ["statusId"],
            //     _count: { statusId: true },
            //     where: {
            //         saleDate: { gte: item?.startDate, lte: item?.endDate },
            //     },
            // });
            // const count = await prisma.lead.findMany({
            //     include: { status: { select: { name: true } } },
            //     where: {
            //         saleDate: { gte: item?.startDate, lte: item?.endDate },
            //     },
            // });
            // const count = await prisma.lead.findMany({
            //     select: { firstName: true },
            //     where: {
            //         saleDate: { gte: item?.startDate, lte: item?.endDate },
            //     },
            //     include:{}
            // });
            // const count =
            //     await prisma.$queryRaw`select * from lead where saleDate between ${item?.startDate} and ${item?.endDate}`;
            // return count;
        }));
        // const data = await Promise.all(result);
        // console.log(data);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.queryProcess = queryProcess;
