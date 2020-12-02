import React, { useState } from "react";
import Auth from "../../services/Auth";
import { useHistory, Link } from "react-router-dom";


export default function LoginPageTest() {
    event.preventDefault();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (loginData) => {
        const loginSuccess = await Auth.login(loginData);
        if (!loginSuccess) {
            alert("Invalid credentials");
        } else {
            alert("login successful");
            history.push("/users/me");
            
        }
    }

    return (
        <div className="login-page-test">
            <div className="board-container">

                <div className="login-form">
                <div className="login-form">
            <div className="card-body">
                <h4 className="card-title" >Login</h4>
                <div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input 
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
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
                            className="btn btn-info" 
                            onClick={(event) => login({email,password}, event)}>
                            Login
                        </button>
                    </div>
                    <div>
                        <p className="prompt">already have an account?</p>
                        <Link to="/register/test">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
                </div>
            </div>
        </div>
    );
}

