import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";

export const getDailyLeadCount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.params;
    try {
        const leadCount = await prisma.leadCount.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: "desc" },
        });
        res.send(leadCount);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
