import { Request, Response, NextFunction } from "express";
import { prisma } from "../../lib/prismaClient";

export const getDailyLeadCount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("Inside getDailyLeadCount controller");
    const { id: userId } = req.user!;
    try {
        const leadCount = await prisma.leadCount.findMany({
            where: { userId: userId },
            orderBy: { createdAt: "desc" },
        });
        res.render("pages/dashboard", {
            currentPath: "/user/dashboard",
            leadCount,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
