import jwt from "jsonwebtoken";

//Paste secret key from .env
export const generateAuthToken = (id: string, role: string) => {
    return jwt.sign({ id, role }, "fsdfsdf", { expiresIn: "24h" });
};
