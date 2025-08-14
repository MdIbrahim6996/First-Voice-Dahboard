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
