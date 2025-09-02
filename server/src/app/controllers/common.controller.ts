import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prismaClient";

export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user!;
  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
