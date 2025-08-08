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
exports.isAuth = void 0;
const prismaClient_1 = require("../lib/prismaClient");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(401);
            throw new Error("Token expired login again.");
        }
        const { id } = jsonwebtoken_1.default.verify(token, "fsdfsdf");
        if (id) {
            const user = (yield prismaClient_1.prisma.user.findUnique({
                where: { id: parseInt(id) },
                select: {
                    createdAt: false,
                    updatedAt: false,
                    password: false,
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    employeeId: true,
                    phone: true,
                    isBlocked: true,
                },
            }));
            req.user = user;
        }
        else
            throw new Error("Invalid token. Please Sign in.");
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.isAuth = isAuth;
