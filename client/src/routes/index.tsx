import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/Shared/Layout/RootLayout";
import NotFoundPage from "../pages/NotFound";
import TokenExpired from "../pages/TokenExpired/TokenExpired";
import { adminRoutes } from "./adminRoutes";
import { superadminRoutes } from "./superadminRoutes";

export const router = createBrowserRouter(
    [
        // {
        //     path: "login",
        //     element: <Login />,
        // },
        {
            path: "",
            element: <RootLayout />,
            children: [{ ...adminRoutes }, { ...superadminRoutes }],
        },
        {
            path: "*",
            element: <NotFoundPage />,
        },
        {
            path: "/token-expired",
            element: <TokenExpired />,
        },
    ],
    { basename: "/app" }
);
