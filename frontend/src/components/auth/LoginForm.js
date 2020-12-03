import React, {useState} from 'react';
import Auth from "../../services/Auth";

// eslint-disable-next-line react/prop-types
function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const login = async (loginData) => {
        event.preventDefault();
        const loginSuccess = await Auth.login(loginData);
        if (!loginSuccess) {
            alert("Invalid credentials");
        } else {
            alert("login successful");
            
        }
    }
    return (
        
                    <React.Fragment>
                        <label htmlFor='email'>Email:</label>
                        <input 
                            type="email"
                            id='email'
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    

                   
                        <label htmlFor='password'>Password:</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            id='password' 
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                   

                        <input type='submit' value='submit' 
                            className='submit' 
                            onClick={(event) => login({email,password}, event)} />
                         
                        
                   
                        </React.Fragment>
    );
}

export default LoginForm;