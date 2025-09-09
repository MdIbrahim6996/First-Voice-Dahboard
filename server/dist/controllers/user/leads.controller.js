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
exports.createLead = exports.getUserLeads = void 0;
var prismaClient_1 = require("../../lib/prismaClient");
var client_1 = require("@prisma/client");
var getUserLeads = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, statusId, saleDate, fromDate, toDate, id, newSaleDate, nextDay, status_1, leads, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, statusId = _a.statusId, saleDate = _a.saleDate, fromDate = _a.fromDate, toDate = _a.toDate;
                id = req.user.id;
                newSaleDate = new Date(saleDate);
                newSaleDate.setUTCHours(0, 0, 0, 0);
                nextDay = new Date(saleDate);
                nextDay.setUTCHours(0, 0, 0, 0);
                nextDay.setDate(nextDay.getDate() + 1);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prismaClient_1.prisma.status.findMany()];
            case 2:
                status_1 = _b.sent();
                return [4 /*yield*/, prismaClient_1.prisma.lead.findMany({
                        where: {
                            leadByUserId: id,
                            statusId: statusId ? parseInt(statusId) : client_1.Prisma.skip,
                            saleDate: {
                                gte: saleDate ? newSaleDate : client_1.Prisma.skip,
                                lt: saleDate ? nextDay : client_1.Prisma.skip,
                            },
                            createdAt: {
                                gte: fromDate ? new Date(fromDate) : client_1.Prisma.skip,
                                lte: toDate ? new Date(toDate) : client_1.Prisma.skip,
                            },
                        },
                        include: {
                            status: { select: { name: true } },
                            process: { select: { name: true } },
                            plan: { select: { name: true } },
                            StatusChangeReason: true,
                        },
                        orderBy: { createdAt: "desc" },
                    })];
            case 3:
                leads = _b.sent();
                res.render("pages/leads", { currentPath: "/user/leads", leads: leads, status: status_1 });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                next(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getUserLeads = getUserLeads;
var createLead = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, firstName, middleName, lastName, centre, address, city, county, pincode, password, dateOfBirth, phone, process, plan, poa, closer, verifier, bank, paymentMethod, shift, comment, card, date, status_2, lead, dailyLeadCount, error_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log(req.body);
                _a = req.body, title = _a.title, firstName = _a.firstName, middleName = _a.middleName, lastName = _a.lastName, centre = _a.centre, address = _a.address, city = _a.city, county = _a.county, pincode = _a.pincode, password = _a.password, dateOfBirth = _a.dateOfBirth, phone = _a.phone, process = _a.process, plan = _a.plan, poa = _a.poa, closer = _a.closer, verifier = _a.verifier, bank = _a.bank, paymentMethod = _a.paymentMethod, shift = _a.shift, comment = _a.comment, card = _a.card;
                date = new Date();
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                return [4 /*yield*/, prismaClient_1.prisma.status.findFirst({
                        where: { name: "pending" },
                    })];
            case 2:
                status_2 = _c.sent();
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
                            statusId: status_2 === null || status_2 === void 0 ? void 0 : status_2.id,
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
                error_2 = _c.sent();
                console.log(error_2);
                next(error_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createLead = createLead;
