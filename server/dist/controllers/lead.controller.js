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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLead = exports.updateLead = exports.getSingleLead = exports.getLeadOfUserByDate = exports.getAllLeadOfUser = exports.getAllLead = exports.createLead = void 0;
var prismaClient_1 = require("../lib/prismaClient");
var client_1 = require("@prisma/client");
var pusher_1 = require("../lib/pusher");
var cache_1 = require("../lib/cache");
var createLead = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, firstName, middleName, lastName, centre, address, city, county, pincode, password, dateOfBirth, phone, process, plan, poa, closer, verifier, bank, paymentMethod, shift, comment, card, date, status_1, lead, dailyLeadCount, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, title = _a.title, firstName = _a.firstName, middleName = _a.middleName, lastName = _a.lastName, centre = _a.centre, address = _a.address, city = _a.city, county = _a.county, pincode = _a.pincode, password = _a.password, dateOfBirth = _a.dateOfBirth, phone = _a.phone, process = _a.process, plan = _a.plan, poa = _a.poa, closer = _a.closer, verifier = _a.verifier, bank = _a.bank, paymentMethod = _a.paymentMethod, shift = _a.shift, comment = _a.comment, card = _a.card;
                date = new Date();
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                return [4 /*yield*/, prismaClient_1.prisma.status.findFirst({
                        where: { name: "pending" },
                    })];
            case 2:
                status_1 = _c.sent();
                return [4 /*yield*/, prismaClient_1.prisma.lead.create({
                        data: {
                            title: title,
                            firstName: firstName,
                            middleName: middleName,
                            lastName: lastName,
                            centre: centre,
                            address: address,
                            city: city,
                            county: county,
                            pincode: pincode,
                            password: password,
                            poa: poa === "true" ? true : false,
                            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : client_1.Prisma.skip,
                            phone: phone,
                            processId: parseInt(process),
                            planId: parseInt(plan),
                            leadByUserId: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id,
                            closerId: parseInt(closer),
                            verifierId: parseInt(verifier),
                            paymentMethod: paymentMethod,
                            shift: shift,
                            comment: comment ? comment : client_1.Prisma.skip,
                            // BANK
                            bankName: (bank === null || bank === void 0 ? void 0 : bank.bankName) ? bank === null || bank === void 0 ? void 0 : bank.bankName : client_1.Prisma.skip,
                            accountName: (bank === null || bank === void 0 ? void 0 : bank.accountName) ? bank === null || bank === void 0 ? void 0 : bank.accountName : client_1.Prisma.skip,
                            accountNumber: (bank === null || bank === void 0 ? void 0 : bank.accountNumber) ? bank === null || bank === void 0 ? void 0 : bank.accountNumber : client_1.Prisma.skip,
                            sort: (bank === null || bank === void 0 ? void 0 : bank.sort) ? bank === null || bank === void 0 ? void 0 : bank.sort : client_1.Prisma.skip,
                            // CARD
                            cardName: (card === null || card === void 0 ? void 0 : card.name) ? card === null || card === void 0 ? void 0 : card.name : client_1.Prisma.skip,
                            cardBankName: (card === null || card === void 0 ? void 0 : card.bankName) ? card === null || card === void 0 ? void 0 : card.bankName : client_1.Prisma.skip,
                            cardNumber: (card === null || card === void 0 ? void 0 : card.cardNumber) ? card === null || card === void 0 ? void 0 : card.cardNumber : client_1.Prisma.skip,
                            expiry: (card === null || card === void 0 ? void 0 : card.expiry) ? card === null || card === void 0 ? void 0 : card.expiry : client_1.Prisma.skip,
                            cardCvv: (card === null || card === void 0 ? void 0 : card.cvv) ? card === null || card === void 0 ? void 0 : card.cvv : client_1.Prisma.skip,
                            statusId: status_1 === null || status_1 === void 0 ? void 0 : status_1.id,
                        },
                        include: { status: { select: { name: true } } },
                    })];
            case 3:
                lead = _c.sent();
                return [4 /*yield*/, prismaClient_1.prisma.leadCount.upsert({
                        where: {
                            userId: lead === null || lead === void 0 ? void 0 : lead.leadByUserId,
                            uniqueDate: {
                                date: date.getDate(),
                                month: date.getMonth() + 1,
                                year: date.getFullYear() - 1,
                                userId: lead === null || lead === void 0 ? void 0 : lead.leadByUserId,
                            },
                        },
                        create: {
                            userId: lead === null || lead === void 0 ? void 0 : lead.leadByUserId,
                            count: 1,
                            date: date.getDate(),
                            month: date.getMonth() + 1,
                            year: date.getFullYear() - 1,
                        },
                        update: { count: { increment: 1 } },
                    })];
            case 4:
                dailyLeadCount = _c.sent();
                res.send(lead);
                return [3 /*break*/, 6];
            case 5:
                error_1 = _c.sent();
                console.log(error_1);
                next(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createLead = createLead;
var getAllLead = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, status, phone, process, leadUser, closerUser, verifierUser, saleDate, fromDate, toDate, newSaleDate, nextDay, leads, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, status = _a.status, phone = _a.phone, process = _a.process, leadUser = _a.leadUser, closerUser = _a.closerUser, verifierUser = _a.verifierUser, saleDate = _a.saleDate, fromDate = _a.fromDate, toDate = _a.toDate;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                newSaleDate = new Date(saleDate);
                nextDay = new Date(saleDate);
                nextDay.setDate(nextDay.getDate() + 1);
                return [4 /*yield*/, prismaClient_1.prisma.lead.findMany({
                        include: {
                            process: { select: { name: true } },
                            plan: { select: { name: true } },
                            closer: { select: { name: true } },
                            leadBy: { select: { name: true } },
                            verifier: { select: { name: true } },
                            status: { select: { name: true } },
                            StatusChangeReason: true,
                        },
                        where: {
                            statusId: parseInt(status)
                                ? parseInt(status)
                                : client_1.Prisma.skip,
                            phone: phone ? phone : client_1.Prisma.skip,
                            processId: parseInt(process)
                                ? parseInt(process)
                                : client_1.Prisma.skip,
                            leadByUserId: parseInt(leadUser)
                                ? parseInt(leadUser)
                                : client_1.Prisma.skip,
                            closerId: parseInt(closerUser)
                                ? parseInt(closerUser)
                                : client_1.Prisma.skip,
                            verifierId: parseInt(verifierUser)
                                ? parseInt(verifierUser)
                                : client_1.Prisma.skip,
                            saleDate: {
                                gte: saleDate ? newSaleDate : client_1.Prisma.skip,
                                lt: saleDate ? nextDay : client_1.Prisma.skip,
                            },
                            createdAt: {
                                gte: fromDate ? new Date(fromDate) : client_1.Prisma.skip,
                                lte: toDate ? new Date(toDate) : client_1.Prisma.skip,
                            },
                        },
                        orderBy: { createdAt: "desc" },
                    })];
            case 2:
                leads = _b.sent();
                res.send(leads);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllLead = getAllLead;
var getAllLeadOfUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, status, saleDate, fromDate, toDate, newSaleDate, nextDay, leads, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.params.userId;
                _a = req.query, status = _a.status, saleDate = _a.saleDate, fromDate = _a.fromDate, toDate = _a.toDate;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                newSaleDate = new Date(saleDate);
                nextDay = new Date(saleDate);
                nextDay.setDate(nextDay.getDate() + 1);
                return [4 /*yield*/, prismaClient_1.prisma.lead.findMany({
                        include: {
                            process: { select: { name: true } },
                            plan: { select: { name: true } },
                            closer: { select: { name: true } },
                            status: { select: { name: true } },
                            StatusChangeReason: { orderBy: { createdAt: "desc" } },
                        },
                        where: {
                            statusId: parseInt(status)
                                ? parseInt(status)
                                : client_1.Prisma.skip,
                            saleDate: {
                                gte: saleDate ? newSaleDate : client_1.Prisma.skip,
                                lt: saleDate ? nextDay : client_1.Prisma.skip,
                            },
                            leadByUserId: parseInt(userId)
                                ? parseInt(userId)
                                : client_1.Prisma.skip,
                            createdAt: {
                                gte: fromDate ? new Date(fromDate) : client_1.Prisma.skip,
                                lte: toDate ? new Date(toDate) : new Date(),
                            },
                        },
                        orderBy: { createdAt: "desc" },
                    })];
            case 2:
                leads = _b.sent();
                res.send(leads);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                console.log(error_3);
                next(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllLeadOfUser = getAllLeadOfUser;
var getLeadOfUserByDate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, leads, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prismaClient_1.prisma.lead.groupBy({
                        by: ["statusId", "closerId"],
                        _count: { _all: true },
                    })];
            case 2:
                leads = _a.sent();
                // const grouped = groupBy(leads, (record) => {
                //     console.log("record", record.saleDate.toISOString().slice(8, 10));
                //     return record.saleDate.toISOString().slice(5, 7);
                // });
                res.send(leads);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getLeadOfUserByDate = getLeadOfUserByDate;
var getSingleLead = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send("getSingleLead");
        try {
        }
        catch (error) {
            console.log(error);
            next(error);
        }
        return [2 /*return*/];
    });
}); };
exports.getSingleLead = getSingleLead;
var updateLead = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, title, firstName, middleName, lastName, address, city, county, pincode, phone, fee, currency, bankName, accountName, sort, dateOfBirth, status, reason, initialStatus, finalStatus, lead, statusChangeReason, content, notif, cacheKey, error_5;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                id = req.params.id;
                _a = req.body, title = _a.title, firstName = _a.firstName, middleName = _a.middleName, lastName = _a.lastName, address = _a.address, city = _a.city, county = _a.county, pincode = _a.pincode, phone = _a.phone, fee = _a.fee, currency = _a.currency, bankName = _a.bankName, accountName = _a.accountName, sort = _a.sort, dateOfBirth = _a.dateOfBirth, status = _a.status, reason = _a.reason;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 6, , 7]);
                initialStatus = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.initialStatus;
                finalStatus = "";
                return [4 /*yield*/, prismaClient_1.prisma.lead.update({
                        where: { id: parseInt(id) },
                        data: {
                            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : client_1.Prisma.skip,
                            statusId: status ? parseInt(status) : client_1.Prisma.skip,
                            title: title ? title : client_1.Prisma.skip,
                            firstName: firstName ? firstName : client_1.Prisma.skip,
                            middleName: middleName ? middleName : client_1.Prisma.skip,
                            lastName: lastName ? lastName : client_1.Prisma.skip,
                            address: address ? address : client_1.Prisma.skip,
                            city: city ? city : client_1.Prisma.skip,
                            county: county ? county : client_1.Prisma.skip,
                            pincode: pincode ? pincode : client_1.Prisma.skip,
                            fee: fee ? fee : client_1.Prisma.skip,
                            currency: currency ? currency : client_1.Prisma.skip,
                            bankName: bankName ? bankName : client_1.Prisma.skip,
                            accountName: accountName ? accountName : client_1.Prisma.skip,
                            sort: sort ? sort : client_1.Prisma.skip,
                            phone: phone ? phone : client_1.Prisma.skip,
                        },
                        include: {
                            status: { select: { name: true } },
                            closer: { select: { id: true } },
                        },
                    })];
            case 2:
                lead = _d.sent();
                finalStatus = (_c = lead === null || lead === void 0 ? void 0 : lead.status) === null || _c === void 0 ? void 0 : _c.name;
                statusChangeReason = void 0;
                if (!reason) return [3 /*break*/, 4];
                return [4 /*yield*/, prismaClient_1.prisma.statusChangeReason.create({
                        data: {
                            reason: reason,
                            leadId: lead === null || lead === void 0 ? void 0 : lead.id,
                            userId: lead === null || lead === void 0 ? void 0 : lead.closerId,
                            fromStatus: initialStatus,
                            toStatus: finalStatus,
                        },
                    })];
            case 3:
                statusChangeReason = _d.sent();
                _d.label = 4;
            case 4:
                content = reason
                    ? "Lead created on ".concat(new Date(lead === null || lead === void 0 ? void 0 : lead.saleDate).toDateString(), " changed status from ").concat(initialStatus === null || initialStatus === void 0 ? void 0 : initialStatus.toUpperCase(), " to ").concat(finalStatus === null || finalStatus === void 0 ? void 0 : finalStatus.toUpperCase(), " \n\nREASON:\n ").concat(reason)
                    : "Lead created on ".concat(new Date(lead === null || lead === void 0 ? void 0 : lead.saleDate).toDateString(), " changed status from ").concat(initialStatus === null || initialStatus === void 0 ? void 0 : initialStatus.toUpperCase(), " to ").concat(finalStatus === null || finalStatus === void 0 ? void 0 : finalStatus.toUpperCase());
                return [4 /*yield*/, prismaClient_1.prisma.notification.create({
                        data: {
                            type: "important",
                            content: content,
                            title: "lead status changed",
                            saleDate: lead === null || lead === void 0 ? void 0 : lead.saleDate,
                            userId: lead === null || lead === void 0 ? void 0 : lead.leadByUserId,
                        },
                    })];
            case 5:
                notif = _d.sent();
                if (notif === null || notif === void 0 ? void 0 : notif.id) {
                    pusher_1.pusher.trigger("lead", "status-change-".concat(lead === null || lead === void 0 ? void 0 : lead.leadByUserId), {
                        notif: notif,
                    });
                }
                cacheKey = "userprofile_".concat(lead === null || lead === void 0 ? void 0 : lead.leadByUserId);
                cache_1.cache.del(cacheKey);
                res.send(lead);
                return [3 /*break*/, 7];
            case 6:
                error_5 = _d.sent();
                console.log(error_5);
                next(error_5);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updateLead = updateLead;
var deleteLead = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, lead, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, prismaClient_1.prisma.lead.delete({ where: { id: parseInt(id) } })];
            case 1:
                lead = _a.sent();
                res.send(lead);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.log(error_6);
                next(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteLead = deleteLead;
