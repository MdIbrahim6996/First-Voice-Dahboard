import { Navigate, type RouteObject } from "react-router-dom";
import NotFoundPage from "../pages/NotFound";
import SuperadminLayout from "../components/Shared/Layout/SuperadminLayout";

export const superadminRoutes: RouteObject = {
    path: "superadmin",
    element: <SuperadminLayout />,
    children: [
        {
            path: "",
            element: <Navigate to={"/superadmin/main-dashboard"} />,
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
                let Leads = await import("../pages/Leads/Leads");
                return { Component: Leads.default };
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
            path: "add-holiday",
            async lazy() {
                let AddHoliday = await import("../pages/AddHoliday/AddHoliday");
                return { Component: AddHoliday.default };
            },
        },
        {
            path: "users",
            async lazy() {
                let Users = await import("../pages/Users/Users");
                return { Component: Users.default };
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
            path: "process",
            async lazy() {
                let Process = await import("../pages/Process/Process");
                return { Component: Process.default };
            },
        },
        {
            path: "plan",
            async lazy() {
                let Plan = await import("../pages/Plan/Plan");
                return { Component: Plan.default };
            },
        },
        {
            path: "status",
            async lazy() {
                let Status = await import("../pages/Status/Status");
                return { Component: Status.default };
            },
        },
        {
            path: "all-attendance",
            async lazy() {
                let AllAttendance = await import(
                    "../pages/AllAttendance/AllAttendance"
                );
                return { Component: AllAttendance.default };
            },
        },
        {
            path: "monthly-attendance",
            async lazy() {
                let MonthlyAttendance = await import(
                    "../pages/MonthlyAttendance/MonthlyAttendance"
                );
                return { Component: MonthlyAttendance.default };
            },
        },
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ],
};
