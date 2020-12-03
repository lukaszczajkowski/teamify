import React, { useState } from "react";
import Auth from "../../services/Auth";
import { useHistory, Link } from "react-router-dom";


export default function RegisterPageTest() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async (registrationData, event) => {
        event.preventDefault();
        const registerSuccess = await Auth.register(registrationData);
        if (!registerSuccess) {
            alert("Couldn't register check credentials and try again");
        } else {
            alert("signup successful");
            history.push("/users/me");
        }
    }

    return (
        <div className="login-page-test">
            <div className="register-form board-container">
                <h4 className="card-title">Sign up</h4>
                <div>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Name" />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Email" />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <button
                            className="btn btn-success"

                            onClick={(event) => register({ name, email, password }, event)}>
                            Create account
                        </button>
                        <div>
                            <p className="prompt">already have an account?</p>
                            <Link to="/login/test">Sign up</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

