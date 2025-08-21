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
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphData = exports.arrayGrouping = void 0;
var prismaClient_1 = require("../lib/prismaClient");
var arrayGrouping = function (obj) { return __awaiter(void 0, void 0, void 0, function () {
    var status, _i, _a, _b, key, value, _c, value_1, entry;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, prismaClient_1.prisma.status.findMany({ select: { name: true } })];
            case 1:
                status = _d.sent();
                status.map(function (item) {
                    globalThis[item === null || item === void 0 ? void 0 : item.name] = item === null || item === void 0 ? void 0 : item.name;
                    globalThis[(item === null || item === void 0 ? void 0 : item.name) + "Array"] = [];
                });
                for (_i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
                    _b = _a[_i], key = _b[0], value = _b[1];
                    // console.log(parseInt(key));
                    // let late = 0;
                    // let ontime = 0;
                    //@ts-ignore
                    // result[key] = {
                    //     late: [],
                    //     onTime: [],
                    // };
                    for (_c = 0, value_1 = value; _c < value_1.length; _c++) {
                        entry = value_1[_c];
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
                return [2 /*return*/];
        }
    });
}); };
exports.arrayGrouping = arrayGrouping;
var graphData = function (data) {
    var lateArray = [];
    var ontimeArray = [];
    for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var late = 0;
        var ontime = 0;
        var absent = 0;
        var date = new Date();
        var totalDays = new Date(date.getFullYear(), parseInt(key), 0).getDate();
        //@ts-ignore
        for (var _c = 0, value_2 = value; _c < value_2.length; _c++) {
            var entry = value_2[_c];
            if (entry.isLate) {
                late++;
            }
            else {
                ontime++;
            }
        }
        lateArray[parseInt(key) - 1] = late;
        ontimeArray[parseInt(key) - 1] = ontime;
        absent = totalDays - (late + ontime);
        console.log(key, absent);
    }
    return { lateArray: lateArray, ontimeArray: ontimeArray };
};
exports.graphData = graphData;
