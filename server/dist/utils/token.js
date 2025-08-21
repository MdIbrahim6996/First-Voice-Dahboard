"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Paste secret key from .env
var generateAuthToken = function (id, role) {
    return jsonwebtoken_1.default.sign({ id: id, role: role }, "fsdfsdf", { expiresIn: "24h" });
};
exports.generateAuthToken = generateAuthToken;
