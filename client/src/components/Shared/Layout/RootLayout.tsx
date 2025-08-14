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

    const getSingleUser = async (id: number) => {
        try {
            const { data } = await axiosInstance.get(`/user/profile/${id}`);
            return data;
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                toast.error(error?.response?.data?.message);
                if (error?.response?.status === 401) {
                    handleLogout();
                    window.location.href = "/token-expired";
                }
            }
            return error;
        }
    };

    //@ts-ignore
    const { data: profile = [], refetch } = useQuery({
        queryKey: ["userprofile"],
        queryFn: () => getSingleUser(user?.user?.id!),
    });

    useEffect(() => {
        if (!user) navigate("/login");
        // else if (user?.user?.role === "user") navigate("/user");
        // else if (user?.user?.role === "admin") navigate("/admin");
    }, []);

    useEffect(() => {
        refetch();
    });
    useEffect(() => {
        if (user?.user?.role === "user" || user?.user?.role === "closer")
            navigate("/user");
        else if (user?.user?.role === "admin") navigate("/admin");
        else if (user?.user?.role === "superadmin") navigate("/superadmin");
    }, []);
    return (
        <>
            <ErrorBoundary FallbackComponent={() => <FallbackRenderer />}>
                {user && (
                    <div className="bg-blue-700 h-screen max-w-screen flex gap-3 gradient-backgroun">
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
