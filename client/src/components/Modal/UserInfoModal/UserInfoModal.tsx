import { motion } from "motion/react";
import { useState } from "react";
import ProfileComp from "./elements/ProfileComp";
import NotificationComp from "./elements/NotificationComp";
import AttendanceComp from "./elements/AttendanceComp";

const UserInfoModal = ({
    handleClose,
    userId,
}: {
    handleClose: () => void;
    userId: number;
}) => {
    const [selectedTab, setSelectedTab] = useState("profile");

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <motion.div
                initial={{ opacity: 0.5, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg w-full max-w-5xl overflow-y-scroll max-h-[90vh]"
            >
                <div className="">
                    <p className="bg-gray-200 py-2 px-6 text-xl">
                        View User Info
                    </p>
                </div>

                <div className="px-4 py-2">
                    <div>
                        <div className="border border-slate-200 bg-slate-200 shadow-2xl rounded-md flex justify-between items-center">
                            <button
                                onClick={() => setSelectedTab("profile")}
                                className={`
                                ${
                                    selectedTab === "profile"
                                        ? "bg-white font-[500]"
                                        : "bg-slate-200"
                                }
                                 rounded-md flex-1 text-center capitalize m-1 cursor-pointer hover:font-[500]`}
                            >
                                profile
                            </button>
                            <button
                                onClick={() => setSelectedTab("attendance")}
                                className={`${
                                    selectedTab === "attendance"
                                        ? "bg-white font-[500]"
                                        : "bg-slate-200"
                                } rounded-md flex-1 text-center capitalize m-1 cursor-pointer hover:font-[500]`}
                            >
                                attendance
                            </button>
                            <button
                                onClick={() => setSelectedTab("notifications")}
                                className={` ${
                                    selectedTab === "notifications"
                                        ? "bg-white font-[500]"
                                        : "bg-slate-200"
                                } rounded-md flex-1 text-center capitalize m-1 cursor-pointer hover:font-[500]`}
                            >
                                notifications
                            </button>
                        </div>
                    </div>
                </div>

                {selectedTab === "profile" && <ProfileComp userId={userId} />}

                {selectedTab === "attendance" && (
                    <AttendanceComp userId={userId} />
                )}
                {selectedTab === "notifications" && (
                    <NotificationComp userId={userId} />
                )}
                <div className="p-4 px-6 text-center">
                    <button
                        onClick={handleClose}
                        className="w-full cursor-pointer border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default UserInfoModal;
