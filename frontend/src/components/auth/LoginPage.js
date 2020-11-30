import React, {useState} from "react";
import Auth from "../../services/Auth";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {useSpring, animated} from 'react-spring';

function LoginPage() {
    const[registrationFormStatus, setRegistrationFormstatus] = useState(false);

    function registerClicked() { setRegistrationFormstatus(true) }
    function loginClicked() { setRegistrationFormstatus(false) }
    
    const loginProps = useSpring({
        left: registrationFormStatus ? -500 : 0
        })

    const registerProps = useSpring({
        left: registrationFormStatus ? 0 : 500
    })

    const loginBtnProps = useSpring({borderBottom: registrationFormStatus ? 'solid 0px transparent' : 'solid 2px #0F545C'})
    const registerBtnProps = useSpring({borderBottom: registrationFormStatus ? 'solid 2px #0F545C' : 'solid 0px transparent' })


    const login = async (loginData) => {
        const loginSuccess = await Auth.login(loginData);
        if (!loginSuccess) {
            alert("Invalid credentials");
        }
    }

    const register = async (registrationData) => {
        const registerSuccess = await Auth.register(registrationData);
        console.log("This is register page");
        debugger;
        if (!registerSuccess) {
            alert("Couldn't register check credentials and try again");
            
        }

    }

    return (
        <div className="login-register-wrapper">
            <div className="nav-buttons">
                <animated.button onClick={loginClicked} id="loginBtn" class='active' style= {loginBtnProps}>Login</animated.button>
                <animated.button onClick={registerClicked} id="registrationBtn" style= {registerBtnProps}>Register</animated.button>
            </div>
            <div className="form-group">
            <animated.form action='' id='loginform' style={loginProps}><LoginForm onSubmit={login} /></animated.form>
           <animated.form action='' id='registerform' style={registerProps}> <RegisterForm onSubmit={register} /></animated.form>
            </div>
            <animated.div className="forgot-panel" style={loginProps}>
                <a href='#'> Forgot password? </a>
            </animated.div>
                
            </div>
                   
                            
                                
    );
}

export default LoginPage;