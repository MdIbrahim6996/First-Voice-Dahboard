import { NextFunction, Request, Response } from "express";

export const notFound = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const message = err.message || "Something Went Wrong!!!";

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
