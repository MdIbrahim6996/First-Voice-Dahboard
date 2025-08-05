import axios from "axios";
import { SERVER_URL } from "../constants/apiConstant";
import { axiosInstance } from "../lib/axiosInstance";

export const createHoliday = async (formData: any) => {
    try {
        const { data } = await axios.post(`${SERVER_URL}/holiday`, {
            ...formData,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllHoliday = async () => {
    try {
        const { data } = await axios.get(`${SERVER_URL}/holiday`);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllUserHoliday = async () => {
    try {
        const { data } = await axiosInstance.get(`${SERVER_URL}/user/holiday`);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const deleteHoliday = async (id: number) => {
    try {
        const { data } = await axios.delete(`${SERVER_URL}/holiday/${id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
};
