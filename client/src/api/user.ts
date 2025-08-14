import axios from "axios";
import { SERVER_URL } from "../constants/apiConstant";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

//SUPERADMIN
export const createUser = async (formData: any) => {
    try {
        const { data } = await axiosInstance.post(
            `${SERVER_URL}/superadmin/user`,
            {
                ...formData,
            }
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
//SUPERADMIN
export const updateUser = async (formData: any) => {
    try {
        const { data } = await axiosInstance.put(
            `${SERVER_URL}/superadmin/user/${formData?.id}`,
            {
                ...formData,
            }
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
//SUPERADMIN
export const getAllUser = async () => {
    try {
        const { data } = await axiosInstance.get(
            `${SERVER_URL}/superadmin/user`
        );
        return data;
    } catch (error) {
        console.log(error);
    }
};
//SUPERADMIN
export const deleteUser = async (id: number) => {
    try {
        const { data } = await axiosInstance.delete(
            `${SERVER_URL}/superadmin/user/${id}`
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
// USER
export const getUserInfo = async (id: number, time: string) => {
    try {
        const { data } = await axiosInstance.get(
            `${SERVER_URL}/user/profile/${id}?time=${time}`
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
// USER
export const getProfileCardInfo = async (id: number) => {
    try {
        const { data } = await axiosInstance.get(
            `${SERVER_URL}/user/profile/card/${id}`
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
// USER
export const getAllUserforUsers = async () => {
    try {
        const { data } = await axiosInstance.get(`${SERVER_URL}/user/user`);
        return data;
    } catch (error) {
        console.log(error);
    }
};
