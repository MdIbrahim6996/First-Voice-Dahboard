import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import { groupBy } from "lodash";
import { timeArr } from "../utils/date";
import { arrayGrouping } from "../utils/arrayGouping";

export const createProcess = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name } = req.body;

        const process = await prisma.process.create({ data: { name } });
        res.send(process);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getAllProcess = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const status = await prisma.status.findMany({ select: { name: true } });
        const process = await prisma.process.findMany({
            include: {
                plans: true,
                _count: {
                    select: {
                        Lead: { where: { status: { name: "success" } } },
                    },
                },
            },
        });
        res.send(process);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getProcessInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const { time } = req.query;
    const date = new Date();

    try {
        let results;
        const status = await prisma.status.findMany({
            select: { id: true, name: true },
        });

        if (time === "thisMonth") {
            const startMonth = new Date(
                date.getFullYear(),
                date.getMonth(),
                2
            ).setUTCHours(0, 0, 0);
            const endMonth = new Date(
                date.getFullYear(),
                date.getMonth() + 1,
                2
            ).setUTCHours(0, 0, 0);

            const counts = status?.map(async (item: any, i: number) => {
                const data = await prisma.lead.count({
                    where: {
                        statusId: item?.id,
                        processId: parseInt(id),
                        saleDate: {
                            gte: new Date(startMonth),
                            lte: new Date(endMonth),
                        },
                    },
                });
                return { name: item?.name, count: data };
            });
            results = await Promise.all(counts);
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

            const counts = status?.map(async (item: any, i: number) => {
                const data = await prisma.lead.count({
                    where: {
                        statusId: item?.id,
                        processId: parseInt(id),
                        saleDate: {
                            gte: new Date(startYear),
                            lte: new Date(endYear),
                        },
                    },
                });
                return { name: item?.name, count: data };
            });
            results = await Promise.all(counts);
        }

        if (time == "monthly") {
            const process = await prisma.lead.findMany({
                select: { status: true, saleDate: true },
                where: { processId: parseInt(id) },
            });
            const grouped = groupBy(process, (record: any) =>
                record.saleDate.toISOString().slice(5, 7)
            );
            const processData = Object?.entries(grouped);

            let graphData: any[] = [];
            processData?.map((item) => {
                let success = 0;
                let pending = 0;
                let cancelled = 0;
                const index = parseInt(item[0] as string);
                const internalArray = item[1] as Array<{
                    status: {
                        id: number;
                        name: string;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                    saleDate: Date;
                }>;
                internalArray.forEach((element) => {
                    if (element?.status?.name === "pending") pending++;
                    if (element?.status?.name === "success") success++;
                    if (element?.status?.name === "cancelled") cancelled++;
                    graphData[index - 1] = {
                        pending,
                        success,
                        cancelled,
                    };
                });
            });
            results = graphData;
        }

        res.send(results);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const deleteProcess = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const process = await prisma.process.delete({
            where: { id: parseInt(id) },
        });
        res.send(process);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const queryProcess = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const process = await prisma.lead.findMany({
            select: { status: true, saleDate: true },
        });
        const status = await prisma.status.findMany({
            orderBy: { createdAt: "desc" },
        });

        const grouped = groupBy(process, (record: any) =>
            record.saleDate.toISOString().slice(5, 7)
        );

        const processData = Object?.entries(grouped);
        res.send(processData);

        let result;

        // const datad = timeArr?.map((item) => {
        //     result = status?.map(async (item) => {
        //         const count = await prisma.lead.count({
        //             where: { statusId: item?.id },
        //         });
        //         return { name: item?.name, count };
        //     });
        // });

        result = timeArr?.map(async (item) => {
            // const count = await prisma.lead.groupBy({
            //     by: ["statusId"],
            //     _count: { statusId: true },
            //     where: {
            //         saleDate: { gte: item?.startDate, lte: item?.endDate },
            //     },
            // });
            // const count = await prisma.lead.findMany({
            //     include: { status: { select: { name: true } } },
            //     where: {
            //         saleDate: { gte: item?.startDate, lte: item?.endDate },
            //     },
            // });
            // const count = await prisma.lead.findMany({
            //     select: { firstName: true },
            //     where: {
            //         saleDate: { gte: item?.startDate, lte: item?.endDate },
            //     },
            //     include:{}
            // });
            // const count =
            //     await prisma.$queryRaw`select * from lead where saleDate between ${item?.startDate} and ${item?.endDate}`;
            // return count;
        });

        // const data = await Promise.all(result);
        // console.log(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
