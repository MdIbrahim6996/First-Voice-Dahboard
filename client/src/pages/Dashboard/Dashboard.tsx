import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { createEmployeeAttendance } from "../../api/attendance";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { getDailyLeadCount } from "../../api/dashboard";

const data = [
    {
        id: 1,
        date: "23 July, 2025",
        leadCount: 4,
    },
    {
        id: 2,
        date: "24/5/25",
        leadCount: 6,
    },
    {
        id: 3,
        date: "25/5/25",
        leadCount: 3,
    },
    {
        id: 4,
        date: "26/5/25",
        leadCount: 10,
    },
];
const Dashboard = () => {
    //This will be called when your component is mounted
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

    const { data: leadCount } = useQuery({
        queryKey: ["leadCount"],
        queryFn: () => getDailyLeadCount(user?.user?.id!),
    });

    console.log(leadCount);
    return (
        <div className="overflow-hidden">
            <div className="p-5">
                <div className="mb-5  text-gray-900 bg-white ">
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
                                attendanceMutation.mutate(user?.user?.id)
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
                        Browse a list of Flowbite products designed to help you
                        work and play, stay organized, get answers, keep in
                        touch, grow your business, and more.
                    </motion.p>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-x-auto shadow-md sm:rounded-lg"
                >
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-center text-gray-700 uppercase bg-gray-50 :bg-gray-700 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Lead Count
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {leadCount?.map((item: any) => (
                                <tr className="capitalize text-center odd:bg-white odd::bg-gray-900 even:bg-gray-50 even::bg-gray-800 border-b :border-gray-700 border-gray-200">
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
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
