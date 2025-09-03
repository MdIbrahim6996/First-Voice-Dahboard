import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import AccessDenied from "../../../pages/AccessDenied/AccessDenied";

const SuperadminLayout = () => {
    const { user } = useContext(AuthContext);

    return (
        <>
            {user?.role === "superadmin" ? (
                <Outlet />
            ) : (
                <div className="absolute top-0 left-0 w-full h-screen">
                    <AccessDenied />
                </div>
            )}
        </>
    );
};

export default SuperadminLayout;
