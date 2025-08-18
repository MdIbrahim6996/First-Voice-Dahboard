import { useForm } from "react-hook-form";
import { axiosInstance } from "../../../lib/axiosInstance";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/authContext";
import { motion } from "motion/react";

interface UserInput {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    // const auth = JSON.parse(localStorage.getItem("authUser")!);

    useEffect(() => {
        if (user) navigate("/");
    }, []);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<UserInput>();

    const onSubmit = async (userData: UserInput) => {
        try {
            const { data } = await axiosInstance.post(`/auth/login`, {
                ...userData,
            });
            if (data) {
                setUser(data);
                localStorage.setItem("authUser", JSON.stringify(data));
                navigate("/");
            }
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data?.message);
            }
        }
    };
    return (
        <>
            {!user ? (
                <div className="flex items-center justify-center min-h-screen bg-blue-50">
                    <div className="flex w-full max-w-6xl h-[90vh] rounded-2xl overflow-hidden shadow-lg">
                        {/* Left Section */}
                        <motion.div className="w-1/2 bg-gradient-to-b from-blue-500 to-blue-700 p-10 flex flex-col justify-center text-white">
                            <motion.h1
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl font-bold mb-4"
                            >
                                First Voice Global Services
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mb-6"
                            >
                                Driving Global Growth Through Smarter Sales
                                Solutions
                            </motion.p>
                            {/* <button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6 py-2 font-semibold transition">
                        Read More
                    </button> */}
                        </motion.div>

                        {/* Right Section */}
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="w-1/2 bg-white p-10 flex flex-col justify-center"
                        >
                            <h2 className="text-2xl font-bold mb-2 text-gray-800">
                                Hello Again!
                            </h2>
                            <p className="mb-8 text-gray-500">Welcome Back</p>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col space-y-4"
                            >
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        {...register("email", {
                                            required:
                                                "Please provide an email.",
                                        })}
                                        className="border w-full rounded-lg px-4 py-3 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors?.email && (
                                        <p className="text-red-500 my-1 ml-2">
                                            {errors?.email?.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        {...register("password", {
                                            required:
                                                "Please provide an password.",
                                            minLength: {
                                                value: 6,
                                                message:
                                                    "Password should be atleast 6 characters",
                                            },
                                            // pattern: {
                                            //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,
                                            //     message: "Pleas enter a valid Email.",
                                            // },
                                        })}
                                        className="border w-full rounded-lg px-4 py-3 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors?.password && (
                                        <p className="text-red-500 my-1 ml-2">
                                            {errors?.password?.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-3 transition font-semibold"
                                >
                                    Login
                                </button>
                            </form>
                            <button className="mt-4 text-sm text-gray-500 hover:underline">
                                Forgot Password
                            </button>
                        </motion.div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Login;
