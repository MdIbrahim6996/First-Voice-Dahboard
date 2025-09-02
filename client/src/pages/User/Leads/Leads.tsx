import { motion } from "motion/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { getAllStatusforUser } from "../../../api/status";
import { getAllLeadOfUser } from "../../../api/lead";
import { AuthContext } from "../../../context/authContext";
import StatusChangeInfoModal from "../../../components/Modal/StatusChangeInfoModal";
import EmptyState from "../../../components/EmptyState/EmptyState";
import Loader from "../../../components/Loader/Loader";

const Leads = () => {
    const { user } = useContext(AuthContext);
    const [saleDate, setSaleDate] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [status, setStatus] = useState(0);
    const [view, setView] = useState(false);
    const [details, setDetails] = useState({});

    const queryClient = useQueryClient();

    const { data: statusData } = useQuery({
        queryKey: ["status"],
        queryFn: getAllStatusforUser,
    });

    const {
        data: leads,
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["leads", status],
        queryFn: () =>
            getAllLeadOfUser(
                user?.id!,
                status,
                saleDate,
                fromDate,
                toDate
            ),
    });

    const resetFilters = async () => {
        setStatus(0);
        setSaleDate("");
        setFromDate("");
        setToDate("");
        // window.location.reload();
        refetch();
    };
    return (
        <>
            <div className="overflow-hidden">
                <div className="p-5">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0 }}
                    >
                        <div className="grid grid-cols-3 gap-x-5 gap-y-3">
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="saleDate">Sale Date</label>
                                <input
                                    type="date"
                                    name="saleDate"
                                    value={saleDate}
                                    id="saleDate"
                                    onChange={(e) =>
                                        setSaleDate(e.target.value)
                                    }
                                    className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="fromDate">From Date</label>
                                <input
                                    type="date"
                                    name="fromDate"
                                    value={fromDate}
                                    id="fromDate"
                                    onChange={(e) =>
                                        setFromDate(e.target.value)
                                    }
                                    className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="toDate">To Date</label>
                                <input
                                    type="date"
                                    name="toDate"
                                    value={toDate}
                                    id="toDate"
                                    onChange={(e) => setToDate(e.target.value)}
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

                    <div className="mb-5 text-gray-900 bg-white ">
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
                            Leads - All Leads
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="mt-1 text-sm font-normal text-gray-700 w-[50%]"
                        >
                            Browse list of leads closed by {user?.name}.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="mt-1 text-sm font-normal text-gray-700 w-[50%]"
                    >
                        <div className="flex gap-x-1 mb-5">
                            {statusData?.map((item: any) => (
                                <button
                                    key={item?.id}
                                    onClick={() => {
                                        setStatus(item?.id);
                                        queryClient.invalidateQueries({
                                            queryKey: ["leads"],
                                        });
                                    }}
                                    className={`${
                                        item?.name?.toLowerCase() === "success"
                                            ? "bg-green-500"
                                            : ""
                                    } ${
                                        item?.name?.toLowerCase() ===
                                        "cancelled"
                                            ? "bg-red-500"
                                            : ""
                                    } ${
                                        item?.name?.toLowerCase() === "pending"
                                            ? "bg-yellow-500"
                                            : ""
                                    } ${
                                        item?.name?.toLowerCase() ===
                                        "rework/warmup"
                                            ? "bg-sky-500"
                                            : ""
                                    } bg-gray-500 text-white text-xs font-semibold px-6 py-1 rounded-md capitalize cursor-pointer`}
                                >
                                    {item?.name}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-x-auto shadow-md sm:rounded-lg"
                    >
                        {!isLoading ? (
                            leads?.length > 0 ? (
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                    <thead className="text-center text-gray-700 uppercase bg-gray-200">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Sr. No.
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Sale Date
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Process
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Plan
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leads?.map((item: any, i: number) => (
                                            <tr
                                                key={item?.id}
                                                className={` capitalize text-center border-b :border-gray-700 border-gray-200`}
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                                                >
                                                    {i + 1}
                                                </th>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <p
                                                        className={`${
                                                            item?.status?.name?.toLowerCase() ===
                                                            "success"
                                                                ? "bg-green-500"
                                                                : ""
                                                        } ${
                                                            item?.status?.name?.toLowerCase() ===
                                                            "pending"
                                                                ? "bg-yellow-500"
                                                                : ""
                                                        } ${
                                                            item?.status?.name?.toLowerCase() ===
                                                            "cancelled"
                                                                ? "bg-red-500"
                                                                : ""
                                                        } ${
                                                            item?.name?.toLowerCase() ===
                                                            "rework/warmup"
                                                                ? "bg-sky-500"
                                                                : ""
                                                        } px-3 py-1 text-xs rounded font-semibold text-white`}
                                                    >
                                                        {item?.status?.name}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {new Date(
                                                        item?.saleDate
                                                    ).toDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item?.title}{" "}
                                                    {item?.firstName}{" "}
                                                    {item?.middleName}{" "}
                                                    {item?.lastName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item?.process?.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item?.plan?.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => {
                                                            setView(true);
                                                            setDetails(
                                                                item?.StatusChangeReason
                                                            );
                                                        }}
                                                        className="px-3 py-1 text-xs rounded font-semibold bg-blue-500 cursor-pointer capitalize text-white"
                                                    >
                                                        view change in status
                                                    </button>
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

            {view && (
                <StatusChangeInfoModal
                    item={details as any}
                    handleClose={() => setView(false)}
                />
            )}
        </>
    );
};

export default Leads;
