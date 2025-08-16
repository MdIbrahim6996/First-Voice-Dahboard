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
    console.log(req.user);
    const {
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
        dateOfBirth,
        phone,
        process,
        plan,
        closer,
        verifier,
        bank,
        paymentMethod,
        shift,
        fee,
        currency,
        bankName,
        accountName,
        comment,
        card,
    } = req.body;
    console.log(req.body);
    const date = new Date();

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
                county,
                pincode,
                password,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : Prisma.skip,
                phone,
                processId: parseInt(process),
                planId: parseInt(plan),
                leadByUserId: req?.user?.id!,
                closerId: parseInt(closer),
                verifierId: parseInt(verifier),
                paymentMethod,
                shift,
                comment,

                // BANK
                bankName: bank?.bankName ? bank?.bankName : Prisma.skip,
                accountName: bank?.accountName
                    ? bank?.accountName
                    : Prisma.skip,
                accountNumber: bank?.accountNumber
                    ? bank?.accountNumber
                    : Prisma.skip,
                sort: bank?.sort ? bank?.sort : Prisma.skip,
                // CARD
                cardName: card?.name ? card?.name : Prisma.skip,
                cardBankName: card?.bankName ? card?.bankName : Prisma.skip,
                cardNumber: card?.cardNumber ? card?.cardNumber : Prisma.skip,
                expiry: card?.expiry ? card?.expiry : Prisma.skip,
                cardCvv: card?.cvv ? card?.cvv : Prisma.skip,
                statusId: status?.id,
            },
            include: { status: { select: { name: true } } },
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
                processId: parseInt(process as string)
                    ? parseInt(process as string)
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
                leadByUserId: parseInt(userId as string)
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
        county,
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
                county: county ? county : Prisma.skip,
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
                userId: lead?.leadByUserId as number,
            },
        });
        if (notif?.id) {
            pusher.trigger("lead", `status-change-${lead?.leadByUserId}`, {
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
    try {
        const { id } = req.params;
        const lead = await prisma.lead.delete({ where: { id: parseInt(id) } });
        res.send(lead);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
