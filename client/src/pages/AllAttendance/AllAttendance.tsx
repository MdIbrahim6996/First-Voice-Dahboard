import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { getAllAttendance } from "../../api/attendance";
import { useState } from "react";

const AllAttendance = () => {
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const { data, refetch } = useQuery({
        queryKey: ["all-attendance"],
        queryFn: () => getAllAttendance(name, startDate, endDate),
    });

    const resetFilters = () => {
        setName("");
        setStartDate("");
        setEndDate("");
        refetch();
    };

    return (
        <div className="overflow-hidden">
            <div className="p-5">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0 }}
                >
                    <div className="grid grid-cols-4 gap-x-5 gap-y-3">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e?.target?.value)}
                                id="name"
                                placeholder="Name"
                                className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="startDate">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e?.target?.value)}
                                id="startDate"
                                className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="endDate">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e?.target?.value)}
                                id="endDate"
                                className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                            />
                        </div>
                    </div>
                    <div className="mb-10 mt-3 flex items-center gap-2 text-sm">
                        <button
                            onClick={() => refetch()}
                            className="bg-green-500 text-white px-10 py-1 rounded-md cursor-pointer"
                        >
                            Search
                        </button>
                        <button
                            onClick={resetFilters}
                            className="bg-sky-500 text-white px-10 py-1 rounded-md cursor-pointer"
                        >
                            Reset Filters
                        </button>
                    </div>
                </motion.div>
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
                        My Workspaces - ALL attendances
                    </motion.p>

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
                        <thead className="text-center text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Employee Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Marking date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Marking time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item: any) => (
                                <tr
                                    key={item?.id}
                                    className="capitalize text-center odd:bg-white odd::bg-gray-900 even:bg-gray-50 even::bg-gray-800 border-b :border-gray-700 border-gray-200"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                                    >
                                        {item?.userId}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item?.user?.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(
                                            item?.dateTime
                                        ).toDateString()}
                                    </td>
                                    <td className="px-6 py-4 grid grid-cols-2 gap-x-">
                                        <p>
                                            {new Date(
                                                item?.dateTime
                                            ).toLocaleTimeString()}
                                        </p>
                                        <p
                                            className={`text-white px-5 py-0.5 text-xs rounded w-fit ${
                                                item?.isLate
                                                    ? "bg-red-500"
                                                    : "bg-green-500"
                                            }`}
                                        >
                                            {item?.isLate ? "Late" : "ONTIME"}
                                        </p>
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

export default AllAttendance;
