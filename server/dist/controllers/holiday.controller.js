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
exports.deleteHoliday = exports.updateHoliday = exports.getSingleHoliday = exports.getAllUserHoliday = exports.getAllHoliday = exports.createHoliday = void 0;
const prismaClient_1 = require("../lib/prismaClient");
const client_1 = require("@prisma/client");
const createHoliday = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, startDate, endDate } = req.body;
    console.log(req.body);
    const holiday = yield prismaClient_1.prisma.holiday.create({
        data: {
            name,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
        },
    });
    res.send(holiday);
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createHoliday = createHoliday;
const getAllHoliday = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, startDate, endDate } = req.query;
    try {
        const holiday = yield prismaClient_1.prisma.holiday.findMany({
            where: {
                name: title ? title : client_1.Prisma.skip,
                startDate: startDate
                    ? new Date(startDate)
                    : client_1.Prisma.skip,
                endDate: endDate ? new Date(endDate) : client_1.Prisma.skip,
            },
        });
        res.send(holiday);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getAllHoliday = getAllHoliday;
const getAllUserHoliday = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const holiday = yield prismaClient_1.prisma.holiday.findMany();
    res.send(holiday);
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getAllUserHoliday = getAllUserHoliday;
const getSingleHoliday = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("getSingleHoliday");
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getSingleHoliday = getSingleHoliday;
const updateHoliday = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, startDate, endDate } = req.body;
    try {
        const holiday = yield prismaClient_1.prisma.holiday.update({
            where: { id: parseInt(id) },
            data: {
                name,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            },
        });
        res.send(holiday);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.updateHoliday = updateHoliday;
const deleteHoliday = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const holiday = yield prismaClient_1.prisma.holiday.delete({
        where: { id: parseInt(id) },
    });
    res.send(holiday);
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.deleteHoliday = deleteHoliday;
