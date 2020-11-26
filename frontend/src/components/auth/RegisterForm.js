import React, {useState} from "react";

// eslint-disable-next-line react/prop-types
function RegisterForm({onSubmit}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleClick(event) {
        event.preventDefault();
        onSubmit({email, password});
    }

    return (
        <React.Fragment>
            <label form="fullName">Name:</label>
                <input type="text"
                       className="form-control"
                       value={name}
                       onChange={ e => setName(e.target.value) }
                       placeholder="Name"/>
                    
            <label form="email">Email:</label>
                <input type="email"
                       value={email}
                       onChange={ e => setEmail(e.target.value) }
                       className="form-control"
                       placeholder="Email"/>
                    
            <label form="password">Password:</label>
                <input type="password" 
                        placeholder="Password" 
                        className="form-control" 
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    
            <button className="submit"
                    onClick={(event) => handleClick(event)}>
                        Create account
            </button>
        </React.Fragment>
    );
}

export default RegisterForm;