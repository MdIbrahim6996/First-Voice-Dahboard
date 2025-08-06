import axios from "axios";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const createHoliday = async (formData: any) => {
    try {
        const { data } = await axiosInstance.post(`/holiday`, {
            ...formData,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllHoliday = async () => {
    try {
        const { data } = await axiosInstance.get(`/holiday`);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllUserHoliday = async () => {
    try {
        const { data } = await axiosInstance.get(`/user/holiday`);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }
        return error;
    }
};
export const deleteHoliday = async (id: number) => {
    try {
        const { data } = await axiosInstance.delete(`/holiday/${id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
};
