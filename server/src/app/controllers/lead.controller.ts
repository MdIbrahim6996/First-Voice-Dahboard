import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import { Prisma } from "@prisma/client";
import { pusher } from "../lib/pusher";
import { groupBy } from "lodash";

export const createLead = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
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
        dateOfBirth,
        phone,
        process,
        plan,
        closer,
        fee,
        currency,
        bankName,
        accountName,
        comment,
        cardNumber,
        expiryDateYear,
        expiryDateMonth,
        cvv,
    } = req.body;
    const date = new Date();
    console.log(date);
    console.log(date.toISOString().substring(0, 10));
    try {
        const status = await prisma.status.findFirst({
            where: { name: "pending" },
        });

        const lead = await prisma.lead.create({
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
                statusId: status?.id,
                // comment,
                // cardNumber,
                // cvv,
                // expiryDateMonth,
                // expiryDateYear,
            },
        });
        console.log(lead?.closerId);

        const dailyLeadCount = await prisma.leadCount.upsert({
            where: {
                userId: lead?.closerId as number,
                uniqueDate: {
                    date: date.getDate(),
                    month: date.getMonth() + 1,
                    year: date.getFullYear() - 1,
                    userId: lead?.closerId as number,
                },
            },
            create: {
                userId: lead?.closerId as number,
                count: 1,
                date: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear() - 1,
            },
            update: { count: { increment: 1 } },
        });

        res.send(lead);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getAllLead = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { status, process, saleDate, fromDate, toDate } = req.query;

    try {
        const newSaleDate = new Date(saleDate as string);
        const nextDay = new Date(saleDate as string);
        nextDay.setDate(nextDay.getDate() + 1);

        const leads = await prisma.lead.findMany({
            include: {
                process: { select: { name: true } },
                plan: { select: { name: true } },
                closer: { select: { name: true } },
                status: { select: { name: true } },
                StatusChangeReason: true,
            },
            where: {
                statusId: parseInt(status as string)
                    ? parseInt(status as string)
                    : Prisma.skip,
                saleDate: {
                    gte: saleDate ? newSaleDate : Prisma.skip,
                    lt: saleDate ? nextDay : Prisma.skip,
                },
                createdAt: {
                    gte: fromDate ? new Date(fromDate as string) : Prisma.skip,
                    lte: toDate ? new Date(toDate as string) : Prisma.skip,
                },
            },
            orderBy: { createdAt: "desc" },
        });
        res.send(leads);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getAllLeadOfUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.params;
    const { status, saleDate, fromDate, toDate } = req.query;

    try {
        const newSaleDate = new Date(saleDate as string);
        const nextDay = new Date(saleDate as string);
        nextDay.setDate(nextDay.getDate() + 1);

        const leads = await prisma.lead.findMany({
            include: {
                process: { select: { name: true } },
                plan: { select: { name: true } },
                closer: { select: { name: true } },
                status: { select: { name: true } },
                StatusChangeReason: { orderBy: { createdAt: "desc" } },
            },
            where: {
                statusId: parseInt(status as string)
                    ? parseInt(status as string)
                    : Prisma.skip,
                saleDate: {
                    gte: saleDate ? newSaleDate : Prisma.skip,
                    lt: saleDate ? nextDay : Prisma.skip,
                },
                closerId: parseInt(userId as string)
                    ? parseInt(userId as string)
                    : Prisma.skip,
                createdAt: {
                    gte: fromDate ? new Date(fromDate as string) : Prisma.skip,
                    lte: toDate ? new Date(toDate as string) : new Date(),
                },
            },
            orderBy: { createdAt: "desc" },
        });
        res.send(leads);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getLeadOfUserByDate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.params;
    try {
        // const leads = await prisma.lead.findMany({
        //     where: { closerId: parseInt(userId) },
        //     select: { saleDate: true },
        // });

        const leads = await prisma.lead.groupBy({
            by: ["statusId", "closerId"],
            _count: { _all: true },
        });
        // const grouped = groupBy(leads, (record) => {
        //     console.log("record", record.saleDate.toISOString().slice(8, 10));
        //     return record.saleDate.toISOString().slice(5, 7);
        // });
        res.send(leads);
    } catch (error) {
        console.log(error);
    }
};
export const getSingleLead = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.send("getSingleLead");
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const updateLead = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    const {
        title,
        firstName,
        middleName,
        lastName,
        address,
        city,
        country,
        pincode,
        phone,
        fee,
        currency,
        bankName,
        accountName,
        sort,
        dateOfBirth,
        status,
        reason,
    } = req.body;

    try {
        let initialStatus = req?.body?.initialStatus as string;
        let finalStatus = "";

        const lead = await prisma.lead.update({
            where: { id: parseInt(id) },
            data: {
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : Prisma.skip,
                statusId: status ? parseInt(status) : Prisma.skip,
                title: title ? title : Prisma.skip,
                firstName: firstName ? firstName : Prisma.skip,
                middleName: middleName ? middleName : Prisma.skip,
                lastName: lastName ? lastName : Prisma.skip,
                address: address ? address : Prisma.skip,
                city: city ? city : Prisma.skip,
                country: country ? country : Prisma.skip,
                pincode: pincode ? pincode : Prisma.skip,
                fee: fee ? fee : Prisma.skip,
                currency: currency ? currency : Prisma.skip,
                bankName: bankName ? bankName : Prisma.skip,
                accountName: accountName ? accountName : Prisma.skip,
                sort: sort ? sort : Prisma.skip,
                phone: phone ? phone : Prisma.skip,
            },
            include: {
                status: { select: { name: true } },
                closer: { select: { id: true } },
            },
        });
        finalStatus = lead?.status?.name as string;

        let statusChangeReason;
        if (reason) {
            statusChangeReason = await prisma.statusChangeReason.create({
                data: {
                    reason,
                    leadId: lead?.id,
                    userId: lead?.closerId!,
                    fromStatus: initialStatus,
                    toStatus: finalStatus,
                },
            });
        }
        const content = reason
            ? `Lead created on ${new Date(
                  lead?.saleDate
              ).toDateString()} changed status from ${initialStatus?.toUpperCase()} to ${finalStatus?.toUpperCase()} \n\nREASON:\n ${reason}`
            : `Lead created on ${new Date(
                  lead?.saleDate
              ).toDateString()} changed status from ${initialStatus?.toUpperCase()} to ${finalStatus?.toUpperCase()}`;
        const notif = await prisma.notification.create({
            data: {
                type: "important",
                content,
                title: "lead status changed",

                saleDate: lead?.saleDate,
                userId: lead?.closerId as number,
            },
        });
        if (notif?.id) {
            pusher.trigger("lead", `status-change-${lead?.closerId}`, {
                notif,
            });
        }
        res.send(lead);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const deleteLead = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const lead = await prisma.lead.delete({ where: { id: parseInt(id) } });
    res.send(lead);
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
