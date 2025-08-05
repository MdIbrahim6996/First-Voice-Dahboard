import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prismaClient";

export const createNotification = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // const notif = await prisma.notification.create({
        //     data:{}
        // })
        res.send("create");
    } catch (error) {
        console.log(error);
    }
};

//USER CONTROLLERS
export const getAllNotificationOfUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = req.params;
        const notif = await prisma.notification.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: "desc" },
        });
        res.cookie("notif", "notif", {
            sameSite: "none",
            secure: true,
            maxAge: 10 * 1000,
        }).send(notif);
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
