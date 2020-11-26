import React, { useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function RegisterFormTest({ onSubmit }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="card">
            <div className="card-body">
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
                            onClick={() => onSubmit({ name, email, password })}>
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

