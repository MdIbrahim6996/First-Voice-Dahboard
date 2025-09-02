import { Link, useNavigate } from "react-router-dom";

const FallbackRenderer = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
            <img
                src="/wrong.jpg"
                alt="Something went wrong"
                className="w-64 mb-8"
            />
            <h1 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-4">
                Oh no, something went wrong!
            </h1>
            <p className="text-gray-600 text-center max-w-md mb-6">
                So sorry, but our site is under maintenance right now.
                <br />
                We're doing our best and we'll be back soon.
            </p>
            <button
                onClick={() => navigate(0)}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
                <Link to={"/login"}>Refresh Page</Link>
            </button>
        </div>
    );
};

export default FallbackRenderer;
