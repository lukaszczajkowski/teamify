import React, { useState } from "react";
import { Link } from "react-router-dom";

//Replaced the following with testing method 
// function Navbar({ onLogout }) {
    function Navbar() {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    const closeMenu = () => setClick(false);

    return (
        <nav className="navbar">
            
            <div className=" link menu-icon" onClick={handleClick}>
                {/* FontAwesome Icon */}
                <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>

            <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                    <Link className="link nav-link" to="/" onClick={closeMenu}>Home</Link>
                </li>

                <li className="nav-item">
                    <Link className="link nav-link" to="/users/:id" onClick={closeMenu}>Your page</Link>
                </li>

                <li className="nav-item">
                    <Link className="link nav-link" to="/about" onClick={closeMenu}>About</Link>
                </li>

                <li>
                {/* <button className="button" onClick={onLogout}>Logout</button> */}
                     <button className="button">Logout</button>
                </li>

            </ul>
        </nav>
    );
}

export default Navbar;