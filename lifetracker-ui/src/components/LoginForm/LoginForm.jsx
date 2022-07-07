import { login } from "components/login/login";
import React from "react";
import axios from "axios";

export default function LoginForm() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleOnSubmit = async () => {
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
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };

    const [emailInvalid, setEmailInvalid] = React.useState(true);
    return (
        <div className="login-form">
            <label htmlFor="email">Email:</label>
            <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                placeholder="john.doe@mail.com"
                onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value.indexOf("@") > 0) {
                        setEmailInvalid(true);
                    } else {
                        setEmailInvalid(false);
                    }
                }}
            />
            {emailInvalid ? (
                <></>
            ) : (
                <div className="invalid-email error">Invalid email</div>
            )}
            <label htmlFor="password">Password:</label>
            <input
                className="form-input"
                type="password"
                id="password"
                name="password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <button
                className="submit-login"
                onClick={() => {
                    handleOnSubmit();
                }}
            >
                Login
            </button>

            <br />
        </div>
    );
}
