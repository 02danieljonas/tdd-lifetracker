import * as React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import Landing from "../Landing/Landing";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import ActivityPage from "../ActivityPage/ActivityPage";
import NutritionPage from "../NutritionPage/NutritionPage";
import NotFound from "../NotFound/NotFound";
import Loading from "../Loading/Loading";

import { AuthContextProvider } from "components/contexts/Auth";
import { useAuthContext } from "components/contexts/Auth";
import axios from "axios";

export default function AppContainer() {
    return (
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    );
}

function App() {
    const { user, setIsLoggedIn, SetUserData } = useAuthContext();

    React.useEffect(() => {
        const fetchUser = async () => {
            axios
                .get("http://localhost:3001/auth/me", {
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                })
                .then((data) => {
                    // console.log("data", data.data);
                    setIsLoggedIn(true);
                    SetUserData(data.data);
                });
        };

        if (user) {
            fetchUser();
        }
    }, [user]);

    return (
        <div className="app">
            <React.Fragment>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/register"
                            element={<RegistrationPage />}
                        />
                        <Route path="/activity" element={<ActivityPage />} />
                        <Route
                            path="/nutrition/*"
                            element={<NutritionPage />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </React.Fragment>
        </div>
    );
}
