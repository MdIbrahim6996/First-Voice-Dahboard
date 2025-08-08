import toast from "react-hot-toast";
import { motion } from "motion/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHoliday } from "../../api/holiday";
type Inputs = {
    name: string;
    startDate: string;
    endDate: string;
};
const CreateHolidayModal = ({ handleClose }: { handleClose: () => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (formData) => createHoliday(formData),
        onSuccess: () => {
            toast.success("Holiday Created Successfully!");
            queryClient.invalidateQueries({
                queryKey: ["holiday"],
            });
            handleClose();
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        //@ts-ignore
        createMutation.mutate(data);
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <motion.div
                initial={{ opacity: 0.5, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg w-full max-w-xl  overflow-hidden"
            >
                <div className="">
                    <p className="bg-gray-200 py-2 px-6 text-xl">
                        Add a New Holiday
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="px-6 py-5 space-y-2"
                    autoComplete="off"
                >
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            {...register("name", {
                                required: "Please Enter Name of Holiday.",
                            })}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        />
                        {errors?.name && (
                            <p className="text-red-500 text-sm">
                                {errors?.name?.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            {...register("startDate", {
                                required: "Please Enter Start Date.",
                            })}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        />
                        {errors?.startDate && (
                            <p className="text-red-500 text-sm">
                                {errors?.startDate?.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="endDate">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            {...register("endDate", {
                                required: "Please Enter End Date.",
                            })}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        />
                        {errors?.endDate && (
                            <p className="text-red-500 text-sm">
                                {errors?.endDate?.message}
                            </p>
                        )}
                    </div>
                    <div className="my-4 text-center">
                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded mb-3 transition-colors"
                        >
                            Submit
                        </button>
                        <button
                            onClick={handleClose}
                            className="w-full cursor-pointer border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CreateHolidayModal;
