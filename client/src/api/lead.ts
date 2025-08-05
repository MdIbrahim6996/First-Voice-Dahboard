import axios from "axios";
import { SERVER_URL } from "../constants/apiConstant";

export const createLead = async (formData: any) => {
    try {
        const { data } = await axios.post(`${SERVER_URL}/lead`, {
            ...formData,
        });
        return data;
    } catch (error) {
        console.log(error);
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
    }
};
export const getAllLeadOfUser = async (
    userId: number,
    status: number,
    saleDate: string,
    fromDate: string,
    toDate: string
) => {
    try {
        const { data } = await axios.get(
            `${SERVER_URL}/lead/${userId}?status=${status}&saleDate=${saleDate}&fromDate=${fromDate}&toDate=${toDate}`
        );
        return data;
    } catch (error) {
        console.log(error);
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
    }
};
