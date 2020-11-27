import React from "react";
import Auth from "../../services/Auth";
import LoginFormTest from "./LoginFormTest";


export default function LoginPageTest() {
    const login = async (loginData) => {
        const loginSuccess = await Auth.login(loginData);
        if (!loginSuccess) {
            alert("Invalid credentials");
        }
    }

    return (
        <div className="login-page-test">
            <div className="board-container">

                <div className="login-form">
                    <LoginFormTest onSubmit={login} />
                </div>
            </div>
        </div>
    );
}

