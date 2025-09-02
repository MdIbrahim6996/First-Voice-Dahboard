import AuthContextProvider from "./context/authContext";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

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
