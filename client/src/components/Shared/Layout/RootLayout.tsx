import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/authContext";
import { ErrorBoundary } from "react-error-boundary";
import FallbackRenderer from "../FallbackRenderer/FallbackRenderer";

const RootLayout = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) navigate("/login");
    }, []);
    return (
        <>
            <ErrorBoundary FallbackComponent={() => <FallbackRenderer />}>
                {user && (
                    <div className="bg-blue-700 h-screen max-w-screen flex gap-3 gradient-backgroun">
                        <div className="min-w-[17rem] max-w-[17rem] sidebar">
                            <Sidebar />
                        </div>
                        <div className="w-full m-2 rounded-xl bg-white overflow-scroll sidebar">
                            <Outlet />
                        </div>
                    </div>
                )}
            </ErrorBoundary>
        </>
    );
};

export default RootLayout;
