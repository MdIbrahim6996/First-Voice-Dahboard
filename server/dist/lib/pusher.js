"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pusher = void 0;
const pusher_1 = __importDefault(require("pusher"));
exports.pusher = new pusher_1.default({
    appId: "2027044",
    key: "3598d69c8453a73ad670",
    secret: "108117700ada004e41c5",
    cluster: "ap2",
    useTLS: true,
});
