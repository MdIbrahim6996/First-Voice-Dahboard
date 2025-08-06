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
exports.deleteDashboard = exports.updateDashboard = exports.getSingleDashboard = exports.getDailyLeadCount = exports.createDailyLeadCount = void 0;
const createDailyLeadCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    res.send("createDashboard");
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createDailyLeadCount = createDailyLeadCount;
const getDailyLeadCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("getAllDashboard");
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getDailyLeadCount = getDailyLeadCount;
const getSingleDashboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("getSingleDashboard");
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getSingleDashboard = getSingleDashboard;
const updateDashboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("updateDashboard");
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.updateDashboard = updateDashboard;
const deleteDashboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("deleteDashboard");
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.deleteDashboard = deleteDashboard;
