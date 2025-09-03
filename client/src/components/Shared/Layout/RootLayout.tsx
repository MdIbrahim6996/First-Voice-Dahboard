import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/authContext";
import { ErrorBoundary } from "react-error-boundary";
import FallbackRenderer from "../FallbackRenderer/FallbackRenderer";
import { axiosInstance } from "../../../lib/axiosInstance";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const RootLayout = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("authUser");
        setUser(null);
    };

    const getUserDetail = async () => {
        try {
            const { data } = await axiosInstance.get(`/common/user-detail`);
            return data;
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                toast.error(error?.response?.data?.message);
                if (error?.response?.status === 401) {
                    handleLogout();
                    window.location.href = "http://localhost:4000/login";
                }
            }
            return error;
        }
    };

    //@ts-ignore
    const {
        data: userDetail = [],
        refetch,
        isSuccess,
    } = useQuery({
        queryKey: ["user-detail"],
        queryFn: getUserDetail,
    });
    console.log("userdetail", userDetail);

    if (isSuccess) {
        setUser(userDetail);
        localStorage.setItem("authUser", JSON.stringify(userDetail));
    }

    useEffect(() => {
        refetch();
    });
    useEffect(() => {
        if (user?.role === "admin") navigate("/admin");
        else if (user?.role === "superadmin") navigate("/superadmin");
    }, []);
    return (
        <>
            <ErrorBoundary FallbackComponent={() => <FallbackRenderer />}>
                {user && (
                    <div className="bg-blue-700 h-screen max-w-screen flex gap-3">
                        <div className="min-w-[17rem] max-w-[17rem] sidebar">
                            <Sidebar />
                        </div>
                        <div className="w-full m-2 rounded-xl bg-white overflow-scroll sidebar">
                            <Outlet />
                        </div>
                    </div>
                )}
            </ErrorBoundary>
        </>
    );
};

export default RootLayout;
