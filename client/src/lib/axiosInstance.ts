import axios from "axios";
import { SERVER_URL } from "../constants/apiConstant";

export const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
