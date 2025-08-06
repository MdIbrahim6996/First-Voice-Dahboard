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
exports.deleteStatus = exports.updateStatus = exports.getAllStatus = exports.createStatus = void 0;
const prismaClient_1 = require("../lib/prismaClient");
const createStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const status = yield prismaClient_1.prisma.status.create({
            data: {
                name,
            },
        });
        res.send(status);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createStatus = createStatus;
const getAllStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield prismaClient_1.prisma.status.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.send(status);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getAllStatus = getAllStatus;
const updateStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        console.log(req.body);
        const status = yield prismaClient_1.prisma.status.update({
            where: { id: parseInt(id) },
            data: { name },
        });
        res.send(status);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.updateStatus = updateStatus;
const deleteStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const status = yield prismaClient_1.prisma.status.delete({
            where: { id: parseInt(id) },
        });
        res.send(status);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.deleteStatus = deleteStatus;
