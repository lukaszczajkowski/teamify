import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Auth from "../../services/Auth";

// eslint-disable-next-line react/prop-types
function Navbar() {
    const history = useHistory();

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    const closeMenu = () => setClick(false);

    const onLogout = () => {
        Auth.logout();
        history.push("/");
    }

    return (
        <nav className="navbar">

            <div className=" link menu-icon" onClick={handleClick}>
                {/* FontAwesome Icon */}
                <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>

            <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                    <Link className="link nav-link" to="/home" onClick={closeMenu}>Home</Link>
                </li>

                <li className="nav-item">
                    <Link className="link nav-link" to="/home" onClick={closeMenu}>ProjectBoard</Link>
                </li>

                <li className="nav-item">
                    <Link className="link nav-link" to="/about" onClick={closeMenu}>About</Link>
                </li>

                <li className="nav-item">
                    <button className="nav-link" onClick={onLogout}>Logout</button>
                </li>

            </ul>
        </nav>
    );
}

export default Navbar;