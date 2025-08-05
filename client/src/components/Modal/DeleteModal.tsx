import toast from "react-hot-toast";
import { motion } from "motion/react";

const DeleteModal = ({
    handleClose,
    handleDelete,
}: {
    handleClose: () => void;
    handleDelete: () => void;
}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <motion.div
                initial={{ opacity: 0.5, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 text-center"
            >
                <div className="flex justify-center mb-4">
                    <div className="bg-red-100 p-3 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8 text-red-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3m0 3h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                            />
                        </svg>
                    </div>
                </div>
                <h2 className="text-lg font-semibold mb-2">Are you sure?</h2>
                <p className="text-sm text-gray-600 mb-6">
                    This action cannot be undone. All values associated with
                    this field will be lost.
                </p>
                <button
                    onClick={() => {
                        handleDelete();
                        toast.success("Deleted Successfully!");
                        handleClose();
                    }}
                    className="w-full cursor-pointer bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded mb-3 transition-colors"
                >
                    Delete
                </button>
                <button
                    onClick={handleClose}
                    className="w-full cursor-pointer border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded transition-colors"
                >
                    Cancel
                </button>
            </motion.div>
        </div>
    );
};

export default DeleteModal;
