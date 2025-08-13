import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import { groupBy } from "lodash";
import { graphData } from "../utils/arrayGouping";

export const getUserInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.params;
    const { time = "thisMonth" } = req.query;
    try {
        const filterDate: {
            startDate: Date;
            endDate: Date;
        } = {
            startDate: new Date(),
            endDate: new Date(),
        };
        const currentDate = new Date();

        if (time === "today") {
            const startDay = currentDate.setUTCHours(0, 0, 0, 0);
            const nextDay = new Date(
                currentDate.setDate(currentDate.getDate() + 1)
            ).setUTCHours(0, 0, 0, 0);
            console.log(new Date(nextDay));

            filterDate.startDate = new Date(startDay);
            filterDate.endDate = new Date(nextDay);
        }

        if (time === "thisMonth") {
            const startMonth = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                2
            ).setUTCHours(0, 0, 0);
            const endMonth = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
                2
            ).setUTCHours(0, 0, 0);
            filterDate.startDate = new Date(startMonth);
            filterDate.endDate = new Date(endMonth);
        }

        if (time === "thisYear") {
            const startYear = new Date();
            startYear.setMonth(0);
            startYear.setDate(1);
            startYear.setUTCHours(0, 0, 0, 0);

            const endYear = new Date();
            endYear.setFullYear(endYear.getFullYear() + 1);
            endYear.setMonth(0);
            endYear.setDate(1);
            endYear.setUTCHours(0, 0, 0, 0);

            filterDate.startDate = new Date(startYear);
            filterDate.endDate = new Date(endYear);
        }
        const status = await prisma.status.findMany({});

        const result = status.map(async (item: any) => {
            const data = await prisma.lead.groupBy({
                by: ["statusId"],
                where: {
                    closerId: parseInt(userId),
                    statusId: item?.id,
                    saleDate: {
                        gte: filterDate.startDate,
                        lte: filterDate.endDate,
                    },
                },
                _count: { _all: true },
            });
            const count = data[0]?._count?._all;
            return {
                status: item?.name,
                count: count ? count : 0,
            };
        });
        // const user = await prisma.lead.groupBy({
        //     by: ["statusId"],
        //     where: { closerId: parseInt(userId), statusId: 1 },
        //     _count: { _all: true },
        // });
        const data = await Promise.all(result);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

export const getUserMonthWiseAttendance = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.params;
    try {
        const user = await prisma.user.findFirst({
            where: { id: parseInt(userId) },
        });

        if (!user) throw new Error("User doesn't exist.");

        const userAttendance = await prisma.attendance.findMany({
            where: { userId: parseInt(userId) },
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

export const getProfileCardInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.params;

    const currentStartDay = new Date();
    currentStartDay.setUTCHours(0, 0, 0, 0);

    const nextStartDay = new Date();
    nextStartDay.setDate(nextStartDay.getDate() + 1);
    nextStartDay.setUTCHours(0, 0, 0, 0);

    const currentStartMonth = new Date();
    currentStartMonth.setDate(1);
    currentStartMonth.setUTCHours(0, 0, 0, 0);

    const nextStartMonth = new Date();
    nextStartMonth.setMonth(nextStartMonth.getMonth() + 1);
    nextStartMonth.setDate(1);
    nextStartMonth.setUTCHours(0, 0, 0, 0);

    try {
        const todayLead = await prisma.lead.count({
            where: {
                closerId: parseInt(userId),
                saleDate: { gte: currentStartDay, lte: nextStartDay },
            },
        });
        const totalLead = await prisma.lead.count({
            where: {
                closerId: parseInt(userId),
                saleDate: { gte: currentStartMonth, lte: nextStartMonth },
            },
        });
        const totalSuccessLead = await prisma.lead.count({
            where: {
                closerId: parseInt(userId),
                status: { name: "success" },
                saleDate: { gte: currentStartMonth, lte: nextStartMonth },
            },
        });
        const totalAttendance = await prisma.attendance.count({
            where: {
                userId: parseInt(userId),
                dateTime: { gte: currentStartMonth, lte: nextStartMonth },
            },
        });
        const spd = totalSuccessLead / totalAttendance;
        res.send({
            todayLead,
            totalSuccessLead,
            totalLead,
            spd: spd ? spd?.toFixed(2) : 0,
            totalAttendance,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
