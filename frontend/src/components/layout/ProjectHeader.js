/* eslint-disable react/prop-types */
import React from "react";
import BeanIcon from "../../assets/icon/beans.png";
import ChatIcon from "../../assets/icon/chat.png";
import { Link } from "react-router-dom";
import NavBar from "../layout/Navbar";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
export default function ProjectHeader({ project }) {
    console.log("Project from header", project)
    return (
        <div className="project-header ">
            <div className="project-nav flex-start">
                <Link to="/home" className="project-nav-item"><i className="fas fa-house-user font-icon"></i></Link>
                <Link to="" className="project-nav-item">
                    <img className="icon" src={BeanIcon} />
                </Link>
                <Link to= {{
                    pathname:'/chat',
                    props : {
                        project: project
                    }
                }}
                 className="nav-item">
                    <img className="icon" src={ChatIcon} />
                </Link>
                <Link to="/calendar" className="project-nav-item"><i className="far fa-calendar-alt font-icon"></i></Link>
            </div>
            <NavBar />


        </div>
    );
}