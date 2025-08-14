import axios from "axios";
import { SERVER_URL } from "../constants/apiConstant";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axiosInstance";

// SUPERADMIN
export const createStatus = async (formData: any) => {
    try {
        const { data } = await axiosInstance.post(
            `${SERVER_URL}/superadmin/status`,
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
export const getAllStatus = async () => {
    try {
        const { data } = await axiosInstance.get(
            `${SERVER_URL}/superadmin/status`
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
export const editStatus = async (id: number, formData: any) => {
    try {
        const { data } = await axiosInstance.put(
            `${SERVER_URL}/superadmin/status/${id}`,
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
export const deleteStatus = async (id: number) => {
    try {
        const { data } = await axiosInstance.delete(
            `${SERVER_URL}/superadmin/status/${id}`
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
export const getAllStatusforUser = async () => {
    try {
        const { data } = await axiosInstance.get(`${SERVER_URL}/user/status`);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }
        return error;
    }
};
