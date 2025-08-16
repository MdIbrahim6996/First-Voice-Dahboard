import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import { groupBy } from "lodash";

export const createPlan = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, process } = req.body;

        const plan = await prisma.plan.create({
            data: { name, processId: parseInt(process) },
        });
        res.send(plan);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getAllPlan = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const plan = await prisma.plan.findMany({
            include: { process: { select: { id: true, name: true } } },
        });
        res.send(plan);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getPlanInfo = async (
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
                        planId: parseInt(id),
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
                        planId: parseInt(id),
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
                where: { planId: parseInt(id) },
            });
            const grouped = groupBy(process, (record: any) =>
                record.saleDate.toISOString().slice(5, 7)
            );
            const planData = Object?.entries(grouped);

            let graphData: any[] = [];
            planData?.map((item) => {
                let success = 0;
                let pending = 0;
                let cancelled = 0;
                let rework = 0;
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
                    if (element?.status?.name === "rework/warmup") rework++;
                    graphData[index - 1] = {
                        pending,
                        success,
                        cancelled,
                        rework,
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
export const deletePlan = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        console.log("dfsdf");
        const leadIds = await prisma.lead.findMany({
            where: { planId: parseInt(id) },
            select: {
                id: true,
            },
        });

        console.log(leadIds);

        const deletedPlan = await prisma.plan.delete({
            where: { id: parseInt(id) },
        });

        // const plan = await prisma.plan.delete({
        //     where: { id: parseInt(id) },
        // });
        res.send(deletedPlan);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
