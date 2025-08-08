import type { RouteObject } from "react-router-dom";
import AdminLayout from "../components/Shared/Layout/AdminLayout";
import NotFoundPage from "../pages/NotFound";

export const adminRoutes: RouteObject = {
    path: "admin",
    element: <AdminLayout />,
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
            path: "main-dashboard",
            async lazy() {
                let MainDashboard = await import(
                    "../pages/MainDashboard/MainDashboard"
                );
                return { Component: MainDashboard.default };
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
                let AddLeads = await import("../pages/AddLeads/AddLeads");
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
