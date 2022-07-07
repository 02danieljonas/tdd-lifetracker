import { login } from "components/login/login";
import React from "react";

export default function LoginForm() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleOnSubmit = async () => {
        if (!emailInvalid || email == "") {
            setEmailInvalid(false);
        } else {
            let userInfo = await login(email, password);
            console.log(userInfo);
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
