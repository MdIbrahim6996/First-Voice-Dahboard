import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFoundPage() {
    return (
        <div className="absolute top-0 left-0 w-full">
            <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6">
                <motion.img
                    src="/app/broken.svg"
                    alt="404 Illustration"
                    className="w-40 h-40 mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                />
                <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Looks like you're lost. The page you are looking for is not
                    available.
                </p>
                <Link
                    to="/"
                    className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
                >
                    Go to Home →
                </Link>
            </div>
        </div>
    );
}
