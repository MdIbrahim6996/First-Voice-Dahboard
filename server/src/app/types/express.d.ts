interface User {
    id: number;
    email: string;
    name: string;
    employeeId: string;
    phone: string;
    isBlocked: boolean;
    role: string;
}

declare namespace Express {
    export interface Request {
        user?: User | null; // Add user to the Request interface
    }
}
