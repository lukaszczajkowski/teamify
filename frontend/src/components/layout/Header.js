import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

// Components
import NavBar from '../layout/Navbar';
import Logo from "../../assets/logo2.png";

export default function Header() {

    return (
        <header className="header">
            <Link className="logo" to="/">
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={Logo} />
            </Link>
            <NavBar />
        </header>
    );
}