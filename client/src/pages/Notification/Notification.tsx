import { motion } from "motion/react";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteNotifs, getAllNotifs } from "../../api/notifications";
import { AuthContext } from "../../context/authContext";
import EmptyState from "../../components/EmptyState/EmptyState";
import Loader from "../../components/Loader/Loader";

const Notification = () => {
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const { data: notif = [], isLoading } = useQuery({
        queryKey: ["notif"],
        queryFn: () => getAllNotifs(user?.id!),
    });

    const deleteMutation = useMutation({
        mutationKey: ["del-notif"],
        mutationFn: (id: number) => deleteNotifs(user?.id!, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notif"] });
        },
    });

    return (
        <div>
            <div className="overflow-y-scroll h-screen">
                <div className="p-5">
                    <div className="mb-5  text-gray-900 bg-white ">
                        <motion.p
                            initial={{
                                opacity: 0,
                                scale: 1.2,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-semibold uppercase origin-center w-fit"
                        >
                            Good Day, {"User"}
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="mt-1 text-sm font-normal text-gray-700 w-[50%]"
                        >
                            Hope you are having energetic and productive day.
                        </motion.p>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-5">
                        {!isLoading ? (
                            notif?.length > 0 ? (
                                notif?.map((item: any, i: number) => (
                                    <motion.article
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: i * 0.2,
                                        }}
                                        key={item.id}
                                        className={`px-4 py-2 rounded-md shadow-lg flex gap-x-2 ${
                                            item?.type === "urgent"
                                                ? "bg-red-500 text-white"
                                                : ""
                                        } ${
                                            item?.type === "moderate"
                                                ? "bg-yellow-500 text-white"
                                                : ""
                                        }`}
                                    >
                                        <div className="w-full">
                                            <p className="capitalize font-semibold text-xl ">
                                                {item?.title}
                                            </p>
                                            <p className="text-sm whitespace-pre-wrap">
                                                {item?.content}
                                            </p>
                                            <div className="flex justify-between items-baseline w-full mt-2">
                                                <button
                                                    onClick={() =>
                                                        deleteMutation.mutate(
                                                            item?.id
                                                        )
                                                    }
                                                    className="capitalize bg-green-400 text-white/95 text-xs font-semibold 
                                    px-6 py-1 rounded-md cursor-pointer hover:scale-105 transition duration-200"
                                                >
                                                    mark as read
                                                </button>
                                                <p className="text-xs">
                                                    {new Date(
                                                        item?.createdAt
                                                    ).toDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))
                            ) : (
                                <EmptyState />
                            )
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
