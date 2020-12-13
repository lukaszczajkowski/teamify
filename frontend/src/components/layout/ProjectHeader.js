import React from "react";
import BeanIcon from "../../assets/icon/beans.png";
import ChatIcon from "../../assets/icon/chat.png";
import { Link } from "react-router-dom";
import NavBar from "../layout/Navbar";
import { motion } from "framer-motion";

export default function ProjectHeader() {
    return (
        <div className="project-header ">
            <div className="project-nav flex-start">
                <motion.div
                    className="project-nav-item"
                    whileHover={{ scale: 1.1 }}>
                    <Link to="/home" >
                        <i className="fas fa-house-user font-icon"></i>
                    </Link>
                </motion.div>

                <motion.div
                    className="project-nav-item"
                    whileHover={{ scale: 1.1 }}>
                    <Link to="" >
                        <img className="icon" src={BeanIcon} />
                    </Link>
                </motion.div>


                <motion.div
                    className="project-nav-item"
                    whileHover={{ scale: 1.1 }}>
                    <Link to="/chat" >
                        <img className="icon" src={ChatIcon} />
                    </Link>
                </motion.div>

                <motion.div className="project-nav-item"
                    whileHover={{ scale: 1.1 }}>
                    <Link to="/calendar" >
                        <i className="far fa-calendar-alt font-icon"></i>
                    </Link>
                </motion.div>


            </div>
            <NavBar />


        </div>
    );
}