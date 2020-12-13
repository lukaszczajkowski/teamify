import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { motion } from "framer-motion";
import NavItem from "./NavItem";

// eslint-disable-next-line react/prop-types
export default function Navbar() {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    // const closeMenu = () => setClick(false);

    const navItems = [
        {
            id: 1,
            link: "/home",
            title: "Home"
        },
        {
            id: 2,
            link:"/home",
            title: "Projects"
        },
        {
            id: 3,
            link:"/calendar",
            title: "Calendar"
        },
        {
            id: 4,
            link:"/",
            title: "Logout"
        }
    ];

    return (
        <nav className="navbar">

            <div className=" link menu-icon" onClick={handleClick}>
                <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>

            <ul className={click ? "nav-menu active" : "nav-menu"}>

                {navItems.map(item =>  (<NavItem key={item.id} item={item}/>))}

{/* 
                <motion.li className="nav-item"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}>
                    <Link className="link nav-link" to="/home" onClick={closeMenu}>Home</Link>
                </motion.li>

                <motion.li className="nav-item">
                    <Link className="link nav-link" to="/home" onClick={closeMenu}>ProjectBoard</Link>
                </motion.li>

                <motion.li className="nav-item">
                    <Link className="link nav-link" to="/about" onClick={closeMenu}>About</Link>
                </motion.li>

                <motion.li className="nav-item">
                    <button className="nav-link" onClick={onLogout}>Logout</button>
                </motion.li> */}

            </ul>
        </nav>
    );
}

