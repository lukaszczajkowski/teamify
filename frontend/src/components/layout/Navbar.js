import React, { useState } from "react";
import { Link } from "react-router-dom";

    // eslint-disable-next-line react/prop-types
    function Navbar({onLogout}) {

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
                    <Link className="link nav-link" to="/users/me" onClick={closeMenu}>Your page</Link>
                </li>

                <li className="nav-item">
                    <Link className="link nav-link" to="/users/me" onClick={closeMenu}>ProjectBoard</Link>
                </li>

                <li className="nav-item">
                    <Link className="link nav-link" to="/about" onClick={closeMenu}>About</Link>
                </li>

                <li>
                <button className="button" onClick={onLogout}>Logout</button>
                </li>

            </ul>
        </nav>
    );
}

export default Navbar;