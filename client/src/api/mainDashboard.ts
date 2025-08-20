import axios from "axios";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const getTopSellers = async () => {
    try {
        const { data } = await axiosInstance.get(
            `/superadmin/main-dashboard/seller`
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
export const getProcessLeadCount = async () => {
    try {
        const { data } = await axiosInstance.get(
            `/superadmin/main-dashboard/process-lead-count`
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
