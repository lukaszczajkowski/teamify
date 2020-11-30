import React, {useState} from 'react';

function LoginForm({onSubmit}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    return (
        
                    <React.Fragment>
                        <label htmlfor='email'>Email:</label>
                        <input 
                            type="email"
                            id='email'
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    

                   
                        <label htmlfor='password'>Password:</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            id='password' 
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                   

                        <input type='submit' value='submit' 
                            className='submit' 
                            onClick={() => onSubmit({email, password})} />
                         
                        
                   
                        </React.Fragment>
    );
}

export default LoginForm;