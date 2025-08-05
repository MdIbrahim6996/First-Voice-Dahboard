import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import { groupBy } from "lodash";

const graphData = (data: any) => {
    const lateArray = [];
    const ontimeArray = [];

    for (const [key, value] of Object.entries(data)) {
        let late = 0;
        let ontime = 0;
        let absent = 0;

        const date = new Date();

        const totalDays = new Date(
            date.getFullYear(),
            parseInt(key),
            0
        ).getDate();

        //@ts-ignore
        for (const entry of value) {
            if (entry.isLate) {
                late++;
            } else {
                ontime++;
            }
        }
        lateArray[parseInt(key) - 1] = late;
        ontimeArray[parseInt(key) - 1] = ontime;
        absent = totalDays - (late + ontime);
        console.log(key, absent);
    }
    return { lateArray, ontimeArray };
};

export const createEmployeeAttendance = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findFirst({
            where: { id: parseInt(id) },
        });

        if (!user) throw new Error("User doesn't exist.");

        // const dateObject = new Date().toLocaleString("en-US", {
        //     timeZone: "Asia/Kolkata",
        // });
        const date = new Date();
        const currentDate = date.getDate();

        const existingAttendance = await prisma.attendance.findMany({
            where: { userId: parseInt(id) },
            orderBy: { dateTime: "desc" },
        });

        // if (currentDate === existingAttendance[0].dateTime.getDate()) {
        //     throw new Error("Your Attendance has already been marked.");
        // }

        const timeA = new Date();
        const isLate = timeA.getUTCHours() > 12 ? true : false;
        //9

        // CORRECT APPROACH
        // const timeB = new Date();
        // timeB.setUTCHours(9);
        // timeB.setUTCMinutes(30);
        // console.log(new Date(timeB));
        // const timeC = new Date();
        // timeC.setUTCHours(9);
        // timeC.setUTCMinutes(31);
        // console.log(timeB > timeC);

        // Create attendance
        const attendance = await prisma.attendance.create({
            data: { userId: parseInt(id), isLate },
        });

        res.send({ message: "Attendance Marked Successfully." });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const markEmployeeAttendance = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findFirst({
            where: { id: parseInt(id) },
        });

        if (!user) throw new Error("User doesn't exist.");

        const date = new Date();
        const currentDate = date.getDate();

        const existingAttendance = await prisma.attendance.findMany({
            where: { userId: parseInt(id) },
            orderBy: { dateTime: "desc" },
        });
        if (currentDate === existingAttendance[0].dateTime.getDate()) {
            throw new Error("Your Attendance has already been marked.");
        }

        // Create attendance
        const attendance = await prisma.attendance.create({
            data: { userId: parseInt(id) },
        });

        res.send({ message: "Attendance Marked Successfully." });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getEmployeeAllAttendance = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findFirst({
            where: { id: parseInt(id) },
        });

        if (!user) throw new Error("User doesn't exist.");

        const attendance = await prisma.attendance.findMany({
            where: { userId: parseInt(id) },
            orderBy: { dateTime: "desc" },
        });

        res.send(attendance);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getEmployeeYearlyAttendance = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findFirst({
            where: { id: parseInt(id) },
        });

        if (!user) throw new Error("User doesn't exist.");

        const userAttendance = await prisma.attendance.findMany({
            where: { userId: parseInt(id) },
            orderBy: { dateTime: "desc" },
        });
        const grouped = groupBy(userAttendance, (record) =>
            record.dateTime.toISOString().slice(5, 7)
        );

        res.send({ data: grouped, graphData: graphData(grouped) });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
