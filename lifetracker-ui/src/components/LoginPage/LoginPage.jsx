import { UserContext } from "components/contexts/AuthContext";
import React, { useContext } from "react";
import LoginForm from "../LoginForm/LoginForm";

export default function LoginPage() {
    const msg = useContext(UserContext);
    console.log(msg);
    return (
        <div className="login-page">
            LoginPage
            <LoginForm />
        </div>
    );
}
