import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";

export const createStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name } = req.body;
        const status = await prisma.status.create({
            data: {
                name,
            },
        });
        res.send(status);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getAllStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const status = await prisma.status.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.send(status);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const updateStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        console.log(req.body);

        const status = await prisma.status.update({
            where: { id: parseInt(id) },
            data: { name },
        });
        res.send(status);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const deleteStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const status = await prisma.status.delete({
            where: { id: parseInt(id) },
        });
        res.send(status);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
