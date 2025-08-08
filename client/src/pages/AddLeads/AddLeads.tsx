import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { createLead } from "../../api/lead";
import { getAllProcess } from "../../api/process";
import { getAllPlan } from "../../api/plan";
import type { LeadsFormInput } from "../../types/form.types";

const AddLeads = () => {
    const date = new Date();
    const currentDate = date.toString().substring(4, 15);

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        reset,
    } = useForm<LeadsFormInput>();

    const queryClient = useQueryClient();

    const { data: process } = useQuery({
        queryKey: ["process"],
        queryFn: getAllProcess,
    });
    const { data: plan } = useQuery({
        queryKey: ["plan"],
        queryFn: getAllPlan,
    });

    const processValue = watch("process") ? watch("process") : 1;

    const filterPlan = (id: number) =>
        plan?.filter((item: any) => id == item?.processId);

    const { mutate: createLeadMutation, isPending } = useMutation({
        mutationFn: (formData) => createLead(formData),
        onSuccess: (data) => {
            if (data?.id) {
                toast.success("Lead Created Successfully!");
                queryClient.invalidateQueries({
                    queryKey: ["leads"],
                });
            }
            reset();
        },
    });

    console.log(isPending);

    const onSubmit: SubmitHandler<LeadsFormInput> = (data) => {
        //@ts-ignore
        createLeadMutation(data);
    };
    return (
        <div className="overflow-y-scroll h-full">
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
                        <p className="text-3xl font-semibold uppercase">
                            Add A New Lead
                        </p>
                        <div className="py-1.5 px-10 bg-blue-700 text-white rounded-md text-sm">
                            {currentDate}
                        </div>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="mt-1 text-sm font-normal text-gray-700 w-[50%]"
                    >
                        Start Adding Leads Now & Expand Your Reach. <br /> Your
                        Gateway to New Connections.
                    </motion.p>
                </div>

                {/* Forms Starts Here */}
                <motion.form
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={handleSubmit(onSubmit)}
                    autoComplete="off"
                >
                    <p className="mb-4 text-2xl font-semibold italic text-black/80 underline">
                        Customer Information
                    </p>

                    <div className="grid grid-cols-4 gap-x-4 my-5">
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="title" className="font-semibold">
                                Title
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
                                First Name
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
                                {...register("middleName", {
                                    required: "Please Enter Middle Name.",
                                })}
                                id="middleName"
                                placeholder="Middle Name"
                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                            />
                            {errors?.middleName && (
                                <p className="text-red-500">
                                    {errors?.middleName?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="lastName" className="font-semibold">
                                Last Name
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
                            <label htmlFor="centre" className="font-semibold">
                                Centre
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
                        <div className="flex flex-col text-sm col-span-3">
                            <label htmlFor="address" className="font-semibold">
                                Address
                            </label>
                            <textarea
                                {...register("address", {
                                    required: "Please Enter Address.",
                                })}
                                id="address"
                                placeholder="Address"
                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                            />
                            {errors?.address && (
                                <p className="text-red-500">
                                    {errors?.address?.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-x-4 gap-y-4 my-5">
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="city" className="font-semibold">
                                City
                            </label>
                            <input
                                type="text"
                                {...register("city", {
                                    required: "Please Enter City Name.",
                                })}
                                id="city"
                                placeholder="West Bridgford"
                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                            />
                            {errors?.city && (
                                <p className="text-red-500">
                                    {errors?.city?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="country" className="font-semibold">
                                Country
                            </label>
                            <input
                                type="text"
                                {...register("country", {
                                    required: "Please Enter Country Name.",
                                })}
                                id="country"
                                placeholder="Nottinghamshire"
                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                            />
                            {errors?.country && (
                                <p className="text-red-500">
                                    {errors?.country?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="pinCode" className="font-semibold">
                                Pin Code
                            </label>
                            <input
                                type="text"
                                {...register("pincode", {
                                    required: "Please Enter Pincode.",
                                })}
                                id="pinCode"
                                placeholder="700001"
                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                            />
                            {errors?.pincode && (
                                <p className="text-red-500">
                                    {errors?.pincode?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="password" className="font-semibold">
                                Password
                            </label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Please Enter Password.",
                                })}
                                id="password"
                                placeholder="***********"
                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                            />
                            {errors?.password && (
                                <p className="text-red-500">
                                    {errors?.password?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="dob" className="font-semibold">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                {...register("dateOfBirth", {
                                    required: "Please Enter Date of Birth.",
                                })}
                                id="dob"
                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                            />
                            {errors?.dateOfBirth && (
                                <p className="text-red-500">
                                    {errors?.dateOfBirth?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label
                                htmlFor="phoneNumber"
                                className="font-semibold"
                            >
                                Phone Number
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
                            <label htmlFor="process" className="font-semibold">
                                Select Process
                            </label>
                            <select
                                {...register("process", {
                                    required: "Please Select a Process.",
                                })}
                                id="process"
                                defaultValue={""}
                                className="border outline-none border-gray-400 px-3 py-1 rounded"
                            >
                                <option disabled selected value="">
                                    Select a Process
                                </option>
                                {process?.map((item: any) => (
                                    <option value={item?.id}>
                                        {item?.name?.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                            {errors?.process && (
                                <p className="text-red-500">
                                    {errors?.process?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="plan" className="font-semibold">
                                Plan
                            </label>
                            <select
                                {...register("plan", {
                                    required: "Please Select a Plan.",
                                })}
                                id="plan"
                                defaultValue={""}
                                className="border outline-none border-gray-400 px-3 py-1 rounded"
                            >
                                <option disabled selected value="">
                                    Select a Plan
                                </option>
                                {filterPlan(processValue)?.map((item: any) => (
                                    <option value={item?.id}>
                                        {item?.name?.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                            {errors?.plan && (
                                <p className="text-red-500">
                                    {errors?.plan?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="closer" className="font-semibold">
                                Closer
                            </label>
                            <select
                                {...register("closer", {
                                    required: "Please Select a Closer.",
                                })}
                                id="closer"
                                defaultValue="1"
                                className="border outline-none border-gray-400 px-3 py-1 rounded"
                            >
                                <option value={8}>Mr.</option>
                                <option value={9}>Mrs.</option>
                                <option value={10}>Miss</option>
                            </select>
                            {errors?.closer && (
                                <p className="text-red-500">
                                    {errors?.closer?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="fee" className="font-semibold">
                                Fee
                            </label>
                            <input
                                type="number"
                                {...register("fee", {
                                    required: "Please Enter Fee Amount.",
                                })}
                                id="fee"
                                placeholder="$49"
                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                            />
                            {errors?.fee && (
                                <p className="text-red-500">
                                    {errors?.fee?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="currency" className="font-semibold">
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
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                                <option value="Miss">Miss</option>
                                <option value="Ms">Ms</option>
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
                            <label htmlFor="bankName" className="font-semibold">
                                Bank Name
                            </label>
                            <input
                                type="text"
                                {...register("bankName", {
                                    required: "Please Enter Bank Name.",
                                })}
                                id="bankName"
                                placeholder="West Bridgford"
                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                            />
                            {errors?.bankName && (
                                <p className="text-red-500">
                                    {errors?.bankName?.message}
                                </p>
                            )}
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
                                {...register("accountName", {
                                    required: "Please Enter Account Name.",
                                })}
                                id="accountName"
                                placeholder="Nottinghamshire"
                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                            />
                            {errors?.accountName && (
                                <p className="text-red-500">
                                    {errors?.accountName?.message}
                                </p>
                            )}
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
                                {...register("accountNumber", {
                                    required: "Please Enter Account Number.",
                                })}
                                id="accountNumber"
                                placeholder="700001"
                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                            />
                            {errors?.accountNumber && (
                                <p className="text-red-500">
                                    {errors?.accountNumber?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="sort" className="font-semibold">
                                SORT Code
                            </label>
                            <input
                                type="text"
                                {...register("sort", {
                                    required: "Please Enter Sort Code.",
                                })}
                                id="sort"
                                placeholder="***********"
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
                            <label htmlFor="comments" className="font-semibold">
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
                    <div>
                        <button
                            disabled={isPending}
                            className="bg-blue-700 text-white px-10 py-2 rounded-md disabled:bg-blue-200 disabled:cursor-not-allowed"
                        >
                            SUBMIT
                        </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default AddLeads;
