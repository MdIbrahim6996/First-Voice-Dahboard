import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Bar, Pie } from "react-chartjs-2";
import { getProcessInfo } from "../../api/process";
import { useState } from "react";
import "chart.js/auto";
import { returnColors } from "../../utils/utils";
import { monthNames } from "../../constants/appConstant";

const ProcessInfoModal = ({
    handleClose,
    id,
}: {
    handleClose: () => void;
    id: number;
}) => {
    const [selectedDate, setSelectedDate] = useState("thisMonth");
    const { data: processInfo = [] } = useQuery({
        queryKey: [`process-info-${id}`, selectedDate],
        queryFn: () => getProcessInfo(id, selectedDate),
    });
    console.log(processInfo);
    console.log(processInfo);
    const thisMonthdata = {
        datasets: [
            {
                data: processInfo?.map((item: any) => item?.count),
                backgroundColor: processInfo.map((item: any) =>
                    returnColors(item?.name)
                ),
            },
        ],
        labels: processInfo?.map((item: any) => item?.name?.toUpperCase()),
    };

    const piedata = {
        datasets: [
            {
                data: processInfo?.map((item: any) => item?.count),
                backgroundColor: processInfo.map((item: any) =>
                    returnColors(item?.name)
                ),
            },
        ],
        labels: processInfo?.map((item: any) => item?.name?.toUpperCase()),
    };

    const bardata = {
        labels: monthNames?.map((item) => item?.substring(0, 3)),
        datasets: [
            {
                label: "SUCCESS",
                data: processInfo?.map((item: any) => item?.success),
                backgroundColor: returnColors("success"),
            },
            {
                label: "PENDING",
                data: processInfo?.map((item: any) => item?.pending),
                backgroundColor: returnColors("pending"),
            },
            {
                label: "CANCELLED",
                data: processInfo?.map((item: any) => item?.cancelled),
                backgroundColor: returnColors("cancelled"),
            },
            {
                label: "REWORK/WARMUP",
                data: processInfo?.map((item: any) => item?.rework),
                backgroundColor: returnColors("rework/warmup"),
            },
        ],
    };

    const date = new Date();
    const currentMonth = date.getMonth();

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
                        Process Information.
                    </p>
                </div>

                <div className="px-4 py-2">
                    <div className="border border-slate-200 bg-slate-200 shadow-2xl rounded-md flex justify-between items-center">
                        <button
                            onClick={() => setSelectedDate("thisMonth")}
                            className={`
                                ${
                                    selectedDate === "thisMonth"
                                        ? "bg-white"
                                        : "bg-slate-200"
                                }
                                 rounded-md flex-1 text-center capitalize m-1 cursor-pointer hover:font-[500]`}
                        >
                            this month ({monthNames[currentMonth]})
                        </button>
                        <button
                            onClick={() => setSelectedDate("thisYear")}
                            className={`${
                                selectedDate === "thisYear"
                                    ? "bg-white"
                                    : "bg-slate-200"
                            } rounded-md flex-1 text-center capitalize m-1 cursor-pointer hover:font-[500]`}
                        >
                            this year ({date.getFullYear()})
                        </button>
                        <button
                            onClick={() => setSelectedDate("monthly")}
                            className={` ${
                                selectedDate === "monthly"
                                    ? "bg-white"
                                    : "bg-slate-200"
                            } rounded-md flex-1 text-center capitalize m-1 cursor-pointer hover:font-[500]`}
                        >
                            monthly
                        </button>
                    </div>
                    <div>
                        {selectedDate === "thisMonth" && (
                            <div className="w-[24rem] mx-auto">
                                <Pie data={piedata} />
                            </div>
                        )}
                        {selectedDate === "thisYear" && (
                            <div className="w-[24rem] mx-auto">
                                <Pie data={thisMonthdata}></Pie>
                            </div>
                        )}
                        {selectedDate === "monthly" && (
                            <div className="h-[25rem]">
                                <Bar
                                    data={bardata}
                                    options={{
                                        maintainAspectRatio: false,
                                    }}
                                    className="h-full"
                                />
                            </div>
                        )}
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

export default ProcessInfoModal;
