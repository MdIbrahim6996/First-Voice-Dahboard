import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import { motion } from "motion/react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteHoliday, getAllHoliday } from "../../api/holiday";
import CreateHolidayModal from "../../components/Modal/CreateHolidayModal";
import DeleteModal from "../../components/Modal/DeleteModal";
import EditHolidayModal from "../../components/Modal/EditHolidayModal";

const AddHoliday = () => {
    const [show, setShow] = useState({
        create: false,
        edit: false,
        delete: false,
    });
    const [id, setId] = useState<number>();
    const [details, setDetails] = useState({});
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const queryClient = useQueryClient();
    const { data: holidays, refetch } = useQuery({
        queryKey: ["holiday"],
        queryFn: () => getAllHoliday(title, startDate, endDate),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteHoliday(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["holiday"] });
        },
    });

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
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e?.target?.value)}
                                    id="title"
                                    placeholder="Christmas"
                                    className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="startDate">Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(e?.target?.value)
                                    }
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
                                    onChange={(e) =>
                                        setEndDate(e?.target?.value)
                                    }
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
                                onClick={() => {
                                    setTitle("");
                                    setStartDate("");
                                    setEndDate("");
                                    refetch();
                                }}
                                className="bg-sky-500 text-white px-10 py-1 rounded-md cursor-pointer"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </motion.div>
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
                            <p className="text-3xl font-semibold uppercase origin-center w-fit">
                                My Workspaces - Holidays
                            </p>
                            <button
                                onClick={() =>
                                    setShow({
                                        create: true,
                                        edit: false,
                                        delete: false,
                                    })
                                }
                                className="py-1.5 px-7 bg-blue-700 text-white rounded-md text-sm flex gap-1 items-center"
                            >
                                <MdAdd className="text-xl" /> Add Holiday
                            </button>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="mt-1 text-sm font-normal text-gray-700 w-[50%]"
                        >
                            All the Important Dates You Need to Know.
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
                                        Sr. No.
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Start Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        End Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {holidays?.map((item: any) => (
                                    <tr className="capitalize text-center odd:bg-white odd::bg-gray-900 even:bg-gray-50 even::bg-gray-800 border-b :border-gray-700 border-gray-200">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                                        >
                                            {item?.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item?.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(
                                                item?.startDate
                                            ).toDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(
                                                item?.endDate
                                            ).toDateString()}
                                        </td>
                                        <td className="px-6 py-4 flex gap-1 items-center justify-center">
                                            <button
                                                onClick={() => {
                                                    setId(item?.id);
                                                    setDetails(item);
                                                    setShow({
                                                        create: false,
                                                        edit: true,
                                                        delete: false,
                                                    });
                                                }}
                                                className="font-medium text-white bg-green-500 rounded-md w-fit px-2 py-1 text-sm flex items-center gap-1"
                                            >
                                                <MdEdit />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setId(item?.id);
                                                    setShow({
                                                        create: false,
                                                        edit: false,
                                                        delete: true,
                                                    });
                                                }}
                                                className="font-medium text-white bg-red-500 rounded-md w-fit px-2 py-1 text-sm flex items-center gap-1"
                                            >
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </div>
            {show.create && (
                <CreateHolidayModal
                    handleClose={() =>
                        setShow({
                            create: false,
                            edit: false,
                            delete: false,
                        })
                    }
                />
            )}
            {show.edit && (
                <EditHolidayModal
                    details={details}
                    id={id!}
                    handleClose={() =>
                        setShow({
                            create: false,
                            edit: false,
                            delete: false,
                        })
                    }
                />
            )}
            {show.delete && (
                <DeleteModal
                    handleClose={() =>
                        setShow({
                            create: false,
                            edit: false,
                            delete: false,
                        })
                    }
                    handleDelete={() => deleteMutation.mutate(id!)}
                />
            )}
        </>
    );
};

export default AddHoliday;
