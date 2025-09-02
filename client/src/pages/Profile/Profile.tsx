import { motion } from "motion/react";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { getUserMonthWiseAttendance } from "../../api/userAttendance";
import { getProfileCardInfo, getUserInfo } from "../../api/user";
import { monthNames } from "../../constants/appConstant";
import { formatNumber, returnColors } from "../../utils/utils";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [time, setTime] = useState("thisMonth");

    const { data = [] } = useQuery({
        queryKey: ["bar-chart", user?.id],
        queryFn: () => getUserMonthWiseAttendance(user?.id!),
    });

    const { data: leadData = [] } = useQuery({
        queryKey: [`profile-${user?.id}`, time],
        queryFn: () => getUserInfo(user?.id!, time),
    });
    const { data: cardData } = useQuery({
        queryKey: [`profile-${user?.id}`],
        queryFn: () => getProfileCardInfo(user?.id!),
    });

    const piedata = {
        datasets: [
            {
                data: leadData.map((item: any) => item?.count),
                backgroundColor: leadData.map((item: any) =>
                    returnColors(item?.status)
                ),
            },
        ],
        labels: leadData.map((item: any) => item?.status?.toUpperCase()),
    };

    let groupdata = {
        labels: monthNames?.map((item) => item?.substring(0, 3)),
        datasets: [
            {
                label: "ON TIME",
                fillColor: "blue",
                data: data?.graphData?.ontimeArray,
            },
            {
                label: "LATE",
                fillColor: "red",
                data: data?.graphData?.lateArray,
            },
        ],
    };
    const header =
        time === "thisMonth"
            ? monthNames[new Date().getMonth()]
            : `This Year (${new Date().getFullYear()})`;

    return (
        <div className="overflow-y-scroll h-full">
            <div className="p-5">
                <div className="mb-5  text-gray-900 bg-white ">
                    <motion.p
                        initial={{
                            opacity: 0,
                            scale: 1.2,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-semibold uppercase origin-center w-fit"
                    >
                        Good Day, {user?.alias}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="mt-1 text-sm font-normal text-gray-700 w-[50%]"
                    >
                        Hope you are having energetic and productive day.
                    </motion.p>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-x-auto "
                >
                    <div className="flex justify-between">
                        <p className="text-3xl italic mb-2 text-black/80">
                            <span className="capitalize">
                                {time === "today" ? "Today's" : header}
                            </span>{" "}
                            Analytics
                        </p>
                        <div>
                            <select
                                onClick={(e: any) => setTime(e.target.value!)}
                                defaultValue={"thisMonth"}
                                className="border border-slate-400 px-5 py-1 rounded-md text-sm cursor-pointer outline-none"
                            >
                                <option value="today">TODAY</option>
                                <option value="thisMonth">THIS MONTH</option>
                                <option value="thisYear">THIS YEAR</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-3 mb-10">
                        <article className="bg-sky-400 text-white p-3 rounded-md text-center shadow-xl bg-gradient-to-b from-teal-400 to-yellow-200">
                            <p className="text-2xl capitalize">today's sale</p>
                            <p className="mt-2 text-3xl">
                                {formatNumber(cardData?.todayLead)}
                            </p>
                        </article>
                        <article className="bg-green-400 text-white p-3 rounded-md text-center shadow-xl bg-gradient-to-b from-fuchsia-600 to-pink-300">
                            <p className="text-2xl capitalize">Month's Sale</p>
                            <p className="mt-2 text-2xl">
                                {formatNumber(cardData?.totalSuccessLead)}
                            </p>
                        </article>
                        <article className="bg-red-400 text-white p-3 rounded-md text-center shadow-xl bg-gradient-to-t from-emerald-300 to-emerald-900">
                            <p className="text-2xl capitalize">Gross Sales</p>
                            <p className="mt-2 text-2xl">
                                {formatNumber(cardData?.totalLead)}
                            </p>
                        </article>
                        <article className="bg-blue-700 text-white p-3 rounded-md text-center shadow-xl bg-gradient-to-b from-red-500 to-orange-300">
                            <p className="text-2xl capitalize">SPD</p>
                            <p className="mt-2 text-2xl">{cardData?.spd}</p>
                        </article>
                        <article className="bg-sky-400 text-white p-3 rounded-md text-center shadow-xl bg-gradient-to-bl from-[#e879f9] via-[#4ade80]">
                            <p className="text-2xl capitalize">attendance</p>
                            <p className="mt-2 text-3xl">
                                {formatNumber(cardData?.totalAttendance)}
                            </p>
                        </article>
                    </div>
                </motion.div>

                <div className="flex gap-5 mt-0">
                    <div className="shadow-xl p-4 rounded-md w-[60%]">
                        <p className="text-xl uppercase mb-3 font-semibold">
                            monthly overview
                        </p>
                        <div className="h-[20rem] mx-auto w-fi">
                            <Bar data={groupdata} />
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Id, provident totam ea illo ex fugiat neque ad
                            velit officia ipsum? velit officia ipsum? velit
                            officia ipsum? velit officia ipsum?
                        </p>
                    </div>
                    <div className="w-[40%] shadow-xl rounded-md p-4">
                        <p className="text-xl uppercase mb-3 font-semibold">
                            Leads overview
                        </p>
                        <div className="h-[20rem] mx-auto w-fit">
                            <Pie data={piedata} />
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            {leadData?.map((item: any) => (
                                <div
                                    key={item?.status}
                                    className="w-full text-center border border-slate-300 p-1 rounded-md"
                                >
                                    <p className="text-xl font-semibold">
                                        {item?.count}
                                    </p>
                                    <p className="text-sm uppercase">
                                        {item?.status}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
