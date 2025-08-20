import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { createSuperAdminLead } from "../../api/lead";
import { getAllProcess } from "../../api/process";
import { getAllPlan } from "../../api/plan";
import type { LeadsFormInput } from "../../types/form.types";
import { getAllUserforUsers } from "../../api/user";
import { useEffect, useState } from "react";
import valid from "card-validator";

const AddLeads = () => {
    const date = new Date();
    const currentDate = date.toString().substring(4, 15);
    const [cardName, setCardName] = useState("");

    const {
        register,
        unregister,
        formState: { errors },
        handleSubmit,
        watch,
        reset,
        // control,
        trigger,
    } = useForm<LeadsFormInput>({
        defaultValues: {},
    });

    // const { fields, append, remove } = useFieldArray({
    //     control,
    //     name: "appliances",
    // });

    const queryClient = useQueryClient();

    const { data: process } = useQuery({
        queryKey: ["process"],
        queryFn: getAllProcess,
    });
    
    const { data: plan } = useQuery({
        queryKey: ["plan"],
        queryFn: getAllPlan,
    });

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: getAllUserforUsers,
    });

    const processValue = watch("process") ? watch("process") : 1;
    const paymentMethod = watch("paymentMethod");

    const filterPlan = (id: number) =>
        plan?.filter((item: any) => id == item?.processId);

    const filterUser = user?.filter((item: any) => item?.role === "user");

    const { mutate: createLeadMutation, isPending } = useMutation({
        mutationFn: (formData) => createSuperAdminLead(formData),
        onSuccess: (data) => {
            if (data?.id) {
                toast.success("Lead Created Successfully!");
                queryClient.invalidateQueries({
                    queryKey: ["leads"],
                });
                reset();
            }
        },
    });

    useEffect(() => {
        if (paymentMethod === "demandDraft") {
            unregister("card");
            register("bank");
        } else {
            unregister("bank");
        }
        if (paymentMethod === "card") {
            unregister("bank");
            register("card");
        } else {
            unregister("card");
        }
    }, [register, unregister, paymentMethod]);

    const onSubmit: SubmitHandler<LeadsFormInput> = (data) => {
        console.log(data);
        //@ts-ignore
        createLeadMutation(data);
    };

    const cardNumber = watch("card.cardNumber");

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
                                Title <span className="text-red-500">*</span>
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
                            <label htmlFor="lastName" className="font-semibold">
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
                            <label htmlFor="centre" className="font-semibold">
                                Centre <span className="text-red-500">*</span>
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
                            <label htmlFor="county" className="font-semibold">
                                County
                            </label>
                            <input
                                type="text"
                                {...register("county")}
                                id="county"
                                placeholder="Nottinghamshire"
                                className="border border-gray-400 px-3 py-1 rounded outline-none"
                            />
                        </div>
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="pinCode" className="font-semibold">
                                Pin Code <span className="text-red-500">*</span>
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
                    </div>
                    <div className="grid grid-cols-4 gap-x-4 gap-y-4 my-5">
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="password" className="font-semibold">
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
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="poa" className="font-semibold">
                                Power Of Attorney
                            </label>
                            <select
                                {...register("poa", {
                                    required: "Please Select Yes/No.",
                                })}
                                id="poa"
                                defaultValue={""}
                                className="border outline-none border-gray-400 px-3 py-1 rounded"
                            >
                                <option disabled selected value="">
                                    Select Yes/No.
                                </option>
                                <option value={"true"}>YES</option>
                                <option value={"false"}>NO</option>
                            </select>
                            {errors?.poa && (
                                <p className="text-red-500">
                                    {errors?.poa?.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <p className="mb-4 mt-16 text-2xl font-semibold italic text-black/80 underline">
                        Customer Plan and Product Details
                    </p>

                    <div className="grid grid-cols-4 gap-x-4 gap-y-4 my-5">
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
                                    <option key={item?.id} value={item?.id}>
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
                                    <option value={item?.id} key={item?.id}>
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
                                className="border outline-none border-gray-400 px-3 py-1 rounded"
                            >
                                <option selected value="">
                                    Select a Closer
                                </option>
                                {filterUser?.map((item: any) => (
                                    <option key={item?.id} value={item?.id}>
                                        {item?.name?.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                            {errors?.closer && (
                                <p className="text-red-500">
                                    {errors?.closer?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="verifier" className="font-semibold">
                                Verifier
                            </label>
                            <select
                                {...register("verifier", {
                                    required: "Please Select a Verifier.",
                                })}
                                id="verifier"
                                className="border outline-none border-gray-400 px-3 py-1 rounded"
                            >
                                <option selected value="">
                                    Select a Verifier
                                </option>
                                {filterUser?.map((item: any) => (
                                    <option key={item?.id} value={item?.id}>
                                        {item?.name?.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                            {errors?.verifier && (
                                <p className="text-red-500">
                                    {errors?.verifier?.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-4 my-5">
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label
                                htmlFor="paymentMethod"
                                className="font-semibold"
                            >
                                Select Payment Method
                            </label>
                            <select
                                {...register("paymentMethod", {
                                    required: "Please Select a Payment Method.",
                                })}
                                id="paymentMethod"
                                className="border outline-none border-gray-400 px-3 py-1 rounded"
                            >
                                <option disabled selected value="">
                                    Select a Payment Method
                                </option>
                                <option value="cash/cheque">Cash/Cheque</option>
                                <option value="directDebit">
                                    Direct Debit (DD)
                                </option>
                                <option value="card">Card</option>
                            </select>
                            {errors?.paymentMethod && (
                                <p className="text-red-500">
                                    {errors?.paymentMethod?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="shift" className="font-semibold">
                                Shift
                            </label>
                            <select
                                {...register("shift", {
                                    required: "Please Select a Shift.",
                                })}
                                id="shift"
                                className="border outline-none border-gray-400 px-3 py-1 rounded"
                            >
                                <option selected value="UNITED KINGDOM (UK)">
                                    UNITED KINGDOM (UK)
                                </option>
                                <option value="UNITED STATES (US)">
                                    UNITED STATES (US)
                                </option>
                                <option value="AUSTRALIA">
                                    AUSTRALIA (AU)
                                </option>
                            </select>
                            {errors?.shift && (
                                <p className="text-red-500">
                                    {errors?.shift?.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {paymentMethod === "directDebit" && (
                        <div className="my-5">
                            <p className="capitalize text underline font-semibold italic">
                                bank account details
                            </p>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-4">
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="bankName"
                                        className="font-semibold"
                                    >
                                        Bank Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register("bank.bankName", {
                                            required: "Please Enter Bank Name.",
                                        })}
                                        id="bankName"
                                        placeholder="Bank of UK."
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                    {errors?.bank?.bankName && (
                                        <p className="text-red-500">
                                            {errors?.bank?.bankName?.message}
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
                                        {...register("bank.accountName", {
                                            required:
                                                "Please Enter Account Name.",
                                        })}
                                        id="accountName"
                                        placeholder="Steve Balmer"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                    {errors?.bank?.accountName && (
                                        <p className="text-red-500">
                                            {errors?.bank?.accountName?.message}
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
                                        {...register("bank.accountNumber", {
                                            required:
                                                "Please Enter Account Number.",
                                        })}
                                        id="accountNumber"
                                        placeholder="000405007899"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                    {errors?.bank?.accountNumber && (
                                        <p className="text-red-500">
                                            {
                                                errors?.bank?.accountNumber
                                                    ?.message
                                            }
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="sort"
                                        className="font-semibold"
                                    >
                                        SORT Code
                                    </label>
                                    <input
                                        type="text"
                                        {...register("bank.sort", {
                                            required: "Please Enter Sort Code.",
                                        })}
                                        id="sort"
                                        placeholder="******"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                    {errors?.bank?.sort && (
                                        <p className="text-red-500">
                                            {errors?.bank?.sort?.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {paymentMethod === "card" && (
                        <div className="my-5">
                            <p className="capitalize text underline font-semibold italic">
                                card details
                            </p>
                            <div className="grid grid-cols-8 gap-x-4 gap-y-4 ">
                                <div className="col-span-2 flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="cardName"
                                        className="font-semibold"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register("card.name", {
                                            required:
                                                "Please Enter Card Holder's Name.",
                                        })}
                                        id="cardName"
                                        placeholder="Steve Morrison"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                    {errors?.card?.name && (
                                        <p className="text-red-500">
                                            {errors?.card?.name?.message}
                                        </p>
                                    )}
                                </div>
                                <div className="col-span-2 flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="cardBankName"
                                        className="font-semibold"
                                    >
                                        Bank Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register("card.bankName", {
                                            required: "Please Enter Bank Name.",
                                        })}
                                        id="cardBankName"
                                        placeholder="Bank of UK"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                    {errors?.card?.bankName && (
                                        <p className="text-red-500">
                                            {errors?.card?.bankName?.message}
                                        </p>
                                    )}
                                </div>
                                <div className="col-span-2 flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="cardNumber"
                                        className="font-semibold"
                                    >
                                        Card Number
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={16}
                                        {...register("card.cardNumber", {
                                            onChange: () =>
                                                trigger("card.cardNumber"),
                                            required:
                                                "Please Enter Card Number.",
                                            validate: (data) => {
                                                const numberValidation =
                                                    valid.number(data);

                                                if (numberValidation.card) {
                                                    setCardName(
                                                        numberValidation.card
                                                            .type
                                                    );
                                                }
                                                if (!numberValidation.isValid) {
                                                    setCardName("");
                                                    return "Invalid Card.";
                                                }
                                            },
                                        })}
                                        id="cardNumber"
                                        placeholder="4242 4242 4242 4242"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                    <div className="flex gap-3">
                                        {cardName && cardNumber.length > 0 && (
                                            <p className="text-green-600 uppercase ml-2">
                                                &#10003; {cardName}
                                            </p>
                                        )}
                                        {errors?.card?.cardNumber && (
                                            <p className="text-red-500">
                                                {
                                                    errors?.card?.cardNumber
                                                        ?.message
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-1 flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="expiry"
                                        className="font-semibold"
                                    >
                                        Card Expiry
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={7}
                                        {...register("card.expiry", {
                                            required:
                                                "Please Enter Card Expiry.",
                                            onChange: () =>
                                                trigger("card.expiry"),
                                            validate: (data) => {
                                                const dateValidation =
                                                    valid.expirationDate(data);

                                                if (
                                                    !dateValidation.isPotentiallyValid
                                                ) {
                                                    return "Invalid Date.";
                                                }

                                                if (dateValidation.isValid) {
                                                    return true;
                                                }
                                            },
                                        })}
                                        id="expiry"
                                        placeholder="05/30"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                    {errors?.card?.expiry && (
                                        <p className="text-red-500">
                                            {errors?.card?.expiry?.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col text-sm space-y-0.5">
                                    <label
                                        htmlFor="cvv"
                                        className="font-semibold"
                                    >
                                        Card CVV
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={3}
                                        {...register("card.cvv", {
                                            required: "Please Enter CVV.",
                                        })}
                                        id="cvv"
                                        placeholder="424"
                                        className="border border-gray-400 px-3 py-1 rounded outline-none"
                                    />
                                    {errors?.card?.cvv && (
                                        <p className="text-red-500">
                                            {errors?.card?.cvv?.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* <div className="grid grid-cols-3 gap-x-4 gap-y-4 my-5">
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
                    </div> */}

                    <div className="mb-4">
                        <div className="flex flex-col text-sm space-y-0.5">
                            <label htmlFor="comments" className="font-semibold">
                                Comments
                            </label>
                            <textarea
                                {...register("comment")}
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
