import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "components/contexts/AuthContext";

export default function LoginForm() {
    const { handleOnLogin } = useAuthContext();
    const handleOnSubmit = handleOnLogin;

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigate = useNavigate();

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
                    handleOnSubmit(
                        navigate,
                        emailInvalid,
                        setEmailInvalid,
                        email,
                        password
                    );
                }}
            >
                Login
            </button>

            <br />
        </div>
    );
}
