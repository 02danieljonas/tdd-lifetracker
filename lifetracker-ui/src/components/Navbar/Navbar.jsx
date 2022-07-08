import * as React from "react";
import logo from "src/components/Navbar/Logo.png";
import { Link } from "react-router-dom";
import NavLinks from "../NavLinks/NavLinks";


export default function Navbar({isLoggedIn, setIsLoggedIn, userData}) {
    return (
        <nav className="Navbar">
            <Link to="/" className="logo">
                <img src={logo} width="60px" alt="Website logo" />
            </Link>
            <NavLinks isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData}/>
        </nav>
    );
}
