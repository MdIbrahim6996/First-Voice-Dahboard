import axios from "axios";
import { SERVER_URL } from "../constants/apiConstant";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const createLead = async (formData: any) => {
    try {
        const { data } = await axios.post(`${SERVER_URL}/lead`, {
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
export const updateLead = async (formData: any) => {
    try {
        const { data } = await axios.put(`${SERVER_URL}/lead/${formData?.id}`, {
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
export const deleteLead = async (id: number) => {
    try {
        const { data } = await axios.delete(`${SERVER_URL}/lead/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        }
        return error;
    }
};

//User
export const getAllLeadOfUser = async (
    userId: number,
    status: number,
    saleDate: string,
    fromDate: string,
    toDate: string
) => {
    try {
        const { data } = await axiosInstance.get(
            `${SERVER_URL}/user/lead/${userId}?status=${status}&saleDate=${saleDate}&fromDate=${fromDate}&toDate=${toDate}`
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
export const getAllLead = async (
    status: number,
    process: number,
    saleDate: string,
    fromDate: string,
    toDate: string
) => {
    try {
        const { data } = await axios.get(
            `${SERVER_URL}/lead?status=${status}&process=${process}&saleDate=${saleDate}&fromDate=${fromDate}&toDate=${toDate}`
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
