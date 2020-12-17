import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../services/Auth";

    // eslint-disable-next-line react/prop-types
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
                    <Link className="link nav-link" to="/home" onClick={closeMenu}><i className="fas fa-home"></i> Home</Link>
                </li>

                <li className="nav-item">
                    <Link className="link nav-link" to="/projects/:projectId" onClick={closeMenu}><i className="fas fa-qrcode"></i>ProjectBoard</Link>
                </li>

                <li className="nav-item">
                    <Link className="link nav-link" to="/calendar" onClick={closeMenu}><i className="far fa-calendar-alt"></i>Calendar</Link>
                </li>

                <li className="nav-item">
                <Link className="link nav-link" to="/" onClick={() => Auth.logout()}><i className="fas fa-sign-out-alt"></i>Logout</Link>
                </li>

            </ul>
        </nav>
    );
}

export default Navbar;