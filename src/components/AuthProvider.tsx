import { createContext, ReactNode, useEffect, useState } from "react";

interface IContext {
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<IContext>({} as IContext);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            setIsAuth(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
