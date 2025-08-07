import toast from "react-hot-toast";
import { motion } from "motion/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProcess } from "../../api/process";
import { createPlan } from "../../api/plan";

type Inputs = {
    name: string;
    process: string;
};

const CreatePlanModal = ({ handleClose }: { handleClose: () => void }) => {
    const queryClient = useQueryClient();

    const { data: process } = useQuery({
        queryKey: ["process"],
        queryFn: getAllProcess,
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<Inputs>();

    const createMutation = useMutation({
        mutationFn: (formData) => createPlan(formData),
        onSuccess: () => {
            toast.success("Plan Created Successfully!");
            queryClient.invalidateQueries({ queryKey: ["plan"] });
            handleClose();
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
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
                        Add a New Plan
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
                            autoFocus
                            placeholder="Name"
                            {...register("name", {
                                required: "Please enter Plan Name.",
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
                        <label htmlFor="process">Process</label>
                        <select
                            id="process"
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                            {...register("process", {
                                required: "Please select a Process.",
                            })}
                        >
                            <option value="">Select an Option</option>
                            {process?.map((item: any) => (
                                <option value={item.id} className="uppercase">
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {errors?.process && (
                            <p className="text-red-500 text-sm">
                                {errors?.process?.message}
                            </p>
                        )}
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md mb-1 transition-colors"
                        >
                            Submit
                        </button>
                        <button
                            onClick={handleClose}
                            className="w-full cursor-pointer border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CreatePlanModal;
