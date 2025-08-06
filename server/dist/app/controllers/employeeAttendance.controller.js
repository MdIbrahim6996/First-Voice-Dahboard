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
exports.getEmployeeYearlyAttendance = exports.getEmployeeAllAttendance = exports.markEmployeeAttendance = exports.createEmployeeAttendance = void 0;
const prismaClient_1 = require("../lib/prismaClient");
const lodash_1 = require("lodash");
const graphData = (data) => {
    const lateArray = [];
    const ontimeArray = [];
    for (const [key, value] of Object.entries(data)) {
        let late = 0;
        let ontime = 0;
        let absent = 0;
        const date = new Date();
        const totalDays = new Date(date.getFullYear(), parseInt(key), 0).getDate();
        //@ts-ignore
        for (const entry of value) {
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
    return { lateArray, ontimeArray };
};
const createEmployeeAttendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prismaClient_1.prisma.user.findFirst({
            where: { id: parseInt(id) },
        });
        if (!user)
            throw new Error("User doesn't exist.");
        // const dateObject = new Date().toLocaleString("en-US", {
        //     timeZone: "Asia/Kolkata",
        // });
        const date = new Date();
        const currentDate = date.getDate();
        const existingAttendance = yield prismaClient_1.prisma.attendance.findMany({
            where: { userId: parseInt(id) },
            orderBy: { dateTime: "desc" },
        });
        // if (currentDate === existingAttendance[0].dateTime.getDate()) {
        //     throw new Error("Your Attendance has already been marked.");
        // }
        const timeA = new Date();
        const isLate = timeA.getUTCHours() > 12 ? true : false;
        //9
        // CORRECT APPROACH
        // const timeB = new Date();
        // timeB.setUTCHours(9);
        // timeB.setUTCMinutes(30);
        // console.log(new Date(timeB));
        // const timeC = new Date();
        // timeC.setUTCHours(9);
        // timeC.setUTCMinutes(31);
        // console.log(timeB > timeC);
        // Create attendance
        const attendance = yield prismaClient_1.prisma.attendance.create({
            data: { userId: parseInt(id), isLate },
        });
        res.send({ message: "Attendance Marked Successfully." });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createEmployeeAttendance = createEmployeeAttendance;
const markEmployeeAttendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prismaClient_1.prisma.user.findFirst({
            where: { id: parseInt(id) },
        });
        if (!user)
            throw new Error("User doesn't exist.");
        const date = new Date();
        const currentDate = date.getDate();
        const existingAttendance = yield prismaClient_1.prisma.attendance.findMany({
            where: { userId: parseInt(id) },
            orderBy: { dateTime: "desc" },
        });
        if (currentDate === existingAttendance[0].dateTime.getDate()) {
            throw new Error("Your Attendance has already been marked.");
        }
        // Create attendance
        const attendance = yield prismaClient_1.prisma.attendance.create({
            data: { userId: parseInt(id) },
        });
        res.send({ message: "Attendance Marked Successfully." });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.markEmployeeAttendance = markEmployeeAttendance;
const getEmployeeAllAttendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prismaClient_1.prisma.user.findFirst({
            where: { id: parseInt(id) },
        });
        if (!user)
            throw new Error("User doesn't exist.");
        const attendance = yield prismaClient_1.prisma.attendance.findMany({
            where: { userId: parseInt(id) },
            orderBy: { dateTime: "desc" },
        });
        res.send(attendance);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getEmployeeAllAttendance = getEmployeeAllAttendance;
const getEmployeeYearlyAttendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prismaClient_1.prisma.user.findFirst({
            where: { id: parseInt(id) },
        });
        if (!user)
            throw new Error("User doesn't exist.");
        const userAttendance = yield prismaClient_1.prisma.attendance.findMany({
            where: { userId: parseInt(id) },
            orderBy: { dateTime: "desc" },
        });
        const grouped = (0, lodash_1.groupBy)(userAttendance, (record) => record.dateTime.toISOString().slice(5, 7));
        res.send({ data: grouped, graphData: graphData(grouped) });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getEmployeeYearlyAttendance = getEmployeeYearlyAttendance;
