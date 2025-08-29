import { Request, Response, NextFunction } from "express";
import { prisma } from "../../lib/prismaClient";

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
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, id } = req.params;
  try {
    const existingNotif = await prisma.notification.findFirst({
      where: { id: parseInt(id) },
    });
    if (existingNotif?.userId !== parseInt(userId)) {
      throw new Error("You are not allowed to perform this operation");
    }

    const notif = await prisma.notification.delete({
      where: { id: parseInt(id), userId: parseInt(userId) },
    });
    res.send(notif);
  } catch (error) {
    console.log(error);
  }
};
