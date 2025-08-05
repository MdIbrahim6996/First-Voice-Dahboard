import { NextFunction, Request, Response } from "express";

export const createMainDashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.send("create main");
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getAllMainDashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.send("get all main");
    } catch (error) {
        console.log(error);
        next(error);
    }
};
