import axios from "axios";
import { SERVER_URL } from "../constants/apiConstant";

export const createProcess = async (formData: any) => {
    try {
        const { data } = await axios.post(`${SERVER_URL}/process`, {
            ...formData,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllProcess = async () => {
    try {
        const { data } = await axios.get(`${SERVER_URL}/process`);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getProcessInfo = async (id: number, time: string) => {
    try {
        const { data } = await axios.get(
            `${SERVER_URL}/process/${id}?time=${time}`
        );
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteProcess = async (id: number) => {
    try {
        const { data } = await axios.delete(`${SERVER_URL}/process/${id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
};
