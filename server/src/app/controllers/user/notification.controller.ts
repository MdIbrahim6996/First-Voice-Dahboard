import { Request, Response, NextFunction } from "express";
import { prisma } from "../../lib/prismaClient";
import { quote, quotesArray } from "../../utils/appContants";

//USER CONTROLLERS
export const getAllNotificationOfUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user!;
    const notif = await prisma.notification.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });
    res.render("pages/notification", {
      notifications: notif,
      userId,
      currentPath: "/user/notification",
      quote: quote,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const deleteNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: userId } = req.user!;
  const { id } = req.params;
  try {
    const existingNotif = await prisma.notification.findFirst({
      where: { id: parseInt(id) },
    });
    if (existingNotif?.userId !== userId) {
      throw new Error("You are not allowed to perform this operation");
    }

    const notif = await prisma.notification.delete({
      where: { id: parseInt(id), userId: userId },
    });
    res.send(notif);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
