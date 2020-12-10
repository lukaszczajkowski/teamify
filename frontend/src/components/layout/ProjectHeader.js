/* eslint-disable react/prop-types */
import React from "react";
import BeanIcon from "../../assets/icon/beans.png";
import ChatIcon from "../../assets/icon/chat.png";
import { Link } from "react-router-dom";
import NavBar from "../layout/Navbar";

// eslint-disable-next-line react/prop-types
export default function ProjectHeader({ project }) {
    console.log("Project from header", project)
    return (
        <div className="project-header ">
            <div className="member-nav">
                <Link to="" className="nav-item">
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
                <Link to="/calendar" className="nav-item"><i className="far fa-calendar-alt calendar-icon"></i></Link>
            </div>
            <div className="personal-nav">

            </div>
            <NavBar />


        </div>
    );
}