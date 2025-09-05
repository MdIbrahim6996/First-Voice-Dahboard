import axios from "axios";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axiosInstance";

// SUPERADMIN
export const getAllAttendance = async (
    name: string,
    startDate: string,
    endDate: string
) => {
    try {
        const { data } = await axiosInstance.get(
            `/superadmin/attendance?name=${name}&startDate=${startDate}&endDate=${endDate}`
        );
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message, {
                id: "getAllAttendance",
            });
        }
        return error;
    }
};

// USER
export const createEmployeeAttendance = async (id: number) => {
    try {
        const { data } = await axiosInstance.post(`/user/attendance/${id}`);
        if (data?.message) {
            toast.success(data?.message);
        }
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message, {
                id: "createEmployeeAttendance",
            });
        }
        return error;
    }
};

export const getEmployeeAttendance = async (id: number) => {
    try {
        const { data } = await axiosInstance.get(`/attendance/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message, {
                id: "getEmployeeAttendance",
            });
        }
        return error;
    }
};
