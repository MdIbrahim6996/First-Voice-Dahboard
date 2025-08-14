import axios from "axios";
import { SERVER_URL } from "../constants/apiConstant";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axiosInstance";

// SUPERADMIN
export const getEmployeeMonthlyAttendance = async (
    year: number,
    month: number,
    name: string | undefined
) => {
    try {
        const url = name
            ? `${SERVER_URL}/superadmin/attendance/monthly?year=${year}&month=${month}&name=${name}`
            : `${SERVER_URL}/superadmin/attendance/monthly?year=${year}&month=${month}`;
        const { data } = await axiosInstance.get(url);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }
        return error;
    }
};

export const getSingleEmployeeEveryAttendance = async (id: number) => {
    try {
        const { data } = await axiosInstance.get(
            `${SERVER_URL}/user/attendance/${id}`
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
export const getUserMonthWiseAttendance = async (id: number) => {
    try {
        const { data } = await axiosInstance.get(
            `${SERVER_URL}/user/profile/${id}/yearly`
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
