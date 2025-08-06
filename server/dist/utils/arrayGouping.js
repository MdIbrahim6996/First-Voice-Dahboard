"use strict";
//@ts-nocheck
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
exports.arrayGrouping = void 0;
const prismaClient_1 = require("../lib/prismaClient");
const arrayGrouping = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield prismaClient_1.prisma.status.findMany({ select: { name: true } });
    status.map((item) => {
        globalThis[item === null || item === void 0 ? void 0 : item.name] = item === null || item === void 0 ? void 0 : item.name;
        globalThis[(item === null || item === void 0 ? void 0 : item.name) + "Array"] = [];
    });
    for (const [key, value] of Object.entries(obj)) {
        // console.log(parseInt(key));
        // let late = 0;
        // let ontime = 0;
        //@ts-ignore
        // result[key] = {
        //     late: [],
        //     onTime: [],
        // };
        for (const entry of value) {
            if (entry.statusId) {
                late++;
            }
            else {
                ontime++;
            }
        }
        lateArray[parseInt(key) - 1] = late;
        ontimeArray[parseInt(key) - 1] = ontime;
    }
    try {
    }
    catch (error) { }
});
exports.arrayGrouping = arrayGrouping;
