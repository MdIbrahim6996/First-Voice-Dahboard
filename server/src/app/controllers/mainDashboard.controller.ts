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
      where: {
        updatedAt: { gte: currentDay, lte: nextDay },
        userId: { not: null },
        count: { gt: 0 },
      },
      orderBy: [{ count: "desc" }, { updatedAt: "asc" }],
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
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  const date2 = new Date();
  date2.setUTCDate(date.getDate() + 1);
  date2.setUTCHours(0, 0, 0, 0);

  try {
    const leadCount = await prisma.process.findMany({
      include: {
        User: {
          // orderBy: { LeadCount: { _count: "desc" } },

          omit: {
            email: true,
            employeeId: true,
            phone: true,
            createdAt: true,
            isBlocked: true,
            password: true,
            updatedAt: true,
            processId: true,
          },
          include: {
            LeadCount: {
              select: { count: true },
              where: { createdAt: { gte: date, lte: date2 } },
            },
          },
        },
      },
    });
    res.send(leadCount);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
