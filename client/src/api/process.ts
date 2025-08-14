import axios from "axios";
import { SERVER_URL } from "../constants/apiConstant";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

// SUPERADMIN
export const createProcess = async (formData: any) => {
    try {
        const { data } = await axiosInstance.post(
            `${SERVER_URL}/superadmin/process`,
            {
                ...formData,
            }
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

// SUPERADMIN
export const getAllProcess = async () => {
    try {
        const { data } = await axiosInstance.get(
            `${SERVER_URL}/superadmin/process`
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

// SUPERADMIN
export const getProcessInfo = async (id: number, time: string) => {
    try {
        const { data } = await axiosInstance.get(
            `${SERVER_URL}/superadmin/process/${id}?time=${time}`
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

// SUPERADMIN
export const deleteProcess = async (id: number) => {
    try {
        const { data } = await axiosInstance.delete(
            `${SERVER_URL}/superadmin/process/${id}`
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

// USER
export const getAllProcessforUser = async () => {
    try {
        const { data } = await axiosInstance.get(
            `${SERVER_URL}/user/process`
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