"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pusher = void 0;
var pusher_1 = __importDefault(require("pusher"));
var appContants_1 = require("../utils/appContants");
exports.pusher = new pusher_1.default({
    appId: appContants_1.PUHSER_APP_ID,
    key: appContants_1.PUSHER_KEY,
    secret: appContants_1.PUSHER_SECRET,
    cluster: appContants_1.PUSHER_CLUSTER,
    useTLS: true,
});
