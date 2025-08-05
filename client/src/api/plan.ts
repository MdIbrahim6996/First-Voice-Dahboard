import axios from "axios";
import { SERVER_URL } from "../constants/apiConstant";

export const createPlan = async (formData: any) => {
    try {
        const { data } = await axios.post(`${SERVER_URL}/plan`, {
            ...formData,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllPlan = async () => {
    try {
        const { data } = await axios.get(`${SERVER_URL}/plan`);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getPlanInfo = async (id: number, time: string) => {
    try {
        const { data } = await axios.get(
            `${SERVER_URL}/plan/${id}?time=${time}`
        );
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const deletePlan = async (id: number) => {
    try {
        const { data } = await axios.delete(`${SERVER_URL}/plan/${id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
};
