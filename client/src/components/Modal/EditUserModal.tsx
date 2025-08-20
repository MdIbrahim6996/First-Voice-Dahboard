import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { updateUser } from "../../api/user";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { getAllProcess } from "../../api/process";
import { MdRemoveRedEye } from "react-icons/md";

type Inputs = {
    employeeId: string;
    name: string;
    alias: string;
    phone: string;
    role: string;
    process: number;
    email: string;
    block: number;
    password: string;
};

const EditUserModal = ({
    handleClose,
    detail,
}: {
    handleClose: () => void;
    detail: any;
}) => {
    console.log(detail);
    const { register, handleSubmit } = useForm<Inputs>({
        defaultValues: {
            ...detail,
            password: "",
            block: detail?.isBlocked ? 1 : 0,
            process: detail?.processId,
        },
    });
    const [showPassword, setShowPassword] = useState(false);

    const queryClient = useQueryClient();

    const { data: process } = useQuery({
        queryKey: ["process"],
        queryFn: getAllProcess,
    });

    const { mutate } = useMutation({
        mutationKey: ["updateUser"],
        mutationFn: updateUser,
        onSuccess: (data) => {
            if (data?.id) {
                toast.success("User Updated Successfully.");
                queryClient.invalidateQueries({
                    queryKey: ["user"],
                });
                handleClose();
            }
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        mutate({ ...data, id: detail?.id });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <motion.div
                initial={{ opacity: 0.5, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg w-full max-w-xl overflow-y-scroll max-h-[90vh]"
            >
                <div className="">
                    <p className="bg-gray-200 py-2 px-6 text-xl">
                        Add a New User
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="px-6 py-5 space-y-3"
                    autoComplete="off"
                >
                    <div>
                        <label
                            htmlFor="employeeId"
                            className="text-sm font-semibold"
                        >
                            Employee Id
                        </label>
                        <input
                            type="text"
                            placeholder="Employee Id"
                            {...register("employeeId", {
                                required: "Please Enter Employee Id.",
                            })}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="text-sm font-semibold">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            {...register("name")}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="alias"
                            className="text-sm font-semibold"
                        >
                            Alias
                        </label>
                        <input
                            type="text"
                            placeholder="Alias"
                            {...register("alias")}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="text-sm font-semibold"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="phone"
                            className="text-sm font-semibold"
                        >
                            Phone
                        </label>
                        <input
                            type="tel"
                            maxLength={10}
                            placeholder="(033) 2345 9675"
                            {...register("phone")}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="text-sm font-semibold">
                            Role
                        </label>
                        <select
                            id="role"
                            {...register("role")}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        >
                            <option value="" selected disabled>
                                Select a Role
                            </option>
                            <option value="admin">ADMIN</option>
                            <option value="superadmin">SUPERADMIN</option>
                            <option value="user">USER</option>
                            <option value="closer">CLOSER</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="process"
                            className="text-sm font-semibold"
                        >
                            Process
                        </label>
                        <select
                            id="process"
                            {...register("process")}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        >
                            <option value="" selected disabled>
                                Select a Process
                            </option>
                            {process?.map((item: any) => (
                                <option value={item?.id} className="uppercase">
                                    {item?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="allowLogin"
                            className="text-sm font-semibold"
                        >
                            Block This User
                        </label>
                        <select
                            {...register("block")}
                            id="allowLogin"
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        >
                            <option value="">Select</option>
                            <option value={1}>true</option>
                            <option selected value={0}>
                                false
                            </option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="text-sm font-semibold"
                        >
                            Password
                        </label>
                        <div className="flex items-center justify-between border border-gray-400 rounded-md">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="*********"
                                {...register("password")}
                                className="w-full px-2 py-1  outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-black/70 mr-2"
                            >
                                <MdRemoveRedEye />
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded mb-1 transition-colors"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
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

export default EditUserModal;
