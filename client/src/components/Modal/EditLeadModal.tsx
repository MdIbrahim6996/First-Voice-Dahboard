import { motion } from "motion/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { UpdateLeadsFormInput } from "../../types/form.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateLead } from "../../api/lead";
import toast from "react-hot-toast";
import { getAllStatus } from "../../api/status";

const EditLeadModal = ({
    handleClose,
    item,
}: {
    handleClose: () => void;
    item: any;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<UpdateLeadsFormInput>({
        defaultValues: {
            title: item?.title,
            firstName: item?.firstName,
            middleName: item?.middleName,
            lastName: item?.lastName,
            address: item?.address,
            city: item?.city,
            country: item?.country,
            centre: item?.centre,
            pincode: item?.pincode,
            phone: item?.phone,
            fee: item?.fee,
            currency: item?.currency,
            bankName: item?.bankName,
            accountName: item?.accountName,
            accountNumber: item?.accountNumber,
            sort: item?.sort,
            dateOfBirth: item?.dateOfBirth?.substring(0, 10),
            status: item?.statusId,
        },
    });

    const queryClient = useQueryClient();
    const finalStatus = watch("status");
    const statusCheck = watch("status");
    const { data: status } = useQuery({
        queryKey: ["status"],
        queryFn: getAllStatus,
    });

    const editMutation = useMutation({
        mutationFn: updateLead,
        onSuccess: (data) => {
            if (data?.id) {
                queryClient.invalidateQueries({ queryKey: ["leads"] });
                toast.success("Edited Successfully.");
                handleClose();
            }
        },
    });

    const onSubmit: SubmitHandler<UpdateLeadsFormInput> = (data) => {
        editMutation.mutate({
            ...data,
            id: item?.id,
            initialStatus: item?.status?.name,
            finalStatus: finalStatus,
        });
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 overflow-y-scroll">
            <motion.div
                initial={{ opacity: 0.5, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg w-full max-w-3xl h-[90vh] overflow-y-scroll"
            >
                <div className="">
                    <p className="bg-gray-200 py-2 px-6 text-xl">
                        Add a New Holiday
                    </p>
                </div>
                <div className="m-4 my-10">
                    <motion.form
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={handleSubmit(onSubmit)}
                        autoComplete="off"
                    >
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="title" className="font-semibold">
                                Change Status
                            </label>
                            <select
                                {...register("status", {
                                    required: "Please select Status.",
                                })}
                                id="status"
                                className="border outline-none border-gray-400 px-3 py-1 rounded"
                            >
                                <option selected={true} disabled value="0">
                                    Select A Status
                                </option>
                                {status?.map((item: any) => (
                                    <option value={item?.id}>
                                        {item?.name}
                                    </option>
                                ))}
                            </select>
                            {errors?.status && (
                                <p className="text-red-500">
                                    {errors?.status?.message}
                                </p>
                            )}
                        </div>

                        {item?.statusId !== statusCheck && (
                            <div className="flex flex-col text-sm space-y-0.5 my-2">
                                <label
                                    htmlFor="reason"
                                    className="font-semibold"
                                >
                                    Reason For Status Change:
                                </label>
                                <textarea
                                    rows={5}
                                    id="reason"
                                    {...register("reason")}
                                    placeholder="Reason"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
                        )}

                        <p className="mb-4 text-2xl font-semibold italic text-black/80 underline">
                            Customer Information
                        </p>

                        <div className="grid grid-cols-4 gap-x-4 my-5">
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="title"
                                    className="font-semibold"
                                >
                                    Title{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    {...register("title", {
                                        required: "Please select Title.",
                                    })}
                                    id="title"
                                    defaultValue="1"
                                    className="border outline-none border-gray-400 px-3 py-1 rounded"
                                >
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Miss">Miss</option>
                                    <option value="Ms">Ms</option>
                                </select>
                                {errors?.title && (
                                    <p className="text-red-500">
                                        {errors?.title?.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="firstName"
                                    className="font-semibold"
                                >
                                    First Name{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("firstName", {
                                        required: "Please Enter First Name.",
                                    })}
                                    id="firstName"
                                    placeholder="First Name"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                                {errors?.firstName && (
                                    <p className="text-red-500">
                                        {errors?.firstName?.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="middleName"
                                    className="font-semibold"
                                >
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    {...register("middleName")}
                                    id="middleName"
                                    placeholder="Middle Name"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="lastName"
                                    className="font-semibold"
                                >
                                    Last Name{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("lastName", {
                                        required: "Please Enter Last Name.",
                                    })}
                                    id="lastName"
                                    placeholder="Last Name"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                                {errors?.lastName && (
                                    <p className="text-red-500">
                                        {errors?.lastName?.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-x-4 my-5">
                            <div className="flex flex-col text-sm">
                                <label
                                    htmlFor="centre"
                                    className="font-semibold"
                                >
                                    Centre{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("centre", {
                                        required: "Please Enter Centre Name.",
                                    })}
                                    id="centre"
                                    placeholder="Centre"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                                {errors?.centre && (
                                    <p className="text-red-500">
                                        {errors?.centre?.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col text-sm col-span-4">
                                <label
                                    htmlFor="address"
                                    className="font-semibold"
                                >
                                    Address
                                </label>
                                <textarea
                                    {...register("address")}
                                    id="address"
                                    placeholder="Address"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-x-4 gap-y-4 my-5">
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label htmlFor="city" className="font-semibold">
                                    City
                                </label>
                                <input
                                    type="text"
                                    {...register("city")}
                                    id="city"
                                    placeholder="West Bridgford"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="country"
                                    className="font-semibold"
                                >
                                    Country
                                </label>
                                <input
                                    type="text"
                                    {...register("country")}
                                    id="country"
                                    placeholder="Nottinghamshire"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="pinCode"
                                    className="font-semibold"
                                >
                                    Pin Code{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("pincode")}
                                    id="pinCode"
                                    placeholder="700001"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="password"
                                    className="font-semibold"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    {...register("password")}
                                    id="password"
                                    placeholder="***********"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label htmlFor="dob" className="font-semibold">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    {...register("dateOfBirth")}
                                    id="dob"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="phoneNumber"
                                    className="font-semibold"
                                >
                                    Phone Number{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    maxLength={10}
                                    {...register("phone", {
                                        required: "Please Enter Phone Number.",
                                    })}
                                    id="phone"
                                    placeholder="(033) 2347 9645"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                                {errors?.phone && (
                                    <p className="text-red-500">
                                        {errors?.phone?.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <p className="mb-4 mt-16 text-2xl font-semibold italic text-black/80 underline">
                            Customer Plan and Product Details
                        </p>

                        <div className="grid grid-cols-5 gap-x-4 gap-y-4 my-5">
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label htmlFor="fee" className="font-semibold">
                                    Fee
                                </label>
                                <input
                                    type="number"
                                    {...register("fee")}
                                    id="fee"
                                    placeholder="$49"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="currency"
                                    className="font-semibold"
                                >
                                    Currency
                                </label>
                                <select
                                    {...register("currency", {
                                        required: "Please Select a Currency.",
                                    })}
                                    id="currency"
                                    defaultValue="1"
                                    className="border outline-none border-gray-400 px-3 py-1 rounded"
                                >
                                    <option value="US DOLLAR">US DOLLAR</option>
                                    <option value="BRITISH POUND">
                                        BRITISH POUND
                                    </option>
                                    <option value="AUSTRALIAN DOLLAR">
                                        AUSTRALIAN DOLLAR
                                    </option>
                                    <option value="NEW ZEALAND DOLLAR">
                                        NEW ZEALAND DOLLAR
                                    </option>
                                </select>
                                {errors?.currency && (
                                    <p className="text-red-500">
                                        {errors?.currency?.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-x-4 gap-y-4 my-5">
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="bankName"
                                    className="font-semibold"
                                >
                                    Bank Name
                                </label>
                                <input
                                    type="text"
                                    {...register("bankName")}
                                    id="bankName"
                                    placeholder="West Bridgford"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="accountName"
                                    className="font-semibold"
                                >
                                    Account Name
                                </label>
                                <input
                                    type="text"
                                    {...register("accountName")}
                                    id="accountName"
                                    placeholder="Nottinghamshire"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="accountNumber"
                                    className="font-semibold"
                                >
                                    Account Number
                                </label>
                                <input
                                    type="text"
                                    {...register("accountNumber")}
                                    id="accountNumber"
                                    placeholder="700001"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label htmlFor="sort" className="font-semibold">
                                    SORT Code
                                </label>
                                <input
                                    type="text"
                                    {...register("sort")}
                                    id="sort"
                                    placeholder="Sort Code"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                                {errors?.sort && (
                                    <p className="text-red-500">
                                        {errors?.sort?.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-x-4 gap-y-4 my-5">
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="appliance"
                                    className="font-semibold"
                                >
                                    Appliance
                                </label>
                                <input
                                    type="text"
                                    name="appliance"
                                    id="appliance"
                                    placeholder="Nottinghamshire"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="makeOfAppliance"
                                    className="font-semibold"
                                >
                                    Make of Appliance
                                </label>
                                <input
                                    type="text"
                                    name="makeOfAppliance"
                                    id="makeOfAppliance"
                                    placeholder="700001"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label htmlFor="age" className="font-semibold">
                                    Age
                                </label>
                                <input
                                    type="text"
                                    name="age"
                                    id="age"
                                    placeholder="***********"
                                    className="border border-gray-400 px-3 py-1 rounded-md outline-none"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex flex-col text-sm space-y-0.5">
                                <label
                                    htmlFor="comments"
                                    className="font-semibold"
                                >
                                    Comments
                                </label>
                                <textarea
                                    name="comment"
                                    rows={5}
                                    id="comments"
                                    placeholder="Comments if Any"
                                    className="border border-gray-400 px-3 py-1 rounded outline-none"
                                />
                            </div>
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
                    </motion.form>
                </div>
            </motion.div>
        </div>
    );
};

export default EditLeadModal;
