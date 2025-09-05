import {
    adminLinks,
    superAdminLinks,
    PUSHER_SECRET,
    PUSHER_CLUSTER,
} from "../../../constants/appConstant";

import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllNotifs } from "../../../api/notifications";
import NotificationToast from "../../NotificationToast/NotificationToast";
import toast from "react-hot-toast";
import Pusher from "pusher-js";
import { axiosInstance } from "../../../lib/axiosInstance";

const Sidebar = () => {
    const { user, setUser } = useContext(AuthContext);

    const {
        data: notif,
        isSuccess,
        isRefetching,
    } = useQuery({
        queryKey: ["notif", user?.id],
        queryFn: () => getAllNotifs(user?.id!),
    });

    const [_, setLength] = useState(0);

    useEffect(() => {
        setLength(notif?.length);
    }, [isSuccess, isRefetching]);

    const handleLogout = async () => {
        await axiosInstance.post(`/auth/logout`);
        localStorage.removeItem("authUser");
        setUser(null);
        // window.location.href = "http://localhost:4000/login";
    };

    useEffect(() => {
        const pusher = new Pusher(PUSHER_SECRET, {
            cluster: PUSHER_CLUSTER,
        });
        const channel = pusher.subscribe("lead");
        channel.bind(`status-change-${user?.id}`, (data: any) => {
            setLength((prev: number) => prev + 1);
            toast.custom(<NotificationToast data={data?.notif} />, {
                duration: 10 * 1000,
            });
        });

        return () => {
            pusher.unsubscribe("lead");
        };
    }, []);

    return (
        <div className="w-full py-4 ps-8 text-white h-full">
            <div className="flex flex-col justify-between h-full relative">
                <div>
                    <div>
                        <Link to={"/"}>
                            <img
                                src="/app/fv-logo.png"
                                alt=""
                                className="cursor-pointer hover:scale-105 transition duration-300"
                            />
                        </Link>
                    </div>
                    {user?.role === "admin" && (
                        <div className="my-10 space-y-1">
                            {adminLinks?.map((item) => (
                                <NavLink
                                    to={item.link}
                                    key={item.id}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "cursor-pointer flex gap-2 items-center bg-white text-blue-700 font-semibold px-5 rounded-md py-1.5"
                                            : "cursor-pointer flex gap-2 items-center hover:bg-white/80 hover:text-blue-800 hover:font-semibold hover:px-5 transition-all duration-300 rounded-md py-1.5 px-2"
                                    }
                                >
                                    {item.icon}
                                    {item.title}
                                </NavLink>
                            ))}
                        </div>
                    )}
                    {user?.role === "superadmin" && (
                        <div className="my-10 mb-14 space-y-1 h-[22.5rem] overflow-y-scroll sidebar">
                            {superAdminLinks?.map((item) => (
                                <NavLink
                                    to={item.link}
                                    key={item.id}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "cursor-pointer flex gap-2 items-center bg-white text-blue-700 font-semibold px-5 rounded-md py-1.5"
                                            : "cursor-pointer flex gap-2 items-center hover:bg-white/80 hover:text-blue-800 hover:font-semibold hover:px-5 transition-all duration-300 rounded-md py-1.5 px-2"
                                    }
                                >
                                    {item.icon}
                                    {item.title}
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>
                <div className="absolute bottom-0 bg-white rounded-md w-full text-blue-700 p-2 hover:-translate-y-1 transition duration-300">
                    <div className="flex gap-1.5 items-center">
                        <img
                            src="/app/profile.png"
                            alt=""
                            className="w-10 h-10 rounded-full border border-slate-300"
                        />
                        <div>
                            <p>{user?.email}</p>
                            <p className="capitalize">({user?.role})</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-blue-700 w-full text-white cursor-pointer rounded-md mt-2 py-1 "
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
