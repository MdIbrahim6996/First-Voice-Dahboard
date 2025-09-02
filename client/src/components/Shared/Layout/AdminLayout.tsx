import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import AccessDenied from "../../../pages/AccessDenied/AccessDenied";

const AdminLayout = () => {
    const { user } = useContext(AuthContext);

    return (
        <>
            {user?.role === "admin" ? (
                <Outlet />
            ) : (
                <div className="bg-red-500 absolute top-0 left-0 w-full h-screen">
                    <AccessDenied />
                </div>
            )}
        </>
    );
};

export default AdminLayout;
