import { NextFunction, Request, Response } from "express";

export const createDailyLeadCount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.params;
    res.send("createDashboard");
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getDailyLeadCount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.send("getAllDashboard");
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getSingleDashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.send("getSingleDashboard");
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const updateDashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.send("updateDashboard");
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const deleteDashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.send("deleteDashboard");
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
