import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login/Login";
import RootLayout from "../components/Shared/Layout/RootLayout";
import NotFoundPage from "../pages/NotFound";
import TokenExpired from "../pages/TokenExpired/TokenExpired";
import { userRoutes } from "./userRoutes";
import { adminRoutes } from "./adminRoutes";
import { superadminRoutes } from "./superadminRoutes";

export const router = createBrowserRouter([
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "/",
        element: <RootLayout />,
        children: [
            // {
            //     path: "",
            //     async lazy() {
            //         let Dashboard = await import(
            //             "../pages/Dashboard/Dashboard"
            //         );
            //         return { Component: Dashboard.default };
            //     },
            // },
            { ...userRoutes },
            { ...adminRoutes },
            { ...superadminRoutes },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
    {
        path: "/token-expired",
        element: <TokenExpired />,
    },
]);
