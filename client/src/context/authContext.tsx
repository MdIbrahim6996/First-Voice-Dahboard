import {
    createContext,
    useState,
    type SetStateAction,
    type Dispatch,
} from "react";

type UserData = {
    id: number;
    name: string;
    alias: string;
    email: string;
    password: string;
    role: string;
    token: string;
} | null;

export const AuthContext = createContext<{
    user: UserData;
    token: string | undefined;
    setUser: Dispatch<SetStateAction<UserData>>;
}>({
    user: null,
    token: "",
    setUser: () => null,
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserData>(
        //@ts-ignore
        JSON.parse(localStorage.getItem("authUser"))
    );
    return (
        <AuthContext.Provider
            value={{ user, token: user?.token, setUser: setUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
