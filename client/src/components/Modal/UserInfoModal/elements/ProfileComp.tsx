import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

import { getProfileCardInfo, getUserInfo } from "../../../../api/user";
import { useState } from "react";
import { formatNumber, returnColors } from "../../../../utils/utils";

const ProfileComp = ({ userId }: { userId: number }) => {
    const [time, setTime] = useState("thisMonth");

    const { data: leadData = [] } = useQuery({
        queryKey: [`profile-${userId}`, time],
        queryFn: () => getUserInfo(userId, time),
    });

    const { data: cardData } = useQuery({
        queryKey: [`profile-${userId}`],
        queryFn: () => getProfileCardInfo(userId!),
    });

    const piedata = {
        datasets: [
            {
                data: leadData?.map((item: any) => item?.count),
                backgroundColor: leadData.map((item: any) =>
                    returnColors(item?.status)
                ),
            },
        ],
        labels: leadData?.map((item: any) => item?.status?.toUpperCase()),
    };
    return (
        <section className="p-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-x-auto "
            >
                <div className="flex justify-between">
                    <p className="text-3xl italic mb-2 text-black/80">
                        <span className="capitalize">{time}</span>'s Analytics
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

                <div className="h-[17rem] mx-auto w-fit">
                    <Pie data={piedata} />
                </div>
            </motion.div>
        </section>
    );
};

export default ProfileComp;
