export default function AccessDenied() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg text-center">
                {/* Illustration */}
                <div className="mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 200 200"
                        className="mx-auto w-32 h-32"
                    >
                        {/* Monitor */}
                        <rect
                            x="20"
                            y="40"
                            width="160"
                            height="100"
                            rx="8"
                            fill="#F3F4F6"
                            stroke="#9CA3AF"
                            strokeWidth="3"
                        />
                        <rect
                            x="50"
                            y="150"
                            width="100"
                            height="8"
                            rx="4"
                            fill="#9CA3AF"
                        />
                        <rect
                            x="70"
                            y="160"
                            width="60"
                            height="8"
                            rx="4"
                            fill="#9CA3AF"
                        />

                        {/* Lock */}
                        <rect
                            x="85"
                            y="85"
                            width="30"
                            height="25"
                            rx="4"
                            fill="#374151"
                        />
                        <path
                            d="M95 85 V75 a10 10 0 0 1 20 0 v10"
                            stroke="#374151"
                            strokeWidth="4"
                            fill="none"
                        />
                        <circle cx="100" cy="97" r="3" fill="#D1D5DB" />
                    </svg>
                </div>

                {/* Heading */}
                <h1 className="text-xl font-semibold mb-2">
                    You don’t have permission to access this part of
                    application!
                </h1>

                {/* Description */}
                <p className="text-gray-600 mb-4">
                    The owner of the workspace has not given you permission to
                    access this Route. Please contact the owner of the
                    workspace.
                </p>

                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Go back
                </button>
            </div>
        </div>
    );
}
