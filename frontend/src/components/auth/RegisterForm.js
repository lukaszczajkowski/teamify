import React, {useState} from "react";

function RegisterForm({onSubmit}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <React.Fragment>
            <label for="fullName">Name:</label>
                <input type="text"
                       className="form-control"
                       value={name}
                       onChange={ e => setName(e.target.value) }
                       placeholder="Name"/>
                    
            <label for="email">Email:</label>
                <input type="email"
                       value={email}
                       onChange={ e => setEmail(e.target.value) }
                       className="form-control"
                       placeholder="Email"/>
                    
            <label for="password">Password:</label>
                <input type="password" 
                        placeholder="Password" 
                        className="form-control" 
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    
            <button className="submit"
                    onClick={e => onSubmit({name, email, password})}>
                        Create account
            </button>
        </React.Fragment>
    );
}

export default RegisterForm;