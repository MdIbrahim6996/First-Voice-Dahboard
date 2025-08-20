import { motion } from "motion/react";
import toast from "react-hot-toast";

import { useForm, type SubmitHandler } from "react-hook-form";
import { createUser } from "../../api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProcess } from "../../api/process";
import { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";

type Inputs = {
    employeeId: string;
    name: string;
    alias: string;
    phone: string;
    role: string;
    process: number;
    email: string;
    block: boolean;
    password: string;
};

const CreateUserModal = ({ handleClose }: { handleClose: () => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const [showPassword, setShowPassword] = useState(false);

    const queryClient = useQueryClient();

    const { data: process } = useQuery({
        queryKey: ["process"],
        queryFn: getAllProcess,
    });

    const createMutation = useMutation({
        mutationFn: (formData) => createUser(formData),
        onSuccess: (data) => {
            if (data?.id) {
                toast.success("User Created Successfully!");
                queryClient.invalidateQueries({ queryKey: ["user"] });
                handleClose();
            }
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
                        {errors.employeeId && (
                            <p className="text-red-500 text-sm">
                                {errors?.employeeId?.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="name" className="text-sm font-semibold">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            {...register("name", {
                                required: "Please Enter Name.",
                            })}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors?.name?.message}
                            </p>
                        )}
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
                            {...register("alias", {
                                required: "Please Enter Alias Name.",
                            })}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        />
                        {errors.alias && (
                            <p className="text-red-500 text-sm">
                                {errors?.alias?.message}
                            </p>
                        )}
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
                            {...register("email", {
                                required: "Please Enter Email Address.",
                            })}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors?.email?.message}
                            </p>
                        )}
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
                            {...register("phone", {
                                required: "Please Enter Phone Number.",
                            })}
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm">
                                {errors?.phone?.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="role" className="text-sm font-semibold">
                            Role
                        </label>
                        <select
                            id="role"
                            {...register("role", {
                                required: "Please Select a Role.",
                            })}
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
                        {errors.role && (
                            <p className="text-red-500 text-sm">
                                {errors?.role?.message}
                            </p>
                        )}
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
                            {...register("process", {
                                required: "Please Select a Process.",
                            })}
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
                        {errors.process && (
                            <p className="text-red-500 text-sm">
                                {errors?.process?.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="aloowLogin"
                            className="text-sm font-semibold"
                        >
                            Block This User
                        </label>
                        <select
                            {...register("block")}
                            id="aloowLogin"
                            className="w-full border border-gray-400 px-2 py-1 rounded-md outline-none"
                        >
                            <option value="true">true</option>
                            <option selected value="false">
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
                                {...register("password", {
                                    required: "Please Enter Password.",
                                })}
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
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors?.password?.message}
                            </p>
                        )}
                    </div>
                    <div className="mt-4 text-center">
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

export default CreateUserModal;
