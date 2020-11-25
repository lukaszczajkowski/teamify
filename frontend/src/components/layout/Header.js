import React from 'react';
import { Link } from 'react-router-dom';

// Components
import NavBar from '../layout/Navbar';
import Logo from "../../assets/logo.png";

export default function Header() {

    return (
        <header className="header">
            <Link className="logo" to="/">
                <img src={Logo}/>
            </Link>
            <NavBar />
        </header>
    );
}