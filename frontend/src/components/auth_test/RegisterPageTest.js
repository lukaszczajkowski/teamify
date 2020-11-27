import React from "react";
import Auth from "../../services/Auth";
import RegisterFormTest from "./RegisterFormTest";


export default function RegisterPageTest() {
    const register = async (registrationData) => {
        const registerSuccess = await Auth.register(registrationData);
        if (!registerSuccess) {
            alert("Couldn't register check credentials and try again");
        }
    }

    return (
       
            <div className="login-page test">
                <div className="board-container">
    
                    <div className="col-12  strong-shadow">
                        <RegisterFormTest onSubmit={register} />
                    </div>
                </div>
            </div>
      
    );
}

