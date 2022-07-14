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
import { AuthContextProvider, useAuthContext } from "components/contexts/Auth";
import { ActivityContextProvider } from "components/contexts/activity";
import {
    NutritionContextProvider,
    useNutritionContext,
} from "components/contexts/Nutrition";

export default function AppContainer() {
    return (
        <AuthContextProvider>
            <ActivityContextProvider>
                <NutritionContextProvider>
                    <App />
                </NutritionContextProvider>
            </ActivityContextProvider>
        </AuthContextProvider>
    );
}

function App() {
    const { user, fetchUser } = useAuthContext();
    const { nutritions, fetcNutritions } = useNutritionContext();

    React.useEffect(() => {
        if (user) {
            fetchUser();
            fetcNutritions();
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
