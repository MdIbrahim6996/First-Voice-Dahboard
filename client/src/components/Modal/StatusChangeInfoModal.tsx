import { motion } from "motion/react";
import type { StatusChangeReason } from "../../types/app.types";

const StatusChangeInfoModal = ({ item, handleClose }: StatusChangeReason) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <motion.div
                initial={{ opacity: 0.5, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg w-full max-w-xl  overflow-hidden"
            >
                <div className="">
                    <p className="bg-gray-200 py-2 px-6 text-xl">
                        Change In Status Information.
                    </p>
                </div>

                <div className="px-4 py-2">
                    <div>
                        {item?.map((unit) => (
                            <div className="my-3 border border-slate-400 rounded-md p-2">
                                <p>
                                    <span
                                        className={`${
                                            unit?.fromStatus.toLowerCase() ===
                                            "success"
                                                ? "bg-green-500"
                                                : ""
                                        } ${
                                            unit?.fromStatus.toLowerCase() ===
                                            "cancelled"
                                                ? "bg-red-500"
                                                : ""
                                        } ${
                                            unit?.fromStatus.toLowerCase() ===
                                            "pending"
                                                ? "bg-yellow-500"
                                                : ""
                                        } ${
                                            unit?.fromStatus.toLowerCase() ===
                                            "rework/warmup"
                                                ? "bg-sky-500"
                                                : ""
                                        } bg-gray-500 text-white text-xs font-semibold px-6 py-1 mr-2 rounded-md capitalize cursor-pointer`}
                                    >
                                        {unit?.fromStatus}
                                    </span>
                                    &rarr;
                                    <span
                                        className={`${
                                            unit?.toStatus.toLowerCase() ===
                                            "success"
                                                ? "bg-green-500"
                                                : ""
                                        } ${
                                            unit?.toStatus.toLowerCase() ===
                                            "cancelled"
                                                ? "bg-red-500"
                                                : ""
                                        } ${
                                            unit?.toStatus.toLowerCase() ===
                                            "pending"
                                                ? "bg-yellow-500"
                                                : ""
                                        } ${
                                            unit?.toStatus.toLowerCase() ===
                                            "rework/warmup"
                                                ? "bg-sky-500"
                                                : ""
                                        } bg-gray-500 text-white text-xs font-semibold px-6 py-1 ml-2 rounded-md capitalize cursor-pointer`}
                                    >
                                        {unit?.toStatus}
                                    </span>
                                </p>
                                <div className="mt-2 flex items-center justify-between">
                                    <p className="capitalize">
                                        <span className="text-sm underline">
                                            REASON :
                                        </span>{" "}
                                        {unit?.reason}
                                    </p>
                                    <p className="text-sm">
                                        {new Date(unit?.createdAt)
                                            ?.toString()
                                            .substring(0, 24)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4  text-center">
                        <button
                            onClick={handleClose}
                            className="w-full cursor-pointer border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default StatusChangeInfoModal;
