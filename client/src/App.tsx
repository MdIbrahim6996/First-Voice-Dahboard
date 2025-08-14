import AuthContextProvider from "./context/authContext";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

// export default function App() {
//     return (
//         <div className="min-h-screen w-full bg-white relative overflow-hidden flex items-center justify-center p-6">
//             <Card
//                 title="Finfirst Bank"
//                 subtitle=""
//                 number="1234 6789 8765"
//                 name="Sarah Williams"
//                 validThru="06/30"
//                 gradient="from-rose-600 via-rose-700 to-red-900"
//                 accent="#FCA5A5"
//             />
//         </div>
//     );
// }

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
