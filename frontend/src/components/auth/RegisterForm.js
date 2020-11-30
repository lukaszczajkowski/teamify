import React, {useState} from "react";

function RegisterForm({onSubmit}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
       
        <React.Fragment>
                    
                        <label htmlfor="fullname">Name:</label>
                        <input 
                            type="text"
                            id="name"
                            value={name}
                            onChange={ e => setName(e.target.value) }
                            placeholder="Name"/>
                  

                        <label htmlfor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={ e => setEmail(e.target.value) }
                            placeholder="Email"/>
                    

                        <label htmlfor="password">Password:</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                    

                    
                    <input type='submit' value='submit' 
                            className='submit' 
                            onClick={() => onSubmit({name, email, password})} />
                            
                    
                        </React.Fragment>
               
    );
}

export default RegisterForm;