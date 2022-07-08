import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "components/contexts/AuthContext";

export default function NavLinks() {
    const {isLoggedIn, setIsLoggedIn} = useAuthContext();

    const navigate = useNavigate()

    return (
        <div className="nav-links">
            <Link to={isLoggedIn ? "/activity" : "/login"}>Activity</Link>
            <Link to={isLoggedIn ? "/nutrition" : "/login"}>Nutrition</Link>
            <button
                className={
                    isLoggedIn ? "logout-button" : "hidden logout-button"
                }
                onClick={() => {
                    setIsLoggedIn(false);
                    navigate("/")
                    localStorage.clear();
                }}
            >
                Log out
            </button>

            <Link
                to="/login"
                className={isLoggedIn ? "hidden" : ""}
                onClick={() => {
                    // setLog(!log);
                    // console.log("setup log out");
                }}
            >
                Login
            </Link>
            <Link to="/register" className={isLoggedIn ? "hidden" : ""}>
                Sign Up
            </Link>
        </div>
    );
}
