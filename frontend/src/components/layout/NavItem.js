import React from "react";
import { motion } from "framer-motion";
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

                <motion.li className="nav-item"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}>
                    <button className="nav-link" onClick={onLogout}>Logout</button>
                </motion.li>

                :

                <motion.li className="nav-item"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}>
                    <Link className="link nav-link" to={item.link}>{item.title}</Link>
                </motion.li>


            }
        </div>


    );
}