import RootLayout from "./components/Shared/Layout/RootLayout";
import AuthContextProvider from "./context/authContext";
import Login from "./pages/Auth/Login/Login";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFoundPage from "./pages/NotFound";

const router = createBrowserRouter([
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "",
                async lazy() {
                    let Dashboard = await import("./pages/Dashboard/Dashboard");
                    return { Component: Dashboard.default };
                },
            },
            {
                path: "dashboard",
                async lazy() {
                    let Dashboard = await import("./pages/Dashboard/Dashboard");
                    return { Component: Dashboard.default };
                },
            },
            {
                path: "attendance",
                async lazy() {
                    let Attendance = await import(
                        "./pages/Attendance/Attendance"
                    );
                    return { Component: Attendance.default };
                },
            },
            {
                path: "maindashboard",
                async lazy() {
                    let MainDashboard = await import(
                        "./pages/MainDashboard/MainDashboard"
                    );
                    return { Component: MainDashboard.default };
                },
            },
            {
                path: "add-lead",
                async lazy() {
                    let AddLeads = await import("./pages/AddLeads/AddLeads");
                    return { Component: AddLeads.default };
                },
            },
            {
                path: "leads",
                async lazy() {
                    let Leads = await import("./pages/Leads/Leads");
                    return { Component: Leads.default };
                },
            },
            {
                path: "user-leads",
                async lazy() {
                    let UserLeads = await import("./pages/User/Leads/Leads");
                    return { Component: UserLeads.default };
                },
            },
            {
                path: "holiday-calendar",
                async lazy() {
                    let Holiday = await import("./pages/Holiday/Holiday");
                    return { Component: Holiday.default };
                },
            },
            {
                path: "holidays",
                async lazy() {
                    let AddHoliday = await import(
                        "./pages/AddHoliday/AddHoliday"
                    );
                    return { Component: AddHoliday.default };
                },
            },
            {
                path: "profile",
                async lazy() {
                    let Profile = await import("./pages/Profile/Profile");
                    return { Component: Profile.default };
                },
            },
            {
                path: "users",
                async lazy() {
                    let Users = await import("./pages/Users/Users");
                    return { Component: Users.default };
                },
            },
            {
                path: "process",
                async lazy() {
                    let Process = await import("./pages/Process/Process");
                    return { Component: Process.default };
                },
            },
            {
                path: "plan",
                async lazy() {
                    let Plan = await import("./pages/Plan/Plan");
                    return { Component: Plan.default };
                },
            },
            {
                path: "all-attendance",
                async lazy() {
                    let AllAttendance = await import(
                        "./pages/AllAttendance/AllAttendance"
                    );
                    return { Component: AllAttendance.default };
                },
            },
            {
                path: "monthly-attendance",
                async lazy() {
                    let MonthlyAttendance = await import(
                        "./pages/MonthlyAttendance/MonthlyAttendance"
                    );
                    return { Component: MonthlyAttendance.default };
                },
            },
            {
                path: "notifications",
                async lazy() {
                    let Notification = await import(
                        "./pages/Notification/Notification"
                    );
                    return { Component: Notification.default };
                },
            },
            {
                path: "status",
                async lazy() {
                    let Status = await import("./pages/Status/Status");
                    return { Component: Status.default };
                },
            },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

const App = () => {
    return (
        <>
            <Toaster />
            <AuthContextProvider>
                <RouterProvider router={router} />
            </AuthContextProvider>
        </>
    );
};

export default App;
