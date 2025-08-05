import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { getAllNotifs } from "../../../../api/superAdmin/notifications";

const NotificationComp = ({ userId }: { userId: number }) => {
    const { data: notif } = useQuery({
        queryKey: ["admin-notif", userId],
        queryFn: () => getAllNotifs(userId!),
    });

    return (
        <section className="p-4">
            <div>
                <p className="text-2xl text-center my-4">
                    {notif?.length}{" "}
                    {notif?.length > 1 ? "Notifications" : "Notification"}
                </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-5">
                {notif?.map((item: any, i: number) => (
                    <motion.article
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                        key={item.id}
                        className={`px-4 py-2 rounded-md shadow-lg flex gap-x-2 border-t border-slate-300`}
                    >
                        <div>
                            <p className="capitalize font-semibold text-xl">
                                {item?.title}
                            </p>
                            <p className="text-sm">{item?.content}</p>
                            <div>
                                <button
                                    disabled
                                    className="capitalize bg-green-400 text-white/95 text-xs font-semibold 
                                    px-6 py-1 rounded-md mt-2 cursor-not-allowed hover:scale-105 transition duration-200"
                                >
                                    mark as read
                                </button>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
};

export default NotificationComp;
