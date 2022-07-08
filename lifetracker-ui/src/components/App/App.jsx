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

import {
    AuthContextProvider,
    useAuthContext,
} from "components/contexts/AuthContext";
import axios from "axios";

export default function AppContainer() {
    return (
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    );
}

function App() {
    const { user, setUser } = useAuthContext();
    const [ isLoggedIn, setIsLoggedIn ] = React.useState(false);
    const [userData, SetUserData] = React.useState(null)
    const [error, setError] = React.useState(null);
    const [isFetching, setIsFetching] = React.useState(false);

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
                    setIsLoggedIn(true)
                    SetUserData(data.data)
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
                    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData}/>
                    <Routes>
                        <Route path="/" element={<Landing isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData}/>} />
                        <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} />} />
                        <Route
                            path="/register"
                            element={<RegistrationPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData}/>}
                        />
                        <Route path="/activity" element={<ActivityPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData}/>} />
                        <Route
                            path="/nutrition/*"
                            element={<NutritionPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData}/>}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </React.Fragment>
        </div>
    );
}
