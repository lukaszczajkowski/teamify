import React, {useState} from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {useSpring, animated} from 'react-spring';
import LandingHeader from "../layout/LandingHeader";
import {motion} from 'framer-motion';

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

    
    return (
        <div className="login">
            <LandingHeader />
           
            <motion.div className="login-register-wrapper"initial={{x: '100vw'}}
                        animate={{ x: 0}}
                        transition={{ type: 'spring', delay: 0.8 }}>
            <div className="nav-buttons">
                <animated.button onClick={loginClicked} id="loginBtn" class='active' style= {loginBtnProps}>Login</animated.button>
                <animated.button onClick={registerClicked} id="registrationBtn" style= {registerBtnProps}>Register</animated.button>
            </div>
            <div className="form-group">
                <animated.form action='' id='loginform' style={loginProps}><LoginForm  /></animated.form>
                <animated.form action='' id='registerform' style={registerProps}> <RegisterForm  /></animated.form>
            </div>
                <animated.div className="forgot-panel" style={loginProps}>
                    <a href='#'> Forgot password? </a>
                </animated.div>
            
            </motion.div>
            </div>
   
              
                                
    );
}

export default LoginPage;