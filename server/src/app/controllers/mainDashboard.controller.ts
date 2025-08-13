import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";

export const getTopSellers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const currentDay = new Date();
    currentDay.setUTCHours(0, 0, 0, 0);

    const nextDay = new Date();
    nextDay.setUTCHours(0, 0, 0, 0);
    nextDay.setUTCDate(nextDay.getUTCDate() + 1);
    try {
        const seller = await prisma.leadCount.findMany({
            where: { updatedAt: { gte: currentDay, lte: nextDay } },
            orderBy: [{ count: "desc" }, { updatedAt: "desc" }],
            include: { user: { select: { name: true, alias: true } } },
        });
        res.send(seller);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getProcessLeadCount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const leadCount = await prisma.process.findMany({});
        res.send(leadCount);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
