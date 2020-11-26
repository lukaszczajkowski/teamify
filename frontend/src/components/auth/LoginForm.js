import React, {useState} from 'react';

function LoginForm() {
<<<<<<< HEAD
//function LoginForm({onSubmit}) {
=======
>>>>>>> master
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = () => {
        console.log("submitted!");
    }

    return (
        <React.Fragment>
            <label htmlFor='username'>Email: </label>
<<<<<<< HEAD
            
=======
>>>>>>> master
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
                    

                    
<<<<<<< HEAD
            {/* <button 
                className="submit" 
                onClick={() => onSubmit({email, password})}>
                    Login
            </button> */}
=======

            <button> 
                {/*className="submit" 
                onClick={() => onSubmit({email, password})}>
    Login*/}
            </button>
>>>>>>> master
        </React.Fragment>
            
    );
}

export default LoginForm;