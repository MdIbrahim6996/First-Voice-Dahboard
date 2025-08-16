import { MdCoPresent, MdAssignmentLate, MdTimer } from "react-icons/md";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { getEmployeeMonthlyAttendance } from "../../api/userAttendance";
import { useState } from "react";
import { monthNames } from "../../constants/appConstant";

const MonthlyAttendance = () => {
    const date = new Date();
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth());
    const [name, setName] = useState<string | undefined>("");

    const { data: monthlyAttendance, refetch } = useQuery({
        queryKey: ["monthly-attendance"],
        queryFn: () => getEmployeeMonthlyAttendance(year, month, name),
    });
    console.log(monthlyAttendance);
    const getUserisLateCountDetails = (id: string) =>
        monthlyAttendance?.isLateCount.find((item: any) => item.userId === id);
    const getUserOnTimeCountDetails = (id: string) =>
        monthlyAttendance?.onTimeCount.find((item: any) => item.userId === id);
    const getUserDetails = (id: string) =>
        monthlyAttendance?.userData.find((item: any) => item.id === id);

    // const resetFilters = () => {
    //     setYear(date.getFullYear());
    // };
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
                            <label htmlFor="year">Year</label>
                            <select
                                name="year"
                                id="year"
                                defaultValue={2025}
                                onClick={(e: any) => setYear(e.target.value)}
                                className="border outline-none border-gray-400 px-3 py-1 rounded-md"
                            >
                                <option value={2018}>2018</option>
                                <option value={2019}>2019</option>
                                <option value={2020}>2020</option>
                                <option value={2021}>2021</option>
                                <option value={2022}>2022</option>
                                <option value={2023}>2023</option>
                                <option value={2024}>2024</option>
                                <option value={2025}>2025</option>
                            </select>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="month">Month</label>
                            <select
                                name="month"
                                id="month"
                                onClick={(e: any) => setMonth(e.target.value)}
                                defaultValue={month}
                                className="border outline-none border-gray-400 px-3 py-1 rounded-md"
                            >
                                <option value="" disabled>
                                    Select a Month
                                </option>
                                {monthNames?.map((item, i) => (
                                    <option key={i} value={i}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                            onClick={() => {
                                // setYear(date.getFullYear());
                                // setMonth(date.getMonth() + 1);
                                // setName("");
                                // refetch();
                                window.location.reload();
                            }}
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
                        My Workspaces - monthly attendances
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
                                    Year
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    month
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    days present
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyAttendance?.attendance?.map((item: any) => (
                                <tr
                                    key={item?.userId}
                                    className="capitalize text-center odd:bg-white odd::bg-gray-900 even:bg-gray-50 even::bg-gray-800 border-b :border-gray-700 border-gray-200"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                                    >
                                        {item?.userId}
                                    </th>
                                    <td className="px-6 py-4">
                                        {getUserDetails(item?.userId)?.name}
                                    </td>
                                    <td className="px-6 py-4">2025</td>
                                    <td className="px-6 py-4">
                                        {monthNames[month]}
                                    </td>
                                    <td className="px-6 py-4 flex items-center flex-col space-y-1">
                                        <p className="bg-blue-500 flex items-center gap-x-2 text-white px-5 py-0.5 rounded w-fit">
                                            <MdCoPresent className="text-lg" />
                                            Total :{item._count?._all}
                                        </p>
                                        <p className="bg-red-500 flex items-center gap-x-2 text-white px-5 py-0.5 rounded w-fit">
                                            <MdAssignmentLate className="text-lg" />
                                            Late :
                                            {
                                                getUserisLateCountDetails(
                                                    item?.userId
                                                )?._count?._all
                                            }
                                        </p>
                                        <p className="bg-green-500 flex items-center gap-x-2 text-white px-5 py-0.5 rounded w-fit">
                                            <MdTimer className="text-lg" />
                                            OnTime :
                                            {
                                                getUserOnTimeCountDetails(
                                                    item?.userId
                                                )?._count?._all
                                            }
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

export default MonthlyAttendance;
