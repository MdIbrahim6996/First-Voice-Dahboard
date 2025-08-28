import e, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prismaClient";
import { generateAuthToken } from "../utils/token";

export const registerController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password, role, name } = req.body;
        const existingUser = await prisma.user.findFirst({ where: { email } });
        if (existingUser) {
            throw new Error("User Already Exist.");
        }

        const hanshedPassword = await bcrypt.hash(password, 10);
        // const user = await prisma.user.create({
        //     data: { email, password: hanshedPassword, role, name },
        // });
        res.send("user");
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const loginController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;
    try {
        const existingUser = await prisma.user.findFirst({
            where: { email },
        });
        if (!existingUser) {
            throw new Error("User Does not Exist.");
        }

        if (existingUser?.isBlocked) {
            res.status(401);
            throw new Error("You Have Been Blocked By Admin.");
        }
        const matchedPassword = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (matchedPassword) {
            const token = generateAuthToken(
                String(existingUser?.id),
                existingUser.role
            );

            const { password, ...userData } = existingUser;
            // if (existingUser?.role === "user") {
            //     res.json({
            //         success: true,
            //         redirectUrl: "http://localhost:4000/user",
            //     });
            // }

            return res
                .cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 12 * 60 * 60 * 1000,
                })
                .send({ user: userData });
        } else {
            throw new Error("Invalid Credentials.");
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const logoutController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.clearCookie("token");
    res.send({ msg: "logout success" });
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
