import axios from "axios";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const createPlan = async (formData: any) => {
    try {
        const { data } = await axiosInstance.post(`/plan`, {
            ...formData,
        });
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }
        return error;
    }
};
export const getAllPlan = async () => {
    try {
        const { data } = await axiosInstance.get(`/plan`);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }
        return error;
    }
};
export const getPlanInfo = async (id: number, time: string) => {
    try {
        const { data } = await axiosInstance.get(`/plan/${id}?time=${time}`);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }
        return error;
    }
};
export const deletePlan = async (id: number) => {
    try {
        const { data } = await axiosInstance.delete(`/plan/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }
        return error;
    }
};
