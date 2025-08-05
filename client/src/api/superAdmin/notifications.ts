import axios from "axios";
import { SERVER_URL } from "../../constants/apiConstant";

export const getAllNotifs = async (userId: number) => {
    try {
        const { data } = await axios.get(
            `${SERVER_URL}/superadmin/notification/${userId}`,
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteNotifs = async (userId: number, id: number) => {
    try {
        const { data } = await axios.delete(
            `${SERVER_URL}/notification/${userId}/${id}`
        );
        return data;
    } catch (error) {
        console.log(error);
    }
};
