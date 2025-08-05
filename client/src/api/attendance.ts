import axios from "axios";
import { SERVER_URL } from "../constants/apiConstant";
import toast from "react-hot-toast";

export const createEmployeeAttendance = async (id: number) => {
    try {
        const { data } = await axios.post(`${SERVER_URL}/attendance/${id}`);
        if (data?.message) {
            toast.success(data?.message);
        }
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }
        return error;
    }
};
export const getEmployeeAttendance = async (id: number) => {
    try {
        const { data } = await axios.get(`${SERVER_URL}/attendance/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }
        return error;
    }
};
export const getAllAttendance = async () => {
    try {
        const { data } = await axios.get(`${SERVER_URL}/attendance`);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }
        return error;
    }
};
