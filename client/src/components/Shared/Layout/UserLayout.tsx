import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import AccessDenied from "../../../pages/AccessDenied/AccessDenied";

const UserLayout = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    useEffect(() => {
        if (user?.user?.role === "user") navigate("/user");
    }, []);
    return (
        <>
            {user?.user?.role === "user" ? (
                <Outlet />
            ) : (
                <div className="absolute top-0 left-0 w-full h-screen">
                    <AccessDenied />
                </div>
            )}
        </>
    );
};

export default UserLayout;
