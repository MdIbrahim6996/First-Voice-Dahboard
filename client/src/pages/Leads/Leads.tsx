import { MdDelete, MdEdit } from "react-icons/md";
import { FaEye, FaFileCsv } from "react-icons/fa";
import { motion } from "motion/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllStatus } from "../../api/status";
import { deleteLead, getAllLead } from "../../api/lead";
import { getAllProcess } from "../../api/process";
import { useState } from "react";
import { getAllUser } from "../../api/user";
import { CSVLink } from "react-csv";
import DeleteModal from "../../components/Modal/DeleteModal";
import EditLeadModal from "../../components/Modal/EditLeadModal";
import LeadDetailModal from "../../components/Modal/LeadDetailModal";
import Loader from "../../components/Loader/Loader";
import EmptyState from "../../components/EmptyState/EmptyState";

const Leads = () => {
    const [phone, setPhone] = useState("");
    const [process, setProcess] = useState(0);
    // const [centre, setCentre] = useState("");
    const [leadUser, setLeadUser] = useState(0);
    const [closerUser, setCloserUser] = useState(0);
    const [verifierUser, setVerifierUser] = useState(0);
    const [saleDate, setSaleDate] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [status, setStatus] = useState(0);
    const [detail, setDetail] = useState({});
    const [id, setId] = useState<number>();

    const [show, setShow] = useState({
        edit: false,
        delete: false,
        view: false,
    });

    const queryClient = useQueryClient();

    const { data: processData } = useQuery({
        queryKey: ["process"],
        queryFn: getAllProcess,
    });
    const { data: userData } = useQuery({
        queryKey: ["user"],
        queryFn: getAllUser,
    });
    const filteredUsers = userData?.filter(
        (item: any) => item?.role === "user"
    );

    const { data: statusData } = useQuery({
        queryKey: ["status"],
        queryFn: getAllStatus,
    });

    const {
        data: leads,
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["leads", status],
        queryFn: () =>
            getAllLead(
                status,
                phone,
                process,
                leadUser,
                closerUser,
                verifierUser,
                saleDate,
                fromDate,
                toDate
            ),
    });

    const { mutate } = useMutation({
        mutationFn: (id: number) => deleteLead(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["leads"] });
        },
    });

    const headers = [
        { label: "ACCOUNT NAME", key: "accountName" },
        { label: "ADDRESS", key: "address" },
        { label: "BANK NAME", key: "bankName" },
        { label: "CENTRE", key: "centre" },
        { label: "CITY", key: "city" },
        { label: "COUNTRY", key: "country" },
        { label: "CURRENCY", key: "currency" },
        { label: "TITLE", key: "title" },
        { label: "FIRST NAME", key: "firstName" },
        { label: "MIDDLE NAME", key: "middleName" },
        { label: "LAST NAME", key: "lastName" },
        { label: "DATE OF BIRTH", key: "dateOfBirth" },
        { label: "PHONE", key: "phone" },
        { label: "PROCESS", key: "process" },
        { label: "PLAN", key: "plan" },
        { label: "FEE", key: "fee" },
        { label: "SALE DATE", key: "saleDate" },
        { label: "STATUS", key: "status.name" },
        { label: "SORT", key: "sort" },
        { label: "PROCESS ID", key: "processId" },
        { label: "PLAN ID", key: "planId" },
    ];

    const resetFilters = () => {
        setPhone("");
        setCloserUser(0);
        setLeadUser(0);
        setVerifierUser(0);
        setStatus(0);
        setProcess(0);
        setSaleDate("");
        setFromDate("");
        setToDate("");
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
                        <div className="grid grid-cols-4 gap-x-5 gap-y-3">
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="PHONE"
                                    value={phone}
                                    onChange={(e) => setPhone(e?.target?.value)}
                                    id="phone"
                                    className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="process">Process</label>
                                <select
                                    name="process"
                                    id="process"
                                    onChange={(e: any) =>
                                        setProcess(e.target.value)
                                    }
                                    value={process}
                                    className="border outline-none border-gray-400 px-3 py-1 rounded-md"
                                >
                                    <option value={0} selected disabled>
                                        Select A Process
                                    </option>
                                    {processData?.map((item: any) => (
                                        <option key={item?.id} value={item?.id}>
                                            {item?.name?.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="leadUser">Lead User</label>
                                <select
                                    name="leadUser"
                                    id="leadUser"
                                    value={leadUser}
                                    onChange={(e: any) =>
                                        setLeadUser(e?.target?.value)
                                    }
                                    className="border outline-none border-gray-400 px-3 py-1 rounded-md"
                                >
                                    <option value={0} selected disabled>
                                        Select Lead User
                                    </option>
                                    {filteredUsers?.map((item: any) => (
                                        <option
                                            key={item?.id}
                                            value={item?.id}
                                            className="uppercase"
                                        >
                                            {item?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="closerUser">Closer User</label>
                                <select
                                    name="closerUser"
                                    value={closerUser}
                                    onChange={(e: any) =>
                                        setCloserUser(e?.target?.value)
                                    }
                                    id="closerUser"
                                    className="border outline-none border-gray-400 px-3 py-1 rounded-md"
                                >
                                    <option value={0} selected disabled>
                                        Select Closer User
                                    </option>
                                    {filteredUsers?.map((item: any) => (
                                        <option
                                            key={item?.id}
                                            value={item?.id}
                                            className="uppercase"
                                        >
                                            {item?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="verifierUser">
                                    Verifier User
                                </label>
                                <select
                                    name="verifierUser"
                                    onChange={(e: any) =>
                                        setVerifierUser(e?.target?.value)
                                    }
                                    id="verifierUser"
                                    className="border outline-none border-gray-400 px-3 py-1 rounded-md"
                                >
                                    <option value={0} selected disabled>
                                        Select Verifier User
                                    </option>
                                    {filteredUsers?.map((item: any) => (
                                        <option
                                            key={item?.id}
                                            value={item?.id}
                                            className="uppercase"
                                        >
                                            {item?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
                            Leads - All Leads
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="mt-1 text-sm font-normal text-gray-700 w-[50%]"
                        >
                            Browse a list of Flowbite products designed to help
                            you work and play, stay organized, get answers, keep
                            in touch, grow your business, and more.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="mt-1 text-sm font-normal text-gray-700 w-full"
                    >
                        <div className="flex  mb-5 items-center justify-between">
                            <div className="flex gap-x-1">
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
                                            item?.name.toLowerCase() ===
                                            "success"
                                                ? "bg-green-500"
                                                : ""
                                        } ${
                                            item?.name.toLowerCase() ===
                                            "cancelled"
                                                ? "bg-red-500"
                                                : ""
                                        } ${
                                            item?.name.toLowerCase() ===
                                            "pending"
                                                ? "bg-yellow-500"
                                                : ""
                                        } ${
                                            item?.name.toLowerCase() ===
                                            "rework/warmup"
                                                ? "bg-sky-500"
                                                : ""
                                        } bg-gray-500 text-white text-xs font-semibold px-6 py-1 rounded-md capitalize cursor-pointer`}
                                    >
                                        {item?.name}
                                    </button>
                                ))}
                            </div>

                            <button className="py-1.5 px-7 bg-green-700 text-white rounded-md text-sm flex gap-1 items-center cursor-pointer">
                                <FaFileCsv className="text-lg" />{" "}
                                <CSVLink
                                    headers={headers}
                                    data={leads ? leads : []}
                                    filename="Leads.csv"
                                >
                                    Export as CSV
                                </CSVLink>
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-x-auto shadow-md sm:rounded-lg w-full"
                    >
                        {!isLoading ? (
                            leads?.length > 0 ? (
                                <table className="text-sm text-left rtl:text-right text-gray-500">
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
                                                Actions
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
                                                Lead By
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Closed By
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Verified By
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
                                                Phone
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
                                                <td className="px-6 py-4 flex flex-col gap-1 items-center">
                                                    <button
                                                        onClick={() => {
                                                            setShow({
                                                                edit: true,
                                                                delete: false,
                                                                view: false,
                                                            });

                                                            setDetail(item);
                                                        }}
                                                        className="font-medium text-white bg-green-500 rounded-md w-fit px-2 py-1 text-sm flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <MdEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setDetail(item);
                                                            setShow({
                                                                edit: false,
                                                                delete: false,
                                                                view: true,
                                                            });
                                                        }}
                                                        className="font-medium text-white bg-blue-500 rounded-md w-fit px-2 py-1 text-sm flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setId(item?.id);
                                                            setShow({
                                                                edit: false,
                                                                delete: true,
                                                                view: false,
                                                            });
                                                        }}
                                                        className="font-medium text-white bg-red-500 rounded-md w-fit px-2 py-1 text-sm flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <MdDelete />
                                                    </button>
                                                </td>
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
                                                            item?.status?.name?.toLowerCase() ===
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
                                                <td className="px-6 py-4">
                                                    {item?.leadBy?.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item?.closer?.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item?.verifier?.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item?.title}{" "}
                                                    {item?.firstName}{" "}
                                                    {item?.middleName}{" "}
                                                    {item?.lastName}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item?.phone}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item?.process?.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item?.plan?.name}
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

            {show.delete && (
                <DeleteModal
                    handleClose={() =>
                        setShow({ edit: false, view: false, delete: false })
                    }
                    handleDelete={() => mutate(id!)}
                />
            )}
            {show.edit && (
                <EditLeadModal
                    handleClose={() =>
                        setShow({ edit: false, view: false, delete: false })
                    }
                    item={detail}
                />
            )}
            {show.view && (
                <LeadDetailModal
                    handleClose={() =>
                        setShow({ edit: false, view: false, delete: false })
                    }
                    details={detail}
                />
            )}
        </>
    );
};

export default Leads;
