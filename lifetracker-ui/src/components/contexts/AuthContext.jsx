import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(false);

    const authValue = { user, setUser };

    useEffect(() => {
        setUser(localStorage.getItem("accessToken"));
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={authValue}>
            <>{children}</>
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => useContext(AuthContext);