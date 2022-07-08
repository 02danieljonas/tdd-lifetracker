import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NavLinks({ isLoggedIn, setIsLoggedIn, userData }) {
    console.log(isLoggedIn);
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
