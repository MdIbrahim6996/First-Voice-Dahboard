import { MdAdd, MdDelete, MdRemoveRedEye } from "react-icons/md";
import { motion } from "motion/react";
import { useState } from "react";
import CreatePlanModal from "../../components/Modal/CreatePlanModal";
import DeleteModal from "../../components/Modal/DeleteModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePlan, getAllPlan } from "../../api/plan";
import PlanInfoModal from "../../components/Modal/PlanInfoModal";

const Plan = () => {
    const [show, setShow] = useState({
        create: false,
        delete: false,
        info: false,
    });
    const [id, setId] = useState<number>();
    const queryClient = useQueryClient();

    const { data: plan } = useQuery({
        queryKey: ["plan"],
        queryFn: getAllPlan,
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deletePlan(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["plan"] });
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
                                Plan - All Plan
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
                                <MdAdd className="text-xl" /> Add Plan
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
                                        process
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {plan?.map((item: any, i: number) => (
                                    <tr
                                        key={item?.id}
                                        className="capitalize text-center odd:bg-white odd::bg-gray-900 even:bg-gray-50 even::bg-gray-800 border-b :border-gray-700 border-gray-200"
                                    >
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
                                            {item?.process?.name}
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
                <CreatePlanModal
                    handleClose={() =>
                        setShow({ create: false, delete: false, info: false })
                    }
                />
            )}
            {show.info && (
                <PlanInfoModal
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
                    handleDelete={() => deleteMutation.mutate(id!)}
                />
            )}
        </>
    );
};

export default Plan;
