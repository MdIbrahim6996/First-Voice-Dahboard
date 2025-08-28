import { Request, Response, NextFunction } from "express";
import { prisma } from "../../lib/prismaClient";

export const createUserAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user!;
  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) throw new Error("User doesn't exist.");

    // const dateObject = new Date().toLocaleString("en-US", {
    //     timeZone: "Asia/Kolkata",
    // });
    const date = new Date();
    const currentDate = date.getDate();

    const existingAttendance = await prisma.attendance.findMany({
      where: { userId: id },
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
      currentUTCTime > new Date(timeToCompare.setUTCHours(9, 0, 0, 0))
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
      data: { userId: id, isLate },
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
  const { id } = req.user!;
  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) throw new Error("User doesn't exist.");

    const attendance = await prisma.attendance.findMany({
      where: { userId: id },
      orderBy: { dateTime: "desc" },
    });

    res.render("pages/attendance", {
      currentPath: "/user/attendance",
      attendance,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
