import React, {useState} from 'react';

// eslint-disable-next-line react/prop-types
function LoginForm({onSubmit}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <React.Fragment>
            <label htmlFor='username'>Email: </label>

                <input 
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)} />
                   
            <label htmlFor='password'>Password:</label>
                <input 
                type="password" 
                placeholder="Password" 
                className="form-control" 
                value={password}
                onChange={e => setPassword(e.target.value)} />
                                    
            <button 
                className="submit" 
                onClick={() => onSubmit({email, password})}>
                    Login

            </button>
        </React.Fragment>
            
    );
}

export default LoginForm;