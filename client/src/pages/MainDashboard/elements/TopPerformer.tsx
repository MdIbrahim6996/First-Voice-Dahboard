import { motion } from "motion/react";

const TopPerformer = () => {
    return (
        <div className="p-5">
            <div className="mb-5  text-gray-900 bg-white ">
                <motion.p
                    // initial={{ opacity: 0, y: 20 }}
                    // animate={{ opacity: 1, y: 0 }}
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
                    {/* Lorem, ipsum dolor. */}
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="mt-1 text-sm font-normal text-gray-700 w-[50%] mx-auto"
                >
                    Browse a list of Flowbite products designed to help you work
                    and play, stay organized, get answers, keep in touch, grow
                    your business, and more.
                </motion.p>
            </div>

            <div className="grid grid-cols-3 gap-5 mt-10 w-[80%] mx-auto">
                <motion.article
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-blue-700 p-5 rounded-md text-white text-center mt-20"
                >
                    <img src="/trophy-1.svg" alt="" className="mx-auto mb-5" />
                    <p className="text-3xl font-bold uppercase">user 2</p>
                    <p className="text-xl font-bold uppercase mt-2">(user 2)</p>
                    <p className="text-5xl font-bold uppercase mt-5">4 sales</p>
                </motion.article>
                <motion.article
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="bg-blue-700 p-5 rounded-md text-white text-center h-fit"
                >
                    <img src="/trophy-1.svg" alt="" className="mx-auto mb-5" />
                    <p className="text-3xl font-bold uppercase">user 1</p>
                    <p className="text-xl font-bold uppercase mt-2">(user 1)</p>
                    <p className="text-5xl font-bold uppercase mt-5">5 sales</p>
                </motion.article>
                <motion.article
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.75 }}
                    className="bg-blue-700 p-5 rounded-md text-white text-center mt-20"
                >
                    <img src="/trophy-1.svg" alt="" className="mx-auto mb-5" />
                    <p className="text-3xl font-bold uppercase">user 3</p>
                    <p className="text-xl font-bold uppercase mt-2">(user 3)</p>
                    <p className="text-5xl font-bold uppercase mt-5">2 sales</p>
                </motion.article>
            </div>
        </div>
    );
};

export default TopPerformer;
