import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { getTopSellers } from "../../../api/mainDashboard";
import Loader from "../../../components/Loader/Loader";

const TopPerformer = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["top-sellers"],
        queryFn: getTopSellers,
    });
    const first = data ? data[0] : {};
    const second = data ? data[1] : {};
    const third = data ? data[2] : {};
    return (
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
                    className="text-3xl font-semibold uppercase origin-center text-center"
                >
                    Top Performers
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="mt-1 text-sm font-normal text-center text-gray-700 w-[50%] mx-auto"
                >
                    Recognizing and celebrating the exceptional dedication,
                    skill, and consistent results of our top-performing team
                    members.
                </motion.p>
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-3 gap-5 mt-10 w-[80%] mx-auto">
                    <motion.article
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-blue-700 p-5 rounded-md text-white text-center mt-20"
                        style={{ visibility: second ? "visible" : "hidden" }}
                    >
                        <div>
                            <img
                                src="/trophy-1.svg"
                                alt=""
                                className="mx-auto mb-5"
                            />
                            <p className="text-3xl font-bold uppercase">
                                {second?.user?.name}
                            </p>
                            <p className="text-xl font-bold uppercase mt-2">
                                ({second?.user?.alias})
                            </p>
                            <p className="text-5xl font-bold uppercase mt-5">
                                {second?.count} sales
                            </p>
                        </div>
                    </motion.article>

                    <motion.article
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="bg-blue-700 p-5 rounded-md text-white text-center h-fit"
                        style={{ visibility: first ? "visible" : "hidden" }}
                    >
                        <img
                            src="/trophy-1.svg"
                            alt=""
                            className="mx-auto mb-5"
                        />
                        <p className="text-3xl font-bold uppercase">
                            {first?.user?.name}
                        </p>
                        <p className="text-xl font-bold uppercase mt-2">
                            ({first?.user?.alias})
                        </p>
                        <p className="text-5xl font-bold uppercase mt-5">
                            {first?.count} sales
                        </p>
                    </motion.article>

                    <motion.article
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.75 }}
                        className="bg-blue-700 p-5 rounded-md text-white text-center mt-20"
                        style={{ visibility: third ? "visible" : "hidden" }}
                    >
                        <img
                            src="/trophy-1.svg"
                            alt=""
                            className="mx-auto mb-5"
                        />
                        <p className="text-3xl font-bold uppercase">
                            {third?.user?.name}
                        </p>
                        <p className="text-xl font-bold uppercase mt-2">
                            ({third?.user?.alias})
                        </p>
                        <p className="text-5xl font-bold uppercase mt-5">
                            {third?.count ? third?.count : 0} sales
                        </p>
                    </motion.article>
                </div>
            )}
        </div>
    );
};

export default TopPerformer;
