import React from "react";
import axios from "axios";

export default function RegistrationForm() {
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirm, setPasswordConfirm] = React.useState("");

    let isEmailValid = true;
    let isPasswordMatch = true;

    const handleOnSubmit = async () => {
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
            const res = await axios.post(
                "http://localhost:3001/auth/register",
                {
                    email,
                    password,
                    firstName,
                    lastName,
                    username,
                }
            );
            console.log(res.data.user.user);
        } catch (err) {
            console.log(err);
        }
    };

    if (email != "") {
        isEmailValid = email.indexOf("@") > 0;
    }

    if (password != "" && passwordConfirm != "") {
        if (password === passwordConfirm) {
            isPasswordMatch = true;
            console.log("mathc");
        } else {
            isPasswordMatch = false;
            console.log("no mathc");
        }
    }

    return (
        <div className="registration-form">
            <label htmlFor="email" className="">
                Email
            </label>
            <input
                className="form-input"
                name="email"
                type="email"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                placeholder="john.doe@mail.com"
            />

            {isEmailValid ? (
                <></>
            ) : (
                <div className="error">Please enter a valid email.</div>
            )}

            <label htmlFor="username">Username</label>
            <input
                className="form-input"
                name="username"
                type="text"
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
                placeholder="JDoe1"
            />
            <div className="name-input">
                <label htmlFor="firstName" className="hidden">
                    First Name
                </label>

                <input
                    className="form-input f-name"
                    name="firstName"
                    type="text"
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                    placeholder="John"
                />
                <label htmlFor="lastName" className="hidden">
                    Last Name
                </label>
                <input
                    className="form-input l-name"
                    name="lastName"
                    type="text"
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                    placeholder="Doe"
                />
            </div>
            <label htmlFor="password">Password</label>
            <input
                className="form-input"
                name="password "
                type="password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                placeholder="password123"
            />
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
                className="form-input"
                name="passwordConfirm"
                type="password"
                onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                }}
                placeholder="password123"
            />
            {isPasswordMatch ? (
                <></>
            ) : (
                <p className="error">Passwords do not match.</p>
            )}
            <button
                onClick={() => {
                    handleOnSubmit();
                }}
            >
                Create Account
            </button>
        </div>
    );
}
