import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import bcrypt from "bcrypt";

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, email, employeeId, phone, password, isBlocked, role } =
        req.body;

    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
        throw new Error("User Already Exist.");
    }
    const hanshedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hanshedPassword,
            employeeId,
            phone,
            role,
            isBlocked,
        },
    });
    res.send(user);
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getAllUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const users = await prisma.user.findMany();
    res.send(users);
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getSingleUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const user = await prisma.user.findFirst({ where: { id: parseInt(id) } });
    res.send(user);
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.send("updateUser");
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const user = await prisma.user.delete({ where: { id: parseInt(id) } });
    res.send(user);
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
