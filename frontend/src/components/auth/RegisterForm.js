import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import Auth from "../../services/Auth";

// eslint-disable-next-line react/prop-types
function RegisterForm() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const register = async (registrationData, event) => {
        event.preventDefault();
        const registerSuccess = await Auth.register(registrationData);
        console.log("This is register page");
        if (!registerSuccess) {
            alert("Couldn't register check credentials and try again");
            } else {
                alert("signup successful");
                history.push("/users/me");
            }
        }

    return (
       
        <React.Fragment>
                    
                        <label htmlFor="fullname">Name:</label>
                        <input 
                            type="text"
                            id="name"
                            value={name}
                            onChange={ e => setName(e.target.value) }
                            placeholder="Name"/>
                  

                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={ e => setEmail(e.target.value) }
                            placeholder="Email"/>
                    

                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                    

                    
                    <input type='submit' value='submit' 
                            className='submit' 
                            onClick={(event) => register({name, email, password},event)} />
                            
                            
                    
                        </React.Fragment>
               
    );
}

export default RegisterForm;