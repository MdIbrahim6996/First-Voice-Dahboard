import RootLayout from "./components/Shared/Layout/RootLayout";
import AuthContextProvider from "./context/authContext";
import Attendance from "./pages/Attendance/Attendance";
import Login from "./pages/Auth/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainDashboard from "./pages/MainDashboard/MainDashboard";
import Leads from "./pages/Leads/Leads";
import UserLeads from "./pages/User/Leads/Leads";
import Holiday from "./pages/Holiday/Holiday";
import AddLeads from "./pages/AddLeads/AddLeads";
import Profile from "./pages/Profile/Profile";
import NotFoundPage from "./pages/NotFound";
import Users from "./pages/Users/Users";
import AddHoliday from "./pages/AddHoliday/AddHoliday";
import Process from "./pages/Process/Process";
import Plan from "./pages/Plan/Plan";
import AllAttendance from "./pages/AllAttendance/AllAttendance";
import MonthlyAttendance from "./pages/MonthlyAttendance/MonthlyAttendance";
import Notification from "./pages/Notification/Notification";
import Status from "./pages/Status/Status";

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
                element: <Dashboard />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "attendance",
                element: <Attendance />,
            },
            {
                path: "maindashboard",
                element: <MainDashboard />,
            },
            {
                path: "add-lead",
                element: <AddLeads />,
            },
            {
                path: "leads",
                element: <Leads />,
            },
            {
                path: "user-leads",
                element: <UserLeads />,
            },
            {
                path: "holiday-calendar",
                element: <Holiday />,
            },
            {
                path: "holidays",
                element: <AddHoliday />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "users",
                element: <Users />,
            },
            {
                path: "process",
                element: <Process />,
            },
            {
                path: "plan",
                element: <Plan />,
            },
            {
                path: "all-attendance",
                element: <AllAttendance />,
            },
            {
                path: "monthly-attendance",
                element: <MonthlyAttendance />,
            },
            {
                path: "notifications",
                element: <Notification />,
            },
            {
                path: "status",
                element: <Status />,
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
