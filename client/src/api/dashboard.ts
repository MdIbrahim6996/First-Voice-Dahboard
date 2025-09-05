import axios from "axios";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const getDailyLeadCount = async (userId: number) => {
    try {
        const { data } = await axiosInstance.get(`/user/dashboard/${userId}`);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message, {
                id: "getDailyLeadCount",
            });
        }
        return error;
    }
};
