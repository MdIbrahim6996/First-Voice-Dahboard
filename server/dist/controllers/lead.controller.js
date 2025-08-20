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
const client_1 = require("@prisma/client");
const pusher_1 = require("../lib/pusher");
const createLead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //     {
    //   title: 'Mr.',
    //   firstName: 'dsfdsf',
    //   middleName: '',
    //   lastName: 'dfdsf',
    //   centre: 'dsfsdf',
    //   address: '',
    //   city: '',
    //   county: '',
    //   pincode: 'sdfsdf',
    //   password: '',
    //   dateOfBirth: '',
    //   phone: '3242343242',
    //   process: '1',
    //   plan: '1',
    //   closer: '6',
    //   verifier: '6',
    //   paymentMethod: 'demandDraft',
    //   shift: 'UNITED KINGDOM (UK)',
    //   bank: {
    //     bankName: 'dsfsdf',
    //     accountName: 'dsfsdf',
    //     accountNumber: 'sdfsdf',
    //     sort: 'sdfsdf'
    //   },
    //     card: {
    //     name: 'fsdf',
    //     bankName: 'sdf',
    //     cardNumber: 'sdf',
    //     expiry: 'dsf',
    //     cvv: 'sdf'
    //   }
    // }
    console.log(req.body);
    const { title, firstName, middleName, lastName, centre, address, city, county, pincode, password, dateOfBirth, phone, process, plan, poa, closer, verifier, bank, paymentMethod, shift, comment, card, } = req.body;
    const date = new Date();
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
                county,
                pincode,
                password,
                poa: poa === "true" ? true : false,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : client_1.Prisma.skip,
                phone,
                processId: parseInt(process),
                planId: parseInt(plan),
                leadByUserId: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id,
                closerId: parseInt(closer),
                verifierId: parseInt(verifier),
                paymentMethod,
                shift,
                comment: comment ? comment : client_1.Prisma.skip,
                // BANK
                bankName: (bank === null || bank === void 0 ? void 0 : bank.bankName) ? bank === null || bank === void 0 ? void 0 : bank.bankName : client_1.Prisma.skip,
                accountName: (bank === null || bank === void 0 ? void 0 : bank.accountName)
                    ? bank === null || bank === void 0 ? void 0 : bank.accountName
                    : client_1.Prisma.skip,
                accountNumber: (bank === null || bank === void 0 ? void 0 : bank.accountNumber)
                    ? bank === null || bank === void 0 ? void 0 : bank.accountNumber
                    : client_1.Prisma.skip,
                sort: (bank === null || bank === void 0 ? void 0 : bank.sort) ? bank === null || bank === void 0 ? void 0 : bank.sort : client_1.Prisma.skip,
                // CARD
                cardName: (card === null || card === void 0 ? void 0 : card.name) ? card === null || card === void 0 ? void 0 : card.name : client_1.Prisma.skip,
                cardBankName: (card === null || card === void 0 ? void 0 : card.bankName) ? card === null || card === void 0 ? void 0 : card.bankName : client_1.Prisma.skip,
                cardNumber: (card === null || card === void 0 ? void 0 : card.cardNumber) ? card === null || card === void 0 ? void 0 : card.cardNumber : client_1.Prisma.skip,
                expiry: (card === null || card === void 0 ? void 0 : card.expiry) ? card === null || card === void 0 ? void 0 : card.expiry : client_1.Prisma.skip,
                cardCvv: (card === null || card === void 0 ? void 0 : card.cvv) ? card === null || card === void 0 ? void 0 : card.cvv : client_1.Prisma.skip,
                statusId: status === null || status === void 0 ? void 0 : status.id,
            },
            include: { status: { select: { name: true } } },
        });
        console.log(lead === null || lead === void 0 ? void 0 : lead.closerId);
        const dailyLeadCount = yield prismaClient_1.prisma.leadCount.upsert({
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
    const { status, phone, process, leadUser, closerUser, verifierUser, saleDate, fromDate, toDate, } = req.query;
    try {
        const newSaleDate = new Date(saleDate);
        const nextDay = new Date(saleDate);
        nextDay.setDate(nextDay.getDate() + 1);
        const leads = yield prismaClient_1.prisma.lead.findMany({
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
        });
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
    const { title, firstName, middleName, lastName, address, city, county, pincode, phone, fee, currency, bankName, accountName, sort, dateOfBirth, status, reason, } = req.body;
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
        });
        finalStatus = (_b = lead === null || lead === void 0 ? void 0 : lead.status) === null || _b === void 0 ? void 0 : _b.name;
        let statusChangeReason;
        if (reason) {
            statusChangeReason = yield prismaClient_1.prisma.statusChangeReason.create({
                data: {
                    reason,
                    leadId: lead === null || lead === void 0 ? void 0 : lead.id,
                    userId: lead === null || lead === void 0 ? void 0 : lead.closerId,
                    fromStatus: initialStatus,
                    toStatus: finalStatus,
                },
            });
        }
        const content = reason
            ? `Lead created on ${new Date(lead === null || lead === void 0 ? void 0 : lead.saleDate).toDateString()} changed status from ${initialStatus === null || initialStatus === void 0 ? void 0 : initialStatus.toUpperCase()} to ${finalStatus === null || finalStatus === void 0 ? void 0 : finalStatus.toUpperCase()} \n\nREASON:\n ${reason}`
            : `Lead created on ${new Date(lead === null || lead === void 0 ? void 0 : lead.saleDate).toDateString()} changed status from ${initialStatus === null || initialStatus === void 0 ? void 0 : initialStatus.toUpperCase()} to ${finalStatus === null || finalStatus === void 0 ? void 0 : finalStatus.toUpperCase()}`;
        const notif = yield prismaClient_1.prisma.notification.create({
            data: {
                type: "important",
                content,
                title: "lead status changed",
                saleDate: lead === null || lead === void 0 ? void 0 : lead.saleDate,
                userId: lead === null || lead === void 0 ? void 0 : lead.leadByUserId,
            },
        });
        if (notif === null || notif === void 0 ? void 0 : notif.id) {
            pusher_1.pusher.trigger("lead", `status-change-${lead === null || lead === void 0 ? void 0 : lead.leadByUserId}`, {
                notif,
            });
        }
        res.send(lead);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.updateLead = updateLead;
const deleteLead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const lead = yield prismaClient_1.prisma.lead.delete({ where: { id: parseInt(id) } });
        res.send(lead);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.deleteLead = deleteLead;
