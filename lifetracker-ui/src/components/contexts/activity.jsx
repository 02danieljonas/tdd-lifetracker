import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "components/contexts/Auth";
import axios from "axios";
import ApiClient from "components/services/ApiClient";


const ActivityContext = createContext(null);

export const ActivityContextProvider = ({ children }) => {
    const [activity, setActivity] = useState(null);
    const [initialized, setInitialized] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    const { isLoggedIn } = useAuthContext();

    const ActivityValue = {
        activity,
        setActivity,
        initialized,
        setInitialized,
        isLoading,
        setIsLoading,
        error,
        setError,
    };

    useEffect(()=>{
        if(isLoggedIn){
            setIsLoading(true)
            setError(null)
            // axios.get(`${process.env.REACT_APP_REMOTE_HOST_URL}/activity`)
        }
        console.log("Mounted")
    }, [])

    return (
        <ActivityContext.Provider value={ActivityValue}>
            <>{children}</>
        </ActivityContext.Provider>
    );
};
export const useActivityContext = () => useContext(ActivityContext);
