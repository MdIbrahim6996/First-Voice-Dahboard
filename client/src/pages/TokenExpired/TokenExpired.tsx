import { Link } from "react-router-dom";

const TokenExpired = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#e4edf9]">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8 text-center">
                <div className="flex items-center justify-start mb-6">
                    <img
                        src="fv-logo.png"
                        className="bg-blue-600 h-10 p-1.5 rounded "
                        alt=""
                    />
                </div>
                {/* Illustration */}
                <div className="mb-6">
                    <img
                        src="/tokenExpired.png"
                        alt="Login Expired"
                        className="mx-auto max-h-40"
                    />
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Login Token Expired
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-6">
                    Hi there, your login token has expired. Login link expires
                    after every 24 hours and can only be used once.
                </p>

                {/* Button */}
                <Link to={"/login"}>
                    <button className="bg-blue-600 text-xs uppercase hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                        Login Again
                    </button>
                </Link>
                {/* Footer link */}
                <p className="text-xs text-gray-500 mt-4">
                    If this issue continues to persist,{" "}
                    <a className="text-blue-600 underline">let us know.</a>
                </p>
            </div>
        </div>
    );
};

export default TokenExpired;
