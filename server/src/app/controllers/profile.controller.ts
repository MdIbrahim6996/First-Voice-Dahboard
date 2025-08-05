import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";

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
            console.log(filterDate);
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
            console.log(filterDate);
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
            console.log(filterDate);
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
            console.log(data);
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
