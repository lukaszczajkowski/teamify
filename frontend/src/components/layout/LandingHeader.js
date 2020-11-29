import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Logo from "../../assets/logo2.png";

export default function Header() {

    return (
        <header className="header" id="landing-header">
            <div className="flex-between">
                <Link className="logo" to="/">
                    <img src={Logo} />
                </Link>
                <div className="buttons">
                    <Link to="/login/test"><button className="button" id="login">Login</button></Link>
                    <Link to="/register/test"><button className="button" id="signup">Sign Up</button></Link>
                </div>


            </div>






        </header>
    );
}