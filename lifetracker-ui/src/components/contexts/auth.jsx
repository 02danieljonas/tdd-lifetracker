import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import ApiClient from "components/services/ApiClient";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [userData, SetUserData] = useState(null);

    const [error, setError] = useState(null);

    const [isFetching, setIsFetching] = useState(false);

    const [isProcessing, setIsProcessing] = useState(false);

    const handleOnLogin = async (
        navigate,
        emailInvalid,
        setEmailInvalid,
        email,
        password
    ) => {
        if (!emailInvalid || email == "") {
            setEmailInvalid(false);
            return;
        }

        // const { data, error } = await ApiClient.loginUser({
        //     email,
        //     password,
        // });
        try {
            axios
                .post(`http://localhost:3001/auth/login`, {
                    email,
                    password,
                })
                .then(({ data }) => {
                    localStorage.setItem("accessToken", data.user.accessToken);
                    console.log(localStorage.getItem("accessToken"));
                    setIsLoggedIn(true);
                    navigate("/nutrition");
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };

    const handleOnRegister = async (
        navigate,
        isEmailValid,
        email,
        password,
        passwordConfirm,
        firstName,
        lastName,
        username
    ) => {
        isEmailValid = email.indexOf("@") > 0;
        if (
            !isEmailValid ||
            email == "" ||
            password !== passwordConfirm ||
            password == "" ||
            firstName == "" ||
            lastName == "" ||
            username == ""
        ) {
            console.log("Please input the correct info");
            return;
        }

        // const { data, error } = await ApiClient.signupUser({
        //     email,
        //     password,
        //     firstName,
        //     lastName,
        //     username,
        // });

        try {
            axios
                .post(`http://localhost:3001/auth/register`, {
                    email,
                    password,
                    firstName,
                    lastName,
                    username,
                })
                .then(({ data }) => {
                    localStorage.setItem("accessToken", data.user.accessToken);
                    setIsLoggedIn(true);
                    navigate("/nutrition");
                });
        } catch (err) {
            console.log(err);
        }

    };

    const fetchUser = () => {
        setIsProcessing(true);
        axios
            .get(`http://localhost:3001/auth/me`, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            })
            .then((data) => {
                setIsLoggedIn(true);
                SetUserData(data.data);
                ApiClient.setToken(user)
            });
        setIsProcessing(false);
    };

    const authValue = {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        isProcessing,
        setIsProcessing,
        error,
        setError,
        isFetching,
        setIsFetching,
        userData,
        SetUserData,
        handleOnLogin,
        handleOnRegister,
        fetchUser,
    };

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
