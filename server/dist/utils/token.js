"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Paste secret key from .env
const generateAuthToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, "fsdfsdf", { expiresIn: "24h" });
};
exports.generateAuthToken = generateAuthToken;
