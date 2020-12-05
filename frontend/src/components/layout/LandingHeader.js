import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Logo from "../../assets/logo2.png";

export default function Header() {

    return (
        <header className="header" id="landing-header">
            
                <Link className="logo" to="/">
                    <img src={Logo} />
                </Link>
               

   






        </header>
    );
}