import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { createEmployeeAttendance } from "../../api/attendance";
import { AuthContext } from "../../context/authContext";
import { getDailyLeadCount } from "../../api/dashboard";
import LeadCountChartModal from "../../components/Modal/LeadCountChartModal";
import EmptyState from "../../components/EmptyState/EmptyState";
import Loader from "../../components/Loader/Loader";

const Dashboard = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const pusher = new Pusher("3598d69c8453a73ad670", {
            cluster: "ap2",
        });
        const channel1 = pusher.subscribe("channel");
        channel1.bind("event", (data: any) => {
            console.log(data);
            toast.custom(data?.message, { duration: 10 * 1000 });
        });

        return () => {
            pusher.unsubscribe("channel");
        };
    }, []);

    const { user } = useContext(AuthContext);
    const attendanceMutation = useMutation({
        mutationFn: (id: number | undefined) => createEmployeeAttendance(id!),
        // onSuccess: (data) => {
        //     toast.success(data?.message);
        // },
    });

    const { data: leadCount = [], isLoading } = useQuery({
        queryKey: ["leadCount"],
        queryFn: () => getDailyLeadCount(user?.id!),
    });

    return (
        <>
            <div className="overflow-hidden">
                <div className="p-5">
                    <div className="mb-5 text-gray-900 bg-white">
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 1.2,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-between items-center origin-center"
                        >
                            <p className="text-3xl font-semibold uppercase">
                                Dashboard - Daily Leads Count
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                onClick={() =>
                                    attendanceMutation.mutate(user?.id)
                                }
                                className="py-1.5 px-10 bg-blue-700 text-white rounded-md text-sm cursor-pointer"
                            >
                                Mark Attendance
                            </motion.button>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="mt-1 text-sm font-normal text-gray-700 w-[50%]"
                        >
                            A real-time snapshot of your total leads at a
                            glance. Track, measure, and stay on top of every
                            opportunity.
                        </motion.p>
                    </div>
                    <div className="flex flex-row-reverse my-2">
                        <button
                            onClick={() => setShow(true)}
                            className="py-1.5 px-10 float-right bg-green-700 text-white rounded-md text-sm cursor-pointer"
                        >
                            Line Chart
                        </button>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-x-auto shadow-md sm:rounded-lg"
                    >
                        {!isLoading ? (
                            leadCount?.length > 0 ? (
                                <table className="w-full h-fit text-sm text-left rtl:text-right text-gray-500 ">
                                    <thead className="text-center text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Date
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Lead Count
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leadCount?.map((item: any) => (
                                            <tr
                                                key={item?.id}
                                                className="capitalize text-center odd:bg-white odd::bg-gray-900 even:bg-gray-50 even::bg-gray-800 border-b :border-gray-700 border-gray-200"
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                >
                                                    {new Date(
                                                        item?.createdAt
                                                    ).toDateString()}
                                                </th>
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {item?.count}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <EmptyState />
                            )
                        ) : (
                            <Loader />
                        )}
                    </motion.div>
                </div>
            </div>

            {show && (
                <LeadCountChartModal
                    handleClose={() => setShow(false)}
                    id={user?.id!}
                />
            )}
        </>
    );
};

export default Dashboard;
