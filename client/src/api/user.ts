import { SERVER_URL } from "../constants/apiConstant";
import { axiosInstance } from "../lib/axiosInstance";

export const createUser = async (formData: any) => {
    try {
        const { data } = await axiosInstance.post(`${SERVER_URL}/user`, {
            ...formData,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllUser = async () => {
    try {
        const { data } = await axiosInstance.get(`${SERVER_URL}/user`);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getSingleUser = async (id: number) => {
    try {
        const { data } = await axiosInstance.get(`/user/${id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getUserInfo = async (id: number, time: string) => {
    try {
        const { data } = await axiosInstance.get(
            `${SERVER_URL}/user/profile/${id}?time=${time}`
        );
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const deleteUser = async (id: number) => {
    try {
        const { data } = await axiosInstance.delete(`${SERVER_URL}/user/${id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
};
