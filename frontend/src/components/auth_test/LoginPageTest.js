import React from "react";
import Auth from "../../services/Auth";
import LoginFormTest from "./LoginFormTest";
import { useHistory } from "react-router-dom";


export default function LoginPageTest() {
    const history = useHistory();

    const login = async (loginData) => {
        const loginSuccess = await Auth.login(loginData);
        if (!loginSuccess) {
            alert("Invalid credentials");
        } else {
            history.push("/users");
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

