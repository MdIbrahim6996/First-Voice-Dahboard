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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getSingleUser = exports.getAllUser = exports.createUser = void 0;
const prismaClient_1 = require("../lib/prismaClient");
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, alias, email, employeeId, phone, password, block, role, process, } = req.body;
        const existingUser = yield prismaClient_1.prisma.user.findFirst({ where: { email } });
        if (existingUser) {
            throw new Error("User With This Email Already Exist.");
        }
        const existingUserwithEmployeeId = yield prismaClient_1.prisma.user.findFirst({
            where: { employeeId },
        });
        if (existingUserwithEmployeeId) {
            throw new Error("User With This Employee ID Already Exist.");
        }
        const existingUserwithAlias = yield prismaClient_1.prisma.user.findFirst({
            where: { alias },
        });
        if (existingUserwithAlias) {
            throw new Error("User With This Alias Already Exist.");
        }
        console.log(req.body);
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prismaClient_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                employeeId,
                phone,
                role,
                isBlocked: block === "false" ? false : true,
                alias,
                processId: parseInt(process),
            },
        });
        res.send(user);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createUser = createUser;
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prismaClient_1.prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        include: { process: { select: { name: true } } },
    });
    res.send(users);
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getAllUser = getAllUser;
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield prismaClient_1.prisma.user.findFirst({ where: { id: parseInt(id) } });
    res.send(user);
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getSingleUser = getSingleUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(req.body);
    const { name, alias, email, employeeId, phone, password, block, role, process, } = req.body;
    try {
        const existingUser = yield prismaClient_1.prisma.user.findFirst({
            where: { id: parseInt(id) },
        });
        if (!existingUser) {
            throw new Error("User Doesn't Exist.");
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prismaClient_1.prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                name,
                email,
                password: password ? hashedPassword : client_1.Prisma.skip,
                employeeId,
                phone,
                role,
                isBlocked: block === "false" ? false : true,
                alias,
                processId: process ? parseInt(process) : client_1.Prisma.skip,
            },
            include: { process: { select: { name: true } } },
        });
        res.send(user);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield prismaClient_1.prisma.user.delete({ where: { id: parseInt(id) } });
        res.send(user);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.deleteUser = deleteUser;
