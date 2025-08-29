import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prismaClient";
import { Prisma } from "@prisma/client";

export const getUserLeads = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusId } = req.query;
  const { id } = req.user!;
  try {
    const status = await prisma.status.findMany();
    const leads = await prisma.lead.findMany({
      where: {
        leadByUserId: id,
        statusId: statusId ? parseInt(statusId as string) : Prisma.skip,
      },
      include: {
        status: { select: { name: true } },
        process: { select: { name: true } },
        plan: { select: { name: true } },
      },
    });
    res.render("pages/leads", { currentPath: "/user/leads", leads, status });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
