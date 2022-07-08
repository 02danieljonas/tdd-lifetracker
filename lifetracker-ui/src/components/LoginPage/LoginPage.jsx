import React, { useContext } from "react";
import LoginForm from "../LoginForm/LoginForm";

export default function LoginPage({isLoggedIn, setIsLoggedIn, userData}) {
    return (
        <div className="login-page">
            LoginPage
            <LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData}/>
        </div>
    );
}
