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
exports.deleteAttendance = exports.updateAttendance = exports.getSingleAttendance = exports.getAllAttendance = exports.createAttendance = exports.getEmployeeMonthlyAttendance = exports.getEmployeePeriodwiseAttendance = exports.getUserAllAttendance = exports.getEmployeeAttendance = exports.createEmployeeAttendance = void 0;
const prismaClient_1 = require("../lib/prismaClient");
const lodash_1 = require("lodash");
const client_1 = require("../../../prisma/generated/prisma/client");
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
        if (currentDate === existingAttendance[0].dateTime.getDate()) {
            throw new Error("Your Attendance has already been marked.");
        }
        // const timeA = new Date();
        // const isLate = timeA.getUTCHours() > 9 ? true : false;
        const currentUTCTime = new Date();
        const timeToCompare = new Date();
        const isLate = currentUTCTime > new Date(timeToCompare.setUTCHours(9, 0, 0, 0))
            ? true
            : false;
        console.log(isLate);
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
        res.send({ message: "Attendance Marked Successfully" });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createEmployeeAttendance = createEmployeeAttendance;
const getEmployeeAttendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.send({ message: "Attendance Marked Successfully" });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getEmployeeAttendance = getEmployeeAttendance;
const getUserAllAttendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("attenance");
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
exports.getUserAllAttendance = getUserAllAttendance;
const getEmployeePeriodwiseAttendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { period } = req.query;
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
        const attendanceData = Object === null || Object === void 0 ? void 0 : Object.values(grouped);
        res.send(attendanceData[0]);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getEmployeePeriodwiseAttendance = getEmployeePeriodwiseAttendance;
const getEmployeeMonthlyAttendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = await prisma.user.findMany({
        //     include: {
        //         _count: {
        //             select: {
        //                 attendances: {
        //                     where: {
        //                         dateTime: { gte: new Date("2025-07-01") },
        //                     },
        //                 },
        //             },
        //         },
        //     },
        // });
        // const userAttendance = await prisma.attendance.findMany({
        //     where: { userId: parseInt(id) },
        //     orderBy: { dateTime: "desc" },
        // });
        // const grouped = groupBy(userAttendance, (record) =>
        //     record.dateTime.toISOString().slice(5, 7)
        // );
        // const attendanceData = Object?.values(grouped);
        // console.log(attendanceData);
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const { year = currentYear, month = currentMonth, name = undefined, } = req.query;
        const attendance = yield prismaClient_1.prisma.attendance.groupBy({
            by: ["userId"],
            _count: { _all: true },
            where: {
                dateTime: {
                    gte: new Date(`${year}-${parseInt(month) + 1}-01`),
                    lt: new Date(`${year}-${parseInt(month) + 2}-01`),
                },
                user: { name: name ? String(name) : client_1.Prisma.skip },
            },
        });
        const isLateCount = yield prismaClient_1.prisma.attendance.groupBy({
            by: ["userId"],
            _count: { _all: true },
            where: {
                isLate: true,
                dateTime: {
                    gte: new Date(`${year}-${parseInt(month) + 1}-01`),
                    lt: new Date(`${year}-${parseInt(month) + 2}-01`),
                },
                user: { name: name ? String(name) : client_1.Prisma.skip },
            },
        });
        const onTimeCount = yield prismaClient_1.prisma.attendance.groupBy({
            by: ["userId"],
            _count: { _all: true },
            where: {
                isLate: false,
                dateTime: {
                    gte: new Date(`${year}-${parseInt(month) + 1}-01`),
                    lt: new Date(`${year}-${parseInt(month) + 2}-01`),
                },
                user: { name: name ? String(name) : client_1.Prisma.skip },
            },
        });
        const userData = yield prismaClient_1.prisma.user.findMany({
            where: { id: { in: attendance.map((item) => item.userId) } },
            select: { id: true, name: true },
        });
        res.send({ attendance, isLateCount, onTimeCount, userData });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getEmployeeMonthlyAttendance = getEmployeeMonthlyAttendance;
const createAttendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("createAttendance");
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createAttendance = createAttendance;
const getAllAttendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const attendances = yield prismaClient_1.prisma.attendance.findMany({
        orderBy: { dateTime: "desc" },
        include: { user: { select: { name: true } } },
    });
    res.send(attendances);
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getAllAttendance = getAllAttendance;
const getSingleAttendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("getSingleAttendance");
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getSingleAttendance = getSingleAttendance;
const updateAttendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("updateAttendance");
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.updateAttendance = updateAttendance;
const deleteAttendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("deleteAttendance");
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.deleteAttendance = deleteAttendance;
