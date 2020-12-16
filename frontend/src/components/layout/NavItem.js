import React from "react";
import { Link, useHistory } from "react-router-dom";
import Auth from "../../services/Auth";

export default function NavItem({ item }) {
    const history = useHistory();
    const onLogout = () => {
        Auth.logout();
        history.push("/");
    }
    return (
        <div>
            {item.id === 4 ?

                <li className="nav-item"
                    >
                    <button className="nav-link" onClick={onLogout}>Logout</button>
                </li>

                :

                <li className="nav-item"
                    >
                    <Link className="link nav-link" to={item.link}>{item.title}</Link>
                </li>


            }
        </div>


    );
}