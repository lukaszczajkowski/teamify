/* eslint-disable react/prop-types */
import React from "react";
import BeanIcon from "../../assets/icon/beans.png";
import ChatIcon from "../../assets/icon/chat.png";
import { Link } from "react-router-dom";
import NavBar from "../layout/Navbar";
import { motion } from "framer-motion";
import MeetingButton from "../meeting/MeetingButton";

// eslint-disable-next-line react/prop-types
export default function ProjectHeader({ project }) {
    console.log("Project from header", project)
    return (
        <div className="project-header ">
            <div className="project-nav flex-start">
                <motion.div whileHover={{ scale: 1.1 }}>
                    <Link to="/home" className="project-nav-item"><i className="fas fa-house-user font-icon"></i></Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }}>
                    <Link to="" className="project-nav-item">
                        <img className="icon" src={BeanIcon} />
                    </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }}>
                    <Link to={{
                        pathname: '/chat',
                        props: {
                            project: project
                        }
                    }}
                        className="project-nav-item">
                        <img className="icon" src={ChatIcon} />
                    </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }}>
                    <Link to="/calendar" className="project-nav-item"><i className="far fa-calendar-alt font-icon"></i></Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                    <MeetingButton/>
                </motion.div>

                <NavBar />
            </div>
        </div>
    );
}