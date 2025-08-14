import type { RouteObject } from "react-router-dom";
import UserLayout from "../components/Shared/Layout/UserLayout";
import NotFoundPage from "../pages/NotFound";

export const userRoutes: RouteObject = {
    path: "user",
    element: <UserLayout />,
    children: [
        {
            path: "",
            async lazy() {
                let Dashboard = await import("../pages/Dashboard/Dashboard");
                return { Component: Dashboard.default };
            },
        },
        {
            path: "dashboard",
            async lazy() {
                let Dashboard = await import("../pages/Dashboard/Dashboard");
                return { Component: Dashboard.default };
            },
        },
        {
            path: "attendance",
            async lazy() {
                let Attendance = await import("../pages/Attendance/Attendance");
                return { Component: Attendance.default };
            },
        },
        {
            path: "add-lead",
            async lazy() {
                let AddLeads = await import("../pages/User/AddLeads/AddLeads");
                return { Component: AddLeads.default };
            },
        },
        {
            path: "leads",
            async lazy() {
                let UserLeads = await import("../pages/User/Leads/Leads");
                return { Component: UserLeads.default };
            },
        },
        {
            path: "holiday-calendar",
            async lazy() {
                let Holiday = await import("../pages/Holiday/Holiday");
                return { Component: Holiday.default };
            },
        },
        {
            path: "profile",
            async lazy() {
                let Profile = await import("../pages/Profile/Profile");
                return { Component: Profile.default };
            },
        },
        {
            path: "notifications",
            async lazy() {
                let Notification = await import(
                    "../pages/Notification/Notification"
                );
                return { Component: Notification.default };
            },
        },
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ],
};
