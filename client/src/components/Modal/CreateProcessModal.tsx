import { motion } from "motion/react";
import toast from "react-hot-toast";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProcess } from "../../api/process";

type Inputs = {
    name: string;
};

const CreateProcessModal = ({ handleClose }: { handleClose: () => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (formData) => createProcess(formData),
        onSuccess: () => {
            toast.success("Process Created Successfully!");
            queryClient.invalidateQueries({ queryKey: ["process"] });
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
                        Add a New Process
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
                            autoFocus
                            {...register("name", {
                                required: "Please enter Process Name.",
                            })}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors?.name?.message}
                            </p>
                        )}
                    </div>
                    <div className="mt-4  text-center">
                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded mb-1 transition-colors"
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

export default CreateProcessModal;
