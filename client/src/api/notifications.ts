import axios from "axios";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axiosInstance";

export const getAllNotifs = async (userId: number) => {
    try {
        const { data } = await axiosInstance.get(
            `/user/notification/${userId}`
        );
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }

        return error;
    }
};

export const deleteNotifs = async (userId: number, id: number) => {
    try {
        const { data } = await axiosInstance.delete(
            `/user/notification/${userId}/${id}`
        );
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }
        return error;
    }
};
