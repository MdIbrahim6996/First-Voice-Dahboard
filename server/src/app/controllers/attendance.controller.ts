import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import groupBy from "lodash/groupBy";
import { Prisma } from "@prisma/client";

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

    if (currentDate === existingAttendance[0]?.dateTime?.getDate()) {
      throw new Error("Your Attendance has already been marked.");
    }

    // const timeA = new Date();
    // const isLate = timeA.getUTCHours() > 9 ? true : false;

    const currentUTCTime = new Date();
    const timeToCompare = new Date();
    const isLate =
      currentUTCTime > new Date(timeToCompare.setUTCHours(9, 15, 0, 0))
        ? true
        : false;
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

    res.send({ message: "Attendance Marked Successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const getEmployeeAttendance = async (
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

    res.send({ message: "Attendance Marked Successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const getUserAllAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("attenance");
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
export const getEmployeePeriodwiseAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { period } = req.query;
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

    const attendanceData = Object?.values(grouped);
    res.send(attendanceData[0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const getEmployeeMonthlyAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const user = await prisma.user.findMany({
    //     include: {
    //         _count: {
    //             select: {
    //                 attendances: {
    //                     where: {
    //                         dateTime: { gte: new Date("2025-07-01") },
    //                     },
    //                 },
    //             },
    //         },
    //     },

    // });

    // const userAttendance = await prisma.attendance.findMany({
    //     where: { userId: parseInt(id) },
    //     orderBy: { dateTime: "desc" },
    // });
    // const grouped = groupBy(userAttendance, (record) =>
    //     record.dateTime.toISOString().slice(5, 7)
    // );

    // const attendanceData = Object?.values(grouped);
    // console.log(attendanceData);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const {
      year = currentYear,
      month = currentMonth,
      name = undefined,
    } = req.query;

    const attendance = await prisma.attendance.groupBy({
      by: ["userId"],
      _count: { _all: true },
      where: {
        userId: { not: null },
        dateTime: {
          gte: new Date(`${year}-${parseInt(month as string) + 1}-01`),
          lt: new Date(`${year}-${parseInt(month as string) + 2}-01`),
        },
        user: { name: name ? String(name) : Prisma.skip },
      },
    });
    const isLateCount = await prisma.attendance.groupBy({
      by: ["userId"],
      _count: { _all: true },
      where: {
        userId: { not: null },
        isLate: true,
        dateTime: {
          gte: new Date(`${year}-${parseInt(month as string) + 1}-01`),
          lt: new Date(`${year}-${parseInt(month as string) + 2}-01`),
        },
        user: { name: name ? String(name) : Prisma.skip },
      },
    });
    const onTimeCount = await prisma.attendance.groupBy({
      by: ["userId"],
      _count: { _all: true },
      where: {
        userId: { not: null },
        isLate: false,
        dateTime: {
          gte: new Date(`${year}-${parseInt(month as string) + 1}-01`),
          lt: new Date(`${year}-${parseInt(month as string) + 2}-01`),
        },
        user: { name: name ? String(name) : Prisma.skip },
      },
    });

    const userData = await prisma.user.findMany({
      where: {
        id: {
          in: attendance.map((item) => (item.userId ? item?.userId : 0)),
        },
      },
      select: { id: true, name: true },
    });
    res.send({ attendance, isLateCount, onTimeCount, userData });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, startDate, endDate } = req.query;
  try {
    const attendances = await prisma.attendance.findMany({
      orderBy: { dateTime: "desc" },
      include: { user: { select: { name: true } } },
      where: {
        user: { name: name ? (name as string) : Prisma.skip },
        userId: { not: null },
        dateTime: {
          gte: startDate ? new Date(startDate as string) : Prisma.skip,
          lte: endDate ? new Date(endDate as string) : Prisma.skip,
        },
      },
    });
    res.send(attendances);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
