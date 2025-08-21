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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getSingleUser = exports.getAllUser = exports.createUser = void 0;
var prismaClient_1 = require("../lib/prismaClient");
var bcrypt_1 = __importDefault(require("bcrypt"));
var client_1 = require("@prisma/client");
var createUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, alias, email, employeeId, phone, password, block, role, process_1, existingUser, existingUserwithEmployeeId, existingUserwithAlias, hashedPassword, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, name_1 = _a.name, alias = _a.alias, email = _a.email, employeeId = _a.employeeId, phone = _a.phone, password = _a.password, block = _a.block, role = _a.role, process_1 = _a.process;
                console.log(req.body);
                return [4 /*yield*/, prismaClient_1.prisma.user.findFirst({ where: { email: email } })];
            case 1:
                existingUser = _b.sent();
                if (existingUser) {
                    throw new Error("User With This Email Already Exist.");
                }
                return [4 /*yield*/, prismaClient_1.prisma.user.findFirst({
                        where: { employeeId: employeeId },
                    })];
            case 2:
                existingUserwithEmployeeId = _b.sent();
                if (existingUserwithEmployeeId) {
                    throw new Error("User With This Employee ID Already Exist.");
                }
                return [4 /*yield*/, prismaClient_1.prisma.user.findFirst({
                        where: { alias: alias },
                    })];
            case 3:
                existingUserwithAlias = _b.sent();
                if (existingUserwithAlias) {
                    throw new Error("User With This Alias Already Exist.");
                }
                console.log(req.body);
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 4:
                hashedPassword = _b.sent();
                return [4 /*yield*/, prismaClient_1.prisma.user.create({
                        data: {
                            name: name_1,
                            email: email,
                            password: hashedPassword,
                            employeeId: employeeId,
                            phone: phone,
                            role: role,
                            isBlocked: block === "false" ? false : true,
                            alias: alias,
                            processId: parseInt(process_1),
                        },
                    })];
            case 5:
                user = _b.sent();
                res.send(user);
                return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                console.log(error_1);
                next(error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var getAllUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.prisma.user.findMany({
                    orderBy: { createdAt: "desc" },
                    include: { process: { select: { name: true } } },
                })];
            case 1:
                users = _a.sent();
                res.send(users);
                try {
                }
                catch (error) {
                    console.log(error);
                    next(error);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getAllUser = getAllUser;
var getSingleUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, prismaClient_1.prisma.user.findFirst({ where: { id: parseInt(id) } })];
            case 1:
                user = _a.sent();
                res.send(user);
                try {
                }
                catch (error) {
                    console.log(error);
                    next(error);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getSingleUser = getSingleUser;
var updateUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, alias, email, employeeId, phone, password, block, role, process, existingUser, hashedPassword, user, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                console.log(req.body);
                _a = req.body, name = _a.name, alias = _a.alias, email = _a.email, employeeId = _a.employeeId, phone = _a.phone, password = _a.password, block = _a.block, role = _a.role, process = _a.process;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, prismaClient_1.prisma.user.findFirst({
                        where: { id: parseInt(id) },
                    })];
            case 2:
                existingUser = _b.sent();
                if (!existingUser) {
                    throw new Error("User Doesn't Exist.");
                }
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 3:
                hashedPassword = _b.sent();
                return [4 /*yield*/, prismaClient_1.prisma.user.update({
                        where: { id: parseInt(id) },
                        data: {
                            name: name,
                            email: email,
                            password: password ? hashedPassword : client_1.Prisma.skip,
                            employeeId: employeeId,
                            phone: phone,
                            role: role,
                            isBlocked: block === 1 ? true : false,
                            alias: alias,
                            processId: process ? parseInt(process) : client_1.Prisma.skip,
                        },
                        include: { process: { select: { name: true } } },
                    })];
            case 4:
                user = _b.sent();
                res.send(user);
                return [3 /*break*/, 6];
            case 5:
                error_2 = _b.sent();
                console.log(error_2);
                next(error_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, prismaClient_1.prisma.user.delete({ where: { id: parseInt(id) } })];
            case 1:
                user = _a.sent();
                res.send(user);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
