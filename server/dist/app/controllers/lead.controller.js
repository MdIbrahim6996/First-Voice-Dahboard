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
exports.deleteLead = exports.updateLead = exports.getSingleLead = exports.getLeadOfUserByDate = exports.getAllLeadOfUser = exports.getAllLead = exports.createLead = void 0;
const prismaClient_1 = require("../lib/prismaClient");
const client_1 = require("../../../prisma/generated/prisma/client");
const pusher_1 = require("../lib/pusher");
const createLead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, firstName, middleName, lastName, centre, address, city, country, pincode, password, dateOfBirth, phone, process, plan, closer, fee, currency, bankName, accountName, comment, cardNumber, expiryDateYear, expiryDateMonth, cvv, } = req.body;
    try {
        const status = yield prismaClient_1.prisma.status.findFirst({
            where: { name: "pending" },
        });
        const lead = yield prismaClient_1.prisma.lead.create({
            data: {
                title,
                firstName,
                middleName,
                lastName,
                centre,
                address,
                city,
                country,
                pincode,
                password,
                dateOfBirth: new Date(dateOfBirth),
                phone,
                processId: parseInt(process),
                planId: parseInt(plan),
                closerId: parseInt(closer),
                fee: parseInt(fee),
                currency,
                bankName,
                accountName,
                statusId: status === null || status === void 0 ? void 0 : status.id,
                // comment,
                // cardNumber,
                // cvv,
                // expiryDateMonth,
                // expiryDateYear,
            },
        });
        res.send(lead);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createLead = createLead;
const getAllLead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, process, saleDate, fromDate, toDate } = req.query;
    try {
        const newSaleDate = new Date(saleDate);
        const nextDay = new Date(saleDate);
        nextDay.setDate(nextDay.getDate() + 1);
        const leads = yield prismaClient_1.prisma.lead.findMany({
            include: {
                process: { select: { name: true } },
                plan: { select: { name: true } },
                closer: { select: { name: true } },
                status: { select: { name: true } },
            },
            where: {
                statusId: parseInt(status)
                    ? parseInt(status)
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
        });
        res.send(leads);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getAllLead = getAllLead;
const getAllLeadOfUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { status, saleDate, fromDate, toDate } = req.query;
    console.log("userId", userId);
    try {
        const newSaleDate = new Date(saleDate);
        const nextDay = new Date(saleDate);
        nextDay.setDate(nextDay.getDate() + 1);
        const leads = yield prismaClient_1.prisma.lead.findMany({
            include: {
                process: { select: { name: true } },
                plan: { select: { name: true } },
                closer: { select: { name: true } },
                status: { select: { name: true } },
            },
            where: {
                statusId: parseInt(status)
                    ? parseInt(status)
                    : client_1.Prisma.skip,
                saleDate: {
                    gte: saleDate ? newSaleDate : client_1.Prisma.skip,
                    lt: saleDate ? nextDay : client_1.Prisma.skip,
                },
                closerId: parseInt(userId)
                    ? parseInt(userId)
                    : client_1.Prisma.skip,
                createdAt: {
                    gte: fromDate ? new Date(fromDate) : client_1.Prisma.skip,
                    lte: toDate ? new Date(toDate) : new Date(),
                },
            },
            orderBy: { createdAt: "desc" },
        });
        console.log(leads.length);
        res.send(leads);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getAllLeadOfUser = getAllLeadOfUser;
const getLeadOfUserByDate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        // const leads = await prisma.lead.findMany({
        //     where: { closerId: parseInt(userId) },
        //     select: { saleDate: true },
        // });
        const leads = yield prismaClient_1.prisma.lead.groupBy({
            by: ["statusId", "closerId"],
            _count: { _all: true },
        });
        // const grouped = groupBy(leads, (record) => {
        //     console.log("record", record.saleDate.toISOString().slice(8, 10));
        //     return record.saleDate.toISOString().slice(5, 7);
        // });
        res.send(leads);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getLeadOfUserByDate = getLeadOfUserByDate;
const getSingleLead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("getSingleLead");
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getSingleLead = getSingleLead;
const updateLead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.params;
    const { title, firstName, middleName, lastName, address, city, country, pincode, phone, fee, currency, bankName, accountName, sort, dateOfBirth, status, } = req.body;
    try {
        let initialStatus = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.initialStatus;
        let finalStatus = "";
        const lead = yield prismaClient_1.prisma.lead.update({
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
                country: country ? country : client_1.Prisma.skip,
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
        });
        finalStatus = (_b = lead === null || lead === void 0 ? void 0 : lead.status) === null || _b === void 0 ? void 0 : _b.name;
        console.log(lead);
        const notif = yield prismaClient_1.prisma.notification.create({
            data: {
                type: "important",
                content: `Lead created on ${new Date(lead === null || lead === void 0 ? void 0 : lead.saleDate).toDateString()} changed status from ${initialStatus === null || initialStatus === void 0 ? void 0 : initialStatus.toUpperCase()} to ${finalStatus === null || finalStatus === void 0 ? void 0 : finalStatus.toUpperCase()}`,
                title: "lead status changed",
                saleDate: lead === null || lead === void 0 ? void 0 : lead.saleDate,
                userId: 1,
            },
        });
        if (notif === null || notif === void 0 ? void 0 : notif.id) {
            pusher_1.pusher.trigger("lead", `status-change-${lead === null || lead === void 0 ? void 0 : lead.closerId}`, {
                notif,
            });
        }
        //  {
        //         message: `Lead with id: ${id} changed status from ${initialStatus} to ${finalStatus}`,
        //     }
        // const l = await prisma.lead.update({
        //     where: { id: parseInt(id) },
        //     data: { statusId: data?.statusId },
        // });
        res.send(lead);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.updateLead = updateLead;
const deleteLead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const lead = yield prismaClient_1.prisma.lead.delete({ where: { id: parseInt(id) } });
    res.send(lead);
    try {
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.deleteLead = deleteLead;
