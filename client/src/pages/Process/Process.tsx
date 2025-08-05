import { MdAdd, MdDelete, MdRemoveRedEye } from "react-icons/md";
import { motion } from "motion/react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CreateProcessModal from "../../components/Modal/CreateProcessModal";
import DeleteModal from "../../components/Modal/DeleteModal";
import { deleteProcess, getAllProcess } from "../../api/process";
import ProcessInfoModal from "../../components/Modal/ProcessInfoModal";

const Process = () => {
    const [show, setShow] = useState({
        create: false,
        delete: false,
        info: false,
    });
    const [id, setId] = useState<number>();
    const queryClient = useQueryClient();

    const { data: process } = useQuery({
        queryKey: ["process"],
        queryFn: getAllProcess,
    });

    const mutation = useMutation({
        mutationFn: (id: number) => deleteProcess(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["process"] });
        },
    });

    return (
        <>
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
                            <p className="text-3xl font-semibold uppercase origin-center w-fit">
                                Process - All Process
                            </p>
                            <button
                                onClick={() =>
                                    setShow({
                                        create: true,
                                        delete: false,
                                        info: false,
                                    })
                                }
                                className="py-1.5 px-7 bg-blue-700 text-white rounded-md text-sm flex gap-1 items-center"
                            >
                                <MdAdd className="text-xl" /> Add Process
                            </button>
                        </motion.div>

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
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Plan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {process?.map((item: any, i: number) => (
                                    <tr className="capitalize text-center odd:bg-white odd::bg-gray-900 even:bg-gray-50 even::bg-gray-800 border-b :border-gray-700 border-gray-200">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                                        >
                                            {i + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item?.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item?.plans.map(
                                                (item: any, i: number) => (
                                                    <p
                                                        className="my-0.5"
                                                        key={item?.id}
                                                    >
                                                        {i + 1}. {item?.name}
                                                    </p>
                                                )
                                            )}
                                        </td>
                                        <td className="px-6 py-4 flex gap-1 items-center justify-center">
                                            <button
                                                onClick={() => {
                                                    setId(item.id);
                                                    setShow({
                                                        create: false,
                                                        delete: false,
                                                        info: true,
                                                    });
                                                }}
                                                className="font-medium text-white bg-green-500 rounded-md w-fit px-2 py-1 text-sm flex items-center gap-1"
                                            >
                                                <MdRemoveRedEye />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setId(item.id);
                                                    setShow({
                                                        create: false,
                                                        delete: true,
                                                        info: false,
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
                <CreateProcessModal
                    handleClose={() =>
                        setShow({ create: false, delete: false, info: false })
                    }
                />
            )}
            {show.info && (
                <ProcessInfoModal
                    handleClose={() =>
                        setShow({ create: false, delete: false, info: false })
                    }
                    id={id!}
                />
            )}
            {show.delete && (
                <DeleteModal
                    handleClose={() =>
                        setShow({ create: false, delete: false, info: false })
                    }
                    handleDelete={() => mutation.mutate(id!)}
                />
            )}
        </>
    );
};

export default Process;
