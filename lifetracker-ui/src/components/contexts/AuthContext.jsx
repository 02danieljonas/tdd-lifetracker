import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [userData, SetUserData] = useState(null);

    const [error, setError] = useState(null);

    const [isFetching, setIsFetching] = useState(false);

    const [isProcessing, setIsProcessing] = useState(false);

    const [nutritions, setNutritions] = useState([
        {
            name: "name01",
            calories: 1,
            imageUrl:
                "https://www.wpclipart.com/animals/cats/kitten-and-butterfly.png",
            category: "category1",
            createdAt: new Date().toLocaleDateString(),
        },
        {
            name: "name02",
            calories: "2",
            imageUrl: "https://openclipart.org/image/800px/337526",
            category: "category2",
            createdAt: new Date().toLocaleDateString(),
        },
        {
            name: "name03",
            calories: "3",
            imageUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCZbU7CG4gQftm1f3CYHzinl3C0yIfcs8h2BHk4YcyjojQUFU&s",
            category: "category3",
            createdAt: new Date().toLocaleDateString(),
        },
    ]);

    const handleOnLogin = async (navigate, emailInvalid, setEmailInvalid, email, password ) => {
        if (!emailInvalid || email == "") {
            setEmailInvalid(false);
            return;
        }
        try {
            axios
                .post("http://localhost:3001/auth/login", {
                    email,
                    password,
                })
                .then(({ data }) => {
                    console.log(data.user.user, data.user.accessToken);
                    localStorage.setItem("accessToken", data.user.accessToken);
                    console.log(localStorage.getItem("accessToken"));
                    setIsLoggedIn(true);
                    navigate("/");
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };

    const handleOnRegister = async (navigate, isEmailValid, email, password, passwordConfirm, firstName, lastName, username) => {
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
        try {
            axios
                .post("http://localhost:3001/auth/register", {
                    email,
                    password,
                    firstName,
                    lastName,
                    username,
                })
                .then(({ data }) => {
                    localStorage.setItem("accessToken", data.user.accessToken);
                    setIsLoggedIn(true);
                    navigate("/");
                });
        } catch (err) {
            console.log(err);
        }
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
        nutritions,
        setNutritions,
        userData,
        SetUserData,
        handleOnLogin,
        handleOnRegister,
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
