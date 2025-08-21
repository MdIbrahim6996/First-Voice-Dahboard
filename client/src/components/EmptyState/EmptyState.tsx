const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center my-10 bg-white w-full">
            {/* Illustration */}
            <div className="relative flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="180"
                    height="180"
                    viewBox="0 0 200 200"
                >
                    {/* Background circle */}
                    <circle cx="100" cy="100" r="90" fill="#E6F4F1" />

                    {/* Clipboard body */}
                    <rect
                        x="65"
                        y="60"
                        width="70"
                        height="90"
                        rx="6"
                        fill="white"
                        stroke="#CBD5E1"
                        strokeWidth="3"
                    />

                    {/* Clip on top */}
                    <rect
                        x="90"
                        y="45"
                        width="20"
                        height="15"
                        rx="4"
                        fill="#E6F4F1"
                        stroke="#CBD5E1"
                        strokeWidth="3"
                    />

                    {/* Sad face */}
                    <circle cx="90" cy="95" r="3" fill="#334155" />
                    <circle cx="110" cy="95" r="3" fill="#334155" />
                    <path
                        d="M90 115 Q100 125 110 115"
                        stroke="#334155"
                        strokeWidth="3"
                        fill="transparent"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            <p className="mt-6 text-gray-700 font-medium capitalize text-center text-lg">
                Uh oh, Nothing to show here!
            </p>
        </div>
    );
};

export default EmptyState;
