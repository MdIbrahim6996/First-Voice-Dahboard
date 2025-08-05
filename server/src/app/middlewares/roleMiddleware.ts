import { Request, Response, NextFunction } from "express";

export const isSuperAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = req.user;
        if (user?.role !== "superadmin")
            throw new Error("Access Denied. Super Admin Route!");
        else next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const isAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = req.user;
        if (user?.role !== "admin" || "superadmin")
            throw new Error("Access Denied. Admin Route!");
        else next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const isUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.send("isUser");
    next();
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
