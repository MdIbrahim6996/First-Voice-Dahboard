import axios from "axios";
import { SERVER_URL } from "../constants/apiConstant";
import toast from "react-hot-toast";

export const createStatus = async (formData: any) => {
    try {
        const { data } = await axios.post(`${SERVER_URL}/status`, {
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
export const getAllStatus = async () => {
    try {
        const { data } = await axios.get(`${SERVER_URL}/status`);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }
        return error;
    }
};
export const editStatus = async (id: number, formData: any) => {
    try {
        const { data } = await axios.put(`${SERVER_URL}/status/${id}`, {
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
export const deleteStatus = async (id: number) => {
    try {
        const { data } = await axios.delete(`${SERVER_URL}/status/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }
        return error;
    }
};
