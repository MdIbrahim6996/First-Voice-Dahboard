import axios from "axios";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

// SUPERADMIN
export const createHoliday = async (formData: any) => {
    try {
        const { data } = await axiosInstance.post(`/superadmin/holiday`, {
            ...formData,
        });
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message, {
                id: "createHoliday",
            });
        }
        return error;
    }
};

// SUPERADMIN
export const updateHoliday = async (formData: any) => {
    try {
        const { data } = await axiosInstance.put(
            `/superadmin/holiday/${formData?.id}`,
            {
                ...formData,
            }
        );
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message, {
                id: "updateHoliday",
            });
        }
        return error;
    }
};

// SUPERADMIN
export const getAllHoliday = async (
    title: string,
    startDate: string,
    endDate: string
) => {
    try {
        const { data } = await axiosInstance.get(
            `/superadmin/holiday?title=${title}&startDate=${startDate}&endDate=${endDate}`
        );
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message, {
                id: "getAllHoliday",
            });
        }
        return error;
    }
};

// SUPERADMIN
export const deleteHoliday = async (id: number) => {
    try {
        const { data } = await axiosInstance.delete(
            `/superadmin/holiday/${id}`
        );
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message, {
                id: "deleteHoliday",
            });
        }
        return error;
    }
};

// USER
export const getAllUserHoliday = async () => {
    try {
        const { data } = await axiosInstance.get(`/user/holiday`);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message, {
                id: "getAllUserHoliday",
            });
        }
        return error;
    }
};
