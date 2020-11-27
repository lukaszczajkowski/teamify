import React, {useState} from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function LoginFormTest({onSubmit}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
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
                            onClick={() => onSubmit({email, password})}>
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
    );
}

