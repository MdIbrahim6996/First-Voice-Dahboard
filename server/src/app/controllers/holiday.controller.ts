import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import { Prisma } from "@prisma/client";

export const createHoliday = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, startDate, endDate } = req.body;
    console.log(req.body);

    const holiday = await prisma.holiday.create({
        data: {
            name,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
        },
    });
    res.send(holiday);
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getAllHoliday = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, startDate, endDate } = req.query;
    try {
        const holiday = await prisma.holiday.findMany({
            where: {
                name: title ? (title as string) : Prisma.skip,
                startDate: startDate
                    ? new Date(startDate as string)
                    : Prisma.skip,
                endDate: endDate ? new Date(endDate as string) : Prisma.skip,
            },
        });
        res.send(holiday);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getAllUserHoliday = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const holiday = await prisma.holiday.findMany();
    res.send(holiday);
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getSingleHoliday = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.send("getSingleHoliday");
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const updateHoliday = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const { name, startDate, endDate } = req.body;

    try {
        const holiday = await prisma.holiday.update({
            where: { id: parseInt(id) },
            data: {
                name,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            },
        });
        res.send(holiday);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const deleteHoliday = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const holiday = await prisma.holiday.delete({
        where: { id: parseInt(id) },
    });
    res.send(holiday);
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
