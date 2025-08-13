import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            name,
            alias,
            email,
            employeeId,
            phone,
            password,
            block,
            role,
            process,
        } = req.body;

        const existingUser = await prisma.user.findFirst({ where: { email } });
        if (existingUser) {
            throw new Error("User With This Email Already Exist.");
        }

        const existingUserwithEmployeeId = await prisma.user.findFirst({
            where: { employeeId },
        });
        if (existingUserwithEmployeeId) {
            throw new Error("User With This Employee ID Already Exist.");
        }

        const existingUserwithAlias = await prisma.user.findFirst({
            where: { alias },
        });
        if (existingUserwithAlias) {
            throw new Error("User With This Alias Already Exist.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                employeeId,
                phone,
                role,
                isBlocked: block === "false" ? false : true,
                alias,
                processId: parseInt(process),
            },
        });
        res.send(user);
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
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
    });
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
    const { id } = req.params;
    console.log(id);
    const {
        name,
        alias,
        email,
        employeeId,
        phone,
        password,
        block,
        role,
        process,
    } = req.body;
    try {
        const existingUser = await prisma.user.findFirst({ where: { email } });
        if (!existingUser) {
            throw new Error("User Doesn't Exist.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                name,
                email,
                password: hashedPassword,
                employeeId,
                phone,
                role,
                isBlocked: block === "false" ? false : true,
                alias,
                processId: parseInt(process),
            },
        });
        res.send(user);
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
